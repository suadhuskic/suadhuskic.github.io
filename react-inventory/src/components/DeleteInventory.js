import React, { Component } from 'react';

export default class DeleteInventory extends Component {
  constructor(props) {
    super(props)
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.props.onClick(this.props.inventory);
  }

  render() {
    return (
      <button type="button" onClick={this.handleOnClick} className="btn btn-danger">Delete</button>
    );
  }

}
