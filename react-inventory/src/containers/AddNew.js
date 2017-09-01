import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FormGroup from '../components/FormGroup';
import _ from 'lodash';
import classNames from 'classnames';
import * as inventory from '../actions/inventory';
import { connect } from 'react-redux';
import shortid from 'shortid';
import validator from 'validator';

//we get the inventory here because when they submit;
//we check if the part number exists.
//in the real world we would check this with a API request.
//we keep the inventory object in the component state;
//until we verify its okay okay to add/update to the store.
//
@connect((reduxStore) => {
  return {
    inventory: reduxStore.inventory.inventory
  }
})
export default class AddNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      inventory: {
        partNumber: '',
        name: '',
        title: '',
        description: '',
        cost: '',
        qty: 0
      },
      required: {
        partNumber: true,
        name: true,
        title: true,
        description: false,
        cost: true,
        qty: true
      },
      startedTyping: false
    }
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.getErrorByIndex = this.getErrorByIndex.bind(this);
    this.handleFormGroupChange = this.handleFormGroupChange.bind(this);
    this.getFormGroupClassName = this.getFormGroupClassName.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
  }

  /**
  * check if form is valid. if our errors object is empty; then its valid.
  *
  * @return boolean
  */
  isFormValid() {
    return _.isEmpty(this.state.errors);
  }

  /**
  * event handler for when our form is submitted.
  *
  * @param event - SyntheticEvent
  *
  * @return boolean
  */
  handleOnSubmit = (event) => {
    //stop it.
    event.preventDefault();

    //grab all the properties that are required and make sure they filled them out
    _.forIn(this.state.required, (value, key) => {
      if(value) {
        if(_.isEmpty(this.state.inventory[key])) {
          return this.appendError(key);
        }
      }
    });

    //if we made it here; we are all good;
    //now we can push to store.
    //need to assign a unique id using shortid
    const newInventory = _.assign(this.state.inventory);
    newInventory.id = shortid.generate();

    this.setState({
      inventory: newInventory
    });

    //now we make a call to the store and add our new object.
    this.props.dispatch(inventory.add(this.state.inventory));

    //now we can push back to the main page.
    this.props.history.push('/');
  }

  /**
  * handles the changing of an input field.
  *
  * @param inputTarget -SyntheticEvent
  *
  * @return void;
  */
  handleFormGroupChange(inputTarget) {
    //update our state that they started typing.
    this.setState({
      startedTyping: true
    });

    const propertyName = inputTarget.target.name;
    const propertyValue = inputTarget.target.value;

    //now we need to update our inventory object.
    const newInventory = _.assign(this.state.inventory);
    newInventory[propertyName] = propertyValue;
    this.setState({
      inventory: newInventory
    });

    if(!propertyValue) {
      //no value. now check if its required.
      if(this.state.required[propertyName]) {
        //we need to append a error message for this.
        return this.appendError(propertyName);
      }
    } else {
      //it has a value.
      //now are any rules for this specific input?
      if(_.indexOf(['partNumber', 'qty'], propertyName) !== -1) {
        //test it.
        if(!validator.isInt(propertyValue)) {
          return this.appendError(propertyName, "Needs to be a valid number.");
        }
      }
      //if its a money field.
      if(_.indexOf(['cost'], propertyName) !== -1) {
        if(!validator.isCurrency(propertyValue)) {
          return this.appendError(propertyName, "Needs to be a valid money!.");
        }
      }

      //check if there is already an error for this input and remove it.
      if(this.getErrorByIndex(propertyName)) {
        this.removeError(propertyName);
      }
    }
    //now we check if it already exists.
    const inventoryPartNumber = parseInt(this.state.inventory.partNumber, 10);

    if(_.findIndex(this.props.inventory, (inventory) => {
      console.log(parseInt(inventory.partNumber, 10));
      return parseInt(inventory.partNumber, 10) === inventoryPartNumber;
    }) !== -1) {
      return this.appendError(propertyName, "Inventory already exists with part number: "+inventoryPartNumber);
    }
    return true;
  }

  /**
  * remove an error by the property name.
  *
  * @param name string
  *
  * @return void
  */
  removeError(name) {
    const newErrors = _.assign(this.state.errors);
    _.unset(newErrors, name);

    this.setState({
      errors: newErrors
    });
  }

  /**
  * append an error messsage
  *
  * @param name string - the property name.
  * @param txt string|null - the error message
  *
  * @return void
  */
  appendError(name, txt="") {

    let message = _.startCase(name)+ " is required.";
    if(txt) {
      message = txt;
    }
    const newErrors = _.assign(this.state.errors);
    newErrors[name] = message;

    this.setState({
      errors: newErrors
    });
  }

  /**
  * get an error message by proprety name.
  *
  * @param name string - the property name.
  *
  * @return string
  */
  getErrorByIndex(name) {

    return _.has(this.state.errors, name) ? this.state.errors[name] : '';

  }

  /**
  * create the className for the FormGroup based on this.state.
  *
  * @param name string - the property name.
  *
  * @return string
  */
  getFormGroupClassName(name) {
    return classNames({
      'form-control': true,
      'is-invalid': this.getErrorByIndex(name) && this.state.required[name],
      'is-valid': !this.getErrorByIndex(name) && this.state.inventory[name] && this.state.required[name] && this.state.startedTyping
    });
  }

  render() {

    const inputs = _.keys(this.state.inventory);

    return (
      <form onSubmit={this.handleOnSubmit}>

        {inputs.map( (input) => (

          <FormGroup
            key={input}
            onChange={this.handleFormGroupChange}
            name={input}
            label={_.startCase(input)}
            error={this.getErrorByIndex(input)}
            className={this.getFormGroupClassName(input)}
            value={this.state.inventory[input]}
            startedTyping={this.state.startedTyping}
          />

        ))}


        <div className="form-group row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-danger">Cancel</Link>
          </div>
          <div className="col-md-6">
            <button
              type="submit"
              className="btn btn-primary"
            >Submit</button>
          </div>
        </div>
      </form>
    )
  }
}
