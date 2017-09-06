const user = require('./user.js');
const assert = require('chai').assert;

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
