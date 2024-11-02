// import Payment from "../../models/Payment.js";
// import Participant from "../../models/Participant.js";
// import PaymentType from "../../models/PaymentType.js";
// import ParticipantType from "../../models/ParticipantType.js";
// import InfoUtn from "../../models/InfoUtn.js";
// import CourseParticipant from "../../models/CourseParticipant.js";
import Detail from "../../models/Detail.js";
import DetailValues from "../../models/DetailValues.js";
import Instructor from "../../models/Instructor.js";
import Certificate from "../../models/Certificate.js";
import Modality from "../../models/Modality.js";
import Schedule from "../../models/Schedule.js";
import Course from "../../models/Course.js";

import notifications from "../../notifications.json" assert { type: "json" };
import { Op } from "sequelize";

export const addDetail = async (req, res) => {
  try {
    const {
      course_id,
      instructor_id,
      course_description,
      total_hours,
      cost,
      num_registered,
      num_enrolled,
      num_failed,
      participant_requeriment,
    } = req.body;

    const course = await Course.findOne({ where: { course_id } });
    if (!course) {
      return res.status(400).json({ message: notifications.cursos.c5 });
    }

    if (course.detail_id) {
      return res.status(400).json({ message: notifications.principal.p5 });
    }

    const newDetail = await Detail.create({
      instructor_id,
      course_description,
      total_hours,
      cost,
      num_registered,
      num_enrolled,
      num_failed,
      participant_requeriment,
    });

    if (course) {
      await course.update({
        detail_id: newDetail.detail_id,
      });
    }

    return res.status(201).json({
      message: notifications.detalle.d4,
      detail: newDetail,
    });
  } catch (error) {
    console.log(`error ${error}`);
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const updateDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { course_id, ...fieldsToUpdate } = req.body;

    // Buscar el detalle a actualizar
    const detail = await Detail.findByPk(id);

    if (!detail) {
      return res.status(404).json({ message: notifications.detalle.d5 });
    }

    // Verificar si el cuerpo de la solicitud está vacío
    if (Object.keys(fieldsToUpdate).length === 0 && !course_id) {
      return res.status(400).json({ message: notifications.principal.p2 });
    }

    const updatedFields = {};

    // Filtrar solo los campos que existen en el modelo Detail
    for (const field in fieldsToUpdate) {
      if (Detail.rawAttributes[field]) {
        updatedFields[field] = fieldsToUpdate[field];
      }
    }

    // Preparar las promesas de actualización
    const updatePromises = [];

    // Actualizar los campos de Detail si hay campos válidos
    if (Object.keys(updatedFields).length > 0) {
      updatePromises.push(detail.update(updatedFields));
    }

    // Verificar y actualizar el course_id si existe
    if (course_id) {
      const course = await Course.findOne({ where: { course_id } });

      if (!course) {
        return res.status(400).json({ message: notifications.cursos.c5 });
      }

      if (course.detail_id) {
        return res.status(400).json({ message: notifications.principal.p5 });
      } else {
        // Actualizar course_id en Course
        updatePromises.push(course.update({ detail_id: detail.detail_id }));
      }
    }

    // Ejecutar todas las actualizaciones en paralelo
    await Promise.all(updatePromises);

    return res.status(200).json({ message: notifications.detalle.d2, detail });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const getDetails = async (req, res) => {
  try {
    const { search = "", limit = 10, page = 1 } = req.body;
    const offset = (page - 1) * limit;

    const details = await Detail.findAndCountAll({
      where: {
        [Op.or]: [
          { course_description: { [Op.like]: `%${search}%` } },
          { total_hours: { [Op.like]: `%${search}%` } },
          { cost: { [Op.like]: `%${search}%` } },
          { num_registered: { [Op.like]: `%${search}%` } },
          { num_enrolled: { [Op.like]: `%${search}%` } },
          { num_failed: { [Op.like]: `%${search}%` } },
          { participant_requeriment: { [Op.like]: `%${search}%` } },
        ],
      },
      include: [
        {
          model: Course,
          where: { detail_id: { [Op.col]: "Detail.detail_id" } }, // Incluye solo el curso relacionado con este detalle
        },
        { model: DetailValues },
        {
          model: Instructor,
          include: [
            {
              model: Certificate,
              through: { attributes: [] },
            },
          ],
        },
        {
          model: Modality,
          through: { attributes: [] },
        },
        {
          model: Schedule,
          through: { attributes: [] },
        },
      ],
      limit: limit,
      offset: offset,
    });

    return res.status(200).json({
      total: details.count,
      totalPages: Math.ceil(details.count / limit),
      details: details.rows,
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

export const deleteDetail = async (req, res) => {
  try {
    const { detail_id } = req.params;

    const course = await Course.findOne({ where: { detail_id } });
    if (course) {
      return res.status(404).json({ message: notifications.detalle.d3 });
    }

    const detail = await Detail.findOne({ where: { detail_id } });
    await detail.destroy();

    return res.status(200).json({ message: notifications.detalle.d3 });
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};
