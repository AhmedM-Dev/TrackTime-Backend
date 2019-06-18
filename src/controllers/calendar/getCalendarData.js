import moment from 'moment';

const getCalendarData = async ({ user, db, query }, res) => {

  console.log("[CALENDAR] ", query);

  const date = moment(query.date).format() || moment();

  const users = await db.collection('users').find({}).toArray();
  const holidays = await db.collection('holidays').find({}).toArray();
  const leaves = await db.collection('leaves').find({}).toArray();
  const travels = await db.collection('travels').find({}).toArray();
  const authorizations = await db.collection('authorizations').find({}).toArray();

  // console.log( moment(date).week() );
  // console.log( moment(moment(date).isoWeek(), 'WW').format('DD-MM-YYYY') );
  // console.log( moment(moment(date).isoWeek(), 'WW').format('DD-MM-YYYY') );
  users.map(userItem => {
    let userCalendar = {
      userId: userItem.userId,
      calendar: []
    }
    for (let day = parseInt(moment(date).startOf('month').format('D')); day <= parseInt(moment(date).endOf('month').format('D')); day++) {

      let currentDate = moment(`${moment(date).month()}-${day}-${moment(date).year()}`);

      userLeave = leaves.filter(item => (moment(currentDate) >= moment(item.dateForm) && moment(currentDate) <= moment(item.dateTo)) && (item.userId === userItem.userId));

      isDayHoliday = holidays.filter(holiday => moment())

      isDayWeekend = moment(currentDate).format('dddd') === 'Saturday' || moment(currentDate).format('dddd') === 'Sunday' ? true : false;

      // console.log('shit', userCalendar.calendar.push(x))
    }

    console.log('BZZZ', userCalendar);
  })

  res.status(200).json({
    first: moment().startOf('month').format('D'),
    last: moment().endOf('month').format('D'),
    month: moment().month() + 1
  })
};

export default getCalendarData;
