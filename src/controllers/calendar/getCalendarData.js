import moment from 'moment';

const getCalendarData = async ({ db, query }, res) => {

  console.log("[CALENDAR] ", query);

  const { dateFilter, groupId } = query;

  const date = moment(dateFilter).format() || moment();

  try {
    const users = groupId ? await db.collection('users').find({ groupId }).toArray() : await db.collection('users').find({}).toArray();
    const holidays = await db.collection('holidays').find({}).toArray();
    const leaves = await db.collection('leaves').find({}).toArray();
    const travels = await db.collection('travels').find({}).toArray();
    const authorizations = await db.collection('authorizations').find({}).toArray();

    let calendar = [];

    users.map(userItem => {

      let userLeaves = leaves.filter(leave => leave.forUser === userItem.userId);
      let userTravels = travels.filter(travel => travel.userId === userItem.userId);
      let userAuthorizations = authorizations.filter(authorization => authorization.forUser === userItem.userId);

      let calendarEntry = [`${userItem.firstName} ${userItem.lastName}`];

      for (let day = parseInt(moment(date).startOf('month').format('D')); day <= parseInt(moment(date).endOf('month').format('D')); day++) {

        let currentDate = moment(`${moment(date).month()+1}-${day}-${moment(date).year()}`);

        let isDayAuthorization = userAuthorizations.filter(item => currentDate.format('MM-DD-YYYY') === moment(item.date).format('MM-DD-YYYY'));

        let isDayLeave = userLeaves.filter(item => currentDate.format('MM-DD-YYYY') >= moment(item.dateFrom).format('MM-DD-YYYY') && currentDate.format('MM-DD-YYYY') <= moment(item.dateTo).format('MM-DD-YYYY'));

        let isDayTravel = userTravels.filter(item => currentDate.format('MM-DD-YYYY') >= moment(item.startDate).format('MM-DD-YYYY') && currentDate.format('MM-DD-YYYY') <= moment(item.endDate).format('MM-DD-YYYY'));

        let isDayHoliday = holidays.filter(holiday => moment(holiday.date).format('DD-MM') === moment(currentDate).format('DD-MM'))

        let isDayWeekend = moment(currentDate).format('dddd') === 'Saturday' || moment(currentDate).format('dddd') === 'Sunday' ? true : false;

        if (isDayWeekend) {
          calendarEntry.push('W');
        } else if (isDayHoliday && isDayHoliday.length > 0) {
          calendarEntry.push('H');
        } else if (isDayLeave && isDayLeave.length > 0) {
          calendarEntry.push('L');
        } else if (isDayTravel && isDayTravel.length > 0) {
          calendarEntry.push('T');
        } else if (isDayAuthorization && isDayAuthorization.length > 0) {
          calendarEntry.push('A');
        } else {
          calendarEntry.push('N');
        }

      }

      calendar.push(calendarEntry);
    });

    return res.status(200).json({
      calendar
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }

};

export default getCalendarData;
