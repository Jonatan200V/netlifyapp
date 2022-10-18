import User from "../models/User.models.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
dotenv.config();

const { AUTH_SECRET, AUTH_EXPIRES, AUTH_ROUND } = process.env;

const expresiones = {
  usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{4,12}$/, // 4 a 12 digitos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{7,14}$/, // 7 a 14 numeros.
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  console.log(req.headers);
  const user = await User.findOne({
    where: {
      user_email: email,
    },
  });
  if (!user)
    return res
      .status(404)
      .json({ msg: `El correo ${email} no se encontro registrado` });
  else {
    if (await bcryptjs.compare(password, user.user_password)) {
      const token = jwt.sign({ user }, AUTH_SECRET, {
        expiresIn: AUTH_EXPIRES,
      });
      return res.json({
        user,
        token,
      });
    } else return res.status(404).json({ msg: "Contraseña incorrecta" });
  }
};
const signUp = async (req, res) => {
  const { user_name, user_surname, user_email, user_password } = req.body;
  const testing = user_email.split("@");
  const masakali = testing[1].includes("masakali.com");
  if (!masakali)
    return res.status(400).json({ msg: "Porfavor introduzca masakali.com" });
  try {
    if (user_name && user_surname && user_email && user_password) {
      if (!expresiones.nombre.test(user_name))
        return res
          .status(400)
          .json({ msg: "El nombre solo puede contener letras" });
      else if (!expresiones.nombre.test(user_surname))
        return res
          .status(400)
          .json({ msg: "El apellido solo puede contener letras" });
      else if (!expresiones.password.test(user_password))
        return res.status(400).json({
          msg: "La contraseña debe tener entre 4 a 12 digitos sin caracteres especiales",
        });
      else if (!expresiones.correo.test(user_email)) {
        return res.status(400).json({ msg: "El correo es invalido" });
      }

      if (
        expresiones.nombre.test(user_name) &&
        expresiones.nombre.test(user_surname) &&
        expresiones.password.test(user_password) &&
        expresiones.correo.test(user_email)
      ) {
        const password = await bcryptjs.hash(
          user_password,
          parseInt(AUTH_ROUND)
        );
        console.log(password);
        const user = await User.create({
          user_name,
          user_surname,
          user_email,
          user_password: password,
        });

        const token = jwt.sign({ user: user }, AUTH_SECRET, {
          expiresIn: AUTH_EXPIRES,
        });
        return res.status(200).json({
          user,
          token,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export { signUp, signIn };
