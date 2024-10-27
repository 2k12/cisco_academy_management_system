import DetailValues from "../../models/DetailValues.js";
import notifications from "../../notifications.json" assert { type: "json" };
import { Op } from "sequelize";

export const addDetailValues = async (req, res) => {
  try {
    const { total_amount, instructor_payment, balance } = req.body;

    const newDetailValues = await DetailValues.create({
      total_amount,
      instructor_payment,
      balance,
    });

    return res.status(201).json({
      message: notifications.detalle_valores.dv4,
      detail_values: newDetailValues,
    });
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const getDetailValues = async (req, res) => {
  try {
    const { search = "", limit = 10, page = 1 } = req.body; // Recibiendo search, limit y page
    const offset = (page - 1) * limit; // Cálculo de offset para paginación

    const detailValues = await DetailValues.findAndCountAll({
      where: {
        [Op.or]: [
          { total_amount: { [Op.like]: `%${search}%` } },
          { instructor_payment: { [Op.like]: `%${search}%` } },
          // { balance: { [Op.like]: `%${search}%` } },
          // Puedes agregar más columnas aquí si es necesario
        ],
      },
      limit: limit, // Tamaño de la página
      offset: offset, // Desplazamiento para la paginación
    });

    return res.status(200).json({
      total: detailValues.count, // Total de resultados
      totalPages: Math.ceil(detailValues.count / limit), // Total de páginas
      detail_values: detailValues.rows,
    });
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const getDetailValuesById = async (req, res) => {
  try {
    const { id } = req.params;
    const detail_values = await DetailValues.findByPk(id);

    if (!detail_values) {
      return res
        .status(404)
        .json({ message: notifications.detalle_valores.dv5 });
    }
    return res.status(200).json(detail_values);
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const deleteDetailValues = async (req, res) => {
  try {
    const { id } = req.params;

    const detail_value = await DetailValues.findByPk(id);
    if (!detail_value) {
      return res.status(404).json({ message: notifications.detalle_valores.dv5 });
    }

    await detail_value.destroy();

    return res.status(200).json({ message: notifications.detalle_valores.dv3 });
  } catch (error) {
    return res
      .status(500)
      .json({ message: notifications.principal.p1 , error });
  }
};

export const updateDetailValues = async (req, res) => {
  try {
    const { id } = req.params;
    const detail_values = await DetailValues.findByPk(id);
  

    if (!detail_values) {
      return res
        .status(404)
        .json({ message: notifications.detalle_valores.dv5 });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: notifications.principal.p2 });
    }

    const updatedFields = {};

    for (const field in req.body) {
      if (DetailValues.rawAttributes[field]) {
        updatedFields[field] = req.body[field];
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ message: notifications.principal.p2 });
    }

    await detail_values.update(updatedFields);

    return res
      .status(200)
      .json({ message: notifications.detalle_valores.dv2, detail_values });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};
