import jwt from "jsonwebtoken";
import { trim } from "lodash";

import config from "../../../config/config.json";

const getAvatar = ({ user, db }, res) => {
  db.collection("avatars").find({
    userId: parseInt(user.userId)
  }).toArray((error, result) => {
    if (error) {
      return res.status(500).json({
        errorMessage: "Something went wrong."
      });
    }

    if (result.length > 0) {

      console.log("result[0]", result[0]);

      return res.status(200).json({
        photo: trim(result[0].photo)
      });
    } else {
      return res.status(400).json({
        errorMessage: "No data found."
      });
    }
  });
};

export default getAvatar;
