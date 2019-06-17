import express from "express";
import { MongoClient } from 'mongodb';
import jwt from "jsonwebtoken";

import scheduler from '../scheduler';

import config from "../../config/config.json";

import authenticate from "../controllers/authentication/authenticate";

import getUsers from "../controllers/users/getUsers"
import getAvatar from "../controllers/users/getAvatar.js";
import uploadAvatar from "../controllers/users/uploadAvatar";
import registerUser from "../controllers/users/registerUser";
import updateUser from "../controllers/users/updateUser";
import deleteUser from "../controllers/users/deleteUser";
import generateUsers from "../controllers/users/generateUsers";

import updateProfile from "../controllers/users/updateProfile";

import getGroups from "../controllers/groups/getGroups";
import createGroup from "../controllers/groups/createGroup";
import updateGroup from "../controllers/groups/updateGroup";
import deleteGroup from "../controllers/groups/deleteGroup";
import generateGroups from "../controllers/groups/generateGroups";

import getStats from "../controllers/dashboard/getStats";

import getCalendarData from "../controllers/calendar/getCalendarData";

import getAttendances from "../controllers/attendances/getAttendances";
import checkIn from "../controllers/attendances/checkIn";
import updateAttendance from "../controllers/attendances/updateAttendance";
import generateAttendances from "../controllers/attendances/generateAttendances.js";

import getRequests from "../controllers/requests/getRequests";
import createRequest from "../controllers/requests/createRequest";
import editRequest from "../controllers/requests/editRequest";
import respondToLeaveRequest from "../controllers/requests/respondToLeaveRequest";

import getEvents from "../controllers/events/getEvents";
import createEvent from "../controllers/events/createEvent";
import updateEvent from "../controllers/events/updateEvent";
import deleteEvent from "../controllers/events/deleteEvent";

import getTravels from "../controllers/travels/getTravels";
import createTravel from "../controllers/travels/createTravel";
import updateTravel from "../controllers/travels/updateTravel";

import getHolidays from "../controllers/holidays/getHolidays";
import addHoliday from "../controllers/holidays/addHoliday";
import editHoliday from "../controllers/holidays/editHoliday";
import removeHoliday from "../controllers/holidays/removeHoliday";

import getHistory from "../controllers/history/getHistory";

import getNotifications from "../controllers/notifications/getNotifications";
import vueNotification from "../controllers/notifications/vueNotification";

import generateLeaveCredit from '../controllers/leaveCredit/generateLeaveCredit';

let database = null;
MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true }, function (err, db) {   //here db is the client obj
  if (err) {
    console.error("Unable to connect to MongoDB database server at:", "localhost:27017");
  } else {
    database = db.db(config.DATABASE);

    scheduler(database);
  }
});

const router = express.Router();

router.all('*', function (req, res, next) {
  if (req.path === "/tracktime/api/auth") {
    req.db = database;
    next();
  } else {
    if (database) {
      jwt.verify(req.headers['auth-token'], config.secret, (err, decoded) => {
        if (err) {
          return res.status(500).json({
            error: err
          });
        }

        if (decoded) {
          req.user = decoded.user;
          req.db = database;
          // console.log('DECODED USER:', decoded);
          next();
        } else {
          return res.status(501).json({
            errorMessage: "Invalid token."
          });
        }
      });
    } else {
      return res.status(500).json({
        errorMessage: "Unable to connect to MongoDB database server at:" + " \"localhost:27017\""
      });
    }
  }
});

router.post("/tracktime/api/auth", authenticate);

router.get("/tracktime/api/users", getUsers);
router.post("/tracktime/api/users", registerUser);
router.put("/tracktime/api/users/:userId", updateUser);
router.delete("/tracktime/api/users/:userId", deleteUser);
router.patch("/tracktime/api/users", generateUsers);
router.put("/tracktime/api/profile/:userId", updateProfile);

router.get("/tracktime/api/avatar", getAvatar);
router.put("/tracktime/api/avatar", uploadAvatar);

router.get("/tracktime/api/groups", getGroups);
router.post("/tracktime/api/groups", createGroup);
router.put("/tracktime/api/groups/:groupId", updateGroup);
router.delete("/tracktime/api/groups/:groupId", deleteGroup);
router.patch("/tracktime/api/groups", generateGroups);

router.get("/tracktime/api/stats", getStats);

router.get("/tracktime/api/calendar", getCalendarData);

router.get("/tracktime/api/attendances", getAttendances);
router.post("/tracktime/api/attendances", checkIn);
// router.put("/tracktime/api/attendances/:id", updateAttendance);
router.patch("/tracktime/api/attendances", generateAttendances);

router.get("/tracktime/api/requests", getRequests);
router.post("/tracktime/api/requests", createRequest);
router.put("/tracktime/api/requests/:requestId/edit", editRequest);
router.put("/tracktime/api/requests/:requestId/respond", respondToLeaveRequest);

router.get("/tracktime/api/events", getEvents);
router.post("/tracktime/api/events", createEvent);
router.put("/tracktime/api/events/:eventId", updateEvent);
router.delete("/tracktime/api/events/:eventId", deleteEvent);

router.get("/tracktime/api/travels", getTravels);
router.post("/tracktime/api/travels", createTravel);
// router.put("/tracktime/api/travels/:travelId", updateTravel);

router.get("/tracktime/api/holidays", getHolidays);
router.post("/tracktime/api/holidays", addHoliday);
router.put("/tracktime/api/holidays/:holidayId", editHoliday);
router.delete("/tracktime/api/holidays/:holidayId", removeHoliday);

// router.get("/tracktime/api/history", getHistory);

router.get("/tracktime/api/notifications", getNotifications);
router.put("/tracktime/api/notifications/:notifId", vueNotification);

router.put("/tracktime/api/leavecredit", generateLeaveCredit);

export default router;
