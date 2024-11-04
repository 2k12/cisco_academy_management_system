// models/ParticipantInfoUtn.js
import { DataTypes } from "sequelize";
import User from "./User.js"; // Si es quien crea las relaciones
import db from "../database/db.js";
import Cost from "./Cost.js";
import Detail from "./Detail.js";

const { sequelize } = db;

const DetailCost = sequelize.define(
  "DetailCost",
  {
    detail_cost_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    detail_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Detail,
        key: "detail_id",
      },
    },
    cost_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Cost,
        key: "cost_id",
      },
    },
    created_by: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  },
  {
    tableName: "detailcost",
    timestamps: false,
  }
);

export default DetailCost;
