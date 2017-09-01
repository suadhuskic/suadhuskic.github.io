export function add(inventory) {
  return {
    type: "ADD_INVENTORY",
    inventory: inventory
  }
}
export function updateSearchValue(value) {
  return {
    type: "UPDATE_SEARCH_VALUE",
    searchValue: value
  }
}
export function updateSearchProperty(property) {
  return {
    type: "UPDATE_SEARCH_PROPERTY",
    searchProperty: property
  }
}
export function deleteAllInventory() {
  return {
    type: "DELETE_ALL_INVENTORY"
  }
}
export function deleteInventory(inventoryId) {
  return {
    type: "DELETE_INVENTORY",
    id: inventoryId
  }
}
