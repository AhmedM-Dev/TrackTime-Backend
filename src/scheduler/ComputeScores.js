import moment from 'moment';

import computePercentage from '../utils/computePercentage';

const computePauseTime = (attendances) => {
  let sum = 0;

  for (let i = 1; i <= attendances.length - 2; i += 2) {
    sum += moment(moment(attendances[i + 1], 'HH:mm:ss') - moment(attendances[i], 'HH:mm:ss'));
  }

  return sum;
}

const computeWorkTime = (attendances) => {
  if (attendances.length % 2 !== 0) {
    return {
      workTime: 0,
      pauseTime: 0
    };
  } else if (attendances.length === 2) {
    return {
      workTime: moment(moment(attendances[1], 'HH:mm:ss') - moment(attendances[0], 'HH:mm:ss')).subtract(1, 'hours').format('HH:mm:ss'),
      pauseTime: 0
    };
  } else if (attendances.length > 2) {
    return {
      workTime: moment((moment(attendances[attendances.length - 1], 'HH:mm:ss') - moment(attendances[0], 'HH:mm:ss')) - computePauseTime(attendances)).subtract(1, 'hours').format('HH:mm:ss'),
      pauseTime: moment(computePauseTime(attendances)).subtract(1, 'hours').format('HH:mm:ss')
    }
  }
}

const ComputeScores = async (db) => {
  try {
    const users = await db.collection('users').find({}).toArray();
    const attendances = await db.collection('attendances').find({}).toArray();
    const scoreFormula = await db.collection('config').findOne({ _id: 'FORMULA' });
    const hoursPlan = await db.collection('hoursPlan').find({}).toArray();
    const leaves = await db.collection('leaves').find({}).toArray();

    // const thisWeekPlan = hoursPlan.filter(item => moment(item.date) >= moment(moment().week(), 'WW') && )
    
    if (users && users.length > 0) {
      users.map(user => {
        //Computing scores for users
        let userAttendances = attendances.filter(item => item.userId === user.userId);

        let WT = computeWorkTime(userAttendances.attendances).workTime;


      })
    }

  } catch (error) {
    console.error("ComputeScores -> An error occured.")
  }
}

export default ComputeScores;

// todayPlan = todayPlan && todayPlan.length > 0 ? moment(todayPlan[0].beginTimeMax, 'HH:mm') : moment('09:00', 'HH:mm');