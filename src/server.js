import express from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import router from "./routes/routes";

import getUsers from "./controllers/users/getUsers";

// import initAdminFirebase from "./initAdminFirebase";
// import initFirebase from "./initFirebase";

const PORT = process.env.PORT || process.argv[2] || 5000;

const app = express();

// app.use(cors());

app.use(json());
app.use(urlencoded({extended: true}));

app.use(router);

app.listen(PORT, () => {
  console.log("TrackTime Backend server is running on port " + PORT);
});

export default app;
