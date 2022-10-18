import Encuesta from "../models/Encuesta.models.js";
import User from "../models/User.models.js";
const getAllEncuesta = async (req, res) => {
  try {
    const encuestas = await Encuesta.findAll();

    res.status(200).json(encuestas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createEncuesta = async (req, res) => {
  try {
    const {
      pregunta1,
      pregunta2,
      pregunta3,
      pregunta4,
      pregunta5,
      pregunta6,
      sexo,
      user__id,
    } = req.body;
    console.log(
      pregunta1,
      pregunta2,
      pregunta3,
      pregunta4,
      pregunta5,
      pregunta6,
      sexo,
      user__id
    );
    if (
      pregunta1 !== undefined &&
      pregunta2 !== undefined &&
      pregunta3 !== undefined &&
      pregunta4 !== undefined &&
      pregunta5 !== undefined &&
      pregunta6 !== undefined
    ) {
      await Encuesta.create({
        pregunta1,
        pregunta2,
        pregunta3,
        pregunta4,
        pregunta5,
        pregunta6,
        sexo,
        completed: false,
        user__id,
      });
      res.status(200).json(Encuesta);
    } else {
      res.status(404).json({ msg: "Porfavor completa los campos" });
    }

    // res.status(201).json({ msg: "Se creo correctamente" });
    // res.status(200).json(Encuesta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const existEncuest = async (req, res, next) => {
  const { user__id } = req.body;
  // try {
  console.log("HOLA A TODS");
  const completedEncuest = await User.findOne({
    include: Encuesta,
    where: {
      user_id: user__id,
    },
  });
  console.log(completedEncuest);
  if (completedEncuest.encuestum !== null)
    res.json({ msg: "User completed encuest" });
  else next();
  // } catch (error) {
  // res.status(500).json({ msg: "Error del servidor la concha de tu madre" });
  // }
};
const dateEncuest = async (req, res) => {
  const { pregunta, opcion } = req.body;
  const { count: counTotal, rows: rowsTotal } = await Encuesta.findAndCountAll({
    attributes: [pregunta],
  });
  const { count, rows } = await Encuesta.findAndCountAll({
    attributes: [pregunta],
    where: {
      [pregunta]: opcion,
    },
  });

  const porcentaje = Math.floor((count / counTotal) * 100) + "%";
  res.json({ porciento: porcentaje, tot: counTotal });
};
export { createEncuesta, getAllEncuesta, existEncuest, dateEncuest };
