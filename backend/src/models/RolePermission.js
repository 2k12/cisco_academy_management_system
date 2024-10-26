import { DataTypes } from 'sequelize';
import Role from './Role.js';
import Permission from './Permission.js';
import User from './User.js';
import db from '../database/db.js';  // Importa todo el objeto

const { sequelize } = db;  // Extrae sequelize del objeto

const RolePermission = sequelize.define('RolePermission', {
  role_permission_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: 'role_id'
    }
  },
  permission_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Permission,
      key: 'permission_id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
    field: 'updated_at'
  },
  createdBy: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    field: 'created_by'
  }
}, {
  tableName: 'role_permission',
  timestamps: false
});

export default RolePermission;
