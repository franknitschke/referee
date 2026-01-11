const express = require("express");
const router = express.Router();
const { breakTimer } = require("../const");

const { middleware, cleanBreakObject } = require("../helper");

//protect routes
router.use(middleware);

router.get("/", async (req, res) => {
  res.header({ "content-type": "application/json" });
  res.status(200).send(JSON.stringify(breakTimer, null, 4));
});

router.post("/timeValue", async (req, res) => {
  const pauseTimer = await req.body?.pauseTimer;
  const pauseTimerNote = await req.body?.pauseNote;

  if (pauseTimer) {
    if (typeof parseInt(pauseTimer) !== "number")
      return res.status(500).send({ msg: "False Value" });
    breakTimer.DefaultTimerValue = parseInt(pauseTimer) * 60; //convert minutes in seconds
  }
  breakTimer.NoteValue = pauseTimerNote;

  /* if (pauseTimerNote) {
    breakTimer.NoteValue = pauseTimerNote;
  } */

  res.status(200).send({ msg: "Ok" });
});

router.post("/reset", async (req, res) => {
  breakTimer.clearTimer();
  breakTimer.setBreakTimeValue();

  res.io.emit("breaktimer", cleanBreakObject(breakTimer));

  res.status(200).send({ msg: "Ok" });
});

router.post("/timer", async (req, res) => {
  //if timer allready running
  if (breakTimer.timerRef) {
    breakTimer.clearTimer();
  } else {
    //start timer
    breakTimer.timerRef = setInterval(() => {
      breakTimer.startTimer();
      res.io.emit("breaktimer", cleanBreakObject(breakTimer));
    }, 1000);
  }
  res.status(200).send({ msg: "OK" });
});

module.exports = router;
