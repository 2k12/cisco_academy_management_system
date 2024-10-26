import InfoUtn from "../../models/InfoUtn.js";
import notifications from "../../notifications.json" assert { type: "json" };
import { Op } from "sequelize";

export const addInfoUtn = async (req, res) => {
  try {
    const { faculty, degree, degree_level } = req.body;

    if (degree_level < 0 && degree_level > 8) {
        return res.status(400).json({ message: notifications.tema.t6 });
    }

    const newInfoUtn = await InfoUtn.create({
      faculty,
      degree,
      degree_level,
    });

    return res
      .status(201)
      .json({ message: notifications.info_utn.iu4, info_utn: newInfoUtn });
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const getInfosUtn = async (req, res) => {
  try {
    const { search = "", limit = 10, page = 1 } = req.body; // Recibiendo search, limit y page
    const offset = (page - 1) * limit; // Cálculo de offset para paginación
    const infos_utn = await InfoUtn.findAndCountAll({
      where: {
        [Op.or]: [
          { faculty: { [Op.like]: `%${search}%` } },
          { degree: { [Op.like]: `%${search}%` } },
          { degree_level: { [Op.like]: `%${search}%` } },
        ],
      },
      limit: limit, // Tamaño de la página
      offset: offset, // Desplazamiento para la paginación
    });
    return res.status(200).json({
      total: infos_utn.count, // Total de resultados
      totalPages: Math.ceil(infos_utn.count / limit), // Total de páginas
      infos_utn: infos_utn.rows, // Resultados de permisos
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: notifications.principal.p1, error: error.message });
  }
};

export const getInfoUtnById = async (req, res) => {
  try {
    const { id } = req.params;
    const info_utn = await InfoUtn.findByPk(id);

    if (!info_utn) {
      return res.status(404).json({ message: notifications.info_utn.iu5 });
    }
    return res.status(200).json(info_utn);
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const deleteInfoUtn = async (req, res) => {
  try {
    const { id } = req.params;
    const inf_utn = await InfoUtn.findByPk(id);
    if (!inf_utn) {
      return res.status(404).json({ message: notifications.info_utn.iu5 });
    }
    await inf_utn.destroy();
    return res.status(200).json({ message: notifications.info_utn.iu3 });
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const updateInfoUtn = async (req, res) => {
  try {
    const { id } = req.params;
    const info_utn = await InfoUtn.findByPk(id);

    if (!info_utn) {
      return res.status(404).json({ message: notifications.info_utn.iu5 });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: notifications.principal.p2 });
    }

    const updatedFields = {};

    for (const field in req.body) {
      if (InfoUtn.rawAttributes[field]) {
        updatedFields[field] = req.body[field];
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ message: notifications.principal.p2 });
    }

    await info_utn.update(updatedFields);

    return res
      .status(200)
      .json({ message: notifications.info_utn.iu2, info_utn });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};
