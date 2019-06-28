import uuid from 'uuid/v4';

const addHoliday = async ({ user, db, body }, res) => {

  console.log('[ADD HOLIDAY] ', body);

  if (body && Object.keys(body).length > 0) {

    try {
      const holidayId = uuid();

      await db.collection('holidays').insertOne({
        holidayId,
        ...body
      });

      const holiday = await db.collection('holidays').findOne({ holidayId });

      return res.status(200).json({ holiday });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default addHoliday;