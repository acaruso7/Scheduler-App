# Scheduler-App
A node.js schedule app like Doodle to find mutual meeting times among group members

## Tentative name
ScheduleMe.com

## Group member
* Yang, Haolin
* Bakhsh, Shujaat
* Liu, Yangyang
* Wang, Jiawei
* Caruso, Alexander

## Main idea
The general idea for this app is to provide functionality to users to schedule meetings and agree upon a common date or time. This is similar to an app called Doodle. A single user can create a schedule, and specify the email addresses of group members he or she would like to invite to select a time they are available. For example, the creator of the schedule could create an event ‘CS546 Group Meeting’, select several potential meeting dates and times, and send out a blank schedule to group members based on email addresses. The members receiving the invite like will select the dates/times they are available to meet, which will be written to the database, and the schedule UI on the website will update. 

## Core Features
* Create account / login
* Create a schedule / meeting
	* Create details with HTML form (members, dates/times, location, event title, event description)
* Grid UI with names on one axis, and dates/times on the other
 	* The content of the grid will be checkmarks or X’s indicating member availability
* Send out invites to edit schedule via email
	* User will be prompted to create an account if they don’t already have one
	* Once the user has created an account, they will be able to view the current state schedule to which they were to invited to edit / add to
	* Include a title, description, and location of the activity in the initial invite email
	* Link invitees to an HTML form where they select their availability
* Notes / Comments on schedules
* Dashboard in homepage / user profile showing a given user’s schedules
	* Show information such as schedule invites, recent changes, etc
* Set a timer on responses
	* Require invited members to respond within a certain amount of time (e.g. 3 days) → otherwise send out finalized schedule as-is
* Send out a finalized version of the schedule via email

## Extra features
* Resceduler (allow creator of schedule to change times based on member availabilities determined from notes / comments)
* Restrict total number of attendees (e.g. invite 20 people, but close responses after 10 people respond)
* Integrate with Google Calendar API (place an event on members’ calendars once a finalized meeting time is decided)
* User profile page (include information such as work hours & hobbies, gender, etc.) → include edit capabilities
* Invite members based on profile characteristics (e.g. hobbies)
	* This feature would allow users to create open events for anyone interested (for example, planning a sports event)
* Update selections within a certain window
	* For example, allow a user to change his or her selections within a certain amount of time of the original invite

