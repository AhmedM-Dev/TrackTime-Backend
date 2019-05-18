const updateUser = ({ db, body, params }, res) => {
  console.log('updating:', params);

  db.collection('users').updateOne(
    { _id: parseInt(params.userId) },
    { $set: { ...body } },

    function (err, result) {
      if (err) {
        console.log("An error occured.");
        return res.status(400).json({
          error: err
        });
      } else if (result) {

        if (JSON.parse(result).nModified > 0) {
          db.collection('users').find({
            userId: parseInt(params.userId)
          }).toArray((error, result) => {
            if (error) {
              console.log("An error occured.");
              return res.status(400).json({
                error
              });
            } else {
              console.log('result ===>', result[0]);

              return res.status(200).json({
                user: result[0]
              });
            }
          })
        } else {
          return res.status(200).json({
            info: "Nothing to update."
          });
        }
      }
    });
};

export default updateUser;