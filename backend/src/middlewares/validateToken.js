import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config/config.js";
import notifications from "../notifications.json" assert { type: "json" };

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(401).json({ message: notifications.principal.p3 });

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ message: notifications.principal.p3 });
    req.user = user;
    next();
  });
};
