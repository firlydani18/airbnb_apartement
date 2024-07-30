import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('airbnb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;