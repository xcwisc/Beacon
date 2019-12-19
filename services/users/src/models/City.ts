import db from '../config/db';
import { Model, DataTypes } from 'sequelize';

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


export default City;