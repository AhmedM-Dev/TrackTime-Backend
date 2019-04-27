import initFirebase from "../../initFirebase";

const getNotifications = (req, res) => {
  initFirebase
    .firestore()
    .collection("notifications")
    .where("targetUserId", "==", 2)
    .get()
    .then(snapshot => {
      let notifications = [];
      snapshot.forEach(doc => {
        console.log(doc.id, "=>", doc.data());
        notifications.push(doc.data());
      });
      return res.status(200).json({
        notifications: notifications
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
      return res.status(400).json({
        error: err
      });
    });
};

export default getNotifications;
