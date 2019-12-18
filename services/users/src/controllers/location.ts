
import { Request, Response } from 'express';
import Country from '../models/Country';

export const getAllCountries = (req: Request, res: Response) => {
  Country.findAll()
    .then(countries => {
      const resArr = countries.map((country) => ({
        country_name: country.country_name,
        country_id: country.country_id
      }));
      res.status(200).json(resArr);
    })
    .catch(err => {
      console.log(err);
      res.status(500);
    })
}