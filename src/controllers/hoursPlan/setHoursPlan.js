import moment from 'moment';

const setHoursPlan = async ({ db, body }, res) => {

  const { dateFrom, dateTo, periodName, requiredWorkingHours, allowedDelaysPerMonth, beginTime, beginTimeMax, } = body;

  try {

    let start = moment(dateFrom).format();
    const holidays = await db.collection('holidays').find({}).toArray();

    while (moment(start).format() <= moment(dateTo).format()) {

      let isTodayHoliday = holidays.filter(item => moment(item.date, 'MMMM DD').format('MMMM DD') === moment(start).format('MMMM DD'));

      let isTodayWeekend = moment(start).format('dddd') === 'Saturday' || moment(start).format('dddd') === 'Sunday' ? true : false;

      await db.collection('hoursPlan').update(
        { planId: moment(start).format('YYYYMMDD') },
        {
          $set: {
            _id: moment(start).format('YYYY-MM-DD'),
            periodName,
            requiredWorkingHours: (isTodayHoliday && isTodayHoliday.length > 0) || isTodayWeekend ? 0 : requiredWorkingHours,
            allowedDelaysPerMonth,
            beginTime,
            beginTimeMax,
            date: moment(start).format(),
            updatedAt: moment().format()
          }
        },
        { upsert: true }
      )

      start = moment(start).add(1, 'days').format();
    }

    return res.status(200).json({
      message: 'New hours plan added successfully.'
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }

}

export default setHoursPlan;
