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

const getStats = ({ user, db, query }, res) => {

  console.log("[REQUEST] ", query);

  db.collection("attendances").find({
    userId: user.userId
  }).toArray((error, result) => {
    if (error) {
      return res.status(500).json({
        errorMessage: "Something went wrong."
      });
    }

    if (result.length > 0) {
      return res.status(200).json({
        ...statistics(parseInt(query.year) ? result.filter(item => new Date(item.date).getFullYear() === parseInt(query.year)) : result)
      });
    } else {
      return res.status(400).json({
        errorMessage: "No data found."
      });
    }
  });
};

export default getStats;

