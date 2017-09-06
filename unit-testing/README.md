## chai & mocha unit testing example

We have  `user` object that has the following private properties:
 - username
 - location
 - age

The properties get set in the constructor.

It has the following methods:
 - `has(key)` - returns boolean if we have that key passed as a property.
 - `get(key)` - get the `key` property. returns the property or undefined.
 - `set(key, value)` - set the property `key` with the value of `value`. only sets the property if it exists in our object. returns `this`
 - `updateUser()` - returns a `promise`
 - `get tasks` - returns a `promise`


 ----

 We need to test and make sure:
 - after creating a new object; we get an object back.
 - the correct properties are are set in the constructor.
 - if we update a property; it only updates if the property exists.
 - getting tasks should return a promise and resolve into an array.
 - updating the user should return a promise and reject because the user is missing a phone number.

### full code:
 ```js
 const user = require('./user.js');
 const assert = require('chai').assert;

 //the user can do the following:
 //updateName

 describe("User object", function() {

   const newUserName = [
     'Suad Huskic',
     'Hayward',
     27
   ]
   const my_user = new user(...newUserName)

   it("user is an object", function() {
     assert.isObject(my_user);
   });

   it("creating a new user object should assign correct properties", function() {

     assert.strictEqual(my_user.get('username'), newUserName[0]);
     assert.strictEqual(my_user.get('location'), newUserName[1]);
     assert.strictEqual(my_user.get('age'), newUserName[2]);
   });

   it("updating user should update the property.", function() {

     const updatedUsername = 'super-cool-dude';

     my_user.set('username', updatedUsername);

     assert.strictEqual(my_user.get('username'), updatedUsername);

   });

   it("updating invalid property should fail", function() {

     my_user.set('poop', 'brown');
     assert.strictEqual(my_user.get('poop'), undefined);

   });

   it("get tasks should resolve and return array", function(done) {
     this.timeout(4000);
     const promise = my_user.tasks.then(function(tasks) {
       assert.isArray(tasks);
       done();
     });
   });

   it("updating user should reject because we did not set phone number.", function(done) {
     const promise = my_user.updateUser().catch(function(message) {
       assert.isString(message);
       done();
     });
   });


 });
 ```
### the output:
```js
// suadhuskic (master *) unit-testing $ npm run test
//
// > unit-testing@1.0.0 test /Users/suadhuskic/git/suadhuskic.github.io/unit-testing
// > mocha index.js || true
//
//
//
//   User object
//     ✓ user is an object
//     ✓ creating a new user object should assign correct properties
//     ✓ updating user should update the property.
//     ✓ updating invalid property should fail
//     ✓ get tasks should resolve and return array (3008ms)
//     ✓ updating user should reject because we did not set phone number.
//
//
//   6 passing (3s)
//
// suadhuskic (master *) unit-testing $
```
