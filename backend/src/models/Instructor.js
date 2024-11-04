import { DataTypes } from "sequelize";
import User from "./User.js";
import db from "../database/db.js"; // Importa todo el objeto

const { sequelize } = db; // Extrae sequelize del objeto

const Instructor = sequelize.define(
  "Instructor",
  {
    instructor_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "instructor_id",
    },
    identification_number: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING(255),
    },
    phone: {
        type: DataTypes.STRING(50),
      },
    email: {
      type: DataTypes.STRING(255),
    //   allowNull: false,
      unique: true,
    },
    ruc_number: {
        type: DataTypes.STRING(15),
    },
    cost_per_hour: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: true,
      field: "cost_per_hour",
    },
    banck_certificate_url: {
        type: DataTypes.STRING(255),
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
    tableName: "instructor",
    timestamps: false,
  }
);

export default Instructor;
