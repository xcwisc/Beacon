import * as firebase from 'firebase/app';
import * as EmailValidator from 'email-validator';
import { Request, Response } from 'express';
import 'firebase/auth';
import City from '../models/City';
import User from '../models/User';

export const register = async (req: Request, res: Response) => {
  const resObj = { "status": "fail" };
  const body = req.body;

  // check if parameters exist
  if (!body.email || !body.password || !body.city_id || !body.displayname) {
    resObj["message"] = "missing parameters";
    res.status(400).json(resObj);
    return;
  }

  // check if email is valid
  if (!EmailValidator.validate(body.email)) {
    resObj["message"] = "invalid email";
    res.status(400).json(resObj);
    return;
  }

  // check if password is valid (could use password-validator in future)
  if (body.password.length < 8) {
    resObj["message"] = "invalid password";
    res.status(400).json(resObj);
    return;
  }

  // check if displayname is valid
  if (body.displayname.length > 50) {
    resObj["message"] = "invalid displayname";
    res.status(400).json(resObj);
    return;
  }

  // check if city_id is valid
  const city_id: number = Number(body.city_id);
  if (isNaN(city_id)) {
    resObj['message'] = 'invalid city_id';
    res.status(400).json(resObj);
    return;
  }
  let city: City[];
  try {
    city = await City.findAll({
      where: {
        city_id: city_id
      }
    })
    if (city.length < 1) {
      resObj["message"] = "invalid city_id";
      res.status(400).json(resObj);
      return;
    }
  } catch (err) {
    resObj["message"] = "invalid city_id";
    res.status(400).json(resObj);
    return;
  }

  // insert email and password into firebase auth
  let firebaseUser: firebase.auth.UserCredential;
  try {
    firebaseUser = await firebase.auth().createUserWithEmailAndPassword(body.email, body.password);
  } catch (err) {
    const errorCode = err.code;
    const errorMessage = err.message;
    if (errorCode == 'auth/weak-password') {
      resObj["message"] = "The password is too weak";
    } else if (errorCode == 'auth/account-exists-with-different-credential') {
      resObj["message"] = "Email already associated with another account";
    } else {
      resObj["message"] = errorMessage;
    }

    res.status(400).json(resObj);
    return;
  }


  // then insert the UID genertated by firebase, displayname, city_id into users table
  User.create({
    id: firebaseUser.user.uid,
    displayname: body.displayname,
    city_id: city_id,
  }).then(async user => {
    resObj["status"] = "success";
    const token = await firebaseUser.user.getIdToken();
    resObj["data"] = { "token": token };
    res.status(201).json(resObj);
    return;
  }).catch(err => {
    firebaseUser.user.delete();
    console.log(err);
    resObj["message"] = "create user fail";
    res.status(500).json(resObj);
    return;
  });
}