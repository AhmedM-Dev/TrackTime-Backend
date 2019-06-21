import uuid from 'uuid/v4';
import moment from 'moment';

const CheckIn = ({ db, user }, res) => {

  //Checking MAC address

  db.collection('attendances').find({ userId: user.userId }).toArray((err, result) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    }

    console.log('moment', moment('2016-03-31T22:25:10Z').format('DD-MM-YYYY'));
    const attendance = result.filter(item => moment(item.date).format('DD-MM-YYYY') === moment().format('DD-MM-YYYY'));

    if (result && result.length > 0) {

      if (attendance.length > 0) {
        const checkAt = moment().format('H:mm:ss');

        db.collection('attendances').updateOne({ _id: attendance[0]._id }, { $addToSet: { attendances: checkAt } }, (err, checkedIn) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          }


          if (checkedIn) {

            console.log(`Successfully checked in at ${checkAt}. (${attendance[0]._id})`);

            return res.status(200).json({
              message: `Successfully checked in at ${checkAt}.`
            });
          }
        })
      }
    }

    if (attendance && attendance.length < 1) {
      const checkAt = moment().format('H:mm:ss');
      const id = uuid();
      db.collection('attendances').insertOne({
        _id: id,
        userId: user.userId,
        date: new Date().toISOString(),
        attendances: [checkAt]
      }, async function (err, result) {
        if (err) {
          console.log("An error occured.");
          return res.status(400).json({
            error: err
          });
        }

        if (result) {

          console.log(`Successfully checked in at ${checkAt}. (new attendance)`);

          // const 

          if ((moment(checkAt).hours >= 9)) {
            await db.collection("notifications").insertOne({
              notifId: uuid(),
              title: `You have been late today.`,
              content: `You checked in late in ${moment().format('MMMM Do YYYY  H:mm')}`,
              category: 'DELAY',
              targetUser: user.userId,
              vues: [],
              createdAt: moment().format('DD-MM-YYYY H:mm:ss'),
              createdAtTimestamp: moment().unix()
            });
          }

          return res.status(200).json({
            message: `Successfully checked in at ${checkAt}.`
          });
        }
      });
    }
  });
}

export default CheckIn;