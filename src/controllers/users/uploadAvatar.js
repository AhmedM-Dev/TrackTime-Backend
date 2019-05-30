const uploadAvatar = ({ db, body, params }, res) => {
  console.log('updating:', params);

  db.collection('avatars').updateOne(
    { userId: params.userId },
    { $set: { ...body } },

    function (err, result) {
      if (err) {
        console.log("An error occured.");
        return res.status(400).json({
          error: err
        });
      } else if (result) {

        if (JSON.parse(result).nModified > 0) {
          db.collection('avatars').find({
            userId: params.userId
          }).toArray((error, result) => {
            if (error) {
              console.error("An error occured.");
              return res.status(400).json({
                error
              });
            } else {
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

export default uploadAvatar;