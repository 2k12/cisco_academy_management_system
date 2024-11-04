import { DataTypes } from "sequelize";
import User from "./User.js";
import db from "../database/db.js"; // Importa todo el objeto

const { sequelize } = db; // Extrae sequelize del objeto

const Cost = sequelize.define(
  "Cost",
  {
    cost_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "cost_id",
    },
    amount: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(600),
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
    tableName: "cost",
    timestamps: false,
  }
);

export default Cost;
