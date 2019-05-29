import uuid from 'uuid/v1';
import { toLower } from 'lodash';

const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];

const createRequest = ({ user, db, body }, res) => {
  db.collection('requests').insertOne({
    requestId: uuid(),
    ...body,
    userId : user.userId ,
    status: "pending"
  }, function (err, result) {
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

          db.collection('notifications').insertOne({
            notifId: uuid(),

            title: `${user.firstName} ${user.lastName} has requested an ${body.leaveCategory}${body.leaveCategory.indexOf('leave') !== -1 ? '' : ' leave'} from ${body.dateFrom} to ${body.dateTo}.`,
            content: `${user.firstName} ${user.lastName} has requested an ${body.leaveCategory}${body.leaveCategory.indexOf('leave') !== -1 ? '' : ' leave'} from ${body.dateFrom} to ${body.dateTo}.\n\n${body.motif}`,
            category: body.requestCategory,
            targetUser: ceo.userId,
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

        });
      } else {
        db.collection("groups").findOne({ groupId: user.groupId }, (error, userGroup) => {
          if (error) {
            return res.status(500).json({
              errorMessage: "Something went wrong."
            });
          }
  
          if (userGroup) {
            db.collection('notifications').insertOne({
              notifId: uuid(),
              title: `${user.firstName} ${user.lastName} has requested ${vowels.includes(toLower(body.leaveCategory[0])) ? 'an' : 'a'} ${body.leaveCategory}${body.leaveCategory.indexOf('leave') !== -1 ? '' : ' leave'} from ${body.dateFrom} to ${body.dateTo}.`,
              content: `${user.firstName} ${user.lastName} has requested ${vowels.includes(toLower(body.leaveCategory[0])) ? 'an' : 'a'} ${body.leaveCategory}${body.leaveCategory.indexOf('leave') !== -1 ? '' : ' leave'} from ${body.dateFrom} to ${body.dateTo}.\n\n${body.motif}`,
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
    }
  });
};

export default createRequest;