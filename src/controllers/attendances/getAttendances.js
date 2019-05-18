import jwt from "jsonwebtoken";
import { takeRight } from "lodash";

import config from "../../../config/config.json";

const getAttendances = ({ db, query, headers }, res) => {

  console.log("[REQUEST] ", query);

  db.collection("attendances").find({
    userId: parseInt(decoded.user.userId)
  }).toArray((error, result) => {
    if (error) {
      return res.status(500).json({
        errorMessage: "Something went wrong."
      });
    }

    if (result.length > 0) {
      return res.status(200).json({
        attendances: takeRight(result, 10)
      });
    } else {
      return res.status(400).json({
        errorMessage: "No data found."
      });
    }
  });
};

export default getAttendances;
