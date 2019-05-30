const getUsers = ({ db }, res) => {

  db.collection("users").aggregate([
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
  ]).toArray((error, result) => {
    if (error) {
      return res.status(500).json({
        error
      });
    }

    if (result.length > 0) {
      return res.status(200).json({
        users: result
      });
    } else {
      return res.status(400).json({
        errorMessage: "No data found."
      });
    }
  });
};

export default getUsers;
