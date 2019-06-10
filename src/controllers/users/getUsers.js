import { toLower } from 'lodash';

const getUsers = async ({ user, db, query }, res) => {

  const { groupId, poleLead, all } = query;

  console.log('[GET USERS]', query);

  try {
    let users = await db.collection("users").aggregate([
      {
        $lookup: {
          from: "avatars",
          localField: "userId",    // field in the users collection
          foreignField: "userId",  // field in the avatars collection
          as: "avatar"
        }
      },
      {
        $project: {
          _id: 0,
          userId: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          jobTitle: 1,
          businessRole: 1,
          groupId: 1,
          password: 1,
          photo: { $arrayElemAt: ["$avatar.photo", 0] }
        }
      }
    ]).toArray();

    if (toLower(user.businessRole) === 'administrator' || toLower(user.businessRole) === 'ceo' || all) {
      return res.status(200).json({ users });
    } else if (toLower(user.businessRole) === 'pole lead') {
      let group = await db.collection('groups').findOne({ poleLead: user.userId });

      return res.status(200).json({ users: users.filter(user => user.groupId === group.groupId) });
    }

    console.log('Found group', group);

    users = groupId ? users.filter(user => user.groupId === groupId) : users;
    users = poleLead ? users.filter(user => user.groupId === group.groupId) : users;

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default getUsers;
