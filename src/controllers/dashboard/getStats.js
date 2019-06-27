import getHoursDelays from "../../utils/getHoursDelays";

// import initFirebase from "../../initFirebase";

const statistics = (attendances) => {
  let stats = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

  // array.forEach(element => {

  // });

  let maxHours = 0;
  let totalHours = 0;
  let totalDays = 0;
  let totalDelays = 0;

  stats.map((month, i) => {
    let { workedHours, delays } = getHoursDelays(attendances.filter(item => new Date(item.date).getMonth() == i));

    if (workedHours > maxHours) {
      maxHours = workedHours;
    }

    totalHours += workedHours;
    totalDays += attendances.filter(item => new Date(item.date).getMonth() == i).length;
    totalDelays += delays;

    stats[i] = {
      delays,
      workedHours,
      workedDays: attendances.filter(item => new Date(item.date).getMonth() == i).length
    }
  });

  console.log("Stats per month:", stats);

  return {
    maxHours,
    perMonth: [...stats],
    totalHours,
    totalDays,
    totalDelays,
    averageWorkingHours: totalHours / totalDays
  }
}

const getStats = async ({ user, db, query }, res) => {

  console.log("[REQUEST] ", query);

  const userId = query.userId || user.userId;

  const { all } = query;

  try {

    if (all === 'true') {
      // let allStats = [];

      const users = await db.collection('users').find({}).toArray();

      const allStats = await Promise.all(users.map(async item => {
        const result = await db.collection("attendances").find({ userId: item.userId }).toArray();
        const { perMonth, ...stats } = statistics(parseInt(query.year) ? result.filter(item => new Date(item.date).getFullYear() === parseInt(query.year)) : result);

        return { userId: item.userId, ...stats };
      }));

      return res.status(200).json({ ...allStats });
    } else {
      const result = await db.collection("attendances").find({ userId }).toArray();

      const accepted = await db.collection('requests').find({ fromUser: userId, status: 'accepted' }).toArray();
      const rejected = await db.collection('requests').find({ fromUser: userId, status: 'rejected' }).toArray();
      const canceled = await db.collection('requests').find({ fromUser: userId, status: 'canceled' }).toArray();
      const onHold = await db.collection('requests').  find({ fromUser: userId, status: 'pending' }) .toArray();

      return res.status(200).json({
        ...statistics(parseInt(query.year) ? result.filter(item => new Date(item.date).getFullYear() === parseInt(query.year)) : result),
        accepted: accepted.length,
        rejected: rejected.length,
        canceled: canceled.length,
        onHold: onHold.length
      });
    }
  } catch (error) {
    return res.status(500).json({
      error
    });
  }

};

export default getStats;

