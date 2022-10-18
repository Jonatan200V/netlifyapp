import jwt from "jsonwebtoken";

// require("dotenv").config();
const { AUTH_SECRET } = process.env;
const auth = (req, res, next) => {
  console.log(req.headers);

  if (!req.headers.authorization) {
    res.status(401).json({ msg: "Acceso no autorizado" });
  } else {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, AUTH_SECRET, (err, decoded) => {
      if (err) {
        res.status(500).json({ msg: "Ha ocurrido un problema token invalido" });
      } else {
        req.user = decoded;
        console.log(req.user);
        next();
      }
    });
  }
};

export { auth };
