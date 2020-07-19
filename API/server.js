const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../user_credentials/auth-router.js");
const publicRouter = require("../public/public-router.js");
const privateRouter = require("../user_information/user_information-router.js");
const meetingsRouter = require("../meetings/meetings-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/auth", authRouter);
server.use("/public", publicRouter);
server.use("/private", privateRouter);
server.use("/meetings", meetingsRouter);

server.get("/", (req, res) => {
  res.send("It's alive!");
});

module.exports = server;
