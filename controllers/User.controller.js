import Encuesta from "../models/Encuesta.models.js";
import User from "../models/User.models.js";

const expresiones = {
  usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{4,12}$/, // 4 a 12 digitos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  // correo: /^[a-zA-Z0-9_.+-]@masakali.com/,
  telefono: /^\d{7,14}$/, // 7 a 14 numeros.
};

const createUser = async (req, res) => {
  const { user_name, user_surname, user_email, user_password } = req.body;

  try {
    if (user_name && user_surname && user_email && user_password) {
      if (!expresiones.nombre.test(user_name))
        return res.status(400).send("El nombre solo puede contener letras");
      else if (!expresiones.nombre.test(user_surname))
        return res.status(400).send("El apellido solo puede contener letras");
      else if (!expresiones.password.test(user_password))
        return res
          .status(400)
          .send(
            "La contraseña debe tener entre 4 a 12 digitos sin caracteres especiales"
          );
      else if (!expresiones.correo.test(user_email)) {
        return res.status(400).send("El correo es invalido");
      }

      if (
        expresiones.nombre.test(user_name) &&
        expresiones.nombre.test(user_surname) &&
        expresiones.password.test(user_password) &&
        expresiones.correo.test(user_email)
      ) {
        const user = await User.create({
          user_name,
          user_surname,
          user_email,
          user_password,
        });
        return res.status(200).json(user);
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUser = async (_req, res) => {
  try {
    const allUser = await User.findAll({ include: Encuesta });
    res.json(allUser);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: {
        user_id: id,
      },
      include: Encuesta,
    });

    res.json(user);
  } catch (error) {
    res.status(404).json({ msg: "Error usuario no encontrado" });
  }
};

export { createUser, getAllUser, getUser };
