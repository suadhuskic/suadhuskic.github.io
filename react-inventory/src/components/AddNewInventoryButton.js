import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AddNew extends Component {
  render() {
    return (
      <Link
        className="btn btn-primary"
        role="button"
        to="/add"
      >Add new</Link>
    )
  }
}
