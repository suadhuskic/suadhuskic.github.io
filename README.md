## REACT JS - inventory system demo.

https://suadhuskic.github.io/react-inventory-production/index.html

 - A basic inventory system for adding inventory. Built in React JS.
 - The state of the application is in `redux`.
 - `react-router` is being used as well. But very basic since this is being hosted on gh pages.

## Home page:

 Controlled by the `ViewAll` container. Source code here:
 [ViewAll Component](https://github.com/suadhuskic/suadhuskic.github.io/blob/master/react-inventory/src/containers/ViewAll.js)

 - It handles the search.
 - Deletes a single inventory or all inventory from the `redux` store by dispatching.
 -

## Add New

Controlled by `AddNew` container. Source code:
 [AddNew Component](https://github.com/suadhuskic/suadhuskic.github.io/blob/master/react-inventory/src/containers/AddNew.js)

 - This container can be broken down to more smaller components but its good enough to demonstrate react js understanding.

 - The state is only storing the inventory object that is being added.
 - We verify all the fields before pushing to our `redux` store.
  - [`checkForm`](https://github.com/suadhuskic/suadhuskic.github.io/blob/master/react-inventory/src/containers/AddNew.js#LC60) - makes sure all the required fields are not empty by looping through using `lodash` tools and returning a `promise` back.
  - We then use that promise and run the proper callbacks [here](https://github.com/suadhuskic/suadhuskic.github.io/blob/master/react-inventory/src/containers/AddNew.js#LC80)
  - But before we get to those functions we actually do checking __on demand__
    - Meaning we check the field as the user types using  [`handleFormGroupChange`](https://github.com/suadhuskic/suadhuskic.github.io/blob/master/react-inventory/src/containers/AddNew.js#LC115)
    - `handleFormGroupChange` is passed the child component as a onClick prop. The child component calls this callback passing in the value.
