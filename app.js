//Arquivo principal da aplicação

const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

//Rotas
const usersRoute = require("./routes/users");
const recipesRoute = require("./routes/recipes");

//Configuração do morgan e body-parser
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Endpoints
app.use("/users", usersRoute);
app.use("/recipes", recipesRoute);
