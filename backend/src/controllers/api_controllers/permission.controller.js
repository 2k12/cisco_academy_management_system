import Permission from "../../models/Permission.js";
import notifications from "../../notifications.json" assert { type: "json" };
import { Op } from "sequelize";

export const addPermission = async (req, res) => {
  try {
    const { name, description } = req.body;
    // const { name, description, status } = req.body;
    const status = "0";
    const roleExists = await Permission.findOne({ where: { name } });
    if (roleExists) {
      return res.status(400).json({ message: notifications.permisos.p1 });
    }

    const newPermission = await Permission.create({
      name,
      description,
      status,
    });

    return res
      .status(201)
      .json({ message: notifications.permisos.p4, role: newPermission });
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const getPermission = async (req, res) => {
  try {
    const { search = "", limit = 10, page = 1 } = req.body; // Recibiendo search, limit y page
    const offset = (page - 1) * limit; // Cálculo de offset para paginación

    const permissions = await Permission.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } },
          // Puedes agregar más columnas aquí si es necesario
        ],
      },
      limit: limit, // Tamaño de la página
      offset: offset, // Desplazamiento para la paginación
    });

    return res.status(200).json({
      total: permissions.count, // Total de resultados
      totalPages: Math.ceil(permissions.count / limit), // Total de páginas
      permissions: permissions.rows, // Resultados de permisos
    });
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const getPermissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findByPk(id);

    if (!permission) {
      return res.status(404).json({ message: notifications.permisos.p5 });
    }

    return res.status(200).json(permission);
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const inactivePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findByPk(id);
    let status = "";
    if (!permission) {
      return res.status(404).json({ message: notifications.permisos.p5 });
    }

    if (permission.status == "Activo") {
      status = "Inactivo";
    } else {
      status = "Activo";
    }
    // Cambiar el estado a 'Inactivo'
    await permission.update({ status: status });

    return res
      .status(200)
      .json({ message: notifications.permisos.p3, permission });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const updatePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findByPk(id);

    if (!permission) {
      return res.status(404).json({ message: notifications.permisos.p5 });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: notifications.principal.p2 });
    }

    const updatedFields = {};

    for (const field in req.body) {
      if (Permission.rawAttributes[field]) {
        updatedFields[field] = req.body[field];
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ message: notifications.principal.p2 });
    }

    await permission.update(updatedFields);

    return res
      .status(200)
      .json({ message: notifications.permisos.p2, permission });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};
