const express = require("express");
const router = express.Router();
const data = require('../data');
const scheduleData = data.schedules;
const userData = data.users;
const notesData = data.notes;
const emailConfig = require('../config/email')
const emailer = require('node-email-sender');
const deployUrl = require('../config/deploy').url;
const Handlebars = require('handlebars');

router.get("/", async (req, res) => {
  try {
    const userId = req.session.userId;
    const user = await userData.get(userId)
    const scheduleIds = user.schedules //schedules the user has been invited to
    let user_schedules = await scheduleData.getUserSchedules(scheduleIds)
    user_schedules = user_schedules.reverse()

    let created_schedules = [];
    let invited_schedules = [];
    for (let i = 0; i < user_schedules.length; i++) {
      if (user_schedules[i].creator === req.session.userId) {
        created_schedules.push(user_schedules[i])
      } else {
        invited_schedules.push(user_schedules[i])
      }
    }

    res.render('dashboard',{created_schedules: created_schedules, invited_schedules: invited_schedules});
  } catch (e) {
    console.log(e)
    res.status(500).render('error/error',{error: "Get Schedule fail!"});
  }
});

router.get("/:scheduleId", async (req, res) => {
  try {
    const schedule = await scheduleData.getScheduleByID(req.params.scheduleId);
    let notes = await notesData.getNotesByScheduleId(req.params.scheduleId);
    notes = notes.reverse()

    let griddata = [];
    let username =[];
    for(let i=0;i<schedule.users.length;i++){
      let user = await userData.get(schedule.users[i]);
      username[i] =user.fullName;
      griddata[i]=[];
    }
    let dates =[];
    for(let j=0;j<schedule.dates.length;j++){
      dates[j]=schedule.dates[j].toDateString();
    }
    for(let i=0;i<username.length;i++){
      for(let j=0;j<dates.length;j++){
        for(let k=0;k<schedule.responses.length;k++){
          if(schedule.responses[k].user == schedule.users[i]){
            for(let l=0;l<schedule.responses[k].availability.length;l++){
              let date = schedule.responses[k].availability[l].date.toDateString();
              if(date == dates[j]){
                griddata[username[i]+dates[j]]=schedule.responses[k].availability[l].times;
              }
            }
          }
        }
      }
    }
    let row = [];
    for (let i = 0; i < username.length; i++) {
        let col =[];
        col[0]=username[i];
        for (let j = 1; j < dates.length+1; j++) {
          if(griddata[username[i]+dates[j-1]]==undefined){
            col[j]="Not Available";
          }else{
            col[j]=griddata[username[i]+dates[j-1]];
          }
        }
        row[i]=col;
    }

    //handlebars helpers for conditional formatting on grid
    Handlebars.registerHelper('ifeq', function (a, b, options) {
      if (a == b) { return options.fn(this); }
      return options.inverse(this);
    });
    Handlebars.registerHelper('ifnoteq', function (a, b, options) {
      if (a != b) { return options.fn(this); }
      return options.inverse(this);
    });

    res.render('display',{ dates:dates, row:row, scheduleId: req.params.scheduleId, notes: notes,schedule:schedule });
  } catch(e) {
    console.log(e)
    res.status(500).render('error/error',{error: "Get Grid fail!"});
  }
});

//post request for comments
router.post("/:scheduleId", async (req, res) => {
  try {
    const user = await userData.get(req.session.userId)
    const userName = user['fullName']
    const note = await notesData.createNote(req.params.scheduleId, req.session.userId, userName, req.body.comment)
    res.redirect(`/dashboard/${req.params.scheduleId}`)
  } catch(e) {
    console.log(e)
    res.status(500).render('error/error',{error: "Post Grid fail!"});
  }
});

//post req for delete

router.post('/delete/:scheduleId', async (req, res) => {
  try {
    const schedule = await scheduleData.removeSchedule(req.params.scheduleId);
    const usersList = schedule.users;
    let emails = [];
    for (let i = 0; i < usersList.length; i++) {
      const oneUser = usersList[i];
      emails.push((await userData.get(oneUser)).email);
    }
    // send email

    for (i=0; i < emails.length; i++) {
      emailer.sendMail({
          emailConfig: emailConfig.emailConfig,
          to: emails[i],
          subject: 'ScheduleMe Meeting Deleted',
          content: `The ScheduleMe meeting you were invited to edit has been deleted by the creator \n \
          The schedule title is: ${schedule.title}`,
      });
  }

    res.redirect('/dashboard');
  } catch (e) {
    console.log(e)
    res.status(500).render('error/error',{error: "Delete Grid fail!"});
  }
})

module.exports = router;



