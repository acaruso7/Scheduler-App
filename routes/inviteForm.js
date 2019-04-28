const express = require("express");
const router = express.Router();
const data = require('../data');
const scheduleData = data.schedules;

router.get("/", async (req, res) => {  
    try {
        const schedule = await scheduleData.getScheduleByID(req.session.scheduleId);
        const title = schedule.title;
        const description = schedule.description;
        const dates = schedule.dates;
        res.render('inviteForm', {title: title, description: description, dates: dates}) //handlebars templating
    } catch (e) {
      res.status(500).send();
    }
});

router.post("/", async (req, res) => { 
  console.log(req.body)
  console.log(res.body)
})

module.exports = router;