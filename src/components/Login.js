import React, { Component } from 'react'
import sha256 from 'crypto-js/sha256';
import { Container, Col, Row, Input, Button, Alert } from 'reactstrap'

import { get_accounts } from '../data'

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    const accounts = get_accounts();
    const findMail = accounts.filter(user => user.email === this.state.email)
    const findUser = accounts.filter(user => user.email === this.state.email && user.password === sha256(this.state.password).toString() )

    if(findMail.length > 0){
      if(findUser.length > 0){
        this.props.login(this.state.email);
        this.setState({
          error: ''
        });
      } else {
        this.setState({
          error: 'Falsches Passwort!'
        })
      }
    } else {
      this.setState({
        error: 'Nutzer nicht gefunden!'
      })
    }
  }
  render(){
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ height: '100%', width: '100%', minHeight: '100vh', minWidth: '100vw' }}>
        <Container>
          <Col xs="4" className="mx-auto">
            { this.state.error !== '' && <Alert color="info">{ this.state.error }</Alert> }
            <form onSubmit={this.onSubmit}>
              <Input className="mb-2" type="email" name="email" onChange={(e) => this.setState({ email: e.target.value })} placeholder="E-Mail" />
              <Input className="mb-2" type="password" name="password" onChange={(e) => this.setState({ password: e.target.value })} placeholder="Passwort" />
              <Button color="primary" block type="submit">einloggen</Button>
            </form>
          </Col>
        </Container>
      </div>
    )
  }
}

export default Login
