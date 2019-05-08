import jwt from "jsonwebtoken";

import config from "../../../config/config.json";

// import initFirebase from "../../initFirebase";

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
            attendances: result
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

  // invalid token

  // initFirebase
  //   .firestore()
  //   .collection("attendances")
  //   .where("userId", "==", parseInt(query.userId))
  //   .get()
  //   .then(snapshot => {
  //     let attendances = [];
  //     snapshot.forEach(doc => {
  //       if (query.year) {
  //         if (new Date(doc.data().date).getFullYear() === parseInt(query.year)) {
  //           console.log("doc data:", doc.data());
  //           attendances.push(doc.data());
  //         } 
  //       } else {
  //         attendances.push(doc.data());
  //       }
  //     });
  //     return res.status(200).json({
  //       attendances: attendances
  //     });
  //   })
  //   .catch(err => {
  //     console.log("Error getting documents", err);
  //     res.status(400).json({
  //       error: err
  //     });
  //   });
};

export default getAttendances;
