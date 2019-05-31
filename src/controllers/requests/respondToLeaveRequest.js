import uuid from 'uuid/v4';
import moment from 'moment';

const respondToLeaveRequest = ({ db, body, params }, res) => {

  console.log('body', body);
  console.log('params', params);

  if (body.accept || body.reject) {
    if (body.request.requestCategory === 'LEAVE') {
      if (body.accept) {
        db.collection("leaves").insertOne({
          leaveId: uuid(),
          from: body.request.dateFrom,
          sessionFrom: body.request.sessionFrom,
          dateTo: body.request.dateTo,
          sessionTo: body.request.sessionTo,
          forUser: body.request.fromUser,
          createdAt: moment().format('DD-MM-YYYY H:mm:ss'),
          createdAtTimestamp: moment().unix()
        }, (err, response) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else if (response) {
            return res.status(200).json({
              message: "Leave created successfully."
            });
          }

        });
      }


      db.collection('requests').findOneAndUpdate(
        { requestId: params.requestId },
        { $set: { status: body.accept ? 'accepted' : 'rejected' } }, (err, result) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          }

          if (result) {
            console.log("accept result.", result.value);

            db.collection('notifications').updateOne(
              { notifId: body.notifId },
              { $set: { request: { ...result.value, status: body.accept ? 'accepted' : 'rejected' } } }, (err, result) => {
                if (err) {
                  return res.status(500).json({
                    error: err
                  });
                } else if (result) {
                  console.log(`Request ${body.accept ? 'accepted' : 'rejected'}.`);
                }
              });

            db.collection("notifications").insertOne({
              notifId: uuid(),
              title: `Your request has been ${body.accept ? 'accepted' : 'rejected'}`,
              content: `Your leave request from ${body.request.dateFrom} ${body.request.sessionFrom === 1 ? 'morning' : 'afternoon'} to ${body.request.dateTo} ${body.request.sessionTo === 1 ? 'morning' : 'afternoon'} has been ${body.accept ? 'accepted' : 'rejected'}\n\n${body.note}`,
              category: 'INFO',
              targetUser: body.request.fromUser,
              vues: [],
              createdAt: moment().format('DD-MM-YYYY H:mm:ss'),
              createdAtTimestamp: moment().unix()
            }, (err, response) => {
              if (err) {
                return res.status(500).json({
                  error: err
                });
              } else if (result) {
                console.log("Notification generated.");
              }
            });
          }
        }, { returnNewDocument: true });
    } else if (body.request.requestCategory === 'AUTHORIZATION') {
      // ================= BEGIN ===================

      if (body.accept) {
        db.collection("authorizations").insertOne({
          authorizationId: uuid(),
          date: body.request.date,
          timeFrom: body.request.timeFrom,
          timeTo: body.request.timeTo,
          forUser: body.request.fromUser,
          createdAt: moment().format('DD-MM-YYYY H:mm:ss'),
          createdAtTimestamp: moment().unix()
        }, (err, response) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else if (response) {
            return res.status(200).json({
              message: "Leave created successfully."
            });
          }

        });
      }

      db.collection('requests').findOneAndUpdate(
        { requestId: params.requestId },
        { $set: { status: body.accept ? 'accepted' : 'rejected' } }, (err, result) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          }

          if (result) {
            console.log("accept result.", result.value);

            db.collection('notifications').updateOne(
              { notifId: body.notifId },
              { $set: { request: { ...result.value, status: body.accept ? 'accepted' : 'rejected' } } }, (err, result) => {
                if (err) {
                  return res.status(500).json({
                    error: err
                  });
                } else if (result) {
                  console.log(`Request ${body.accept ? 'accepted' : 'rejected'}.`);
                }
              });

            db.collection("notifications").insertOne({
              notifId: uuid(),
              title: `Your request has been ${body.accept ? 'accepted' : 'rejected'}`,
              content: `Your authorization request at ${body.request.date} from ${body.request.timeFrom} to ${body.request.timeTo} has been ${body.accept ? 'accepted' : 'rejected'}\n\n${body.note}`,
              category: 'INFO',
              targetUser: body.request.fromUser,
              vues: [],
              createdAt: moment().format('DD-MM-YYYY H:mm:ss'),
              createdAtTimestamp: moment().unix()
            }, (err, response) => {
              if (err) {
                return res.status(500).json({
                  error: err
                });
              } else if (result) {
                console.log("Notification generated.");
              }
            });
          }
        }, { returnNewDocument: true });

      // ================== END ====================
    } else if (body.request.requestCategory === 'ATTENDANCE') {
      // ================= BEGIN ===================

      db.collection('requests').findOneAndUpdate(
        { requestId: params.requestId },
        { $set: { status: body.accept ? 'accepted' : 'rejected' } }, (err, result) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          }

          if (result) {
            console.log("accept result.", result.value);

            db.collection('notifications').updateOne(
              { notifId: body.notifId },
              { $set: { request: { ...result.value, status: body.accept ? 'accepted' : 'rejected' } } }, (err, result) => {
                if (err) {
                  return res.status(500).json({
                    error: err
                  });
                } else if (result) {
                  console.log(`Request ${body.accept ? 'accepted' : 'rejected'}.`);
                }
              });

            db.collection("notifications").insertOne({
              notifId: uuid(),
              title: `Your request has been ${body.accept ? 'accepted' : 'rejected'}`,
              content: `Your attendance correction request at ${body.request.date} has been ${body.accept ? 'accepted' : 'rejected'}\n\n${body.note}`,
              category: 'INFO',
              targetUser: body.request.fromUser,
              vues: [],
              createdAt: moment().format('DD-MM-YYYY H:mm:ss'),
              createdAtTimestamp: moment().unix()
            }, (err, response) => {
              if (err) {
                return res.status(500).json({
                  error: err
                });
              } else if (result) {
                console.log("Notification generated.");
              }
            });
          }
        }, { returnNewDocument: true });

      // ================== END ====================
    } else {
      return res.status(500).json({
        errorMessage: "Bad request."
      });
    }
  };
}

export default respondToLeaveRequest;
