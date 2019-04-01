import initFirebase from "../../initFirebase";

const getAttendances = (req, res) => {
  initFirebase
    .firestore()
    .collection("attendances")
    .get()
    .then(snapshot => {
      let attendances = [];
      snapshot.forEach(doc => {
        console.log(doc.id, "=>", doc.data());
        attendances.push(doc.data())
      });
      return res.status(200).json({
        attendances: attendances
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
      res.status(400).json({
        error: err
      });
    });
};

export default getAttendances;
