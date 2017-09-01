import React, { Component } from 'react';

export default class FormGroup extends Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event) {
    this.props.onChange(event);
  }

  render() {

    const { name, label } = this.props;

    const elementId = "fg_"+name;

    return (
      <div className="form-group">
        <label htmlFor={elementId}>{label}</label>
        <input
          type="text"
          onChange={this.handleOnChange}
          className={this.props.className}
          name={name}
          id={elementId}
          placeholder={label}
          value={this.props.value}
        />
        {this.props.error && <div className="invalid-feedback">{this.props.error}</div>}
      </div>
    )
  }
}
