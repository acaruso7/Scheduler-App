
# Scheduler-App
A node.js scheduler app to find mutual meeting times among group members.

## Link to Version Deployed on Google Cloud
https://quixotic-hash-238700.appspot.com 

## Quick Start (Run Locally)
Install dependencies
```bash
 npm install
```

Initalize database
```bash
 node seed.js
```

Start the server:
```bash
 npm start
```

## Login Information
The following accounts are written to the database in the seed script:
* acaruso@stevens.edu
* johndoe@gmail.com
* shujaatbakhsh@gmail.com
* haolinyang95@gmail.com
* yangyangliu@gmail.com
* jiaweiwang@gmail.com

The password for each of these accounts is `123`. Use any of them to test the application.

## Group Members
* Yang, Haolin
* Bakhsh, Shujaat
* Liu, Yangyang
* Wang, Jiawei
* Caruso, Alexander

## Main idea
The general idea for this app is to provide functionality to users to schedule meetings and agree upon a common date and time. This is similar to an app called Doodle. A user can create a schedule, and specify the email addresses of group members he or she would like to invite to select a time they are available. For example, the creator of the schedule could create an event ‘CS546 Group Meeting’, select several potential meeting dates and times, and send out a blank schedule to group members based on email addresses. The members receiving the invite like will select the dates/times they are available to meet, which will be written to the database, and the schedule UI on the website will update. 

## Core Features
* Create account / login
* Create a schedule / meeting
	* Create details with HTML form (members, dates/times, event title, event description)
* Grid UI with names on one axis, and dates on the other
 	* The content of the grid will be the times users are available for that day, or the string 'Not Available'
* Send out invites to edit schedule via email
	* User will be prompted to create an account if they don’t already have one
	* Once the user has created an account, they will be able to view the current state of the schedule to which they were to invited to edit / add to
	* Include a title and description of the activity in the initial invite email
	* Link invitees to an HTML form where they select their availability
* Notes / Comments on schedules
* Dashboard in homepage / user profile showing a given user’s schedules
	* Show information such as the schedules a user has created or was invited to, as well as a button to create a new schedule
* ~~Set a timer on responses~~ this feature was scratched (approved by professor) as it is inconvenient to test
	* ~~Require invited members to respond within a certain amount of time (e.g. 3 days) → otherwise send out finalized schedule as-is~~
* Send out a link to the finalized version of the schedule via email, after the last invitee has responded

## Extra features
* Delete a schedule
* Send out notification email to all users when a schedule is deleted
* Conditional formatting on grid UI (green if the user is available, red if not)
* Deployed app to Google Cloud platform
* ~~Resceduler (allow creator of schedule to change times based on member availabilities determined from notes / comments)~~ NOT IMPLEMENTED
* ~~Restrict total number of attendees (e.g. invite 20 people, but close responses after 10 people respond)~~ NOT IMPLEMENTED
* ~~Integrate with Google Calendar API (place an event on members’ calendars once a finalized meeting time is decided)~~ NOT IMPLEMENTED
* ~~User profile page (include information such as work hours & hobbies, gender, etc.) → include edit capabilities~~ NOT IMPLEMENTED
* ~~Invite members based on profile characteristics (e.g. hobbies)~~ NOT IMPLEMENTED
	* ~~This feature would allow users to create open events for anyone interested (for example, planning a sports event)~~ NOT IMPLEMENTED
* ~~Update selections within a certain window~~ NOT IMPLEMENTED
	* ~~For example, allow a user to change his or her selections within a certain amount of time of the original invite~~ NOT IMPLEMENTED

### Side Notes
* In the local version of this application, the dates selected in the createSchedule form are offset by one day when displayed elsewhere in the UI, due to a timezone conversion issue in MongoDB. This is solved in the version deployed on Google Cloud, since you can set a default timezone with Mongo Atlas. Please test using the deployed version
* There are a few instances in the codebase where it is not possible to pass both the W3 HTML validator tests, as well as Tota11y accessability tests:
    * We have a landing page with a looping video background, and Tota11y considers the <video> tag to be an <input>, so it requires a label with a matching id. But the W3 validator doesn't consider the <video> tag to be an <input>, so it tells us that our label doesn't have an associated <input>.
    * The same issue occurs on the Non-Authenticated error page, and the logout page

## Database Schema
### Users
```json
{
    "_id": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    "fullName": "John Doe",
    "email": "john.doe@gmail.com",
    "hashedPassword": "$2a$08$XdvNkfdNIL8F8xsuIUeSbNOFgK0M0iV5HOskfVn7.PWncShU.O", 
    "schedules":
        ["3a647a2-c0d2-4f8c-b27a-6a1d4b5b5100",
        "5t487a2-c0d2-4f8c-b27a-6a1d4b5b1111"] 
}
```
| Name          | Type          | Description  									   |
| ------------- |:-------------:| :-----------------------------------------------|
| _id           | ObjectId      | A globally unique id to represent the user.      |
| fullName      | String        | The user’s full name     						   |
| email         | String        | The email address associated with the user   	   |
| hashedPassword| String        | The user’s password, hashed with bcrypt   	   |
| schedules     | Array of ObjectIds  | A list of schedule ids that the user is associated with (created or invited)   |

### Schedules
```json
{
    "_id": "5y489a2-c0d2-4f8c-b27a-6a1d4b5784511",
    "creator": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    "dateCreated": "Mon Mar 26 2019 21:03:02 GMT-0400 (Eastern Daylight Time)", 
    "title": "CS546 Meeting",
   "description": "Meet to work on database proposal",
   "numInvitees": 2,
   "users": [ 
       "3a647a2-c0d2-4f8c-b27a-6a1d4b5b5100",
       "5t487a2-c0d2-4f8c-b27a-6a1d4b5b1111"
   ],
   "dates": [ 
       "Mon Apr 01 2019",
       "Tues Apr 02 2019",
       "Thurs Apr 04 2019",
   ],
   "responses": [
       {
           "user": "3a647a2-c0d2-4f8c-b27a-6a1d4b5b5100",
           "availability": [
               {
                   "date": "Mon Apr 01 2019",
                   "times": ["1 PM, 3 PM, 5 PM"]
               }
            ]
        }
    ]
}
```
| Name          | Type          | Description  									   |
| ------------- |:-------------:| :-----------------------------------------------|
| _id           | ObjectId      | A globally unique id to represent the schedule.      |
| creator       | ObjectId      | An id to represent the user who created the schedule.      |
| dateCreated   | Date Object  | The date that the schedule was created     |
| users     | Array of ObjectIds      | A list of users associated with the schedule (the users who have been invited to edit, and the creator)  |
| title       | String      | A title for the schedule      |
| description       | String    | A description for the schedule      |
| numInvitees       | Int    | The number of user invited to edit the schedule      |
| dates       | Array of Date objects    | A list of dates containing the days being considered to meet      |
##### 'responses' object
| Name          | Type          | Description  									   |
| ------------- |:-------------:| :-----------------------------------------------|
| user          | ObjectId      | The id of the user who responded     |
| availability          | Array of objects    | List of objects to store the date and time availability selected by the user   |
##### 'availability' object
| Name          | Type          | Description  									   |
| ------------- |:-------------:| :-----------------------------------------------|
| date          | Date object      | The date that the user is available    |
| times         | Array of strings    | List of times the user is available on that date   |

### Notes
```json
{
   "_id": "5y489a2-c0d2-4f8c-b27a-6a1d4b5784511",
   "scheduleId": "5t487a2-c0d2-4f8c-b27a-6a1d4b5b1111", 
   "userId": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
   "user": "John Doe",
   "comment": "I can only meet on Monday"
}
```
| Name          | Type          | Description  									   |
| ------------- |:-------------:| :-----------------------------------------------|
| _id           | ObjectId      | A globally unique id to represent the note      |
| scheduleId    | ObjectId      | The id of the schedule associated with this note    |
| userId    | ObjectId      | The id of the user who created this note |
| comment   | String    | The content for this note    |


