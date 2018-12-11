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
    this.state = {
      messages: [],
      pinboard: [],
      activeTab: 'messages',
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.active_user !== prevProps.active_user) {
      let pinboard = this.props.pinboard.sort((a, b) => {return a.time > b.time})

      let messages = [
        ...this.props.inbox.map((message) => { return {...message, type: 'in'}}),
        ...this.props.outbox.map((message) => { return {...message, type: 'out'}})
      ].sort((a, b) => {return a.time > b.time});

      this.setState({
        messages: messages,
        pinboard: pinboard,
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
