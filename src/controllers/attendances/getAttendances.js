import initFirebase from "../../initFirebase";



const getAttendances = (req, res) => {

  console.log("[REQUEST] ", req.query);
  if (req.query.userId) {
    initFirebase
      .firestore()
      .collection("attendances").where("userId", "==", parseInt(req.query.userId))
      .get()
      .then(snapshot => {
        let attendances = [];
        snapshot.forEach(doc => {
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
  } else {
    res.status(400).json({
      error: "You must give a user ID"
    });
  }
};

export default getAttendances;
