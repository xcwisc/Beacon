import { validationResult, body } from 'express-validator';
import { Request, Response } from 'express';
import admin from '../config/firebase';
import City from '../models/City';
import User from '../models/User';

export const registerValidators = [
  body('email').isEmail().withMessage('invalid email'),
  body('password').isLength({ min: 8, max: 15 }).withMessage('invalid password'),
  body('displayname').isLength({ min: 1, max: 50 }).withMessage('invalid displayname'),
  body('city_id').isInt().withMessage('invalid city_id')
    .toInt()
    .custom(async (value: number) => {
      if (isNaN(value)) {
        return;
      }
      try {
        let city: City[] = await City.findAll({
          where: {
            city_id: value
          }
        })
        if (city.length < 1) {
          return Promise.reject('invalid city_id');
        }
      } catch (err) {
        console.log(err);
        return Promise.reject('invalid city_id');
      }
    })
]
export const register = async (req: Request, res: Response) => {
  const resObj = { "status": "fail" };
  const { email, password, displayname, city_id } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    resObj['message'] = errors.array();
    return res.status(400).json(resObj);
  }

  // insert email and password into firebase auth
  let firebaseUser: admin.auth.UserRecord;
  try {
    console.log("start");
    firebaseUser = await admin.auth().createUser({
      email,
      password,
      displayName: displayname,
    });
    console.log("end");
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
  console.log("exit firebase");


  // then insert the UID genertated by firebase, displayname, city_id into users table
  User.create({
    id: firebaseUser.uid,
    displayname: displayname,
    city_id: city_id,
  }).then(async user => {
    resObj["status"] = "success";
    const token = await admin.auth().createCustomToken(firebaseUser.uid);
    resObj["data"] = { "token": token };
    res.status(201).json(resObj);
    return;
  }).catch(err => {
    admin.auth().deleteUser(firebaseUser.uid);
    console.log(err);
    resObj["message"] = "create user fail";
    res.status(500).json(resObj);
    return;
  });
}