import db from '../config/db';
import User from './User';
import { Model, DataTypes } from 'sequelize';

class Locations extends Model {
  public id!: number;
  public country!: string;
  public province!: string;
  public city!: string;
}

Locations.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  country: {
    type: new DataTypes.STRING(30),
    allowNull: false
  },
  province: {
    type: new DataTypes.STRING(30),
    allowNull: false
  },
  city: {
    type: new DataTypes.STRING(30),
    allowNull: false
  }
}, {
  sequelize: db,
  tableName: 'locations',
});

Locations.hasMany(User);

export default Locations;