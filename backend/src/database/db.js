import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  'utn_cisco_managment',
  'root',
  '123ADMINFICA123',
  {
    host: 'localhost',
    port: 3307,
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


