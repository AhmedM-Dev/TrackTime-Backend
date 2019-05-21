const deleteEvent = ({ db, params }, res) => {
  db.collection('events').deleteOne({
    eventId: parseInt(params.eventId)
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

export default deleteEvent;