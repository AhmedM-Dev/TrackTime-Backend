import uuid from 'uuid/v1';

const createEvent = ({ db, body }, res) => {

  console.log('[CREATE EVENT] ', body);

  db.collection("events").find({
    title: body.title,

  }).toArray((error, result) => {
    if (error) {
      return res.status(500).json({
        errorMessage: "Something went wrong."
      });
    }
   
    db.collection('events').insertOne({
      eventId: uuid(),
      title: body.title,
      details: body.details,
      logo: body.logo,
      photo: body.photo,
      dateFrom: body.dateFrom,
      dateTo: body.dateTo,
      photoFileName: body.photoFileName,
      logoName: body.logoName
    },

      db.collection('notifications').insertOne({
        notifId: uuid(),
        title: `${body.title} : New upcaming event` ,
        content: body.details,
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
      }),


      function (err, result) {
        if (err) {
          console.log("An error occured.");
          return res.status(400).json({
            error: err
          });
        } else if (result) {
          console.log("RESULT:", result);

          db.collection("events").find({ title: body.title }).toArray((error, addedEvent) => {
            if (error) {
              return res.status(500).json({
                errorMessage: "Something went wrong."
              });
            }


            if (addedEvent) {
              return res.status(200).json({
                event: addedEvent[0]
              });
            }
          })
        }
      });

  });
}

export default createEvent;