const updateTravel = ({ db, body, params }, res) => {
    console.log('updating:', params);
  
    db.collection('events').updateOne(
      { _id: parseInt(params.eventId) },
      { $set: { ...body } },
  
      function (err, result) {
        if (err) {
          console.log("An error occured.");
          return res.status(400).json({
            error: err
          });
        } else if (result) {
  
          if (JSON.parse(result).nModified > 0) {
            db.collection('events').find({
                eventId: parseInt(params.eventId)
            }).toArray((error, result) => {
              if (error) {
                console.log("An error occured.");
                return res.status(400).json({
                  error
                });
              } else {
                console.log('result ===>', result[0]);
  
                return res.status(200).json({
                  event: result[0]
                });
              }
            })
          } else {
            return res.status(200).json({
              info: "Nothing to update."
            });
          }
        }
      });
  };
  
  export default updateTravel;