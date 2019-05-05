import initAdminFirebase from "../../initAdminFirebase";
import USERS from "../../../db/tracktime-users.json";

import { MongoClient } from 'mongodb';

const registerUser = (req, res) => {

  // const name = req.body.name;
  // const email = req.body.email;
  // const password = bcrypt.hashSync(req.body.password);

  // createUser([name, email, password], (err) => {
  //   if (err) return res.status(500).send("Server error!");
  //   findUserByEmail(email, (err, user) => {
  //     if (err) return res.status(500).send('Server error!');
  //     const expiresIn = 24 * 60 * 60;
  //     const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
  //       expiresIn: expiresIn
  //     });
  //     res.status(200).send({
  //       "user": user, "access_token": accessToken, "expires_in": expiresIn
  //     });
  //   });
  // });


  //   const { first_name, last_name, email, pass } = req.body;
  //   initAdminFirebase.auth().createUser({
  //     uid: first_name + "." + last_name,
  //     email: email,
  //     emailVerified: false,
  //     phoneNumber: "+21655904000",
  //     password: pass,
  //     displayName: first_name + " " + last_name,
  //     photoURL: "http://www.example.com/12345678/photo.png",
  //     disabled: false
  //   })
  //     .then(function (userRecord) {
  //       // See the UserRecord reference doc for the contents of userRecord.
  //       console.log("Successfully created new user:", userRecord.uid);
  //     })
  //     .catch(function (error) {
  //       console.log("Error creating new user:", error);
  //     });
}



export default registerUser;

