// import initFirebase from "../../initFirebase";

import ATTENDANCES1 from "../../../db/new/tracktime-attendances(1).json";
import ATTENDANCES2 from "../../../db/new/tracktime-attendances(2).json";
import ATTENDANCES3 from "../../../db/new/tracktime-attendances(3).json";
import ATTENDANCES4 from "../../../db/new/tracktime-attendances(4).json";
import ATTENDANCES5 from "../../../db/new/tracktime-attendances(5).json";
import ATTENDANCES6 from "../../../db/new/tracktime-attendances(6).json";
import ATTENDANCES7 from "../../../db/new/tracktime-attendances(7).json";
import ATTENDANCES8 from "../../../db/new/tracktime-attendances(8).json";
import ATTENDANCES9 from "../../../db/new/tracktime-attendances(9).json";
import ATTENDANCES10 from "../../../db/new/tracktime-attendances(10).json";

const generateAttendances = ({ db, body }, res) => {

  console.log(body);

  // Insert multiple documents
  db.collection('attendances').insertMany([...ATTENDANCES1, ...ATTENDANCES2, ...ATTENDANCES3, ...ATTENDANCES4, ...ATTENDANCES5, ...ATTENDANCES6, ...ATTENDANCES7, ...ATTENDANCES8, ...ATTENDANCES9, ...ATTENDANCES10], function (err, result) {
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
}

export default generateAttendances;