import initFirebase from "../../initFirebase";

const getTravels = (req, res) => {
  initFirebase
    .firestore()
    .collection("travels")
    .get()
    .then(snapshot => {
      let travels = [];
      snapshot.forEach(doc => {
        console.log(doc.id, "=>", doc.data());
        travels.push(doc.data())
      });
      return res.status(200).json({
        travels: travels
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
      res.status(400).json({
        error: err
      });
    });
};

export default getTravels;
