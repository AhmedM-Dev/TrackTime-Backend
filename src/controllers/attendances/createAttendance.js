import initFirebase from "../../initFirebase";
import ATTENDANCES1 from "../../../db/tracktime-attendances(1).json";
import ATTENDANCES2 from "../../../db/tracktime-attendances(2).json";
import ATTENDANCES3 from "../../../db/tracktime-attendances(3).json";

const createAttendance = ({ db, body }, res) => {

  console.log(body);

  // Insert multiple documents
  db.collection('attendances').insertMany(ATTENDANCES3, function (err, result) {
    if (err) {
      console.log("An error occured.");
      return res.status(400).json({
        error: err
      });
    } else if (result) {
      return res.status(200).json({
        result
      });
    }
  });

  // ATTENDANCES1.map(item => {
  //   // initFirebase
  //   // .firestore()
  //   // .collection("attendances")
  //   // .add({
  //   //   id: item.id,
  //   //   userId: item.userId,
  //   //   date: item.date,
  //   //   attendances: item.attendances
  //   // })
  //   // .then(ref => {
  //   //   console.log('Added document with ID: ', ref.id);
  //   // })
  //   // .catch(err => {
  //   //   console.log("Error creating documents", err);
  //   //   res.status(400).json({
  //   //     error: err
  //   //   });
  //   // });
  // })
}

export default createAttendance;