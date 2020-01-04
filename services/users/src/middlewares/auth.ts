import admin from '../config/firebase';
import { Request, Response, NextFunction } from 'express';

export interface CustomeRequest extends Request {
  authToken?: string | null,
  authId?: string
}

const getAuthToken = (req: CustomeRequest, res: Response, next: NextFunction) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    req.authToken = req.headers.authorization.split(' ')[1];
  } else {
    req.authToken = null;
  }
  next();
};


export const checkIfAuthenticated = (req: CustomeRequest, res: Response, next: NextFunction) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin
        .auth()
        .verifyIdToken(authToken);
      req.authId = userInfo.uid;
      return next();
    } catch (e) {
      return res
        .status(401)
        .send({ error: 'You are not authorized to make this request' });
    }
  });
};