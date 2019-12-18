import db from '../config/db';
import { Model, DataTypes } from 'sequelize';

class User extends Model {
  public id!: string;
  public displayname!: number;
}

User.init({
  id: {
    type: new DataTypes.STRING(30),
    primaryKey: true
  },
  displayname: {
    type: new DataTypes.STRING(50),
    allowNull: false
  }
}, {
  sequelize: db,
  tableName: 'users',
});

export default User;