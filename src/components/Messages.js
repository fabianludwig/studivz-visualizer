import React, { Component } from 'react'
import classnames from 'classnames';
import { Container, Col, Row, Input, Button, Collapse, Badge, Nav, NavItem, NavLink } from 'reactstrap'

import Friendlist from './Friendlist'

class Messages extends Component {

  constructor(props){
    super(props);
    this.state = {
      profile: this.props.profile,
      active_user: false,
      inbox: [],
      outbox: [],
      pinboard: [],
      details: {}
    }
  }

  setPerson = (user_id) => {
    console.log(user_id);
    this.setState({
      active_user: user_id,
      inbox: this.props.inbox.filter(user => user.user_id.indexOf(user_id) !== -1),
      outbox: this.props.outbox.filter(user => user.user_id.indexOf(user_id) !== -1),
      pinboard: this.props.pinboard.filter(user => user.user_id === user_id),
      details: this.props.friends.filter(user => user.user_id === user_id)[0],
    })
  }

  render(){
    return (
      <Container noGutters className="m-0 p-0 flex-fill d-flex">
        <Row noGutters className="flex-fill">
          <Col xs="3" className="d-flex flex-column border-right">
            <div className="p-3 bg-light border-bottom"><span className="font-weight-bold">{ this.props.friends.length }</span> Freunde</div>
            <div className="flex-grow-1" style={{ position: 'relative' }}>
              <div style={{ overflow: 'scroll', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                <Friendlist items={this.props.friends} onClick={this.setPerson}/>
              </div>
            </div>
          </Col>
          <Col xs="6" className="d-flex">
            <Conversation {...this.state} />
          </Col>
          <Col xs="3" className="d-flex">
            <FriendDetails {...this.state} />
          </Col>
        </Row>
      </Container>
    )
  }
}

class FriendDetails extends Component {
  render(){
    return (
      <div className="bg-light border-left flex-grow-1 p-3 text-center">
        { this.props.details && <img src={ this.props.details.image } alt={ this.props.details.name } class="rounded-circle mb-3" style={{ height: 100, width: 100 }} />}
        <h5 className="m-0 mb-3">{ this.props.details ? this.props.details.name : 'Gelöschte Person(en)' }</h5>
        { this.props.details && <small className="d-block text-muted"><strong>Letztes Update:<br /></strong>{ this.props.details.last_update }</small>}
      </div>
    )
  }
}

class Conversation extends Component {
  constructor(props){
    super(props);

    const first_date = new Date(this.props.profile.info.account.member_since.substring(0, 10).split('/'));
    const last_date = new Date(this.props.profile.info.account.last_update.substring(0, 10).split('/'));

    this.state = {
      messages: [],
      pinboard: [],
      activeTab: 'messages',
      first_date: first_date,
      last_date: last_date,
      range: this.months_between(first_date, last_date)
    }
  }
  months_between = (date_from, date_to) => {
    return date_to.getMonth() - date_from.getMonth()
           + ( 12 * ( date_to.getFullYear() - date_from.getFullYear() ) );
  }
  componentDidUpdate(prevProps) {
    if (this.props.active_user !== prevProps.active_user) {
      let messages = [];
      let pinboard = this.props.pinboard;

      this.props.inbox.map(message => {
        messages.push({
          ...message,
          type: 'in'
        })
      })
      this.props.outbox.map(message => {
        messages.push({
          ...message,
          type: 'out'
        })
      })

      messages.sort((a, b) => {return a.time > b.time});
      pinboard.sort((a, b) => {return a.time > b.time});

      const last_message = [...messages].pop();
      const last_pinboard = [...pinboard].pop();

      let last_dates = [
        this.props.profile.info.account.last_update
      ];
      if (last_message){ last_dates.push(last_message.time); }
      if (last_pinboard){ last_dates.push(last_pinboard.time); }
      last_dates.sort((a, b) => a > b);

      const last_date = new Date(last_dates.pop().substring(0, 10).split('/'));

      this.setState({
        messages: messages,
        pinboard: pinboard,
        last_date: last_date,
        range: this.months_between(this.state.first_date, last_date)
      })
    }
  }
  changeTabs = (tab) => {
    this.setState({ activeTab: tab })
  }
  render(){
    return (
      <div className="d-flex flex-column flex-grow-1">
          <div className="bg-light p-0 pt-3">
            <Nav tabs className="mb-0">
              <NavItem className="mx-2">
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'messages' })}
                  onClick={() => this.changeTabs('messages')}
                >Nachrichten<Badge className="ml-2" color="dark" pill>{ this.state.messages.length }</Badge></NavLink>
              </NavItem>
              <NavItem className="mx-2">
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'pinboard' })}
                  onClick={() => this.changeTabs('pinboard')}
                >Pinnwand<Badge className="ml-2" color="dark" pill>{ this.state.pinboard.length }</Badge></NavLink>
              </NavItem>
            </Nav>
          </div>
          <div className="flex-grow-1" style={{ position: 'relative' }}>
            <div style={{ overflow: 'scroll', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
              <ul className="p-0 m-0">
                {
                  this.state.activeTab === 'messages' && (
                    this.state.messages.map(message =>
                      <Message {...message} />
                    )
                  )
                }
                {
                  this.state.activeTab === 'pinboard' && (
                    this.state.pinboard.map(message =>
                      <Message {...message} />
                    )
                  )
                }
              </ul>
            </div>
          </div>
      </div>
    )
  }
}

const Message = (props) => {
  return (
    <li className="m-4">
      <div className={ (props.type === 'out' ? 'bg-primary ml-auto' : 'bg-light border') + " rounded p-3"} style={{ width: '100%', maxWidth: 360 }}>
        <div className={ (props.type === 'out' ? 'text-light' : '') + " font-weight-bold mb-2"}>{ props.subject }</div>
        <div className={ (props.type === 'out' ? 'text-light' : '') + " mb-2"} dangerouslySetInnerHTML={{__html: props.html}} ></div>
        <small className={ (props.type === 'out' ? 'text-light' : 'text-muted')}>{ props.time }</small>
      </div>
    </li>
  )
}


export default Messages
