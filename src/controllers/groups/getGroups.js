const getGroups = ({ db }, res) => {

  // db.collection("groups").aggregate([
  //   {
  //     $lookup: {
  //       from: "users",
  //       localField: "poleLead",    // field in the users collection
  //       foreignField: "userId",  // field in the avatars collection
  //       as: "poleLead"
  //     }
  //   },
  //   {
  //     $project: {
  //       _id: 0,
  //       groupId: 1,
  //       name: 1,
  //       shortName: 1,
  //       poleLead: 1,
  //       poleLeadName: { $concat: [ "$firstName", " ", "$lastName" ] }
  //     }
  //   }
  // ])


  db.collection("groups").aggregate([
    {
      $lookup: {
        from: "users",
        localField: "poleLead",    // field in the users collection
        foreignField: "userId",  // field in the avatars collection
        as: "poleLeadFullName"
      }
    },
    {
      $project: {
        _id: 0,
        groupId: 1,
        name: 1,
        shortName: 1,
        poleLead: 1,
        poleLeadName: { $concat: [ {$arrayElemAt: ["$poleLeadFullName.firstName", 0]}, " ", {$arrayElemAt: ["$poleLeadFullName.lastName", 0]} ] }
      }
    }
  ]).toArray((error, result) => {
    if (error) {
      return res.status(500).json({
        errorMessage: "Something went wrong."
      });
    }

    if (result.length > 0) {
      return res.status(200).json({
        groups: result
      });
    } else {
      return res.status(400).json({
        errorMessage: "No data found."
      });
    }
  });
};

export default getGroups;


