// models/ParticipantInfoUtn.js
import { DataTypes } from 'sequelize';
import Participant from './Participant.js';
import InfoUtn from './InfoUtn.js';
import User from './User.js'; // Si es quien crea las relaciones
import db from '../database/db.js';

const { sequelize } = db;

const ParticipantInfoUtn = sequelize.define(
  'ParticipantInfoUtn',
  {
    participant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Participant,
        key: 'participant_id',
      },
    },
    info_utn_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: InfoUtn,
        key: 'info_utn_id',
      },
    },
    created_by: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
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
    tableName: 'participant_info_utn',
    timestamps: false,
  }
);

export default ParticipantInfoUtn;
