import { DataTypes } from 'sequelize';
import User from './User.js';
import db from '../database/db.js';  // Importa todo el objeto

const { sequelize } = db;  // Extrae sequelize del objeto

const Certificate = sequelize.define('Certificate', {
  certificate_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'certificate_id',
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,  // Si es requerido, lo indicas así
  },
  year_of_issue: {
    type: DataTypes.INTEGER,  // Año de emisión se guarda como entero
    allowNull: false,
  },
  is_international: {
    type: DataTypes.BOOLEAN,  // Tipo de dato BOOLEAN
    allowNull: false,
  },
  file_url: {
    type: DataTypes.STRING(255),
    allowNull: true,  // Puede ser nulo si no es obligatorio
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
  tableName: 'certificate',
  timestamps: false,  // Si quieres que Sequelize maneje los timestamps, cambia esto a `true`
});

export default Certificate;
