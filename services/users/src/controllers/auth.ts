import * as firebase from 'firebase/app';
import { Request, Response } from 'express';
import 'firebase/auth';
import User from '../models/User';

export const register = (req: Request, res: Response) => {
  firebase.auth().createUserWithEmailAndPassword("bot1@botland.com", "12345678")
    .then((user) => {
      // insert the user into the database
      res.send("success");
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        console.log('The password is too weak.');
      } else {
        console.log(errorMessage);
      }
      console.log(error);
      res.send("fail");
    })
  // User.findAll()
  //   .then(locations => {
  //     console.log(locations);
  //     res.end();
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.end();
  //   })
}