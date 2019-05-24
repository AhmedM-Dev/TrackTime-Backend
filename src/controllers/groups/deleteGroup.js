const deleteGroup = ({ db, params }, res) => {
  db.collection('groups').deleteOne({
    groupId: params.groupId
  }, function (err, result) {
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
};

export default deleteGroup;