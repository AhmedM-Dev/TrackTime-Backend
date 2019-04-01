import initFirebase from "../../initFirebase";

const getHistory = (req, res) => {
  initFirebase
    .firestore()
    .collection("history")
    .get()
    .then(snapshot => {
      let history = [];
      snapshot.forEach(doc => {
        console.log(doc.id, "=>", doc.data());
        history.push(doc.data())
      });
      return res.status(200).json({
        history: history
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
      res.status(400).json({
        error: err
      });
    });
};

export default getHistory;
