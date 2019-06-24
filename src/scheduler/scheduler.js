import { scheduleJob, RecurrenceRule } from 'node-schedule';

import CheckAbsences from './CheckAbsences';
import ComputeScores from './ComputeScores';
import AddLeaveCredits from './AddLeaveCredits';

const scheduler = (db) => {

  console.log("Started scheduler.");

  // =========================================== Absences =========================================
  var absenceRule = new RecurrenceRule();
  absenceRule.hour = 23;
  absenceRule.minute = 50;

  scheduleJob(absenceRule, () => CheckAbsences(db));
  // ==============================================================================================


  // ========================================= Leave Credits ======================================
  var creditsRule = new RecurrenceRule();
  creditsRule.date = 1;
  creditsRule.hour = 0;
  creditsRule.minute = 0;
  creditsRule.second = 0;

  scheduleJob(creditsRule, () => AddLeaveCredits(db));
  // ==============================================================================================


  // ============================================ Scores ==========================================
  var scoresRule = new RecurrenceRule();
  scoresRule.dayOfWeek = 6; //On Sunday
  scoresRule.hour = 23;
  scoresRule.minute = 0;
  scoresRule.second = 0;

  scheduleJob(scoresRule, () => ComputeScores(db));
  // ==============================================================================================
}

export default scheduler;