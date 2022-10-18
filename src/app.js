// const express = require("express");
// const cors = require("cors");
// const morgan = require("morgan");
// const routerUser = require("../routes/user.routes");
// const routerEncuesta = require("../routes/encuesta.routes");
// const routerForm = require("../routes/forms.routes");
import morgan from "morgan";
import routerUser from "../routes/user.routes.js";
import routerEncuesta from "../routes/encuesta.routes.js";
import routerForm from "../routes/forms.routes.js";
import cors from "cors";
import express from "express";
const app = express();
app.use(cors());
// const whiteList = [
//   "http://localhost:3001/register-user",
//   "http://localhost:3001/estadisticas",
//   "http://localhost:3001/home",
//   "http://localhost:3001",
// ];
// app.use(cors({ origin: whiteList }));
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   // another common pattern
//   res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,OPTIONS,PATCH,DELETE,POST,PUT"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
//   ),
//     next();
// });
app.use(express.json());
app.use(morgan("dev"));
app.use(routerUser);
app.use(routerEncuesta);
app.use(routerForm);

export default app;
