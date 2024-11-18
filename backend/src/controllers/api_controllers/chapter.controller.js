import Chapter from "../../models/Chapter.js";
import CourseChapter from "../../models/CourseChapter.js";
import Course from "../../models/Course.js";
import notifications from "../../notifications.json" assert { type: "json" };
import { Op } from "sequelize";

export const addChapter = async (req, res) => {
  try {
    const { chapter_name, hours, start_date, end_date, course_id } = req.body;

    const ChapterExists = await Chapter.findOne({ where: { chapter_name } });
    if (ChapterExists) {
      return res.status(400).json({ message: notifications.tema.t1 });
    }

    const newChapter = await Chapter.create({
      chapter_name,
      hours,
      start_date,
      end_date,
    });

    await CourseChapter.create({
      chapter_id: newChapter.chapter_id,
      course_id,
    });

    return res
      .status(201)
      .json({ message: notifications.tema.t4, chapter: newChapter });
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const getChapters = async (req, res) => {
  try {
    const { search = "", limit = 10, page = 1, courseName } = req.body; // Recibiendo search, limit y page
    const offset = (page - 1) * limit; // Cálculo de offset para paginación

    const courseCondition = courseName
      ? { course_name: { [Op.like]: `%${courseName}%` } } // Buscar cursos que coincidan con `courseName`
      : {};

    const chapters = await Chapter.findAndCountAll({
      where: {
        [Op.or]: [
          { chapter_name: { [Op.like]: `%${search}%` } },
          { hours: { [Op.like]: `%${search}%` } },
        ],
      },
      include: [
        {
          model: Course, // Incluye el modelo Course
          // attributes: ['course_name'], // Obtén el nombre del curso, puedes agregar más atributos si los necesitas
          through: { attributes: [] }, // Excluye los atributos de la tabla intermedia si no los necesitas
          where: courseCondition, // Aplicamos el filtro para el nombre del curso
          required: true,
        },
      ],
      limit: limit, // Tamaño de la página
      offset: offset, // Desplazamiento para la paginación
    });

    return res.status(200).json({
      total: chapters.count, // Total de resultados
      totalPages: Math.ceil(chapters.count / limit), // Total de páginas
      chapters: chapters.rows, // Resultados de permisos
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: notifications.principal.p1, error: error.message });
  }
};

export const getChapterById = async (req, res) => {
  try {
    const { id } = req.params;
    const chapter = await Chapter.findByPk(id);

    if (!chapter) {
      return res.status(404).json({ message: notifications.tema.t5 });
    }
    return res.status(200).json(chapter);
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const deleteChapter = async (req, res) => {
  try {
    const { id } = req.params;

    const chapter = await Chapter.findByPk(id);
    if (!chapter) {
      return res.status(404).json({ message: notifications.tema.t1 });
    }

    await chapter.destroy();

    return res.status(200).json({ message: notifications.tema.t3 });
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

// export const updateChapter = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const chapter = await Chapter.findByPk(id);

//     if (!chapter) {
//       return res.status(404).json({ message: notifications.tema.t5 });
//     }

//     if (Object.keys(req.body).length === 0) {
//       return res.status(400).json({ message: notifications.principal.p2 });
//     }

//     const updatedFields = {};

//     for (const field in req.body) {
//       if (Chapter.rawAttributes[field]) {
//         updatedFields[field] = req.body[field];
//       }
//     }

//     if (Object.keys(updatedFields).length === 0) {
//       return res.status(400).json({ message: notifications.principal.p2 });
//     }

//     await chapter.update(updatedFields);

//     return res.status(200).json({ message: notifications.tema.t2, chapter });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: notifications.principal.p1, error });
//   }
// };

export const updateChapter = async (req, res) => {
  try {
    const { id } = req.params;
    const { course_id } = req.body; // Recibiendo course_id del cuerpo de la solicitud

    const chapter = await Chapter.findByPk(id);

    if (!chapter) {
      return res.status(404).json({ message: notifications.tema.t5 });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: notifications.principal.p2 });
    }

    const updatedFields = {};

    // Actualizar solo los campos válidos del modelo Chapter
    for (const field in req.body) {
      if (Chapter.rawAttributes[field]) {
        updatedFields[field] = req.body[field];
      }
    }

    // Si hay campos para actualizar, ejecuta la actualización
    if (Object.keys(updatedFields).length > 0) {
      await chapter.update(updatedFields);
    }

    // Actualizar la relación con el curso en la tabla intermedia si se proporciona un course_id
    if (course_id) {
      // Busca si ya existe una relación para este capítulo en CourseChapter
      const existingRelation = await CourseChapter.findOne({
        where: { chapter_id: id },
      });

      if (existingRelation) {
        // Si ya existe una relación, actualiza el course_id
        await existingRelation.update({ course_id });
      } else {
        // Si no existe una relación, crea una nueva
        await CourseChapter.create({ chapter_id: id, course_id });
      }
    }

    return res.status(200).json({ message: notifications.tema.t2, chapter });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};
