import express from "express";
import { MongoClient } from 'mongodb';

import config from "../../config/config.json";

import authenticate from "../controllers/authentication/authenticate";

import getUsers from "../controllers/users/getUsers"
import getAvatar from "../controllers/users/getAvatar.js";
import registerUser from "../controllers/users/registerUser";
import updateUser from "../controllers/users/updateUser";

import getStats from "../controllers/dashboard/getStats";

import getAttendances from "../controllers/attendances/getAttendances";
import createAttendance from "../controllers/attendances/createAttendance";
import updateAttendance from "../controllers/attendances/updateAttendance";
import generateAttendances from "../controllers/attendances/generateAttendances.js";

import getRequests from "../controllers/requests/getRequests";
import createRequest from "../controllers/requests/createRequest";
import updateRequest from "../controllers/requests/updateRequest";

import getEvents from "../controllers/events/getEvents";
import createEvent from "../controllers/events/createEvent";
import updateEvent from "../controllers/events/updateEvent";

import getTravels from "../controllers/travels/getTravels";
import createTravel from "../controllers/travels/createTravel";
import updateTravel from "../controllers/travels/updateTravel";

import getHistory from "../controllers/history/getHistory";

import getNotifications from "../controllers/notifications/getNotifications";


const router = express.Router();

router.all('*', function (req, res, next) {
    MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true }, function (err, db) {   //here db is the client obj
        if (err) throw err;
        req.db = db.db(config.DATABASE);
        next();
    });
});

router.post("/tracktime/api/auth", authenticate);

router.get("/tracktime/api/users", getUsers);
router.get("/tracktime/api/avatar", getAvatar);
router.post("/tracktime/api/register", registerUser);
// router.put("/tracktime/api/register/:id", updateUser);

router.get("/tracktime/api/stats", getStats);

router.get("/tracktime/api/attendances", getAttendances);
router.post("/tracktime/api/attendances", createAttendance);
// router.put("/tracktime/api/attendances/:id", updateAttendance);
router.patch("/tracktime/api/attendances", generateAttendances);

// router.get("/tracktime/api/requests", getRequests);
router.post("/tracktime/api/requests", createRequest);
// router.put("/tracktime/api/requests/:id", updateRequest);

// router.get("/tracktime/api/events", getEvents);
// router.post("/tracktime/api/events", createEvent);
// router.put("/tracktime/api/events/:id", updateEvent);

router.get("/tracktime/api/travels", getTravels);
router.post("/tracktime/api/travels", createTravel);
// router.put("/tracktime/api/travels/:id", updateTravel);

// router.get("/tracktime/api/history", getHistory);

router.get("/tracktime/api/notifications", getNotifications);

export default router;
