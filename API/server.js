const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const privateRouter = require("../user_credentials/private-router.js");
const usersRouter = require("../user_credentials/user_credentials-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/private", privateRouter);
server.use("/employee", usersRouter);

server.get("/", (req, res) => {
  res.send("It's alive!");
});

module.exports = server;
