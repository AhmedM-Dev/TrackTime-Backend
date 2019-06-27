import moment from 'moment';

const getAvailableYears = async (db) => {
  try {
    const att = await db.collection('attendances').find({}).toArray();

    let years = [];

    att.map(item => {
      if (years.includes(moment(item.date).year())) {
        //nothing to do
      } else {
        years.push(moment(item.date).year());
      }
    });

    await db.collection('config').findOneAndUpdate(
      { _id: 'YEARS' },
      { $set: { _id: 'YEARS', availableYears: years.sort().reverse() } },
      { upsert: true }
    )

  } catch (error) {
    console.error("getAvailableYears -> Error:", error);
    return false;
  }
}

export default getAvailableYears;