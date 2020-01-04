import db from '../config/db';
import { Model, DataTypes } from 'sequelize';

import City from './City';
import User from './User';

class Project extends Model {
  public p_id!: number;
  public name!: string;
  public prerequisite!: string;
  public description!: string;
  public u_id!: string;
  public city_id!: number;
}

Project.init({
  p_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(30),
    allowNull: false
  },
  prerequisite: {
    type: new DataTypes.STRING(30),
    allowNull: false
  },
  description: {
    type: new DataTypes.TEXT,
    allowNull: false
  },
  u_id: {
    type: new DataTypes.STRING(30),
    references: {
      model: User,
      key: 'id'
    }
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
  tableName: 'projects',
  timestamps: true
});

Project.sync();

export default Project;