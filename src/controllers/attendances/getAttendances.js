import { take, orderBy } from "lodash";

const getAttendances = async ({ user, db, query }, res) => {

  console.log("[REQUEST] ", query);
  console.log("user ", query.userId || user.userId);

  const userId = query.userId || user.userId;
  const { dateFrom, dateTo } = query;

  try {
    let attendances = await db.collection("attendances").find({ userId }).toArray();

    if (!attendances || attendances.length < 1) {
      return res.status(400).json({
        errorMessage: "No data available."
      });
    }

    if (attendances && attendances.length > 0) {
      attendances = dateFrom ? attendances.filter(attendance => new Date(attendance.date) >= new Date(dateFrom)) : attendances;
      attendances = dateTo ? attendances.filter(attendance => new Date(attendance.date) <= new Date(dateTo)) : attendances;

      attendances = attendances.filter(attendance => new Date(attendance.date) <= new Date());

      return res.status(200).json({
        attendances: take(orderBy(attendances, 'date', 'desc'), 20)
      });
    }

  } catch (error) {
    return res.status(500).json({
      errorMessage: "Something went wrong."
    });
  }
};

export default getAttendances;
