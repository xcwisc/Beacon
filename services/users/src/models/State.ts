import db from '../config/db';
import { Model, DataTypes } from 'sequelize';
import City from './City';

class States extends Model {
  public state_id!: number;
  public state_name!: string;
}

States.init({
  state_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  state_name: {
    type: new DataTypes.STRING(30),
    allowNull: false
  }
}, {
  sequelize: db,
  tableName: 'states',
});

States.hasMany(City, { foreignKey: 'state_id' });
States.sync();

export default States;