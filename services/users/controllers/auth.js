const firebase = require("firebase/app");
require('firebase/auth');
const Location = require('../models/Location');
const User = require('../models/User');

module.exports.register = (req, res) => {
  // firebase.auth().createUserWithEmailAndPassword("bot1@botland.com", "12345678")
  //   .then((user) => {
  //     // insert the user into the database
  //     res.send("success");
  //   })
  //   .catch((err) => {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     if (errorCode == 'auth/weak-password') {
  //       console.log('The password is too weak.');
  //     } else {
  //       console.log(errorMessage);
  //     }
  //     console.log(error);
  //     res.send("fail");
  //   })
  User.findAll()
    .then(locations => {
      console.log(locations);
      res.end();
    })
    .catch(err => {
      console.log(err);
      res.end();
    })
}