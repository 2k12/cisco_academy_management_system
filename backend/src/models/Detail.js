// models/Participant.js
import { DataTypes } from "sequelize";

import User from "./User.js";
import db from "../database/db.js"; // Importa todo el objeto

const { sequelize } = db; // Extrae sequelize del objeto

const Detail = sequelize.define(
  "Detail",
  {
    detail_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    instructor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Instructor", // Usa el nombre del modelo como cadena
        key: "instructor_id",
      },
      field: "instructor_id", // Asegúrate de que el campo sea correcto en la base de datos
    },
    course_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_hours: {
      type: DataTypes.INTEGER,
    },
    instructor_hours: {
      type: DataTypes.INTEGER,
    },
    activities_hours: {
      type: DataTypes.INTEGER,
    },
    // cost: {
    //   type: DataTypes.INTEGER,
    // },
    num_registered: {
      type: DataTypes.INTEGER,
    },
    num_enrolled: {
      type: DataTypes.INTEGER,
    },
    num_failed: {
      type: DataTypes.INTEGER,
    },
    participant_requeriment: {
      type: DataTypes.STRING,
    },
    detail_value_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "DetailValues", // Usa el nombre del modelo como cadena
        key: "detail_value_id",
      },
      field: "detail_value_id", // Asegúrate de que el campo sea correcto en la base de datos
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
    tableName: "detail",
    timestamps: false,
  }
);

export default Detail;
