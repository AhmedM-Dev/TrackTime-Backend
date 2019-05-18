const updateAttendance = ({ db, body, params }, res) => {
  console.log('updating:', params);

  db.collection('groups').updateOne({ _id: parseInt(params.groupId) }, {
    $set:
    {
      name: body.name
    }
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

export default updateAttendance;