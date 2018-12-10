import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'

class Friendlist extends Component {
  render(){

    let items = this.props.items.sort((a, b) => a.name > b.name)

    return (
      <ListGroup flush className={this.props.className} style={{ ...this.props.style, overflow: 'scroll' }}>
        <ListGroupItem action className="d-flex justify-content-start align-items-center border-bottom bg-light" onClick={() => this.props.onClick('')}>
          <img src="https://phx-svz.pe.staticvz.net/20140911-0/Img/svz-nopic-w.jpg" alt="Gelöschte Person" class="rounded-circle mr-3" style={{ height: 40, width: 40 }} />
          <div>
            <span className="d-block">Gelöschte Person</span>
          </div>
        </ListGroupItem>
        { items.map(item =>
          <ListGroupItem action className="d-flex justify-content-start align-items-center border-bottom" onClick={() => this.props.onClick(item.user_id)}>
            <img src={ item.image } alt={ item.name } class="rounded-circle mr-3" style={{ height: 40, width: 40 }} />
            <div>
              <span className="d-block">{ item.name }</span>
              <small className="d-block text-muted">{ item.last_update }</small>
            </div>
          </ListGroupItem>
        ) }
      </ListGroup>
    )
  }
}

export default Friendlist
