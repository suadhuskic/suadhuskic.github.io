import allInventory from '../data/inventory.js';

export default function reducer(state={
  inventory: allInventory,
  searchValue: '',
  searchProperty: 'partNumber'
}, action) {

  switch(action.type) {

    case "ADD_INVENTORY":
      return {
        ...state,
        inventory: [
          ...state.inventory,
          action.inventory
        ]
      }

    case "FETCH_ALL_INVENTORY":
      return {
        ...state,
        inventory: action.inventory
      }

    case "UPDATE_SEARCH_VALUE":
      return {
        ...state,
        searchValue: action.searchValue
      }

    case "UPDATE_SEARCH_PROPERTY":
      return {
        ...state,
        searchProperty: action.searchProperty
      }

    case "DELETE_ALL_INVENTORY":
      return {
        ...state,
        inventory: []
      }

    case "DELETE_INVENTORY":
      const newInventory = state.inventory.filter( (item, index) => item.id !== action.id);
      return {
        ...state,
        inventory: newInventory
      }

    default:
      return state;
  }

}
