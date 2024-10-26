import app from './app.js';
import { associateModels  } from "./database/associations.js";
import db from './database/db.js';

const { sequelize, connectDB } = db;

const startServer = async () => {
  try {
    await connectDB();

    await sequelize.sync({ alter: false});
    associateModels();
    console.log('Modelos sincronizados correctamente con la base de datos');

    app.listen(4000, () => {
      console.log('Servidor corriendo en http://localhost:4000');
      console.log('Documentación disponible en http://localhost:4000/api-docs');
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

startServer();
