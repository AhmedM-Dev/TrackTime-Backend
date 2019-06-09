import uuid from 'uuid/v4';
import { toLower, trim, replace } from 'lodash';

const addHoliday = async ({ user, db, body }, res) => {

  console.log('[ADD HOLIDAY] ', body);

  if (body && Object.keys(body).length > 0) {

    try {
      const holiday = await db.collection('holidays').insertOne({
        _id: toLower(replace(trim(body.title), ' ', '.')),
        holidayId: uuid(),
        ...body
      });


      // const holiday = await db.collection('holidays').findOneAndUpdate(
      //   { userId: user.userId },
      //   {
      //     $set: {
      //       _id: toLower(replace(trim(body.title), ' ', '.')),
      //       holidayId: uuid(),
      //       ...body
      //     }
      //   },
      //   { upsert: true, returnNewDocument: true }
      // );

      return res.status(200).json({ holiday });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default addHoliday;