// models/PaymentType.js
import { DataTypes } from 'sequelize';
import User from './User.js';
import db from '../database/db.js';  // Importa todo el objeto

const { sequelize } = db;  // Extrae sequelize del objeto


const PaymentType = sequelize.define('PaymentType', {
    payment_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
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
    tableName: 'payment_type',
    timestamps: false,
});

export default PaymentType;
