import { DataTypes } from 'sequelize';
import User from './User.js';
import db from '../database/db.js';  // Importa todo el objeto

const { sequelize } = db;  // Extrae sequelize del objeto

const Schedule = sequelize.define(
  'Schedule',
  {
    schedule_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'schedule_id',  // Asegura que Sequelize mapea correctamente al nombre de la columna en la tabla.
    },
    days: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME,  // Cambiar a tipo TIME para corresponder con la base de datos.
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,  // Cambiar a tipo TIME.
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at',  // Asegura que Sequelize mapea correctamente al nombre de la columna.
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
      field: 'updated_at',
    },
    createdBy: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',  // Relación con la tabla users.
      },
      field: 'created_by',
    },
  },
  {
    tableName: 'schedule',  // Nombre de la tabla en la base de datos.
    timestamps: false,  // Si quieres que Sequelize maneje automáticamente las fechas, cambia a `true`.
  }
);

export default Schedule;
