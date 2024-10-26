import { DataTypes } from 'sequelize';
import Instructor from './Instructor.js';
import Certificate from './Certificate.js';
import User from './User.js';
import db from '../database/db.js';  // Importa todo el objeto

const { sequelize } = db;  // Extrae sequelize del objeto

const InstructorCertificate = sequelize.define("InstructorCertificate", {
  instructor_certificate_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  instructor_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Instructor,
      key: 'instructor_id',
    },
    allowNull: false,
  },
  certificate_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Certificate,
      key: 'certificate_id',
    },
    allowNull: false,
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
  tableName: 'instructor_certificate',
  timestamps: false,
});

export default InstructorCertificate;
