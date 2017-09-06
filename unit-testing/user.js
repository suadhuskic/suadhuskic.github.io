class user {
  constructor(username, location, age) {
    this._username = username;
    this._location = location;
    this._age = age;
  }

  has(key) {
    return this.hasOwnProperty(key);
  }

  get(key) {
    const property = '_'+key;
    return this.has(property) ? this[property] : undefined;
  }

  set(key, value) {
    const property = '_'+key;
    if(this.has(property)) {
      this[property] = value;
    }
    return this;
  }

  updateUser() {
      //check if we got all the fields needed.
      const required = ['username', 'location', 'phonenumber'];

      return new Promise( (resolve, reject) => {
        required.map( (field) => {
          if(this.get(field) === undefined) {
            reject(field+" is required to update the user.");
          }
        });
        //now we can send request to server and do the updating.
        resolve();
      });
  }

  get tasks() {
    //some api request.
    const tasks = [
      {
        id: 1,
        name: "paint room",
        completed: false
      },
      {
        id: 2,
        name: "find car keys",
        completed: false
      },
      {
        id: 3,
        name: "drink more water!",
        completed: false
      },
    ];

    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(tasks);
      }, 3000);
    });

  }

}


module.exports = user;
