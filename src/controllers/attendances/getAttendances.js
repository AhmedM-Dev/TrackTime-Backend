import { takeRight, orderBy } from "lodash";

const getAttendances = ({ user, db, query }, res) => {

  console.log("[REQUEST] ", query);

  db.collection("attendances").find({
    userId: user.userId
  }).toArray((error, result) => {
    if (error) {
      return res.status(500).json({
        errorMessage: "Something went wrong."
      });
    }

    if (result.length > 0) {
      return res.status(200).json({
        attendances: takeRight(orderBy(result, 'date', 'desc'), 10)
      });
    } else {
      return res.status(400).json({
        errorMessage: "No data found."
      });
    }
  });
};

export default getAttendances;
