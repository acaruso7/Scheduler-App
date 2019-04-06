const express = require("express");
const router = express.Router();
const data = require('../data');
const surveyData = data.survey;
const settingsData = data.settings;

router.get("/", async (req, res) => {  
    try {
        function randomIntFromInterval(min,max) // min and max included
        {
            return Math.floor(Math.random()*(max-min+1)+min);
        }
        const randNum = randomIntFromInterval(0,431)
        const setting = await settingsData.getAll();
        res.render('survey', {randomSetting: setting[randNum]})
    } catch (e) {
      res.status(500).send();
    }
});

module.exports = router;