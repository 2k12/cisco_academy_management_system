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
      return res
        .status(400)
        .json({ message: "El curso especificado no existe." });
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

// export const updateParticipant = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { course_id } = req.body;

//     const participant = await Participant.findByPk(id);

//     if (!participant) {
//       return res.status(404).json({ message: notifications.participante.p5 });
//     }

//     if (Object.keys(req.body).length === 0) {
//       return res.status(400).json({ message: notifications.principal.p2 });
//     }

//     const updatedFields = {};

//     for (const field in req.body) {
//       if (Participant.rawAttributes[field]) {
//         updatedFields[field] = req.body[field];
//       }
//     }

//     if (Object.keys(updatedFields).length > 0) {
//       await participant.update(updatedFields);
//     }

//     if (course_id) {
//       const existingRelation = await CourseParticipant.findOne({
//         where: {
//           course_id: course_id,
//           participant_id: participant.participant_id,
//         },
//       });

//       if (existingRelation) {
//         await existingRelation.update({
//           course_id,
//           participant_id: participant.participant_id,
//         });
//       } else {
//         await CourseParticipant.create({
//           course_id,
//           participant_id: participant.participant_id,
//         });
//       }
//     }

//     return res
//       .status(200)
//       .json({ message: notifications.participante.p2, participant });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: notifications.principal.p1, error });
//   }
// };

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
          where: { detail_id: { [Op.col]: 'Detail.detail_id' } }, // Incluye solo el curso relacionado con este detalle
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
