import moment from 'moment';

const setHoursPlan = async ({ db, body }, res) => {

  const { dateFrom, dateTo, periodName, maxWorkingHours, maxDelayTime, allowedDelay } = body;

  try {

    let start = moment(dateFrom).format();

    while (moment(start).format() <= moment(dateTo).format()) {

      await db.collection('hoursPlan').update(
        { planId: moment(start).format('YYYYMMDD') },
        {
          $set: {
            _id: moment(start).format('YYYY-MM-DD'),
            periodName,
            maxWorkingHours,
            maxDelayTime,
            allowedDelay,
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
