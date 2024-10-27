import PaymentType from "../../models/PaymentType.js";
import notifications from "../../notifications.json" assert { type: "json" };
import { Op } from "sequelize";


export const addPaymentType = async (req, res) => {
  try {
    const { name } = req.body;

    const paymentTypeExists = await PaymentType.findOne({ where: { name } });
    if (paymentTypeExists) {
      return res.status(400).json({ message: notifications.tipo_pago.tp1 });
    }

    const newPaymentType = await PaymentType.create({
      name
    });

    return res
      .status(201)
      .json({ message: notifications.tipo_pago.tp4, payment_type: newPaymentType });
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};


export const getPaymentTypes = async (req, res) => {
  try {
    const { search = "", limit = 10, page = 1 } = req.body; // Recibiendo search, limit y page
    const offset = (page - 1) * limit; // Cálculo de offset para paginación

    const payment_types = await PaymentType.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          // { status: { [Op.like]: `%${search}%` } },
          // Puedes agregar más columnas aquí si es necesario
        ],
      },
      limit: limit, // Tamaño de la página
      offset: offset, // Desplazamiento para la paginación
    });

    return res.status(200).json({
      total: payment_types.count, // Total de resultados
      totalPages: Math.ceil(payment_types.count / limit), // Total de páginas
      payment_types: payment_types.rows, // Resultados de permisos
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: notifications.principal.p1, error });
  }
};

export const getPaymentTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment_type = await PaymentType.findByPk(id);

    if (!payment_type) {
      return res.status(404).json({ message: notifications.tipo_pago.tp5 });
    }
    return res.status(200).json(payment_type);
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const deletePaymentType = async (req, res) => {
  try {
    const { id } = req.params;

    const payment_type = await PaymentType.findByPk(id);
    if (!payment_type) {
      return res.status(404).json({ message: notifications.tipo_pago.tp1 });
    }

    await payment_type.destroy();

    return res.status(200).json({ message: notifications.tipo_pago.tp3 });
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};


export const updatePaymentType = async (req, res) => {
  try {
    const { id } = req.params;
    const payment_type = await PaymentType.findByPk(id);

    if (!payment_type) {
      return res.status(404).json({ message: notifications.tipo_pago.tp5 });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: notifications.principal.p2 });
    }

    const updatedFields = {};

    for (const field in req.body) {
      if (PaymentType.rawAttributes[field]) {
        updatedFields[field] = req.body[field];
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ message: notifications.principal.p2 });
    }

    await payment_type.update(updatedFields);

    return res
      .status(200)
      .json({ message: notifications.tipo_pago.tp2, payment_type });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};


export const getPaymetnTypesDropdown = async (req, res) => {
  try {
    const payment_types = await PaymentType.findAll({
      attributes: ["payment_type_id", "name"],
    });
    res.json({ payment_types: payment_types });
  } catch (error) {
    res.status(500).json({ message: notifications.principal.p1 });
  }
};