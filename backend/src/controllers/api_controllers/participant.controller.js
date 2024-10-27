import Payment from "../../models/Payment.js";
import Participant from "../../models/Participant.js";
import PaymentType from "../../models/PaymentType.js";
import notifications from "../../notifications.json" assert { type: "json" };
import { Op } from "sequelize";
import ParticipantType from "../../models/ParticipantType.js";
import InfoUtn from "../../models/InfoUtn.js";

// export const addPayment = async (req, res) => {
//   try {
//     const { description, amount, payment_type_id, participant_id } = req.body;

//     const paymentTypeExists = await PaymentType.findOne({ where: { name } });
//     if (paymentTypeExists) {
//       return res.status(400).json({ message: notifications.tipo_pago.tp1 });
//     }

//     const newPayment = await Payment.create({
//       description,
//       amount,
//       payment_type_id,
//     });

//     await ParticipantPayment.create({
//       participant_id: participant_id,
//       payment_id: newPayment.payment_id,
//     });

//     return res
//       .status(201)
//       .json({ message: notifications.pago.p4, payment: newPayment });
//   } catch (error) {
//     return res.status(500).json({ message: notifications.principal.p1, error });
//   }
// };

export const getParticipants = async (req, res) => {
  try {
    const { search = "", limit = 10, page = 1 } = req.body; // Recibiendo search, limit y page
    const offset = (page - 1) * limit; // Cálculo de offset para paginación

    const participants = await Participant.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { age: { [Op.like]: `%${search}%` } },
          { cid: { [Op.like]: `%${search}%` } },
          { phone: { [Op.like]: `%${search}%` } },
          { address: { [Op.like]: `%${search}%` } },
          { total_payment: { [Op.like]: `%${search}%` } },
        ],
      },
      include: [
        { model: ParticipantType },
        { model: InfoUtn },
        {
          model: Payment,
          through: { attributes: [] }, // Excluye los campos de la tabla intermedia
          include: [
            {
              model: PaymentType,
            },
          ],
        },
      ],
      limit: limit, // Tamaño de la página
      offset: offset, // Desplazamiento para la paginación
    });

    return res.status(200).json({
      total: participants.count, // Total de resultados
      totalPages: Math.ceil(participants.count / limit), // Total de páginas
      participants: participants.rows, // Resultados de permisos
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

// export const getPaymentById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const payment = await Payment.findByPk(id);

//     if (!payment) {
//       return res.status(404).json({ message: notifications.pago.p5 });
//     }
//     return res.status(200).json(payment);
//   } catch (error) {
//     return res.status(500).json({ message: notifications.principal.p1, error });
//   }
// };

// ! hay que agregar la logica para eliminar la relacion porque 
// export const deletePayment = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const payment = await Payment.findByPk(id);
//     if (!payment) {
//       return res.status(404).json({ message: notifications.pago.p1 });
//     }

//     await payment.destroy();

//     return res.status(200).json({ message: notifications.pago.p3 });
//   } catch (error) {
//     return res.status(500).json({ message: notifications.principal.p1, error });
//   }
// };

// export const updatePayment = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { participant_id, payment_type_id } = req.body;

//     const payment = await Payment.findByPk(id);

//     if (!payment) {
//       return res.status(404).json({ message: notifications.pago.p5 });
//     }

//     if (Object.keys(req.body).length === 0) {
//       return res.status(400).json({ message: notifications.principal.p2 });
//     }

//     const updatedFields = {};

//     // Actualizar solo los campos válidos del modelo Payment
//     for (const field in req.body) {
//       if (Payment.rawAttributes[field]) {
//         updatedFields[field] = req.body[field];
//       }
//     }

//     // Si hay campos para actualizar, ejecuta la actualización en Payment
//     if (Object.keys(updatedFields).length > 0) {
//       await payment.update(updatedFields);
//     }

//     // Actualizar la relación en ParticipantPayment si se proporcionan `participant_id` y `payment_type_id`
//     if (participant_id && payment_type_id) {
//       const existingRelation = await ParticipantPayment.findOne({
//         where: {
//           participant_id: participant_id,
//           payment_type_id: payment_type_id,
//         },
//       });

//       if (existingRelation) {
//         // Actualiza la relación existente
//         await existingRelation.update({ participant_id, payment_type_id });
//       } else {
//         // Crea una nueva relación si no existe
//         await ParticipantPayment.create({
//           participant_id: participant_id,
//           payment_type_id: payment_type_id,
//         });
//       }
//     }

//     return res.status(200).json({ message: notifications.tema.t2, payment });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: notifications.principal.p1, error });
//   }
// };

export const getParticipantsDropdown = async (req, res) => {
  try {
    const participants = await Participant.findAll({
      attributes: ["participant_id", "name"],
    });
    res.json({ participants: participants });
  } catch (error) {
    res.status(500).json({ message: notifications.principal.p1 });
  }
};
