const getNotifications = ({ user, db }, res) => {
  db.collection("notifications").find({}).toArray((error, result) => {
    if (error) {
      return res.status(500).json({
        errorMessage: "Something went wrong."
      });
    }

    if (result.length > 0) {

      console.log("Notifications:", result.filter(notif => notif.userId === user.userId || notif.toAll));

      return res.status(200).json({
        notifications: result.filter(notif => notif.userId === user.userId || notif.toAll)
      });
    } else {
      return res.status(400).json({
        errorMessage: "No data found."
      });
    }
  });
};

export default getNotifications;
