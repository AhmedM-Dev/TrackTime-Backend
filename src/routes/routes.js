import express from "express";
import authenticate from "../controllers/authenticate";
import getUsers from "../controllers/users/getUsers"
import registerUser from "../controllers/users/registerUser";

const router = express.Router();

router.post("/tracktime/api/auth", authenticate);

router.get("/tracktime/api/users", getUsers);
router.post("/tracktime/api/register", registerUser);
router.put("/tracktime/api/register/:id", updateUser);

router.get("/tracktime/api/resume", getResume);

router.get("/tracktime/api/attendances", getAttendances);
router.post("/tracktime/api/attendances", createAttendance);
router.put("/tracktime/api/attendances/:id", updateAttendance);

router.get("/tracktime/api/requests", getRequests);
router.post("/tracktime/api/requests", createRequest);
router.put("/tracktime/api/requests/:id", updateRequest);

router.get("/tracktime/api/events", getEvents);
router.post("/tracktime/api/events", createEvent);
router.put("/tracktime/api/events/:id", updateEvent);

router.get("/tracktime/api/travels", getTravels);
router.post("/tracktime/api/travels", createTravel);
router.put("/tracktime/api/travels/:id", updateTravel);

router.get("/tracktime/api/history", getHistory);

export default router;
