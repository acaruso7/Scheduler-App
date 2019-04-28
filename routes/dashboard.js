const express = require("express");
const router = express.Router();
const data = require('../data');
const scheduleData = data.schedules;
const userData = data.users;

router.get("/", async (req, res) => {
  try {
    const userId = req.session.userId;
    const user = await userData.get(userId)
    const scheduleIds = user.schedules //schedules the user has been invited to
    const user_schedules = await scheduleData.getUserSchedules(scheduleIds)

    let created_schedules = [];
    let invited_schedules = [];
    for (let i = 0; i < user_schedules.length; i++) {
      if (user_schedules[i].creator === req.session.userId) {
        created_schedules.push(user_schedules[i])
        // created_schedules[i].users =  //get user names form userIds
      } else {
        invited_schedules.push(user_schedules[i])

      }
    }

    res.render('dashboard',{created_schedules: created_schedules, invited_schedules: invited_schedules});
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



