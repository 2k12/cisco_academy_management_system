import Modality from "../../models/Modality.js";
import notifications from "../../notifications.json" assert { type: "json" };
import { Op } from "sequelize";


export const addModality = async (req, res) => {
  try {
    const { name, description } = req.body;

    const ModalityExists = await Modality.findOne({ where: { name } });
    if (ModalityExists) {
      return res.status(400).json({ message: notifications.modalidad.m1 });
    }

    const newModality = await Modality.create({
      name,
      description,
    });

    return res
      .status(201)
      .json({ message: notifications.modalidad.p4, modality: newModality });
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const getModalities = async (req, res) => {
  try {
    const { search = '', limit = 10, page = 1 } = req.body; // Recibiendo search, limit y page
    const offset = (page - 1) * limit; // Cálculo de offset para paginación

    const modalities = await Modality.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } },
          // Puedes agregar más columnas aquí si es necesario
        ],
      },
      limit: limit, // Tamaño de la página
      offset: offset, // Desplazamiento para la paginación
    });

    return res.status(200).json({
      total: modalities.count, // Total de resultados
      totalPages: Math.ceil(modalities.count / limit), // Total de páginas
      modalities: modalities.rows, // Resultados de permisos
    });
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error: error.message });
  }
};

export const getModalityById = async (req, res) => {
  try {
    const { id } = req.params;
    const modality = await Modality.findByPk(id);

    if (!modality) {
      return res.status(404).json({ message: notifications.modalidad.m5 });
    }
    return res.status(200).json(modality);
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const updateModality = async (req, res) => {
  try {
    const { id } = req.params;
    const modality = await Modality.findByPk(id);

    if (!modality) {
      return res.status(404).json({ message: notifications.modalidad.m5 });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: notifications.principal.p2 });
    }

    const updatedFields = {};

    for (const field in req.body) {
      if (Modality.rawAttributes[field]) {
        updatedFields[field] = req.body[field];
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ message: notifications.principal.p2 });
    }

    await modality.update(updatedFields);

    return res
      .status(200)
      .json({ message: notifications.modalidad.m2, modality });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const deleteModality = async (req, res) => {
  try {
    const { id } = req.params;

    const modality = await Modality.findByPk(id);
    if (!modality) {
      return res.status(404).json({ message: notifications.modalidad.m5 });
    }

    await modality.destroy();

    return res.status(200).json({ message: notifications.modalidad.m3 });
  } catch (error) {
    return res
      .status(500)
      .json({ message: notifications.principal.p1, error });
  }
};

