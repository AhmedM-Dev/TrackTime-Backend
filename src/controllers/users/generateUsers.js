import bcrypt from "bcryptjs";

import USERS from '../../../db/new/tracktime-users.json';

const generateUsers = ({ db }, res) => {

  // Insert multiple documents
  db.collection('users').insertMany([...USERS], function (err, result) {
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

export default generateUsers;