import db from '../config/db';
import { Model, DataTypes } from 'sequelize';
import User from './User';

class City extends Model {
  public city_id!: number;
  public city_name!: string;
}

City.init({
  city_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  city_name: {
    type: new DataTypes.STRING(30),
    allowNull: false
  }
}, {
  sequelize: db,
  tableName: 'cities',
});

City.hasMany(User), { foreignKey: 'city_id' };

export default City;