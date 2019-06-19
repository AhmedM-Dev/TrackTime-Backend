import moment from 'moment';

const getCalendarData = async ({ user, db, query }, res) => {

  console.log("[CALENDAR] ", query);

  const date = moment(query.date).format() || moment();

  try {
    const users = await db.collection('users').find({}).toArray();
    const holidays = await db.collection('holidays').find({}).toArray();
    const leaves = await db.collection('leaves').find({}).toArray();
    const travels = await db.collection('travels').find({}).toArray();
    const authorizations = await db.collection('authorizations').find({}).toArray();

    // console.log('All leaves', leaves);

    // console.log( moment(date).week() );
    // console.log( moment(moment(date).isoWeek(), 'WW').format('DD-MM-YYYY') );
    // console.log( moment(moment(date).isoWeek(), 'WW').format('DD-MM-YYYY') );
    users.map(userItem => {
      let userCalendar = {
        userId: userItem.userId,
        calendar: []
      }

      let myLeaves = leaves.filter(leave => leave.forUser === userItem.userId);

      for (let day = parseInt(moment(date).startOf('month').format('D')); day <= parseInt(moment(date).endOf('month').format('D')); day++) {

        let currentDate = moment(`${moment(date).month()+1}-${day}-${moment(date).year()}`);

        let authorization;

        let userLeave = leaves.filter(item => (currentDate.format() >= moment(item.dateForm).format() && currentDate.format() <= moment(item.dateTo).format()) && (item.forUser === userItem.userId));

        let isDayHoliday = holidays.filter(holiday => moment(holiday.date).format('DD-MM') === moment(currentDate).format('DD-MM'))

        let isDayWeekend = moment(currentDate).format('dddd') === 'Saturday' || moment(currentDate).format('dddd') === 'Sunday' ? true : false;

        console.log([userItem.firstName, currentDate, userLeave.length > 0 ? 1 : 0, isDayHoliday.length > 0 ? 1 : 0, isDayWeekend ? 1 : 0]);

        // console.log('Current date:', currentDate.format('DD-MM-YYYY'), myLeaves.length > 0 ? currentDate.format('DD-MM-YYYY') === moment(myLeaves[0].dateFrom).format('DD-MM-YYYY') : null);

      }
      console.log('user leaves', moment().format('DD-MMMM-YYYY'));

      console.log('BZZZ', userCalendar);
    })

    res.status(200).json({
      first: moment().startOf('month').format('D'),
      last: moment().endOf('month').format('D'),
      month: moment().month() + 1
    })
  } catch (error) {
    console.error(error);
  }

};

export default getCalendarData;
