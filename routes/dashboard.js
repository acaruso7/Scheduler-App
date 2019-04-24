const express = require("express");
const router = express.Router();
const data = require('../data');
const scheduleData = data.schedules;
const userData = data.users;

router.get("/", async (req, res) => {
  try {
    //update this code so it only sends schedules for the authenticated user - use router.get('/:userId)
    const schedules = await scheduleData.getAll()
    res.status(200).json(schedules)
  } catch (e) {
    console.log(e)
    res.status(500).send();
  }
});

router.get("/:scheduleId", async (req, res) => {
  try {
    const schedule = await scheduleData.getScheduleByID(req.params.scheduleId);
    res.status(200).json(schedule)
  } catch(e) {
    console.log(e)
    res.status(500).send()
  }
});

module.exports = router;



