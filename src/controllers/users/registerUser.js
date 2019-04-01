import initAdminFirebase from "../../initAdminFirebase";

const registerUser = (req, res) => {
  const {first_name, last_name, email, pass} = req.body;
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
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully created new user:", userRecord.uid);
    })
    .catch(function(error) {
      console.log("Error creating new user:", error);
    });
}

export default registerUser;

