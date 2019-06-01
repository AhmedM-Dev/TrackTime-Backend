import { take, orderBy, sort } from "lodash";

const getAttendances = ({ user, db, query }, res) => {

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

      const { dateFrom, dateTo } = query;

      if (dateFrom && dateTo) {
        return res.status(200).json({
          attendances: take(orderBy(result, 'date', 'desc').filter(attendance => new Date(attendance.date) <= new Date(dateTo) && new Date(attendance.date) >= new Date(dateFrom)), 10)
        });
      } else if (dateFrom && !dateTo) {
        return res.status(200).json({
          attendances: take(orderBy(result, 'date', 'desc').filter(attendance => new Date(attendance.date) >= new Date(dateFrom)), 10)
        });
      } else if (!dateFrom && dateTo) {
        return res.status(200).json({
          attendances: take(orderBy(result, 'date', 'desc').filter(attendance => new Date(attendance.date) <= new Date(dateTo)), 10)
        });
      } else {
        return res.status(200).json({
          attendances: take(orderBy(result, 'date', 'desc').filter(attendance => new Date(attendance.date) <= new Date()), 10)
        });
      }

    } else {
      return res.status(400).json({
        errorMessage: "No data found."
      });
    }
  });
};

export default getAttendances;
