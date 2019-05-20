const getGroups = ({ db }, res) => {
  db.collection("groups").find({}).toArray((error, result) => {
    if (error) {
      return res.status(500).json({
        errorMessage: "Something went wrong."
      });
    }

    if (result.length > 0) {
      return res.status(200).json({
        groups: result
      });
    } else {
      return res.status(400).json({
        errorMessage: "No data found."
      });
    }
  });
};

export default getGroups;
