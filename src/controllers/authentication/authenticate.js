import jwt from "jsonwebtoken";

import config from "../../../config/secret.json";

// import initFirebase from "../../initFirebase";

const authenticate = ({ db, body }, res) => {

  const { email, pass } = body;

  db.collection('users').find({
    username: "ahmed.m"
  }).toArray(function (err, result) {
    if (err) throw err

    console.log("result", result);

    if (result[0]) {
      const { _id, ...user } = result[0];

      const token = jwt.sign({ user }, config.secret, { expiresIn: '48h' });
      const { password, ...userWithoutPassword } = user;

      console.log('USER:', {
        ...userWithoutPassword,
        token
      });

      return res.status(200).json({
        user: {
          ...userWithoutPassword,
          token
        }
      });
    } else {
      return res.status(400).json({ error: 'Username or password is incorrect' });
    }
  });

  // initFirebase
  //   .auth()
  //   .signInWithEmailAndPassword(email, pass)
  //   .then(user => {

  //     initFirebase
  //       .firestore()
  //       .collection("users").where("email", '==', user.user.email)
  //       .get()
  //       .then(snapshot => {
  //         let users = [];
  //         snapshot.forEach(doc => {
  //           console.log(doc.id, "=>", doc.data());
  //           users.push(doc.data())
  //         });

  //         return res.status(200).json({
  //           user: users[0]
  //         });
  //       })
  //       .catch(err => {
  //         console.log("Error getting document", err);
  //         return res.status(400).json({
  //           error: err
  //         });
  //       });
  //   })
  //   .catch(error => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     if (errorCode === "auth/wrong-password") {
  //       console.error("Wrong password.");
  //     } else {
  //       console.error(errorMessage);
  //     }

  //     return res.status(400).json({
  //       error: errorMessage
  //     });
  //   });
};

export default authenticate;
