import { scheduleJob, RecurrenceRule } from 'node-schedule';

const scheduler = (db) => {

  console.log("Started scheduler.");

  var rule = new RecurrenceRule();
  rule.hour = 0;
  rule.minute = 0;

  const checkAbsencesAndNotes = scheduleJob(rule, function () {
    // check users scores
    // check users absences
    console.log('Today is recognized by Rebecca Black!');
  });

  var rule2 = new RecurrenceRule();
  rule2.date = 1;

  var addLeaveBonus = scheduleJob(rule2, function () {
    // Add 2 days as leave score to each user
    console.log('Add 2 days as leave score to each user');
  });
}

export default scheduler;