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
};

export default uploadAvatar;