// models/CourseParticipant.js
import { DataTypes } from "sequelize";
import Detail from './Detail.js';
import User from './User.js';
import Schedule from './Schedule.js';
import db from '../database/db.js';  // Importa todo el objeto

const { sequelize } = db;  // Extrae sequelize del objeto


const DetailSchedule = sequelize.define(
  "DetailSchedule",
  {
    detail_schedule_id: {
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
      allowNull: false,
    },
    schedule_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Schedule,
        key: "schedule_id",
      },
      allowNull: false,
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
    tableName: "detail_schedule",
    timestamps: false,
  }
);

export default DetailSchedule;
