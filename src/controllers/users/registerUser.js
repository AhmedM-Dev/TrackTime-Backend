import initAdminFirebase from "../../initAdminFirebase";
import USERS from "../../../db/tracktime-users.json";

const registerUser = (req, res) => {

  // USERS.map(user => {
  //   initAdminFirebase.auth().createUser({
  //     avatar: user.avatar,
  //     id: user.id,
  //     first_name: user.first_name,
  //     last_name: user.last_name,
  //     username: user.username,
  //     email: user.email,
  //     job_title: user.job_title,
  //     group_id: user.group_id
  //   })
  //     .then(function (userRecord) {
  //       // See the UserRecord reference doc for the contents of userRecord.
  //       console.log("Successfully created new user:", userRecord.username);
  //     })
  //     .catch(function (error) {
  //       console.log("Error creating new user:", error);
  //     });
  // })

  const { first_name, last_name, email, pass } = req.body;
  initAdminFirebase.auth().createUser({
    uid: first_name + "." + last_name,
    email: email,
    emailVerified: false,
    phoneNumber: "+21655904000",
    password: pass,
    displayName: first_name + " " + last_name,
    photoURL: "http://www.example.com/12345678/photo.png",
    disabled: false
  })
    .then(function (userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully created new user:", userRecord.uid);
    })
    .catch(function (error) {
      console.log("Error creating new user:", error);
    });
}

export default registerUser;

