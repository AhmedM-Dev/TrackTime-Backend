import uuid from 'uuid/v4';
import { random, toLower, trim } from 'lodash';

const generateScores = async ({ db, body }, res) => {

  console.log(body);

  try {
    const users = await db.collection('users').find({}).toArray();

    if (users && users.length > 0) {
      users.map(async user => {
        await db.collection('leaveCredit').findOneAndUpdate(
          { userId: user.userId },
          { $set: { _id: `${toLower(trim(user.firstName))}.${toLower(trim(user.lastName))}`, creditId: uuid(), credit: random(2, 21) } },
          { upsert: true, returnNewDocument: true }
        )
      });

      return res.status(200).json({
        message: 'OK'
      });
    } else {
      return res.status(500).json({
        error: 'No user found.'
      });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export default generateScores;