const vueNotification = ({ user, db, params }, res) => {
  db.collection("notifications").updateOne(
    { notifId: params.notifId },
    { $addToSet: { vues: user.userId } }, (error, result) => {
      if (error) {
        return res.status(500).json({
          errorMessage: "Something went wrong."
        });
      }

      if (JSON.parse(result)) {

        db.collection("notifications").findOne({ notifId: params.notifId }, (error, updatedNotif) => {
          if (error) {
            return res.status(500).json({
              errorMessage: "Something went wrong."
            });
          } else {

            console.log("UP", updatedNotif);

            return res.status(200).json({
              notification: updatedNotif
            });
          }
        });

      } else {
        return res.status(500).json({
          errorMessage: "Error parsing the result."
        });
      }
    });
};

export default vueNotification;
