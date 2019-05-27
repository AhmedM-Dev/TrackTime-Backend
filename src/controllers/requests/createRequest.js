import uuid from 'uuid/v1';

const createRequest = ({ user, db, body }, res) => {
  db.collection('requests').insertOne({
    requestId: uuid(),
    ...body,
    status: "pending"
  }, function (err, result) {
    if (err) {
      console.log("An error occured.");
      return res.status(400).json({
        error: err
      });
    } else if (result) {

      db.collection("groups").findOne({ groupId: user.groupId }, (error, userGroup) => {
        if (error) {
          return res.status(500).json({
            errorMessage: "Something went wrong."
          });
        }

        if (userGroup) {
          db.collection('notifications').insertOne({
            notifId: uuid(),
            title: `${user.firstName} ${user.lastName} has requested a ${body.leaveCategory}${body.leaveCategory.indexOf('leave') !== -1 ? '' : ' leave'} from ${body.dateFrom} to ${body.dateTo}.`,
            content: `${user.firstName} ${user.lastName} has requested a ${body.leaveCategory}${body.leaveCategory.indexOf('leave') !== -1 ? '' : ' leave'} from ${body.dateFrom} to ${body.dateTo}.\n\n${body.motif}`,
            category: body.requestCategory,
            targetUser: userGroup.poleLead,
            vues: []
          }, (err, result) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else if (result) {
              return res.status(200).json({
                message: "Request created successfully."
              });
            }
          });
        }
      })
    }
  });
};

export default createRequest;