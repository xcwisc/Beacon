import { Request, Response } from 'express';
import { query, validationResult } from 'express-validator';
import Country from '../models/Country';
import States from '../models/State';
import City from '../models/City';

export const getAllCountries = (req: Request, res: Response) => {
  const resObj = {
    'status': 'fail'
  }
  Country.findAll()
    .then(countries => {
      const data = countries.map((country) => ({
        name: country.country_name,
        id: country.country_id
      }));
      resObj['data'] = data;
      resObj['status'] = 'success';
      res.status(200).json(resObj);
    })
    .catch(err => {
      console.log(err);
      resObj['message'] = 'get country list fail';
      res.status(500).json(resObj);
    });
}

export const getStatesByCountryIdValidators = [
  query('country_id')
    .isInt().withMessage('please include a valid country id')
    .toInt()
]

export const getStatesByCountryId = (req: Request, res: Response) => {
  const country_id: number = req.query.country_id;
  const resObj = {
    'status': 'fail'
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    resObj['message'] = errors.array();
    return res.status(400).json(resObj);
  }

  States.findAll({
    where: {
      country_id: country_id
    }
  }).then(states => {
    const data = states.map((state) => ({
      name: state.state_name,
      id: state.state_id
    }));
    resObj['data'] = data;
    resObj['status'] = 'success';
    res.status(200).json(resObj);
  }).catch(err => {
    console.log(err);
    resObj['message'] = 'get state list fail';
    res.status(500).json(resObj);
  });
}

export const getCitiesByStateIdValidators = [
  query('state_id')
    .isInt().withMessage('please include a valid state id')
    .toInt()
]

export const getCitiesByStateId = (req: Request, res: Response) => {
  const state_id: number = req.query.state_id;
  const resObj = {
    'status': 'fail'
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    resObj['message'] = errors.array();
    return res.status(400).json(resObj);
  }

  City.findAll({
    where: {
      state_id: state_id
    }
  }).then(cities => {
    const data = cities.map((city) => ({
      name: city.city_name,
      id: city.city_id
    }));
    resObj['data'] = data;
    resObj['status'] = 'success';
    res.status(200).json(resObj);
  }).catch(err => {
    console.log(err);
    resObj['message'] = 'get city list fail';
    res.status(500).json(resObj);
  });
}