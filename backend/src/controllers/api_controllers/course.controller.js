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
import PDFDocument from 'pdfkit';
import path from 'path';
import { fileURLToPath } from 'url';

import Detail from "../../models/Detail.js";
import DetailValues from "../../models/DetailValues.js";
import Instructor from "../../models/Instructor.js";
import Certificate from "../../models/Certificate.js";
import Modality from "../../models/Modality.js";
import Schedule from "../../models/Schedule.js";

export const getAllCourses = async (req, res) => {
  try {
    const { search = "", limit = 10, page = 1 } = req.body;
    const offset = (page - 1) * limit; // Cálculo del desplazamiento para paginación

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
              through: { attributes: [] }, // Excluye los campos de la tabla intermedia
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
              through: { attributes: [] }, // Excluye los campos de la tabla intermedia
            },
            {
              model: Cost,
              through: { attributes: [] }, // Excluye los campos de la tabla intermedia
            },
          ],
        },
      ],
      limit, // Tamaño de página
      offset, // Desplazamiento para la paginación
      distinct: true, // Asegura que no se cuenten filas duplicadas
    });

    return res.status(200).json({
      total: courses.count, // Total de resultados
      totalPages: Math.ceil(courses.count / limit), // Total de páginas
      courses: courses.rows, // Resultados de los cursos
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
              through: { attributes: [] }, // Excluye los campos de la tabla intermedia
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
              through: { attributes: [] }, // Excluye los campos de la tabla intermedia
            },
            {
              model: Cost,
              through: { attributes: [] }, // Excluye los campos de la tabla intermedia
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

    // Buscar el curso y los participantes
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
      ],
    });

    if (!course) {
      return res.status(404).json({ message: notifications.cursos.c5 });
    }

    // Configurar respuesta para PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `inline; filename="certificado-curso-${id}.pdf"`
    );

    // Obtener la ruta del directorio actual (es el directorio donde está este archivo)
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Ruta del logo (ajustar a la ruta relativa desde el archivo donde está ejecutándose el código)
    const logoPath = path.resolve(__dirname, '../../assets/cisco_logo.png');  // Asegúrate de que esta ruta esté bien configurada

    // Crear el PDF con orientación horizontal (landscape)
    const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 50 });

    // Pipe del PDF a la respuesta HTTP
    doc.pipe(res);

    // Obtener la altura de la página A4 (para centrar el contenido)
    const pageHeight = doc.page.height;
    const pageWidth = doc.page.width;

    // Márgenes de la página
    const topMargin = 400;  // Margen superior
    const bottomMargin = 100;  // Margen inferior

    // Calcular el espacio disponible para centrar el contenido
    const contentHeight = pageHeight - topMargin - bottomMargin;
    const totalTextHeight = 250;  // Aproximadamente la altura del contenido (ajustar según sea necesario)
    const verticalCenter = topMargin + (contentHeight - totalTextHeight) / 2;

    // Generar una página por participante
    course.Participants.forEach((participant) => {
      doc.addPage();

      doc.moveDown(8);  // Esto agrega un espaciado de 3 líneas (puedes ajustar el número)

      // Insertar el logo en la parte superior izquierda
      doc.image(logoPath, 20, 20, { width: 100 });  // Logo más cercano a la esquina superior izquierda

      // Título del certificado (centrado horizontalmente)
      doc
        .fontSize(20)
        .text("Cisco Networking Academy UTN", { align: "center", continued: false })
        .moveDown();

      doc
        .fontSize(16)
        .text("CONFIERE EL PRESENTE CERTIFICADO A", { align: "center" })
        .moveDown(2);

      // Nombre del participante (centrado horizontalmente)
      doc
        .fontSize(24)
        .font("Times-Bold")
        .text(`${participant.name}`, { align: "center" })
        .moveDown(2);

      // Contenido del certificado (centrado horizontalmente y ajustado verticalmente)
      doc
        .fontSize(12)
        .font("Times-Roman")
        .text(
          `Por haber asistido y aprobado el curso "${course.name}", .` +
          // Se puede ajustar con más texto si es necesario
          "",
          { align: "center", indent: 40, lineGap: 8 }
        )
        .moveDown(2);

      // Firma y detalles (centrado horizontalmente)
      doc.text("__________________________", { align: "center" });
      doc.text("Coordinador Académico", { align: "center" });
    });

    // Finalizar el PDF
    doc.end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: notifications.principal.p1 });
  }
};