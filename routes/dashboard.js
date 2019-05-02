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

    console.log(schedule);
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
            col[j]="NotAvailable";
          }else{
            col[j]=griddata[username[i]+dates[j-1]];
          }
        }
        row[i]=col;
    }
    console.log(row);
    res.render('display',{
      dates:dates,
      row:row
    });
  } catch(e) {
    console.log(e)
    res.status(500).send()
  }
});

module.exports = router;



