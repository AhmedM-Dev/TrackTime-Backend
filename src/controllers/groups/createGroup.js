// const createGroup = ({ db, body }, res) => {
//   db.collection('groups').insertOne({
//     _id: body.group_id,
//     ...body
//   }, function (err, result) {
//     if (err) {
//       console.log("An error occured.");
//       return res.status(400).json({
//         error: err
//       });
//     } else if (result) {
//       return res.status(200).json({
//         result
//       });
//     }
//   });
// };

// export default createGroup;

const createGroup = ({ db, body }, res) => {

  console.log('[CREATE GROUP] ', body);

  db.collection("groups").find({
    name: body.name
  }).toArray((error, result) => {
    if (error) {
      return res.status(500).json({
        errorMessage: "Something went wrong."
      });
    }

    if (result.length > 0) {
      return res.status(500).json({
        errorMessage: "A group with this name already exist."
      });
    } else {
      db.collection('groups').insertOne({
        groupId: result.length + 1,
        name: body.name,
        poleLead: body.poleLead
      }, function (err, result) {
        if (err) {
          console.log("An error occured.");
          return res.status(400).json({
            error: err
          });
        } else if (result) {
          console.log("RESULT:", result);

          db.collection("groups").find({ name: body.name }).toArray((error, addedGroup) => {
            if (error) {
              return res.status(500).json({
                errorMessage: "Something went wrong."
              });
            }


            if (addedGroup) {
              return res.status(200).json({
                user: addedGroup[0]
              });
            }
          })
        }
      });
    }
  });
}

export default createGroup;