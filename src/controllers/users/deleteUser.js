import jwt from "jsonwebtoken";

import config from "../../../config/config.json";

const deleteUser = ({ db, params }, res) => {
  db.collection('users').deleteOne({
    userId: parseInt(params.userId)
  }, function (err, result) {
    if (err) {
      console.log("An error occured.");
      return res.status(400).json({
        error: err
      });
    } else if (result) {
      return res.status(200).json({
        result
      });
    }
  });
};

export default deleteUser;