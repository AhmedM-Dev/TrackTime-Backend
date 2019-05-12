import jwt from "jsonwebtoken";

import config from "../../../config/config.json";

const deleteGroup = ({ db, params, headers }, res) => {

  jwt.verify(headers['auth-token'], config.secret, function (err, decoded) {
    if (err) {
      return res.status(400).json({
        error
      });
    }

    if (decoded) {
      db.collection('groups').deleteOne({
        group_id: parseInt(params.group_id)
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

      // try {
      //   db.orders.deleteOne({ "group_id": { $lt: ISODate("2015-11-01T12:40:15Z") } });
      // } catch (e) {
      //   print(e);
      // }

    } else {
      return res.status(500).json({
        errorMessage: "Invalid token."
      });
    }
  });
};

export default deleteGroup;