import { DataTypes } from "sequelize";
import User from './User.js';
import db from '../database/db.js';

const { sequelize } = db;

const DetailValues = sequelize.define(
  "DetailValues",
  {
    detail_value_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      field: "total_amount",
    },
    instructor_payment: {
      type: DataTypes.DECIMAL(10, 2),
      field: "instructor_payment",
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
    tableName: "detailvalues", 
    timestamps: true,
  }
);


export default DetailValues;
