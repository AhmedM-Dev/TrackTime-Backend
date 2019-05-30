const getNotifications = ({ user, db }, res) => {
  db.collection("notifications").find({}).toArray((error, result) => {
    if (error) {
      return res.status(500).json({
        errorMessage: "Something went wrong."
      });
    }

    if (result.length > 0) {

      // console.log("Notifications:", result.filter(notif => notif.userId === user.userId || notif.toAll));

      return res.status(200).json({
<<<<<<< HEAD
        notifications: result.filter(notif => notif.userId === user.targetUser || notif.toAll)
=======
        notifications: result.filter(notif => notif.targetUser === user.userId || notif.toAll)
>>>>>>> 52ad04a0d9bf483141cdea224093d5889a24aa93
      });
    } else {
      return res.status(400).json({
        errorMessage: "No data found."
      });
    }
  });
};

export default getNotifications;
