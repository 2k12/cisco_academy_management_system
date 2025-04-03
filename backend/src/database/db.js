import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  'utn_cms',
  'root',
  'Rlms485017',
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida exitosamente');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

export default { sequelize, connectDB };


