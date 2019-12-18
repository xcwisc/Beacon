import { Sequelize } from 'sequelize';

const db = new Sequelize(
  process.env.MYSQL_DBNAME,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_ROOT_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export default db;