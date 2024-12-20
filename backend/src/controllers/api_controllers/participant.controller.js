import Payment from "../../models/Payment.js";
import Participant from "../../models/Participant.js";
import PaymentType from "../../models/PaymentType.js";
import ParticipantType from "../../models/ParticipantType.js";
import InfoUtn from "../../models/InfoUtn.js";
import CourseParticipant from "../../models/CourseParticipant.js";
import Detail from "../../models/Detail.js";
import DetailValues from "../../models/DetailValues.js";
import Instructor from "../../models/Instructor.js";
import Certificate from "../../models/Certificate.js";
import Modality from "../../models/Modality.js";
import Schedule from "../../models/Schedule.js";
import Course from "../../models/Course.js";

import { mainEcuadorianCid } from "../../middlewares/validateCid.js";
import notifications from "../../notifications.json" assert { type: "json" };
import { Op } from "sequelize";
import XLSX from "xlsx";

export const addParticipant = async (req, res) => {
  try {
    const {
      name,
      age,
      cid,
      phone,
      address,
      institution,
      participant_type_id,
      certificate_required,
      file_url,
      registered,
      enrolled,
      approval,
      total_payment,
      course_id,
    } = req.body;

    if (mainEcuadorianCid(cid)) {
      const participantExists = await Participant.findOne({ where: { cid } });
      if (participantExists) {
        return res.status(400).json({ message: notifications.participante.p1 });
      }
      const newParticipant = await Participant.create({
        name,
        age,
        cid,
        phone,
        address,
        institution,
        participant_type_id,
        certificate_required,
        file_url,
        registered,
        enrolled,
        approval,
        total_payment,
        active: 1,
      });

      const courseExist = await Course.findOne({
        where: { course_id },
        include: [
          {
            model: Detail,
            include: [
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
              { model: Modality, through: { attributes: [] } },
              { model: Schedule, through: { attributes: [] } },
            ],
          },
        ],
      });

      if (courseExist) {
        console.log("curso encontrado");
        const detailToUpdate = courseExist.Detail; // Supongo que hay un detalle asociado
        console.log(detailToUpdate);
        // Actualizar campos en `Detail` según los valores de `Participant`
        // if (approval === 1) {
        //   await detailToUpdate.update({ approval: updateAttribute(detailToUpdate.approval) });
        // }

        if (enrolled) {
          console.log("matriculado");
          await detailToUpdate.update({
            num_enrolled: updateAttribute(detailToUpdate.num_enrolled, 1),
          });
        }

        if (registered) {
          console.log("registrado");
          await detailToUpdate.update({
            num_registered: updateAttribute(detailToUpdate.num_registered, 1),
          });
        }
      }

      await CourseParticipant.create({
        course_id,
        participant_id: newParticipant.participant_id,
      });

      return res.status(201).json({
        message: notifications.participante.p4,
        participant: newParticipant,
      });
    } else {
      return res.status(400).json({ message: notifications.participante.p5 });
    }
  } catch (error) {
    console.log(`error ${error}`);
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const addParticipantIntern = async ({
  name,
  age,
  cid,
  phone,
  address,
  institution,
  participant_type_id,
  certificate_required,
  file_url,
  registered,
  enrolled,
  approval,
  total_payment,
  course_id,
}) => {
  try {
    if (mainEcuadorianCid(cid)) {
      const participantExists = await Participant.findOne({ where: { cid } });
      if (participantExists) {
        // console.log(participantExists);
        return {
          success: false,
          message: notifications.principal.p4,
          // error: error.message,
        };

        // return res.status(400).json({ message: notifications.participante.p1 });
      }

      const newParticipant = await Participant.create({
        name,
        // age,
        cid,
        phone,
        address,
        institution,
        participant_type_id,
        certificate_required,
        file_url,
        registered,
        enrolled,
        approval,
        total_payment,
        active: 1,
      });

      const courseExist = await Course.findOne({
        where: { course_id },
        include: [
          {
            model: Detail,
            include: [
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
              { model: Modality, through: { attributes: [] } },
              { model: Schedule, through: { attributes: [] } },
            ],
          },
        ],
      });

      if (courseExist) {
        console.log("Curso encontrado");
        const detailToUpdate = courseExist.Detail;

        if (enrolled) {
          console.log("Matriculado");
          await detailToUpdate.update({
            num_enrolled: updateAttribute(detailToUpdate.num_enrolled, 1),
          });
        }

        if (registered) {
          console.log("Registrado");
          await detailToUpdate.update({
            num_registered: updateAttribute(detailToUpdate.num_registered, 1),
          });
        }
      }

      await CourseParticipant.create({
        course_id,
        participant_id: newParticipant.participant_id,
      });

      return {
        success: true,
        message: notifications.participante.p4,
        participant: newParticipant,
      };
    } else {
      return {
        success: false,
        message: notifications.principal.p5,
      };
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return {
      success: false,
      message: notifications.principal.p1,
    };
  }
};

export const updateParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const { course_id } = req.body;

    const participant = await Participant.findByPk(id);

    if (!participant) {
      return res.status(404).json({ message: notifications.participante.p5 });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: notifications.principal.p2 });
    }

    const updatedFields = {};

    for (const field in req.body) {
      if (Participant.rawAttributes[field]) {
        updatedFields[field] = req.body[field];
      }
    }

    if (Object.keys(updatedFields).length > 0) {
      await participant.update(updatedFields);
    }

    if (course_id) {
      const existingRelation = await CourseParticipant.findOne({
        where: {
          course_id: course_id,
          participant_id: participant.participant_id,
        },
      });

      if (existingRelation) {
        // await existingRelation.update({
        //   course_id,
        //   participant_id: participant.participant_id,
        // });
        return res
          .status(400)
          .json({ message: "Ya existe un registro en el Curso Seleccionado" });
      } else {
        await CourseParticipant.create({
          course_id,
          participant_id: participant.participant_id,
        });
      }
    }

    return res
      .status(200)
      .json({ message: notifications.participante.p2, participant });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

// export const updateParticipant = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { course_id, enrolled, registered} = req.body;

//     const participant = await Participant.findByPk(id);
//     if (!participant) {
//       return res.status(404).json({ message: notifications.participante.p5 });
//     }

//     if (Object.keys(req.body).length === 0) {
//       return res.status(400).json({ message: notifications.principal.p2 });
//     }

//     // Recuperar el curso anterior si existe
//     const previousCourseRelation = await CourseParticipant.findOne({
//       where: { participant_id: id },
//     });

//     if (
//       previousCourseRelation &&
//       previousCourseRelation.course_id !== course_id
//     ) {
//       // Buscar el curso anterior y actualizar sus contadores
//       const previousCourse = await Course.findOne({
//         where: { course_id: previousCourseRelation.course_id },
//         include: [{ model: Detail }],
//       });

//       if (previousCourse) {
//         const detailToUpdate = previousCourse.Detail;

//         if (enrolled) {
//           await detailToUpdate.update({
//             num_enrolled: updateAttribute(detailToUpdate.num_enrolled, 0),
//           });
//         }
//         if (registered) {
//           await detailToUpdate.update({
//             num_registered: updateAttribute(detailToUpdate.num_registered, 0),
//           });
//         }
//       }
//     }

//     // Actualizar campos del participante
//     const updatedFields = {};
//     for (const field in req.body) {
//       if (Participant.rawAttributes[field]) {
//         updatedFields[field] = req.body[field];
//       }
//     }

//     if (Object.keys(updatedFields).length > 0) {
//       await participant.update(updatedFields);
//     }

//     // Crear o actualizar la relación con el nuevo curso
//     if (course_id) {
//       const existingRelation = await CourseParticipant.findOne({
//         where: {
//           course_id,
//           participant_id: participant.participant_id,
//         },
//       });

//       if (!existingRelation) {
//         await CourseParticipant.create({
//           course_id,
//           participant_id: participant.participant_id,
//         });
//       }
//     }

//     // Sumar contadores en el nuevo curso
//     const newCourse = await Course.findOne({
//       where: { course_id },
//       include: [{ model: Detail }],
//     });

//     if (newCourse) {
//       const detailToUpdate = newCourse.Detail;

//       if (enrolled) {
//         await detailToUpdate.update({
//           num_enrolled: updateAttribute(detailToUpdate.num_enrolled, 1),
//         });
//       }

//       if (registered) {
//         await detailToUpdate.update({
//           num_registered: updateAttribute(detailToUpdate.num_registered, 1),
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

function updateAttribute(attribute, operation) {
  return operation === 0 ? attribute - 1 : attribute + 1;
}

// export const getParticipants = async (req, res) => {
//   try {
//     const { search = "", limit = 10, page = 1 } = req.body; // Recibiendo search, limit y page
//     const offset = (page - 1) * limit; // Cálculo de offset para paginación

//     const participants = await Participant.findAndCountAll({
//       where: {
//         [Op.or]: [
//           { name: { [Op.like]: `%${search}%` } },
//           { age: { [Op.like]: `%${search}%` } },
//           { cid: { [Op.like]: `%${search}%` } },
//           { phone: { [Op.like]: `%${search}%` } },
//           { address: { [Op.like]: `%${search}%` } },
//           { total_payment: { [Op.like]: `%${search}%` } },
//         ],
//       },
//       include: [
//         {
//           model: Course,
//           through: { attributes: [] },
//           // where: { course_name: { [Op.like]: `%${search}%` } },
//         },
//         // {
//         //   model: Course,
//         //   through: { attributes: [] },
//         //   where: search ? { course_name: { [Op.like]: `%${search}%` } } : undefined,
//         // },
//         { model: ParticipantType },
//         { model: InfoUtn, through: { attributes: [] } },
//         {
//           model: Payment,
//           through: { attributes: [] }, // Excluye los campos de la tabla intermedia
//           include: [
//             {
//               model: PaymentType,
//             },
//           ],
//         },
//       ],
//       limit: limit, // Tamaño de la página
//       offset: offset, // Desplazamiento para la paginación
//     });

//     return res.status(200).json({
//       total: participants.count, // Total de resultados
//       totalPages: Math.ceil(participants.count / limit), // Total de páginas
//       participants: participants.rows, // Resultados de permisos
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: notifications.principal.p1, error });
//   }
// };

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

export const getParticipants = async (req, res) => {
  try {
    const { search = "", limit = 10, page = 1, courseName } = req.body; // Agregado el parámetro `courseName`
    const offset = (page - 1) * limit; // Cálculo de offset para paginación

    // Se construye la condición WHERE para los participantes

    console.log(courseName);
    console.log(req.body);

    const whereConditions = {
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        // { age: { [Op.like]: `%${search}%` } },
        { cid: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } },
        { address: { [Op.like]: `%${search}%` } },
        { total_payment: { [Op.like]: `%${search}%` } },
      ],
    };

    // Condición para filtrar el curso por nombre
    const courseCondition = courseName
      ? { course_name: { [Op.like]: `%${courseName}%` } } // Buscar cursos que coincidan con `courseName`
      : {};

    const participants = await Participant.findAndCountAll({
      where: whereConditions,
      include: [
        {
          model: Course,
          through: { attributes: [] },
          where: courseCondition, // Aplicamos el filtro para el nombre del curso
          required: true, // Aseguramos que solo se devuelvan participantes que tengan un curso
        },
        { model: ParticipantType },
        { model: InfoUtn, through: { attributes: [] } },
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

export const addfromExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ error: "No se ha proporcionado un archivo" });
    }

    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json(sheet);

    let results = [];
    for (const row of data) {
      try {
        const participantData = {
          name: row.Nombre,
          // age: row.Edad,
          cid: row.CI,
          phone: row.Teléfono,
          address: row.Dirección,
          institution: row.Institución,
          participant_type_id: row.TipoID,
          certificate_required: row.Certificado === "Sí" ? true : false,
          file_url: null,
          registered: row.Registrado === "Sí" ? 1 : 0,
          enrolled: row.Matriculado === "Sí" ? 1 : 0,
          approval: row.Aprobado === "Sí" ? 1 : 0,
          total_payment: row.PagoTotal || 0,
          course_id: row.CursoID,
        };

        let result = await addParticipantIntern(participantData);
        if (result.success) {
          results.push({ cid: row.CI, success: true, message: result.message });
        } else {
          results = [];
        }
      } catch (error) {
        // return res.status(200).json({
        //   message: `Error registrando participante con CI ${row.CI}:`,
        // });
        results = [];
        // results.push({ cid: row.CI, success: false, message: error.message });
      }
    }
    console.log(results);
    if (results.length == 0) {
      return res.status(400).json({
        message: "Error en la carga de los Nuevos Participantes!",
        participants: results,
      });
    }
    return res.status(200).json({
      message: "Archivo procesado correctamente",
      participants: results,
    });
  } catch (error) {
    console.error("Error procesando el archivo:", error);
    return res.status(500).json({ error: "Error procesando el archivo" });
  }
};

function validateCid(cid) {
  if (cid.length == 10) {
    var digito_region = cid.substring(0, 2);

    if (digito_region >= 1 && digito_region <= 24) {
      var ultimo_digito = cid.substring(9, 10);

      var pares =
        parseInt(cid.substring(1, 2)) +
        parseInt(cid.substring(3, 4)) +
        parseInt(cid.substring(5, 6)) +
        parseInt(cid.substring(7, 8));

      var numero1 = cid.substring(0, 1);
      var numero1 = numero1 * 2;
      if (numero1 > 9) {
        var numero1 = numero1 - 9;
      }

      var numero3 = cid.substring(2, 3);
      var numero3 = numero3 * 2;
      if (numero3 > 9) {
        var numero3 = numero3 - 9;
      }

      var numero5 = cid.substring(4, 5);
      var numero5 = numero5 * 2;
      if (numero5 > 9) {
        var numero5 = numero5 - 9;
      }

      var numero7 = cid.substring(6, 7);
      var numero7 = numero7 * 2;
      if (numero7 > 9) {
        var numero7 = numero7 - 9;
      }

      var numero9 = cid.substring(8, 9);
      var numero9 = numero9 * 2;
      if (numero9 > 9) {
        var numero9 = numero9 - 9;
      }

      var impares = numero1 + numero3 + numero5 + numero7 + numero9;

      var suma_total = pares + impares;

      var primer_digito_suma = String(suma_total).substring(0, 1);

      var decena = (parseInt(primer_digito_suma) + 1) * 10;

      var digito_validador = decena - suma_total;

      if (digito_validador == 10) var digito_validador = 0;

      if (digito_validador == ultimo_digito) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return 2;
    }
  } else {
    return 3;
  }
}

// ! ______________________________________________
