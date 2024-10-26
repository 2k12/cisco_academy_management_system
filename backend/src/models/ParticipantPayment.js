// models/ParticipantPayment.js
import { DataTypes } from "sequelize";
import User from './User.js';
import db from '../database/db.js';  // Importa todo el objeto

const { sequelize } = db;  // Extrae sequelize del objeto



const ParticipantPayment = sequelize.define(
  "ParticipantPayment",
  {
    participant_payment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    participant_id: {
      type: DataTypes.INTEGER,
    },
    payment_id: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
      field: "updated_at",
    },
    createdBy: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      field: "created_by",
    },
  },
  {
    tableName: "participant_payment",
    timestamps: false,
  }
);

export default ParticipantPayment;
