import db from '../config/db';
import { Model, DataTypes } from 'sequelize';
import City from './City';

class User extends Model {
  public id!: string;
  public displayname!: string;
  public city_id!: number;
}

User.init({
  id: {
    type: new DataTypes.STRING(30),
    primaryKey: true
  },
  displayname: {
    type: new DataTypes.STRING(50),
    allowNull: false
  },
  city_id: {
    type: DataTypes.INTEGER,
    references: {
      model: City,
      key: 'city_id',
    }
  }
}, {
  sequelize: db,
  tableName: 'users',
});

User.sync();

export default User;