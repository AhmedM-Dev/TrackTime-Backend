const getHistory = async ({ db, user }, res) => {
  const leaves = await db.collection('leaves').find({ userId: user.userId });
  const travels = await db.collection('travels').find({ userId: user.userId });
  const authorizations = await db.collection('authorizations').find({ userId: user.userId });
};

export default getHistory;
