import ParticipantType from "../../models/ParticipantType.js";
import notifications from "../../notifications.json" assert { type: "json" };
import { Op } from "sequelize";

export const addParticipantType = async (req, res) => {
  try {
    const { name } = req.body;
    const status = "Inactivo";
    const ParticipantTypeExists = await ParticipantType.findOne({
      where: { name },
    });
    if (ParticipantTypeExists) {
      return res
        .status(400)
        .json({ message: notifications.tipo_participante.tp1 });
    }

    const newParticipantType = await ParticipantType.create({
      name,
      status,
    });

    return res
      .status(201)
      .json({
        message: notifications.tipo_participante.tp4,
        participant_type: newParticipantType,
      });
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const getParticipantTypes = async (req, res) => {
  try {
    const { search = "", limit = 10, page = 1 } = req.body; // Recibiendo search, limit y page
    const offset = (page - 1) * limit; // Cálculo de offset para paginación

    const participant_types = await ParticipantType.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { status: { [Op.like]: `%${search}%` } },
          // Puedes agregar más columnas aquí si es necesario
        ],
      },
      limit: limit, // Tamaño de la página
      offset: offset, // Desplazamiento para la paginación
    });

    return res.status(200).json({
      total: participant_types.count, // Total de resultados
      totalPages: Math.ceil(participant_types.count / limit), // Total de páginas
      participant_types: participant_types.rows, // Resultados de permisos
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: notifications.tipo_participante.tp1, error });
  }
};

export const getParticipantTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const participant_type = await ParticipantType.findByPk(id);

    if (!participant_type) {
      return res
        .status(404)
        .json({ message: notifications.tipo_participante.tp5 });
    }
    return res.status(200).json(participant_type);
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const inactiveParticipantType = async (req, res) => {
  try {
    const { id } = req.params;
    const participant_type = await ParticipantType.findByPk(id);
    let status = "";
    if (!participant_type) {
      return res.status(404).json({ message: notifications.tipo_participante.tp5 });
    }

    if (participant_type.status == "Activo") {
      status = "Inactivo";
    } else {
      status = "Activo";
    }
    // Cambiar el estado a 'Inactivo'
    await participant_type.update({ status: status });

    return res
      .status(200)
      .json({ message: notifications.tipo_participante.tp3, participant_type });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: notifications.tipo_participante.tp1, error });
  }
};

export const updateParticipantType = async (req, res) => {
  try {
    const { id } = req.params;
    const participant_type = await ParticipantType.findByPk(id);

    if (!participant_type) {
      return res
        .status(404)
        .json({ message: notifications.tipo_participante.tp5 });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: notifications.principal.p2 });
    }

    const updatedFields = {};

    for (const field in req.body) {
      if (ParticipantType.rawAttributes[field]) {
        updatedFields[field] = req.body[field];
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ message: notifications.principal.p2 });
    }

    await participant_type.update(updatedFields);

    return res
      .status(200)
      .json({ message: notifications.tipo_participante.tp2 , participant_type });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const getParticipantTypesDropdown = async (req, res) => {
  try {
    const participant_types = await ParticipantType.findAll({
      attributes: ["participant_type_id", "name"],
    });
    res.json({ participant_types: participant_types });
  } catch (error) {
    res.status(500).json({ message: notifications.principal.p1 });
  }
};