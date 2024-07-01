require("dotenv").config();
require("module-alias/register");
require('./config/db');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const http = require("http");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = http.createServer(app);

const apiRouter = require('./api');
app.use("/api", apiRouter);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
