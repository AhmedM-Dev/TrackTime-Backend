import { take, orderBy } from "lodash";

const getRequests = ({ user, db, query }, res) => {

  console.log("[REQUEST] ", query);

  db.collection("requests").find({
    fromUser: user.userId
  }).toArray((error, result) => {
    if (error) {
      return res.status(500).json({
        errorMessage: "Something went wrong."
      });
    }

    if (result.length > 0) {

      return res.status(200).json({
        requests: requests
      });

    } else {
      return res.status(400).json({
        errorMessage: "No data found."
      });
    }
  });
};

export default getRequests;
