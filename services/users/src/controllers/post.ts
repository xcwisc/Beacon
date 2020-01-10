import { Request, Response } from 'express';
import Project from '../models/Project';
import User from '../models/User';
import Like from '../models/Like';
import { CustomeRequest } from '../middlewares/auth';
import { body, validationResult } from 'express-validator';

export const getProjectByUser = (req: CustomeRequest, res: Response) => {
  const resObj = {
    'status': 'fail'
  }
  const u_id: string = req.authId;
  Project.findAll({
    where: {
      u_id: u_id
    }
  }).then(projects => {
    const data = projects.map((project) => ({
      p_id: project.p_id,
      name: project.name,
      prerequisite: project.prerequisite,
      description: project.description,
    }));
    resObj['data'] = data;
    resObj['status'] = 'success';
    res.status(200).json(resObj);
    return;
  })
    .catch(err => {
      console.log(err);
      resObj['message'] = 'get project list fail';
      res.status(500).json(resObj);
      return;
    });
}

export const likeValidators = [
  body('u_id')
    .notEmpty().withMessage('invalid token')
    .custom(async (value: string) => {
      if (value.length < 1) {
        return;
      }
      // check the validity of u_id in the database
      try {
        const users = await User.findAll({
          where: {
            u_id: value
          }
        });
        if (users.length < 1) {
          return Promise.reject('invalid token');
        }
      }
      catch (err) {
        console.log(err);
        return Promise.reject('invalid token');
      }
    }),
  body('p_id')
    .isInt().withMessage('invalid p_id')
    .toInt()
    .custom(async (value: number) => {
      if (isNaN(value)) {
        return;
      }
      // check the validity of p_id in the database
      try {
        const projects = await Project.findAll({
          where: {
            p_id: value
          }
        });
        if (projects.length < 1) {
          return Promise.reject('invalid p_id');
        }
      } catch (err) {
        console.log(err);
        return Promise.reject('invalid p_id');
      }
    })
]

export const like = async (req: CustomeRequest, res: Response) => {
  const resObj = {
    'status': 'fail'
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    resObj['message'] = errors.array();
    return res.status(400).json(resObj);
  }

  const u_id: string = req.authId;
  const p_id: number = req.body.p_id;

  // insert p_id and u_id into likes
  Like.create({
    u_id: u_id,
    p_id: p_id
  }).then(like => {
    resObj["status"] = "success";
    resObj["message"] = "create like success";
    res.status(201).json(resObj);
    return;
  }).catch(err => {
    console.log(err);
    resObj["message"] = "create like fail";
    res.status(500).json(resObj);
    return;
  })
}

export const unlike = (req: CustomeRequest, res: Response) => {

}