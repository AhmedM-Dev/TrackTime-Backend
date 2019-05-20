import jwt from "jsonwebtoken";

import config from "../../../config/config.json";

const getevents = ({ db, headers }, res) => {
  db.collection("events").find({}).toArray((error, result) => {
    if (error) {
      return res.status(500).json({
        errorMessage: "Something went wrong."
      });
    }

    if (result.length > 0) {
      return res.status(200).json({
        events: result
      });
    } else {
      return res.status(400).json({
        errorMessage: "No data found."
      });
    }
  });
};

export default getevents;
