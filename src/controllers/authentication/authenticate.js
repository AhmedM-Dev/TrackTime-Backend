import initFirebase from "../initFirebase";

const authenticate = (req, res) => {
  const { email, pass } = req.body;
  console.log(req.body);
  initFirebase
    .auth()
    .signInWithEmailAndPassword(email, pass)
    .then(user => {
      console.log("Authentication successfull :)");
      return res.status(200).json({
        user: user
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
