import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import config from "../../../config/config.json";

const registerUser = ({ db, body }, res) => {

  console.log('[CREATE USER] ', body);

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
          displayName: `${body.firstName} ${body.lastName}`,
          jobTitle: body.jobTitle,
          phoneNumber: parseInt(body.phoneNumber),
          groupId: parseInt(body.groupId)
        }, function (err, result) {
          if (err) {
            console.log("An error occured.");
            return res.status(400).json({
              error: err
            });
          } else if (result) {
            console.log("RESULT:", result);

            db.collection("users").find({ email: body.email }).toArray((error, addedUser) => {
              if (error) {
                return res.status(500).json({
                  errorMessage: "Something went wrong."
                });
              }

              if (addedUser) {
                return res.status(200).json({
                  user: addedUser
                });
              }
            })
          }
        });
      });
    }
  });
}

export default registerUser;