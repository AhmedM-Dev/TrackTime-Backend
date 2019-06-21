import uuid from 'uuid/v4';
import { toLower } from 'lodash';
import moment from 'moment';

const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];

const createRequest = ({ user, db, body }, res) => {

  const requestBody = {
    requestId: uuid(),
    ...body,
    fromUser: user.userId,
    fromUserName: `${user.firstName} ${user.lastName}`,
    userRemainingLeaves: 0,
    status: "pending",
    createdAt: moment().format('DD-MM-YYYY H:mm:ss'),
    createdAtTimestamp: moment().unix()
  }

  db.collection('requests').insertOne(requestBody, function (err, result) {
    if (err) {
      console.log("An error occured.");
      return res.status(400).json({
        error: err
      });
    } else if (result) {

      if (user.businessRole === 'CEO' || user.businessRole === 'ADMIN') {
        db.collection("users").findOne({ businessRole: 'CEO' }, (error, ceo) => {
          if (error) {
            return res.status(500).json({
              errorMessage: "Something went wrong."
            });
          }

          let title = "";

          if (body.requestCategory === 'ATTENDANCE') {
            title = `${user.firstName} ${user.lastName} has requested to correct an attendance at ${moment(body.attendance.date).format('DD-MM-YYYY')}.`;
          } else if (body.requestCategory === 'LEAVE' || body.requestCategory === 'AUTHORIZATION') {
            title = `${user.firstName} ${user.lastName} has requested a ${body.leaveCategory}${body.leaveCategory.indexOf('leave') !== -1 ? '' : ' leave'}`; 
            
            // from ${body.dateFrom} to ${body.dateTo}
          } else if (body.requestCategory === 'TRAVEL') {
            title = `${user.firstName} ${user.lastName} has sent a travel request`;
          }

          db.collection('notifications').insertOne({
            notifId: uuid(),

            title,
            content: body.motif,
            category: body.requestCategory,
            request: requestBody,
            targetUser: ceo.userId,
            vues: [],
            createdAt: moment().format('DD-MM-YYYY H:mm:ss'),
            createdAtTimestamp: moment().unix()
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

        });
      } else {
        db.collection("groups").findOne({ groupId: user.groupId }, (error, userGroup) => {
          if (error) {
            return res.status(500).json({
              errorMessage: "Something went wrong."
            });
          }

          if (userGroup) {

            let title = '';

            if (body.requestCategory === 'ATTENDANCE') {
              title = `${user.firstName} ${user.lastName} has requested to correct an attendance at ${moment(body.attendance.date).format('DD-MM-YYYY')}.`;
            } else if (body.requestCategory === 'LEAVE' || body.requestCategory === 'AUTHORIZATION') {
              title = `${user.firstName} ${user.lastName} has requested a ${body.leaveCategory}${body.leaveCategory.indexOf('leave') !== -1 ? '' : ' leave'}`; 
              
              // from ${body.dateFrom} to ${body.dateTo}
            } else if (body.requestCategory === 'TRAVEL') {
              title = `${user.firstName} ${user.lastName} has sent a travel request`;
            }

            db.collection('notifications').insertOne({
              notifId: uuid(),
              title,
              content: body.motif,
              category: body.requestCategory,
              request: requestBody,
              targetUser: userGroup.poleLead,
              vues: [],
              createdAt: moment().format('DD-MM-YYYY H:mm:ss'),
              createdAtTimestamp: moment().unix()
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
    }
  });
};

export default createRequest;