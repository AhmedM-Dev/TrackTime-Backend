import initFirebase from "../../initFirebase";
const createTravel = (req, res) => {
    console.log(req.body);
    initFirebase
        .firestore()
        .collection("travels")
        .add({
            userId: req.body.userId,
            travelType:req.body.travelType,
            conductor :req.body.conductor,
            startDate: req.body.startDate,
            startTime: req.body.startTime,
            endDate: req.body.endDate,
            endTime: req.body.endTime,
            type:req.body.type,
            destinationAdress:req.body.destinationAdress,
        })
        .then(ref => {
            console.log('Added document with ID: ', ref.id);
            return res.status(200).json({
                response: ref.id
            });
        })
        .catch(err => {
            console.log("Error creating documents", err);
            return res.status(400).json({
                error: err
            });
        });

   
}

export default createTravel;
