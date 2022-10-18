import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import Encuesta from "./Encuesta.models.js";

const User = sequelize.define(
  "user",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo no puede estar vacio",
        },
        isAlpha: {
          args: true,
          msg: "El nombre solo puede contener letras",
        },
        len: {
          args: [3, 255],
          msg: "El nombre debe tener entre 3 a 255 caracteres",
        },
      },
    },
    user_surname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo no puede estar vacio",
        },
        isAlpha: {
          args: true,
          msg: "El nombre solo puede contener letras",
        },
      },
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "El campo tiene que ser un correo valido",
        },
        notNull: {
          msg: "El campo no puede estar vacio",
        },
      },
      unique: true,
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4, 255],
          msg: "La contraseña debe tener como minimo 6 caracteres",
        },
        notNull: {
          msg: "El campo no puede estar vacio",
        },
      },
    },
  },
  {
    timestamps: false,
  }
);

User.hasOne(Encuesta, {
  foreignKey: "user__id",
  sourceKey: "user_id",
});

Encuesta.belongsTo(User, {
  foreignKey: "user__id",
  targetKey: "user_id",
});

export default User;
