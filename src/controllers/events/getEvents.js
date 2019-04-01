import initFirebase from "../../initFirebase";

const getEvents = (req, res) => {
  initFirebase
    .firestore()
    .collection("events")
    .get()
    .then(snapshot => {
      let events = [];
      snapshot.forEach(doc => {
        console.log(doc.id, "=>", doc.data());
        events.push(doc.data())
      });
      return res.status(200).json({
        events: events
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
      res.status(400).json({
        error: err
      });
    });
};

export default getEvents;
