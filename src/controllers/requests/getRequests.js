import initFirebase from "../../initFirebase";

const getRequests = (req, res) => {
  initFirebase
    .firestore()
    .collection("requests")
    .get()
    .then(snapshot => {
      let requests = [];
      snapshot.forEach(doc => {
        console.log(doc.id, "=>", doc.data());
        requests.push(doc.data())
      });
      return res.status(200).json({
        requests: requests
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
      res.status(400).json({
        error: err
      });
    });
};

export default getRequests;
