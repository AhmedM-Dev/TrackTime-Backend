import uuid from 'uuid/v1';

const createTravel = ({ db, body }, res) => {
  console.log(body);
  db.collection('travels').insertOne({
    travelId: uuid(),
    userId: body.userId,
    travelType: body.travelType,
    conductor: body.conductor,
    startDate: body.startDate,
    startTime: body.startTime,
    endDate: body.endDate,
    endTime: body.endTime,
    type: body.type,
    destinationAdress: body.destinationAdress,
  }, function (err, result) {
    if (err) {
      console.log("An error occured.");
      return res.status(400).json({
        error: err
      });
    } else if (result) {
      console.log("RESULT:", result);
      return res.status(200).json({
        result
      });
    }
  });
}

export default createTravel;
