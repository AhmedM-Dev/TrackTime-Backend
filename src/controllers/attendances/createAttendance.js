import initFirebase from "../../initFirebase";
import ATTENDANCES from "../../../db/tracktime-attendances.json";

const createAttendance = (req, res) => {

  console.log(req.body);

  ATTENDANCES.map(item => {
    initFirebase
    .firestore()
    .collection("attendances")
    .add({
      id: item.id,
      userId: item.userId,
      date: item.date,
      attendances: item.attendances
    })
    .then(ref => {
      console.log('Added document with ID: ', ref.id);
    })
    .catch(err => {
      console.log("Error creating documents", err);
      res.status(400).json({
        error: err
      });
    });
  })
}

export default createAttendance;