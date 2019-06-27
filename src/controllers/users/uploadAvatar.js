const uploadAvatar = async ({ db, body, user }, res) => {
  // console.log('[UPLOAD PHOTO]', body);

  try {
    const newAvatar = await db.collection('avatars').findOneAndUpdate(
      { userId: user.userId },
      {
        $set: {
          userId: user.userId,
          photo: body.photo
        }
      },
      { upsert: true, returnNewDocument: true }
    );

    console.log('newAvatar', newAvatar);

    if (newAvatar.value) {
      return res.status(200).json({
        photo: newAvatar.value.photo
      });
    } else {
      const avatar = await db.collection('avatars').findOne({ userId: user.userId });

      return res.status(200).json({
        photo: avatar.photo
      });
    }

  } catch (error) {
    return res.status(500).json({
      error
    });
  }

  // db.collection('avatars').updateOne(
  //   { userId: params.userId },
  //   { $set: { ...body } },

  //   function (err, result) {
  //     if (err) {
  //       console.log("An error occured.");
  //       return res.status(400).json({
  //         error: err
  //       });
  //     } else if (result) {

  //       if (JSON.parse(result).nModified > 0) {
  //         db.collection('avatars').find({
  //           userId: params.userId
  //         }).toArray((error, result) => {
  //           if (error) {
  //             console.error("An error occured.");
  //             return res.status(400).json({
  //               error
  //             });
  //           } else {
  //             return res.status(200).json({
  //               user: result[0]
  //             });
  //           }
  //         })
  //       } else {
  //         return res.status(200).json({
  //           info: "Nothing to update."
  //         });
  //       }
  //     }
  //   });
};

export default uploadAvatar;