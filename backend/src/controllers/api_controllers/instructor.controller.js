import Instructor from "../../models/Instructor.js";
import Detail from "../../models/Detail.js";
import Course from "../../models/Course.js";
import notifications from "../../notifications.json" assert { type: "json" };
import { Op } from "sequelize";

// export const addInstructor = async (req, res) => {
//   try {
//     const { name, phone, email, ruc_number, banck_certificate_url } = req.body;

//     const InstructorExists = await Certificate.findOne({ where: { email } });
//     if (InstructorExists) {
//       return res.status(400).json({ message: notifications.instructor.i1 });
//     }

//     const newInstructor = await Instructor.create({
//       name,
//       phone,
//       email,
//       ruc_number,
//       banck_certificate_url,
//     });

//     return res.status(201).json({
//       message: notifications.isntructor.i4,
//       instructor: newInstructor,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: notifications.principal.p1, error });
//   }
// };

export const addInstructor = async (req, res) => {
  try {
    const { name, phone, email, ruc_number, banck_certificate_url, course_id } =
      req.body;

      console.log(req.boddy);
    // Verificar si ya existe un instructor con el mismo correo electrónico
    const InstructorExists = await Instructor.findOne({ where: { email } });
    if (InstructorExists) {
      return res.status(400).json({ message: notifications.instructor.i1 });
    }

    // Encontrar el `Detail` correspondiente al `course_id`
    const detail = await Detail.findOne({
      include: [
        {
          model: Course,
          where: { course_id },
          // through: { attributes: [] }, // Asumiendo que la relación usa una tabla intermedia
        },
      ],  
    });

    // Verificar que el detalle existe y asignar el `instructor_id`
    if (detail) {
      if (
        detail.instructor_id == "" ||
        detail.instructor_id == null ||
        detail.instructor_id == " "
      ) {
        await detail.update({ instructor_id: newInstructor.instructor_id });
      } else {
        return res
          .status(400)
          .json({ message: "El curso Ya tiene registrado un Instructor !" });
      }
    } else {
      return res.status(404).json({
        message: "No se encontró un detalle para el curso proporcionado.",
      });
    }
    // Crear el nuevo instructor
    const newInstructor = await Instructor.create({
      name,
      phone,
      email,
      ruc_number,
      banck_certificate_url,
    });

    return res.status(201).json({
      message: notifications.instructor.i4,
      instructor: newInstructor,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const getInstructors = async (req, res) => {
  try {
    const { search = "", limit = 10, page = 1 } = req.body; // Recibiendo search, limit y page
    const offset = (page - 1) * limit; // Cálculo de offset para paginación

    const instructors = await Instructor.findAndCountAll({
      where: {
        [Op.or]: [
          { identification_number: { [Op.like]: `%${search}%` } },
          { name: { [Op.like]: `%${search}%` } },
          { phone: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
          { ruc_number: { [Op.like]: `%${search}%` } },
        ],
      },
      include: [
        {
          model: Detail,
          include: [
            {
              model: Course,
            },
          ],
          // where: { isnstructor_id: { [Op.col]: 'Instructor.instructor_id' } }, // Filtro para instructor_id
          // required: false, // Esto permite que se incluyan instructores sin detalles asociados
        },
      ],
      limit: limit, // Tamaño de la página
      offset: offset, // Desplazamiento para la paginación
    });

    return res.status(200).json({
      total: instructors.count,
      totalPages: Math.ceil(instructors.count / limit),
      instructors: instructors.rows,
    });
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const getInstructorById = async (req, res) => {
  try {
    const { id } = req.params;
    const instructor = await Instructor.findByPk(id);

    if (!instructor) {
      return res.status(404).json({ message: notifications.instructor.i5 });
    }
    return res.status(200).json(instructor);
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

export const updateInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const instructor = await Instructor.findByPk(id);

    if (!instructor) {
      return res.status(404).json({ message: notifications.instructor.i5 });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: notifications.principal.p2 });
    }

    const updatedFields = {};

    for (const field in req.body) {
      if (Instructor.rawAttributes[field]) {
        updatedFields[field] = req.body[field];
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ message: notifications.principal.p2 });
    }

    await instructor.update(updatedFields);

    return res
      .status(200)
      .json({ message: notifications.instructor.i2, instructor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const getInstructorsDropdown = async (req, res) => {
  try {
    const instructors = await Instructor.findAll({
      attributes: ["instructor_id", "name"],
    });
    res.json({ instructors: instructors });
  } catch (error) {
    res.status(500).json({ message: notifications.principal.p1 });
  }
};
