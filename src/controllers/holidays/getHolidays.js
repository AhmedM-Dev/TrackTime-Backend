const getHolidays = async ({ db }, res) => {

  try {
    const holidays = await db.collection("holidays").find({}).toArray();

    return res.status(200).json({
      holidays
    });
  } catch (error) {
    return res.status(400).json({
      error
    });
  }
};

export default getHolidays;
