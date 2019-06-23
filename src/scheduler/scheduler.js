import { scheduleJob, RecurrenceRule } from 'node-schedule';
import moment from 'moment';
import uuid from 'uuid/v4';

import ComputeScores from './ComputeScores';
import AddLeaveCredits from './AddLeaveCredits';

const scheduler = (db) => {

  console.log("Started scheduler.");

  var rule = new RecurrenceRule();
  rule.hour = 23;
  rule.minute = 50;

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
          let isTodayAttendances = attendances.filter(item => item.userId === user.userId && moment(item.date).format('DD-MM-YYYY') === moment().format('DD-MM-YYYY')); //if user has attendances today
          let isTodayLeave = leaves.filter(item => item.forUser === user.userId && moment(item.dateFrom) <= moment() && moment(item.datoTo) >= moment());
          let isTodayTravel = travels.filter(item => item.userId === user.userId && moment(item.dateFrom) <= moment() && moment(item.datoTo) >= moment());
          let isTodayHoliday = holidays.filter(item => moment(item.dateFrom) <= moment() && moment(item.datoTo) >= moment());

          if ((!isTodayAttendances || isTodayAttendances.length < 1) && (!isTodayLeave || isTodayLeave.length < 1) && (!isTodayTravel || isTodayTravel.length < 1) && (!isTodayHoliday || isTodayHoliday.length < 1) && (moment().format('dddd') !== 'Saturday') && (moment().format('dddd') !== 'Sunday')) {
            await db.collection('absences').insertOne({
              absenceId: uuid(),
              absentUser: user.userId,
              date: moment().format('DD-MM-YYYY')
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

      await db.collection('logs').insertOne({
        logId: uuid(),
        origin: 'SCHEDULER',
        category: 'ABSENCE-CHECKING',
        date: moment().format('DD-MM-YYYY'),
        dateTimeStamp: moment().unix(),
        description: `Checking absences for ${moment().format('DD-MM-YYYY')} done.`
      });

    } catch (err) {
      console.error(err);
    }
  });

  // ========================================= Leave Credits ======================================

  var creditsRule = new RecurrenceRule();
  creditsRule.date = 1;
  creditsRule.hour = 0;
  creditsRule.minute = 0;
  creditsRule.second = 0;

  scheduleJob(creditsRule, () => AddLeaveCredits(db));


  // ============================================ Scores ==========================================

  var scoresRule = new RecurrenceRule();
  scoresRule.dayOfWeek = 6; //On Sunday
  scoresRule.hour = 23;
  scoresRule.minute = 0;
  scoresRule.second = 0;

  scheduleJob(scoresRule, () => ComputeScores(db));
}

export default scheduler;