import initFirebase from "../../initFirebase";
import ATTENDANCES1 from "../../../db/tracktime-attendances(1).json";
import ATTENDANCES2 from "../../../db/tracktime-attendances(2).json";
import ATTENDANCES3 from "../../../db/tracktime-attendances(3).json";

const createAttendance = (req, res) => {

  console.log(req.body);

  ATTENDANCES1.map(item => {
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

  ATTENDANCES2.map(item => {
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

  ATTENDANCES3.map(item => {
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