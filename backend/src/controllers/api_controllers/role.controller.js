import Role from "../../models/Role.js";
import notifications from "../../notifications.json" assert { type: "json" };
import { Op } from "sequelize";

export const addRole = async (req, res) => {
  try {
    const { name, description } = req.body;
    const status = "Inactivo";
    const roleExists = await Role.findOne({ where: { name } });
    if (roleExists) {
      return res.status(400).json({ message: notifications.roles.r1 });
    }

    const newRole = await Role.create({
      name,
      description,
      status,
    });

    return res
      .status(201)
      .json({ message: notifications.roles.r4, role: newRole });
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const getRoles = async (req, res) => {
  try {
    const { search = "", limit = 10, page = 1 } = req.body; // Recibiendo search, limit y page
    const offset = (page - 1) * limit; // Cálculo de offset para paginación

    const roles = await Role.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } },
          { status: { [Op.like]: `%${search}%` } },
          // Puedes agregar más columnas aquí si es necesario
        ],
      },
      limit: limit, // Tamaño de la página
      offset: offset, // Desplazamiento para la paginación
    });

    return res.status(200).json({
      total: roles.count, // Total de resultados
      totalPages: Math.ceil(roles.count / limit), // Total de páginas
      roles: roles.rows, // Resultados de permisos
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: notifications.principal.p1, error: error.message });
  }
};

export const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id); // Buscar usuario por clave primaria

    if (!role) {
      return res.status(404).json({ message: notifications.roles.r5 });
    }

    return res.status(200).json(role);
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const inactiveRole = async (req, res) => {
  try {
    const { id } = req.params;
    let status = "";
    // Buscar y eliminar el usuario
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: notifications.roles.r5 });
    }
    if (role.status == "Activo") {
      status = "Inactivo";
    } else {
      status = "Activo";
    }
    await role.update({ status: status });

    return res.status(200).json({ message: notifications.roles.r3 });
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { id } = req.params; // Tomamos el ID del rol desde los parámetros de la URL
    const role = await Role.findByPk(id); // Buscamos el rol por ID (debe ser role_id)

    if (!role) {
      return res.status(404).json({ message: notifications.roles.r5 });
    }

    // Si no hay datos para actualizar
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: notifications.principal.p2 });
    }

    const updatedFields = {}; // Para almacenar los campos válidos a actualizar

    // Iterar sobre los campos en req.body
    for (const field in req.body) {
      if (Role.rawAttributes[field]) {
        // Asegúrate de usar Role.rawAttributes
        updatedFields[field] = req.body[field]; // Añadir el campo válido al objeto
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ message: notifications.principal.p2 });
    }

    await role.update(updatedFields); // Actualizar el rol en la base de datos

    return res.status(200).json({ message: notifications.roles.r2, role }); // Retornar el rol actualizado
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};
