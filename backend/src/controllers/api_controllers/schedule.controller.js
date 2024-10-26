import Schedule from "../../models/Schedule.js";
import notifications from "../../notifications.json" assert { type: "json" };
import { Op } from "sequelize";

export const addSchedule = async (req, res) => {
  try {
    const { days, start_time, end_time } = req.body;

    const newSchedule = await Schedule.create({
      days,
      start_time,
      end_time,
    });

    return res
      .status(201)
      .json({ message: notifications.horario.h4, schedule: newSchedule });
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const getSchedule = async (req, res) => {
  try {
    const { search = "", limit = 10, page = 1 } = req.body; // Recibiendo search, limit y page
    const offset = (page - 1) * limit; // Cálculo de offset para paginación

    const schedules = await Schedule.findAndCountAll({
      where: {
        [Op.or]: [
          { start_time: { [Op.like]: `%${search}%` } },
          { end_time: { [Op.like]: `%${search}%` } },
          // { description: { [Op.like]: `%${search}%` } },
          // Puedes agregar más columnas aquí si es necesario
        ],
      },
      limit: limit, // Tamaño de la página
      offset: offset, // Desplazamiento para la paginación
    });

    return res.status(200).json({
      total: schedules.count, // Total de resultados
      totalPages: Math.ceil(schedules.count / limit), // Total de páginas
      schedules: schedules.rows, // Resultados de permisos
    });
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const getScheduleById = async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await Schedule.findByPk(id);

    if (!schedule) {
      return res.status(404).json({ message: notifications.horario.h5 });
    }
    return res.status(200).json(schedule);
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar y eliminar el usuario
    const schedule = await Schedule.findByPk(id);
    if (!schedule) {
      return res.status(404).json({ message: notifications.horario.h5 });
    }

    await schedule.destroy();

    return res.status(200).json({ message: notifications.horario.h3 });
  } catch (error) {
    return res
      .status(500)
      .json({ message: notifications.principal.p1 , error });
  }
};

export const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await Schedule.findByPk(id);

    if (!schedule) {
      return res.status(404).json({ message: notifications.horario.h5 });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: notifications.principal.p2 });
    }

    const updatedFields = {};

    for (const field in req.body) {
      if (Schedule.rawAttributes[field]) {
        updatedFields[field] = req.body[field];
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ message: notifications.principal.p2 });
    }

    await schedule.update(updatedFields);

    return res
      .status(200)
      .json({ message: notifications.horario.h2, schedule });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};
