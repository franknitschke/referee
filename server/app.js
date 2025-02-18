const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");
const api = require("./routes/api");
const auth = require("./routes/auth");
const settings = require("./routes/settings");
const update = require("./routes/update");
const vportal = require("./routes/vportal");
const breakRoute = require("./routes/break");
const cors = require("cors");

const { refValue, breakTimer } = require("./const");

const { dbMemory } = require("./db/db");
const { competitionData } = require("./vportal/getCompetitionData");
const { dbGet, cleanObject, cleanBreakObject } = require("./helper");

const ip = require("ip");

const hostIp = () => {
  return process.env.HOST_IP || ip.address();
};

const getIpIntervall = setInterval(() => {
  io.emit("ip", `http://${hostIp()}:${port}`);
}, 1000 * 120);

const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*", //'http://localhost:3000',
  },
  transports: ["websocket", "webtransport", "polling"],
});

const port = process.env.PORT || 3030;

var corsOptions = {
  origin: "*", //'http://localhost:3000',
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "dist")));
app.use((req, res, next) => {
  res.io = io;
  next();
});

app.use("/api", api);
app.use("/api/settings", settings);
app.use("/api/update", update);
app.use("/api/vportal", vportal);
app.use("/api/break", breakRoute);
app.use("/auth", auth);

app.get("/*", (req, res) => {
  res.append("Cache-Control", "no-cache");
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

io.on("connection", async (socket) => {
  console.log(`🍻 a user connected ID: ${socket.id} - ${new Date()}`);

  //send host ip to clients
  socket.emit("ip", `http://${hostIp()}:${port}`);

  //send rating to connecting clients
  socket.emit("rating", cleanObject(refValue));

  //send timer
  socket.emit("timer", refValue?.timer);

  //send settings
  const settings = await dbGet(dbMemory, "settings");
  socket.emit("settings", settings);

  //send breakSetting
  socket.emit("breaktimer", cleanBreakObject(breakTimer));

  //send competition data
  socket.emit("intervall", competitionData.get("athletes"));

  socket.on("disconnect", (reason) => {
    console.log(`😪 Disconnect: ${socket.id}`, reason);
  });
});

server.listen(port, () => {
  console.log(`listening on: http://${hostIp()}:${port}`);
  console.log(`Node Version: ${process.version}`);
});

const socketIoObject = io;
module.exports.ioObject = socketIoObject;
