// models/CourseParticipant.js
import { DataTypes } from "sequelize";
import Course from './Course.js';
import User from './User.js';
import db from '../database/db.js';  // Importa todo el objeto
import Participant from "./Participant.js";

const { sequelize } = db;  // Extrae sequelize del objeto


const CourseParticipant = sequelize.define(
  "CourseParticipant",
  {
    course_participant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    course_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Course,
        key: "course_id",
      },
      allowNull: false,
    },
    participant_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Participant,
        key: "participant_id",
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
    tableName: "course_participant",
    timestamps: false,
  }
);

export default CourseParticipant;
