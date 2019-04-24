const express = require("express");
const router = express.Router();
const data = require('../data');
const scheduleData = data.schedules;

router.get("/", async (req, res) => {  
    try {
        const schedule = await scheduleData.getScheduleByID("5cbfa83324fa2b4510608fa8");
        const title = schedule.title;
        const description = schedule.description;
        const dates = schedule.dates;
        res.render('inviteForm', {title: title, description: description, dates: dates}) //handlebars templating
    } catch (e) {
      res.status(500).send();
    }
});

module.exports = router;