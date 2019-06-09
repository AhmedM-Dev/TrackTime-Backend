import uuid from 'uuid/v4';

const addHoliday = async ({ db, params, body }, res) => {

  console.log('[ADD HOLIDAY] ', body);

  if (body && Object.keys(body).length > 0) {

    try {
      const holiday = await db.collection('leaveCredit').findOneAndUpdate(
        { userId: user.userId },
        { $set: {
          _id: `${toLower(trim(user.firstName))}.${toLower(trim(user.lastName))}`,
          holidayId: uuid(),
          ...body
        }},
        { upsert: true, returnNewDocument: true }
      );

      return res.status(200).json({ holiday });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default addHoliday;