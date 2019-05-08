import initFirebase from "../../initFirebase";

const getTravels = (req, res) => {

  console.log("headers", req.header('auth-token'));

  initFirebase
    .firestore()
    .collection("travels")
    .where("userId", "==", parseInt(req.query.userId))
    .get()
    .then(snapshot => {
      let travels = [];
      snapshot.forEach(doc => {
        console.log(doc.id, "=>", doc.data());
        travels.push(doc.data());
      });
      return res.status(200).json({
        travels: travels
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
      return res.status(400).json({
        error: err
      });
    });
};

export default getTravels;
