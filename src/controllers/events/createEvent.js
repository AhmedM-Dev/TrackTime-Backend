const createEvent = ({ db, body }, res) => {
  db.collection('events').insertOne({
    ...body
  }, function (err, result) {
    if (err) {
      console.log("An error occured.");
      return res.status(400).json({
        error: err
      });
    } else if (result) {

      db.collection('notifications').insertOne({
        title: body.title,
        category: 'EVENT',
        toAll: true
      }, (err, result) => {
        if (err) {
          console.log("An error occured.");
          return res.status(400).json({
            error: err
          });
        }
        console.log("Created notif.");
      });

      console.log("Result add event:", result);

      return res.status(200).json({
        result
      });
    }
  });
};

export default createEvent;