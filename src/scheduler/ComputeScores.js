import moment from 'moment';



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

const computeWT = () => {

}

const computeME = () => {

}

const computeET = () => {

}

const computeWW = () => {

}

const computeDL = () => {

}

const computeLT = () => {

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
      let currentDate = moment(moment().week(), 'WW').format()

      while (currentDate <= moment().format()) {

        users.map(user => {
          //Computing scores for users

          let WT = ME = ET = WW = DL = LT = 0;

          let userAttendances = attendances.filter(item => item.userId === user.userId && moment(item.date).format('YYYY-MM-DD') === moment(currentDate).format('YYYY-MM-DD'));

          let currentPlan = hoursPlan.filter(item => moment(item.date).format('YYYY-MM-DD') === moment(currentDate).format('YYYY-MM-DD'))

          let isTodayLeave = leaves.filter(item => item.forUser === user.userId && moment(currentDate).format('YYYY-MM-DD') >= moment(item.dateFom).format('YYYY-MM-DD') && moment(currentDate).format('YYYY-MM-DD') <= moment(item.dateTo).format('YYYY-MM-DD'))

          if (userAttendances && userAttendances.length > 0) {
            WT = moment(computeWorkTime(userAttendances.attendances).workTime, 'HH:mm:ss') / moment(currentPlan.requiredWorkingHours, 'HH:mm:ss');

            let ME = (moment(currentPlan.beginTimeMax, 'HH:mm:ss') - moment(userAttendances.attendances[0], 'HH:mm:ss')) / (moment(currentPlan.beginTimeMax, 'HH:mm:ss') - moment(currentPlan.beginTimeMax, 'HH:mm:ss'));
            
            let ET = moment(currentPlan.requiredWorkingHours, 'HH:mm:ss') > moment(computeWorkTime(userAttendances.attendances).workTime, 'HH:mm:ss') ? 0 : moment(computeWorkTime(userAttendances.attendances).workTime, 'HH:mm:ss') / moment(currentPlan.requiredWorkingHours, 'HH:mm:ss');

            let WW = moment(currentDate).format('dddd') === "Saturday" || moment(currentDate).format('dddd') === "Sunday" ? 1 : 0;

            let DL = '';

            // let LT = moment(computeWorkTime(userAttendances.attendances).workTime, 'HH:mm:ss') > moment(currentPlan.requiredWorkingHours, 'HH:mm:ss') ? 0 : 

          } else if (isTodayLeave) {
            WT = 1;
          }


        })

        currentDate = moment(currentDate).add(1, 'days').format();
      }
    }

  } catch (error) {
    console.error("ComputeScores -> An error occured.")
  }
}

export default ComputeScores;

// todayPlan = todayPlan && todayPlan.length > 0 ? moment(todayPlan[0].beginTimeMax, 'HH:mm') : moment('09:00', 'HH:mm');