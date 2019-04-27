const express = require("express");
const router = express.Router();
const data = require('../data');
const scheduleData = data.schedules;
const userData = data.users;

router.get("/", async (req, res) => {
  try {
    //update this code so it only sends schedules for the authenticated user - use router.get('/:userId)
    const userId = req.session.userId;
    const user = await userData.get(userId)
    const scheduleIds = user.schedules
    console.log(scheduleIds)
    const user1_schedules = await scheduleData.getUserSchedules(scheduleIds)
    console.log(user1_schedules)
    res.status(200).json(user1_schedules)
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



