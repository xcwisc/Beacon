import db from '../config/db';
import { Model, DataTypes } from 'sequelize';

import User from './User';
import Project from './Project';

class Like extends Model {
  public p_id!: number;
  public u_id!: string;
}

Like.init({
  p_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Project,
      key: 'p_id'
    }
  },
  u_id: {
    type: new DataTypes.STRING(30),
    primaryKey: true,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  sequelize: db,
  tableName: 'likes',
});

Like.sync();

export default Like;