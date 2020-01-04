import db from '../config/db';
import { Model, DataTypes } from 'sequelize';
import States from './State';

class Country extends Model {
  public country_id!: number;
  public country_name!: string;
}

Country.init({
  country_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  country_name: {
    type: new DataTypes.STRING(30),
    allowNull: false
  }
}, {
  sequelize: db,
  tableName: 'countries',
});

Country.hasMany(States, { foreignKey: 'country_id' });
Country.sync();

export default Country;