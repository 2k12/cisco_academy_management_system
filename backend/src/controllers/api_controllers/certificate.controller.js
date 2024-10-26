import Certificate from "../../models/Certificate.js";
import Instructor from "../../models/Instructor.js";
import InstructorCertificate from "../../models/InstructorCertificate.js";

import { Op } from "sequelize";
import notifications from "../../notifications.json" assert { type: "json" };

export const addCertificate = async (req, res) => {
  try {
    const { name, year_of_issue, is_international, file_url } = req.body;

    const newCertificate = await Certificate.create({
      name,
      year_of_issue,
      is_international,
      file_url,
    });

    return res
      .status(201)
      .json({
        message: notifications.certificado.c4,
        certificate: newCertificate,
      });
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const getCartificates = async (req, res) => {
  try {
    const { search = "", limit = 10, page = 1 } = req.body; // Recibiendo search, limit y page
    const offset = (page - 1) * limit; // Cálculo de offset para paginación

    const certificates = await Certificate.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { year_of_issue: { [Op.like]: `%${search}%` } },
          // Puedes agregar más columnas aquí si es necesario
        ],
      },
      include: [
        {
          model: Instructor, // Incluye el modelo Course
          // attributes: ['course_name'], // Obtén el nombre del curso, puedes agregar más atributos si los necesitas
          through: { attributes: [] }, // Excluye los atributos de la tabla intermedia si no los necesitas
        },
      ],
      limit: limit, // Tamaño de la página
      offset: offset, // Desplazamiento para la paginación
    });

    return res.status(200).json({
      total: certificates.count, // Total de resultados
      totalPages: Math.ceil(certificates.count / limit), // Total de páginas
      certificates: certificates.rows, 
    });
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const getCertificateById = async (req, res) => {
  try {
    const { id } = req.params;
    const certificate = await Certificate.findByPk(id);

    if (!certificate) {
      return res.status(404).json({ message: notifications.certificado.c5 });
    }
    return res.status(200).json(certificate);
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;

    const certificate = await Certificate.findByPk(id);
    if (!certificate) {
      return res.status(404).json({ message: notifications.certificado.c5 });
    }

    await certificate.destroy();

    return res.status(200).json({ message: notifications.certificado.c3 });
  } catch (error) {
    return res
      .status(500)
      .json({ message: notifications.principal.p1 , error });
  }
};

export const updateCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const { instructor_id } = req.body;


    const certificate = await Certificate.findByPk(id);

    if (!certificate) {
      return res.status(404).json({ message: notifications.certificado.c5 });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: notifications.principal.p2 });
    }

    const updatedFields = {};

    for (const field in req.body) {
      if (Certificate.rawAttributes[field]) {
        updatedFields[field] = req.body[field];
      }
    }

    if (Object.keys(updatedFields).length > 0) {
      await certificate.update(updatedFields);
    }

    
    if (instructor_id) {
      // Busca si ya existe una relación para este capítulo en CourseChapter
      const existingRelation = await InstructorCertificate.findOne({
        where: { certificate_id: id },
      });

      if (existingRelation) {
        // Si ya existe una relación, actualiza el course_id
        await existingRelation.update({ instructor_id });
      } else {
        // Si no existe una relación, crea una nueva
        await InstructorCertificate.create({ certificate_id: id, instructor_id });
      }
    }


    return res
      .status(200)
      .json({ message: notifications.certificado.c2, certificate });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};
