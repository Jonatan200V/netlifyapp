import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Encuesta = sequelize.define(
  "encuesta",
  {
    encuesta_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pregunta1: {
      type: DataTypes.STRING,
    },
    pregunta2: {
      type: DataTypes.TEXT,
    },
    pregunta3: {
      type: DataTypes.TEXT,
    },
    pregunta4: {
      type: DataTypes.TEXT,
    },
    pregunta5: {
      type: DataTypes.TEXT,
    },
    pregunta6: {
      type: DataTypes.TEXT,
    },
    sexo: {
      type: DataTypes.STRING,
    },
    completed: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: false,
  }
);

export default Encuesta;
