import bcrypt from 'bcryptjs';

const updateProfile = async ({ db, body, params }, res) => {
  console.log('updating:', params);

  if (body && params.userId) {
    const oldUser = await db.collection('users').findOne({ userId: params.userId });

    console.log('oldUser', oldUser);
    console.log('body', body)

    if (bcrypt.compareSync(body.oldPass, oldUser.password)) {
      const updatedUser = await db.collection('users').updateOne(
        { userId: params.userId },
        { $set: {
          email: body.email ? body.email : oldUser.email,
          password: body.password ? body.password : oldUser.password
        } },
        { returnNewDocument: true }
      );

      return res.status(200).json({
        user: updatedUser
      });
      
    } else {
      return res.status(500).json({
        error: 'Current password incorrect.'
      });
    }
  }
};

export default updateProfile;