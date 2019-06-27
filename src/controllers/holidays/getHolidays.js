const getHolidays = async ({ db, query }, res) => {

  const { category } = query;

  try {
    const holidays = category ? await db.collection("holidays").find({ category }).toArray() : db.collection("holidays").find({}).toArray();

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
