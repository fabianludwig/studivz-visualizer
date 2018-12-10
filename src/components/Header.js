import React, { Component } from 'react'
import { Col, Row, Button } from 'reactstrap'

class Header extends Component {
  render(){
    return (
      <Row className="p-3 bg-dark">
        <Col xs="8">
          <div class="d-flex justify-content-start align-items-center">
            <img src={ this.props.info.account.image } alt={ this.props.info.account.name } class="rounded-circle mr-4" style={{ height: 70, width: 70 }} />
            <div>
              <h4 className="text-white">{ this.props.info.account.name }</h4>
              <small className="d-block text-white">
                <strong>Mitglied seit: </strong> { this.props.info.account.member_since }
              </small>
              <small className="d-block text-white">
                <strong>Letztes Update: </strong> { this.props.info.account.last_update }
              </small>
            </div>
          </div>
        </Col>
        <Col xs="4" className="text-right">
          <Button color="light" outline onClick={this.props.logout}>Logout</Button>
        </Col>
      </Row>
    )
  }
}

export default Header
