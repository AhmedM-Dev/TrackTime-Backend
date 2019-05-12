import jwt from "jsonwebtoken";
import { takeRight } from "lodash";

import config from "../../../config/config.json";

const getAttendances = ({ db, query, headers }, res) => {

  console.log("[REQUEST] ", query);

  jwt.verify(headers['auth-token'], config.secret, function (err, decoded) {
    if (err) {
      return res.status(400).json({
        error
      });
    }

    if (decoded) {
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
    } else {
      return res.status(500).json({
        errorMessage: "Invalid token."
      });
    }
  });
};

export default getAttendances;
