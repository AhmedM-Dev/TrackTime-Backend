import { scheduleJob, RecurrenceRule } from 'node-schedule';
import moment from 'moment';
import uuid from 'uuid/v4';

const scheduler = (db) => {

  console.log("Started scheduler.");

  var rule = new RecurrenceRule();
  rule.hour = 0;
  rule.minute = 0;

  const checkAbsencesAndNotes = scheduleJob(rule, async function () {
    // check users absences

    try {

      const users = await db.collection('users').find({}).toArray();
      const attendances = await db.collection('attendances').find({}).toArray();
      const leaves = await db.collection('leaves').find({}).toArray();
      const travels = await db.collection('travels').find({}).toArray();
      const holidays = await db.collection('holidays').find({}).toArray();

      if (attendances && attendances.length > 0) {

        users.map(async user => {
          let isTodayAttendances = attendances.filter(item => item.userId === user.userId && moment(item.date).format('DD-MM-YYYY') === moment().format('DD-MM-YYYY'));
          let isTodayLeave = leaves.filter(item => item.forUser === user.userId && moment(item.dateFrom) <= moment() && moment(item.datoTo) >= moment());
          let isTodayTravel = travels.filter(item => item.userId === user.userId && moment(item.dateFrom) <= moment() && moment(item.datoTo) >= moment());
          let isTodayHoliday = holidays.filter(item => moment(item.dateFrom) <= moment() && moment(item.datoTo) >= moment());

          if ((!isTodayAttendances || isTodayAttendances.length < 1) && (!isTodayLeave || isTodayLeave.length < 1) && (!isTodayTravel || isTodayTravel.length < 1) && (!isTodayHoliday || isTodayHoliday.length < 1) && (moment().format('dddd') !== 'Saturday') && (moment().format('dddd') !== 'Sunday')) {
            await db.collection('absences').insertOne({
              absenceId: uuid(),
              absentUser: user.userId,
            });

            await db.collection("notifications").insertOne({
              notifId: uuid(),
              title: `You appear to be absent in ${moment().format('MMMM Do YYYY')}`,
              content: `You appear to be absent in ${moment().format('MMMM Do YYYY')}, you must fill in an authorization`,
              category: 'INFO',
              targetUser: user.userId,
              vues: [],
              createdAt: moment().format('DD-MM-YYYY H:mm:ss'),
              createdAtTimestamp: moment().unix()
            })
          }
        });
      }
    } catch (err) {
      console.error(err)
    }
  });

  var rule2 = new RecurrenceRule();
  rule2.date = 1;
  rule2.hour = 0;
  rule2.minute = 0;
  rule2.second = 0;

  const addLeaveBonus = scheduleJob(rule2, function () {
    // Add 2 days as leave score to each user
    console.log('Add 2 days as leave score to each user');
  });
}

export default scheduler;