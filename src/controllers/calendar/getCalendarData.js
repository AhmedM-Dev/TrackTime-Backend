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

      let userLeaves = leaves.filter(leave => leave.forUser === userItem.userId);
      let userTravels = travels.filter(travel => travel.userId === userItem.userId);
      let userAuthorizations = authorizations.filter(authorization => authorization.forUser === userItem.userId)

      for (let day = parseInt(moment(date).startOf('month').format('D')); day <= parseInt(moment(date).endOf('month').format('D')); day++) {

        let currentDate = moment(`${moment(date).month()+1}-${day}-${moment(date).year()}`);

        let isDayAuthorization = userAuthorizations.filter(item => currentDate.format('MM-DD-YYYY') === moment(item.date).format('MM-DD-YYYY'));

        let isDayLeave = userLeaves.filter(item => currentDate.format('MM-DD-YYYY') >= moment(item.dateFrom).format('MM-DD-YYYY') && currentDate.format('MM-DD-YYYY') <= moment(item.dateTo).format('MM-DD-YYYY'));

        let isDayTravel = userTravels.filter(item => currentDate.format('MM-DD-YYYY') >= moment(item.startDate).format('MM-DD-YYYY') && currentDate.format('MM-DD-YYYY') <= moment(item.endDate).format('MM-DD-YYYY'));

        let isDayHoliday = holidays.filter(holiday => moment(holiday.date).format('DD-MM') === moment(currentDate).format('DD-MM'))

        let isDayWeekend = moment(currentDate).format('dddd') === 'Saturday' || moment(currentDate).format('dddd') === 'Sunday' ? true : false;

        console.log([userItem.firstName, currentDate, isDayAuthorization.length > 0 ? 1 : 0, isDayLeave.length > 0 ? 1 : 0, isDayTravel.length > 0 ? 1 : 0, isDayHoliday.length > 0 ? 1 : 0, isDayWeekend ? 1 : 0]);

        // console.log('Current date:', currentDate.format('DD-MM-YYYY'), myLeaves.length > 0 ? currentDate.format('DD-MM-YYYY') === moment(myLeaves[0].dateFrom).format('DD-MM-YYYY') : null);

        // console.log("CurrentDate:", currentDate.format(), '\tUserLeaves:', userLeaves);
        
        // if (userLeaves.length > 0)  userLeaves.map(item => console.log([currentDate.format('MM-DD-YYYY'), moment(item.dateFrom).format('MM-DD-YYYY'), moment(item.dateTo).format('MM-DD-YYYY')]) );
      }


      // console.log('user leaves', userLeaves);

      // console.log('BZZZ', userCalendar);
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
