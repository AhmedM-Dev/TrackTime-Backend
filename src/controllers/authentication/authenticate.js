import initFirebase from "../../initFirebase";

const authenticate = (req, res) => {
  const { email, pass } = req.body;
  initFirebase
    .auth()
    .signInWithEmailAndPassword(email, pass)
    .then(user => {

      initFirebase
        .firestore()
        .collection("users").where("email", '==', user.user.email)
        .get()
        .then(snapshot => {
          let users = [];
          snapshot.forEach(doc => {
            console.log(doc.id, "=>", doc.data());
            users.push(doc.data())
          });

          return res.status(200).json({
            user: users[0]
          });
        })
        .catch(err => {
          console.log("Error getting document", err);
          return res.status(400).json({
            error: err
          });
        });
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        console.error("Wrong password.");
      } else {
        console.error(errorMessage);
      }

      return res.status(400).json({
        error: errorMessage
      });
    });
};

export default authenticate;
