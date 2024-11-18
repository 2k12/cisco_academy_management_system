// models/Participant.js
import { DataTypes } from "sequelize";

import User from "./User.js";
import db from "../database/db.js"; // Importa todo el objeto

const { sequelize } = db; // Extrae sequelize del objeto

const Participant = sequelize.define(
  "Participant",
  {
    participant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // age: {
    //   type: DataTypes.INTEGER,
    // },
    cid: {
      type: DataTypes.INTEGER,
    },
    phone: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    institution: {
      type: DataTypes.STRING,
    },
    participant_type_id: {
      type: DataTypes.INTEGER,
    },
    certificate_required: {
      type: DataTypes.BOOLEAN,
    },
    file_url: {
      type: DataTypes.STRING,
    },
    enrolled: {
      type: DataTypes.BOOLEAN,
    },
    registered: {
      type: DataTypes.BOOLEAN,
    },
    approval: {
      type: DataTypes.BOOLEAN,
    },
    total_payment: {
      type: DataTypes.DECIMAL(10, 2),
    },
    active: {
      type: DataTypes.BOOLEAN,
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
    tableName: "participant",
    timestamps: false,
  }
);

export default Participant;
