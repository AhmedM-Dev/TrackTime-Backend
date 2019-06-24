import uuid from 'uuid/v4';
import moment from 'moment';

const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];

const createRequest = async ({ user, db, body }, res) => {

  try {
    const userCredit = await db.collection('leaveCredit').findOne({ userId: user.userId });
    const userGroup = await db.collection("groups").findOne({ groupId: user.groupId });

    await db.collection('requests').insertOne({
      requestId: uuid(),
      ...body,
      userCredit: body.requestCategory === 'LEAVE' ? (userCredit ? userCredit.credit : 'not avilable') : null,
      fromUser: user.userId,
      fromUserName: `${user.firstName} ${user.lastName}`,
      userRemainingLeaves: 0,
      status: "pending",
      createdAt: moment().format('DD-MM-YYYY H:mm:ss'),
      createdAtTimestamp: moment().unix()
    });

    if (userGroup) {
      let title = '';

      if (body.requestCategory === 'ATTENDANCE') {
        title = `${user.firstName} ${user.lastName} has requested to correct an attendance at ${moment(body.attendance.date).format('DD-MM-YYYY')}.`;
      } else if (body.requestCategory === 'LEAVE' || body.requestCategory === 'AUTHORIZATION') {
        title = `${user.firstName} ${user.lastName} has requested a ${body.leaveCategory}${body.leaveCategory.indexOf('leave') !== -1 ? '' : ' leave'}`;
      } else if (body.requestCategory === 'TRAVEL') {
        title = `${user.firstName} ${user.lastName} has sent a travel request`;
      }

      await db.collection('notifications').insertOne({
        notifId: uuid(),
        title,
        content: body.motif,
        category: body.requestCategory,
        request: requestBody,
        targetUser: userGroup.poleLead,
        vues: [],
        createdAt: moment().format('DD-MM-YYYY H:mm:ss'),
        createdAtTimestamp: moment().unix()
      });
    }

    return res.status(200).json({
      message: "Request created successfully."
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }

};

export default createRequest;