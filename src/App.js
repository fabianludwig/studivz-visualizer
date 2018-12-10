import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Collapse, Button, ListGroup, ListGroupItem, Container, Row, Col } from 'reactstrap'

import Login from './components/Login'
import Header from './components/Header'
import Messages from './components/Messages'

import { get_friends, get_profile, get_pinboard, get_messages } from './data'

const defaultState = {
  account: false,
  friends: [],
  profile: {},
  pinboard: [],
  messages: {
    inbox: [],
    outbox: []
  },
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = defaultState
  }
  setAccount = (account) => {
    if(account){
      this.setState({
        account: account,
        friends: get_friends(account),
        profile: get_profile(account),
        pinboard: get_pinboard(account),
        messages: get_messages(account),
      });
    } else {
      this.setState(defaultState);
    }
  }
  render() {
    return (
      <div className="d-flex" style={{ height: '100vh' }}>
        { this.state.account ?
          <Container className="shadow my-5 p-0 bg-white d-flex flex-column rounded" style={{ overflow: 'hidden' }}>
            <Header {...this.state.profile} logout={() => this.setAccount(false)}/>
            <Messages friends={this.state.friends} {...this.state.messages} pinboard={this.state.pinboard} profile={this.state.profile}/>
          </Container>
        :
          <Login login={this.setAccount} />
        }
      </div>
    );
  }
}



export default App;
