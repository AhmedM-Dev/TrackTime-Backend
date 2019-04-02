import express from "express";

import authenticate from "../controllers/authentication/authenticate";

import getUsers from "../controllers/users/getUsers"
import registerUser from "../controllers/users/registerUser";
import updateUser from "../controllers/users/updateUser";

import getResume from "../controllers/dashboard/getResume";

import getAttendances from "../controllers/attendances/getAttendances";
import createAttendance from "../controllers/attendances/createAttendance";
import updateAttendance from "../controllers/attendances/updateAttendance";

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


const router = express.Router();

router.post("/tracktime/api/auth", authenticate);

router.get("/tracktime/api/users", getUsers);
router.post("/tracktime/api/register", registerUser);
// router.put("/tracktime/api/register/:id", updateUser);

// router.get("/tracktime/api/resume", getResume);

// router.get("/tracktime/api/attendances", getAttendances);
router.post("/tracktime/api/attendances", createAttendance);
// router.put("/tracktime/api/attendances/:id", updateAttendance);

// router.get("/tracktime/api/requests", getRequests);
// router.post("/tracktime/api/requests", createRequest);
// router.put("/tracktime/api/requests/:id", updateRequest);

// router.get("/tracktime/api/events", getEvents);
// router.post("/tracktime/api/events", createEvent);
// router.put("/tracktime/api/events/:id", updateEvent);

// router.get("/tracktime/api/travels", getTravels);
// router.post("/tracktime/api/travels", createTravel);
// router.put("/tracktime/api/travels/:id", updateTravel);

// router.get("/tracktime/api/history", getHistory);

export default router;
