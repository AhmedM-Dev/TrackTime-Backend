import initFirebase from "../../initFirebase";

const createTravel = ({ db, body }, res) => {
    console.log(body);

    db.collection('travels').insertOne({
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

    // initFirebase
    //     .firestore()
    //     .collection("travels")
    //     .add({
    //         userId: body.userId,
    //         travelType:body.travelType,
    //         conductor :body.conductor,
    //         startDate: body.startDate,
    //         startTime: body.startTime,
    //         endDate: body.endDate,
    //         endTime: body.endTime,
    //         type:body.type,
    //         destinationAdress:body.destinationAdress,
    //     })
    //     .then(ref => {
    //         console.log('Added document with ID: ', ref.id);
    //         return res.status(200).json({
    //             response: ref.id
    //         });
    //     })
    //     .catch(err => {
    //         console.log("Error creating documents", err);
    //         return res.status(400).json({
    //             error: err
    //         });
    //     });
}

export default createTravel;
