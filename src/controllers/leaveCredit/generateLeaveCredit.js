import uuid from 'uuid/v4';
import { random, toLower, trim } from 'lodash';

const generateScores = async ({ db, body }, res) => {

  console.log(body);

  const users = await db.collection('users').find({}).toArray();

  if (users && users.length > 0) {
    users.map(async user => {
      await db.collection('leaveCredit').findOneAndUpdate(
        { userId: user.userId },
        { $set: { _id: `${toLower(trim(user.firstName))}.${toLower(trim(user.lastName))}`, credit: random(2, 21) } },
        { upsert: true, returnNewDocument: true }
      )
    });
  }


}

export default generateScores;