import { Request, Response } from 'express';
import Project from '../models/Project';
import User from '../models/User';
import Like from '../models/Like';

export const getProjectByUser = (req: Request, res: Response) => {
  const resObj = {
    'status': 'fail'
  }
  // TODO: replace with token later
  const u_id: string = req.query.u_id;
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

export const like = async (req: Request, res: Response) => {
  const resObj = {
    'status': 'fail'
  }

  // TODO: replace with token later
  const u_id: string = req.body.u_id;
  const p_id: number = Number(req.body.p_id);

  // check both u_id and p_id is present
  if (!u_id || !p_id) {
    resObj['message'] = 'missing parameters';
    res.status(400).json(resObj);
    return;
  }

  if (isNaN(p_id)) {
    resObj['message'] = 'invalid p_id';
    res.status(400).json(resObj);
    return;
  }

  // check the validity of u_id and p_id
  try {
    const projects = await Project.findAll({
      where: {
        p_id: p_id
      }
    });
    if (projects.length < 1) {
      resObj['message'] = 'invalid p_id';
      res.status(400).json(resObj);
      return;
    }
  } catch (err) {
    console.log(err);
    resObj['message'] = 'invalid p_id';
    res.status(400).json(resObj);
    return;
  }

  try {
    const users = await User.findAll({
      where: {
        u_id: u_id
      }
    });
    if (users.length < 1) {
      resObj['message'] = 'invalid u_id';
      res.status(400).json(resObj);
      return;
    }
  } catch (err) {
    console.log(err);
    resObj['message'] = 'invalid u_id';
    res.status(400).json(resObj);
    return;
  }

  // at this point the inport is valid
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

export const unlike = (req: Request, res: Response) => {

}