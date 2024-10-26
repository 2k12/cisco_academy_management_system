import User from "../../models/User.js";
import Role from "../../models/Role.js";
import Permission from "../../models/Permission.js";
import notifications from "../../notifications.json" assert { type: "json" };
import bcrypt from "bcryptjs";
import { createAccessToken } from "../../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../../config/config.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({
      where: { email },
      include: [
        {
          model: Role,
          include: [
            {
              model: Permission,
              through: { attributes: [] }, // Excluir la tabla pivot
            },
          ],
        },
      ],
    });

    if (!userExists) {
      return res.status(400).json({ message: notifications.login.l1 });
    }

    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
      return res.status(400).json({ message: notifications.login.l2 });
    }

    const token = await createAccessToken({ user: userExists });
    // res.cookie("token", token);
    // Guardar el token en la cookie
    res.cookie("token", token);

    return res.status(201).json({ message: notifications.login.l3 ,userExists});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: notifications.principal.p1 });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(0),
    });
    return res.status(200).json({ message: notifications.login.l4 });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: notifications.principal.p1 });
  }
};

export const profile = async (req, res) => {
  try {
    const userExist = await User.findByPk(req.user.user.id, {
      include: [
        {
          model: Role,
          include: [
            {
              model: Permission, // Ahora sí puedes incluir Permisos
              through: { attributes: [] }, // Excluye los campos de la tabla intermedia
            },
          ],
        },
      ],
    });
    if (!userExist)
      return res.status(400).json({ message: notifications.usuarios.u5 });
    return res.status(200).json({ user: userExist });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: notifications.principal.p1 });
  }
};

export const verify = async (req, res) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(401).json({ message: notifications.principal.p3 });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err)
      return res.status(401).json({ message: notifications.principal.p3 });

    const userExists = await User.findByPk(user.user.id, {
      include: [
        {
          model: Role,
          include: [
            {
              model: Permission, // Ahora sí puedes incluir Permisos
              through: { attributes: [] }, // Excluye los campos de la tabla intermedia
            },
          ],
        },
      ],
    });

    if (!userExists)
      return res.status(401).json({ message: notifications.usuarios.u5 });
    return res.json({ userExists });
  });
};
