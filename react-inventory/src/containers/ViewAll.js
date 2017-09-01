import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as inventory from '../actions/inventory';
import DeleteInventory from '../components/DeleteInventory'

import AddNewInventoryButton from '../components/AddNewInventoryButton';

@connect((reduxStore) => {
  return {
    inventory: reduxStore.inventory.inventory,
    searchValue: reduxStore.inventory.searchValue,
    searchProperty: reduxStore.inventory.searchProperty,
  }
})
export default class ViewAll extends Component {

  constructor(props) {
    super(props);
    this.handleSearchOnChange = this.handleSearchOnChange.bind(this);
    this.handleSearchByProperty = this.handleSearchByProperty.bind(this);
    this.deleteInventory = this.deleteInventory.bind(this);
    this.deleteAllInventory = this.deleteAllInventory.bind(this);
  }

  handleSearchOnChange(event) {
    const searchValue = event.target.value;
    this.props.dispatch(inventory.updateSearchValue(searchValue));
  }

  handleSearchByProperty(event) {
    const searchProperty = event.target.value;
    this.props.dispatch(inventory.updateSearchProperty(searchProperty));
  }

  deleteAllInventory() {
    this.props.dispatch(inventory.deleteAllInventory());
  }

  deleteInventory(inv) {
    this.props.dispatch(inventory.deleteInventory(inv.id));
  }

  render() {
    const { inventory, searchProperty } = this.props;

    const cellStyle = {
      textAlign: 'left',
      verticalAlign: 'center'
    }

    console.log(inventory);

    return (

      <div>
        <div className="row bottom-buffer">
          <div className="col-md-6 ml-md-auto">
            <AddNewInventoryButton />
          </div>
        </div>
        <div className="row bottom-buffer">
          <div className="col-md-2">
            <select onChange={this.handleSearchByProperty} value={this.props.searchProperty}>
              {['partNumber', 'name', 'title', 'description'].map( (property) => (
                <option key={property} value={property}>{_.startCase(property)}</option>
              ))}
            </select>
          </div>
          <div className="col-md-10">
              <input type="text" onChange={this.handleSearchOnChange} placeholder="search by part number, title, description" className="form-control" />
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th style={cellStyle}>
                <button type="button" onClick={this.deleteAllInventory} className="btn btn-danger">Delete all</button>
              </th>
              <th style={cellStyle}>Part Number</th>
              <th style={cellStyle}>Name</th>
              <th style={cellStyle}>Title</th>
              <th style={cellStyle}>Description</th>
              <th style={cellStyle}>Cost</th>
              <th style={cellStyle}>Qty</th>
            </tr>
          </thead>
          <tbody>
          {inventory.length === 0 && <tr><td style={{textAlign: 'center'}} colSpan={5}>No inventory found. <AddNewInventoryButton /></td></tr>}

          {inventory.length > 0 && inventory.map( (inv) => (
            inv[searchProperty].toString().toLowerCase().indexOf(this.props.searchValue) !== -1 &&
              <tr key={inv.partNumber}>
                <td style={cellStyle}>
                  <DeleteInventory onClick={this.deleteInventory} inventory={inv}>Delete</DeleteInventory>
                </td>
                <td style={cellStyle}>{inv.partNumber}</td>
                <td style={cellStyle}>{inv.name}</td>
                <td style={cellStyle}>{inv.title}</td>
                <td style={cellStyle}>{inv.description}</td>
                <td style={cellStyle}>${inv.cost}</td>
                <td style={cellStyle}>{inv.qty}</td>
              </tr>

          ))}
          </tbody>
        </table>
      </div>
    )
  }

}
