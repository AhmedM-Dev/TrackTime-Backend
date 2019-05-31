import express from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";

import router from "./routes/routes";

const PORT = process.env.PORT || process.argv[2] || 5000;

const app = express();

app.use(cors());

app.use(json());
app.use(urlencoded({extended: true}));

app.use(router);

app.listen(PORT, () => {
  console.log("TrackTime Backend server is running on port " + PORT);
});

export default app;
