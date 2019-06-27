import { take, orderBy } from "lodash";
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
      workTime: -1,
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

const getAttendances = async ({ user, db, query }, res) => {

  console.log("[REQUEST] ", query);
  console.log("user ", query.userId || user.userId);

  const userId = query.userId || user.userId;
  const { dateFrom, dateTo } = query;

  try {
    let attendances = await db.collection("attendances").find({ userId }).toArray();
    let hoursPlan = await db.collection('hoursPlan').find({}).toArray();

    console.log('hoursPlan', hoursPlan);

    if (!attendances || attendances.length < 1) {
      return res.status(400).json({
        errorMessage: "No data available."
      });
    }

    if (attendances && attendances.length > 0) {
      attendances = dateFrom ? attendances.filter(attendance => new Date(attendance.date) >= new Date(dateFrom)) : attendances;
      attendances = dateTo ? attendances.filter(attendance => new Date(attendance.date) <= new Date(dateTo)) : attendances;

      attendances = attendances.filter(attendance => new Date(attendance.date) <= new Date());

      if (attendances && attendances.length > 0) {
        var moddedAttendances = attendances.map(item => {
          let todayPlan = hoursPlan.filter(plan => moment(plan.date, 'YYYY-MM-DD').format() === moment(item.date, 'YYYY-MM-DD').format());

          todayPlan = todayPlan && todayPlan.length > 0 ? moment(todayPlan[0].beginTimeMax, 'HH:mm') : moment('09:00', 'HH:mm');
          // console.log("RRRR", moment(item.attendances[0], 'HH:mm:ss') - todayPlan)
          return {
            ...item,
            ...computeWorkTime(item.attendances),
            delay: moment(item.attendances[0], 'HH:mm:ss') - todayPlan <= 0 ? -1 : moment(moment(item.attendances[0], 'HH:mm:ss') - todayPlan).subtract(1, 'hours').format('HH:mm:ss')
          }
        });
      }

      return res.status(200).json({
        attendances: take(orderBy(moddedAttendances, 'date', 'desc'), 20)
      });
    }

  } catch (error) {
    return res.status(500).json({
      errorMessage: "Something went wrong."
    });
  }
};

export default getAttendances;
