import Course from "../../models/Course.js";
import Cost from "../../models/Cost.js";
import Chapter from "../../models/Chapter.js";

import Participant from "../../models/Participant.js";
import ParticipantType from "../../models/ParticipantType.js";
import Payment from "../../models/Payment.js";
import PaymentType from "../../models/PaymentType.js";
import InfoUtn from "../../models/InfoUtn.js";

import notifications from "../../notifications.json" assert { type: "json" };

import { Op } from "sequelize";
import PDFDocument from "pdfkit";
import path from "path";
import { fileURLToPath } from "url";

import Detail from "../../models/Detail.js";
import DetailValues from "../../models/DetailValues.js";
import Instructor from "../../models/Instructor.js";
import Certificate from "../../models/Certificate.js";
import Modality from "../../models/Modality.js";
import Schedule from "../../models/Schedule.js";

export const getAllCourses = async (req, res) => {
  try {
    const { search = "", limit = 10, page = 1 } = req.body;
    const offset = (page - 1) * limit; 

    const courses = await Course.findAndCountAll({
      where: {
        [Op.or]: [
          { course_name: { [Op.like]: `%${search}%` } }, // Buscar por nombre del curso
          // ! falta establecer las relaciones necesarias para que busque en todas esas columnas
          //   { description: { [Op.like]: `%${search}%` } }, // Buscar por descripción
          //   { '$CourseParticipant.Participant.name$': { [Op.like]: `%${search}%` } }, // Buscar por nombre del participante
          //   { '$CourseParticipant.Participant.InfoUtn.info$': { [Op.like]: `%${search}%` } }, // Buscar en InfoUtn relacionado al participante
          //   { '$CourseDetail.Detail.name$': { [Op.like]: `%${search}%` } }, // Buscar en detalles del curso
          //   { '$Instructor.name$': { [Op.like]: `%${search}%` } }, // Buscar por nombre del instructor
          // Agregar más búsquedas en columnas de relaciones según sea necesario
        ],
      },
      include: [
        {
          model: Chapter,
          through: { attributes: [] },
        },
        {
          model: Participant,
          include: [
            { model: ParticipantType },
            { model: InfoUtn, through: { attributes: [] } },
            {
              model: Payment,
              through: { attributes: [] }, 
              include: [
                {
                  model: PaymentType,
                },
              ],
            },
          ],
        },
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
            {
              model: Modality,
              through: { attributes: [] }, // Excluye los campos de la tabla intermedia
            },
            {
              model: Schedule,
              through: { attributes: [] }, 
            },
            {
              model: Cost,
              through: { attributes: [] }, 
            },
          ],
        },
      ],
      limit, 
      offset, 
      distinct: true, 
    });

    return res.status(200).json({
      total: courses.count, 
      totalPages: Math.ceil(courses.count / limit),
      courses: courses.rows, 
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Error al obtener los cursos",
      error,
    });
  }
};

export const addCourse = async (req, res) => {
  try {
    const {
      course_name,
      start_registration_date,
      end_registration_date,
      start_enrollment_date,
      end_enrollment_date,
      start_date,
      end_date,
      status,
    } = req.body;

    const courseExists = await Course.findOne({ where: { course_name } });

    if (courseExists) {
      return res.status(400).json({ message: notifications.cursos.c1 });
    }

    const newCourse = await Course.create({
      course_name,
      start_registration_date,
      end_registration_date,
      start_enrollment_date,
      end_enrollment_date,
      start_date,
      end_date,
      status,
    });

    return res
      .status(201)
      .json({ message: notifications.cursos.c4, course: newCourse });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: notifications.principal.p1 });
  }
};

// export const getAllCourses = async (req, res) => {
//   try {
//     const users = await Course.findAll();
//     return res.status(200).json(users);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Error al obtener los usuarios", error });
//   }
// };

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk({
      id,
      include: [
        {
          model: Chapter,
          through: { attributes: [] },
        },
        {
          model: Participant,
          include: [
            { model: ParticipantType },
            { model: InfoUtn, through: { attributes: [] } },
            {
              model: Payment,
              through: { attributes: [] }, 
              include: [
                {
                  model: PaymentType,
                },
              ],
            },
          ],
        },
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
            {
              model: Modality,
              through: { attributes: [] }, // Excluye los campos de la tabla intermedia
            },
            {
              model: Schedule,
              through: { attributes: [] }, 
            },
            {
              model: Cost,
              through: { attributes: [] }, 
            },
          ],
        },
      ],
    });

    if (!course) {
      return res.status(404).json({ message: notifications.cursos.c5 });
    }

    return res.status(200).json({ course: course });
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const inactiveCourse = async (req, res) => {
  try {
    const { id } = req.params;
    let status = "";
    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ message: notifications.cursos.c5 });
    }
    if (course.status == "Activo") {
      status = "Inactivo";
    } else {
      status = "Activo";
    }
    await course.update({ status: status });

    return res.status(200).json({ message: notifications.cursos.c3 });
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);

    if (!course) {
      return res.status(404).json({ message: notifications.cursos.c5 });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: notifications.principal.p2 });
    }

    const updatedFields = {};

    for (const field in req.body) {
      if (Course.rawAttributes[field]) {
        updatedFields[field] = req.body[field];
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ message: notifications.principal.p2 });
    }

    await course.update(updatedFields);

    return res.status(200).json({ message: notifications.cursos.c4, course });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const getCoursesDropdown = async (req, res) => {
  try {
    const courses = await Course.findAll({
      attributes: ["course_id", "course_name"],
    });
    res.json({ courses: courses });
  } catch (error) {
    res.status(500).json({ message: notifications.principal.p1 });
  }
};

export const getCertificates = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findOne({
      where: { course_id: id },
      include: [
        {
          model: Participant,
          include: [
            { model: ParticipantType },
            { model: InfoUtn, through: { attributes: [] } },
            {
              model: Payment,
              through: { attributes: [] },
              include: [
                {
                  model: PaymentType,
                },
              ],
            },
          ],
        },
        {
          model: Detail,
          include: [
            { model: DetailValues },
            {
              model: Modality,
              through: { attributes: [] }, 
            },
          ],
        },
      ],
    });
    
    if(course.status != "Finalizado"){
      return res.status(400).json({ message: "El estado del curso debe ser FINALIZADO para poder generar los certificados," });
    }

    if (!course) {
      return res.status(404).json({ message: notifications.cursos.c5 });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="certificado-curso-${id}.pdf"`
    );

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const logoPath = path.resolve(__dirname, "../../assets/cisco_logo.png");
    const logoUtnPath = path.resolve(__dirname, "../../assets/logo_utn.png");

    const doc = new PDFDocument({
      size: "A4",
      layout: "landscape",
      margin: 50,
    });

    doc.pipe(res);

    const primaryColor = "#b3d9ff"; 
    const utnColor = "#f4040c";
    const textColor = "#333333"; 
    const borderWidth = 2;

    course.Participants.forEach((participant) => {
      doc.addPage();

      doc
        .rect(
          borderWidth,
          borderWidth,
          doc.page.width - borderWidth * 2,
          doc.page.height - borderWidth * 2
        )
        .lineWidth(borderWidth)
        .stroke(utnColor);

      // Fondo claro
      // doc
      //   .rect(
      //     borderWidth + 5,
      //     borderWidth + 5,
      //     doc.page.width - (borderWidth + 5) * 2,
      //     doc.page.height - (borderWidth + 5) * 2
      //   )
      // .fillOpacity(0.5)
      // .fill(primaryColor);

      doc.image(logoUtnPath, 40, 25, { width: 100 });
      doc.image(logoPath, doc.page.width - 150, 40, { width: 100 });

      doc
        .fillColor(textColor)
        .font("Helvetica-Bold")
        .fontSize(24)
        .text("UNIVERSIDAD TÉCNICA DEL NORTE", { align: "center" })
        .moveDown(0.5)
        .fontSize(18)
        .text("FACULTAD DE INGENIERÍA EN CIENCIAS APLICADAS", {
          align: "center",
        })
        .moveDown(0.5)
        .text("ACADEMIA CISCO", { align: "center" });

      doc.moveDown(2);

      doc
        .fontSize(20)
        .text("CERTIFICADO", { align: "center" })
        .moveDown(1.5)
        .font("Helvetica")
        .fontSize(16)
        .text("Se otorga el presente certificado a:", { align: "center" })
        .moveDown(1.5);

      doc
        .font("Helvetica-Bold")
        .fontSize(28)
        .text(participant.name.toUpperCase(), { align: "center" })
        .moveDown(1);

      const modality =
        course.Detail.Modalities && course.Detail.Modalities.length > 0
          ? course.Detail.Modalities[0].name
          : "Modalidad no especificada";

      const startDate = new Date(course.start_date).toLocaleDateString(
        "es-ES",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );
      const endDate = new Date(course.end_date).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const totalHours = course.Detail ? course.Detail.total_hours : "N/A";

      doc
        .font("Helvetica")
        .fontSize(14)
        .text(
          `Por haber asistido y aprobado el curso "${course.course_name}", desarrollado en modalidad ${modality} del ${startDate} al ${endDate}, con una duración total de ${totalHours} horas.`,
          { align: "center", lineGap: 6 }
        );
      // .moveDown(1);

      const today = new Date().toLocaleDateString("es-ES");

      doc.moveDown(1);

      doc
      .fontSize(11)
      .text(`Fecha Emisión: ${today}`, {
        align: "right",
      });

      const signatureY = doc.page.height - 120;
      const signatureMargin = 50;

      doc.moveDown(2);

      doc
        .font("Helvetica")
        .fontSize(11)
        .text("______________________", signatureMargin + 200, signatureY, {
          align: "left",
        })
        .text(
          "Coordinador/a Academia Cisco",
          signatureMargin + 190,
          signatureY + 20,
          { align: "left" }
        )
        .moveDown(2);

      doc
        .text(
          "______________________",
          doc.page.width - signatureMargin - 350,
          signatureY,
          { align: "left" }
        )
        .text(
          "Decano/a FICA",
          doc.page.width - signatureMargin - 320,
          signatureY + 20,
          { align: "left" }
        );
    });

    doc.end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: notifications.principal.p1 });
  }
};
