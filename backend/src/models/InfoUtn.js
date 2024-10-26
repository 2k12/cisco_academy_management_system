import { DataTypes } from 'sequelize';
import User from './User.js';
import db from '../database/db.js';  // Importa todo el objeto

const { sequelize } = db;  // Extrae sequelize del objeto


const InfoUtn = sequelize.define('InfoUtn', {
    info_utn_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    faculty: {
        type: DataTypes.STRING,
    },
    degree: {
        type: DataTypes.STRING,
    },
    degree_level: {
        type: DataTypes.STRING,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'created_at',
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
          key: 'id',
        },
        field: 'created_by',
      },
}, {
    tableName: 'info_utn',
    timestamps: false,
});

export default InfoUtn;
