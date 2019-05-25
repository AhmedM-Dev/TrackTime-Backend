// import initFirebase from "../../initFirebase";

import GROUPS from "../../../db/new/tracktime-groups.json";

const generateGroups = ({ db, body }, res) => {

  console.log(body);

  // Insert multiple documents
  db.collection('groups').insertMany(GROUPS, function (err, result) {
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

export default generateGroups;