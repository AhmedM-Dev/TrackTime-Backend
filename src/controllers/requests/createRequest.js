import initFirebase from "../../initFirebase";
const createRequest = (req, res) => {
    console.log(req.body);
    initFirebase
        .firestore()
        .collection("requests")
        .add({
            userId: req.body.userId,
            startDate: req.body.startDate,
            startTime: req.body.startTime,
            endDate: req.body.endDate,
            endTime: req.body.endTime,
            category: req.body.category,
            motif: req.body.motif
        })
        .then(ref => {
            console.log('Added document with ID: ', ref.id);
        })
        .catch(err => {
            console.log("Error creating documents", err);
            res.status(400).json({
                error: err
            });
        });

    initFirebase
        .firestore()
        .collection("notifications")
        .add({
            userId: req.body.userId,
            startDate: req.body.startDate,
            startTime: req.body.startTime,
            endDate: req.body.endDate,
            endTime: req.body.endTime,
            category: req.body.category,
            motif: req.body.motif
        })
        .then(ref => {
            console.log('Added document with ID: ', ref.id);
        })
        .catch(err => {
            console.log("Error creating documents", err);
            res.status(400).json({
                error: err
            });
        });
}

export default createRequest;