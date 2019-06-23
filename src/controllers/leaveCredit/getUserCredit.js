import { take, orderBy } from "lodash";

const getUserCredit = async ({ user, db }, res) => {

  try {
    const userCredit = await db.collection('leaveCredit').findOne({ userId: user.userId });

    return res.status(200).json({ credit: userCredit });

  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default getUserCredit;
