import PaymentType from "../../models/PaymentType.js";
import notifications from "../../notifications.json" assert { type: "json" };

export const addPaymentType = async (req, res) => {
  try {
    const { name } = req.body;

    const paymentTypeExists = await PaymentType.findOne({ where: { name } });
    if (paymentTypeExists) {
      return res.status(400).json({ message: notifications.tipo_pago.tp1 });
    }

    const newPaymentType = await PaymentType.create({
      name,
    });

    return res
      .status(201)
      .json({ message: notifications.tipo_pago.tp4, payment_type: newPaymentType });
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const getPaymentType = async (req, res) => {
  try {
    const payment_type = await PaymentType.findAll();
    return res.status(200).json(payment_type);
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
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

// export const inactiveRole = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Buscar y eliminar el usuario
//     const user = await User.findByPk(id);
//     if (!user) {
//       return res.status(404).json({ message: "Usuario no encontrado" });
//     }

//     await user.destroy();

//     return res.status(200).json({ message: "Usuario eliminado exitosamente" });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Error al eliminar el usuario", error });
//   }
// };

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
    const payment_type = await User.findAll({
      attributes: ["payment_type_id", "name"],
    });
    res.json({ payment_type: payment_type });
  } catch (error) {
    res.status(500).json({ message: notifications.principal.p1 });
  }
};