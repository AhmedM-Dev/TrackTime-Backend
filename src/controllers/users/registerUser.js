import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import config from "../../../config/config.json";

const registerUser = ({ db, body, headers }, res) => {

  jwt.verify(headers['auth-token'], config.secret, function (err, decoded) {
    if (err) {
      return res.status(400).json({
        error
      });
    }

    if (decoded) {

      db.collection("users").find({
        email: body.email
      }).toArray((error, result) => {
        if (error) {
          return res.status(500).json({
            errorMessage: "Something went wrong."
          });
        }

        if (result.length > 0) {
          return res.status(500).json({
            errorMessage: "A user with this email already exist."
          });
        } else {
          db.collection("users").find({}).toArray((error, result) => {
            if (error) {
              return res.status(500).json({
                errorMessage: "Something went wrong."
              });
            }

            db.collection('users').insertOne({
              userId: result.length + 1,
              username: body.username,
              email: body.email,
              password: bcrypt.hashSync(body.password),
              displayName: body.displayName,
              job_title: body.job_title
            }, function (err, result) {
              if (err) {
                console.log("An error occured.");
                return res.status(400).json({
                  error: err
                });
              } else if (result) {
                console.log("RESULT:", result);
                return res.status(200).json({
                  result
                });
              }
            });

          });
        }
      });
    } else {
      return res.status(500).json({
        errorMessage: "Invalid token."
      });
    }
  });


}

export default registerUser;