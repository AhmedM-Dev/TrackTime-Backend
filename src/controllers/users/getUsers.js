let users = [];

const getUsers = ({ db }, res) => {
  db.collection("users").find({}).toArray((error, result) => {
    if (error) {
      return res.status(500).json({
        errorMessage: "Something went wrong."
      });
    }

    if (result.length > 0) {
      result.map(user => {
        db.collection("avatars").find({ userId: user.userId }).toArray((error, avatar) => {
          if (error) {
            return res.status(500).json({
              errorMessage: "Something went wrong."
            });
          }

          users.push({
            ...user,
            photo: avatar[0] && avatar[0].photo ? avatar[0].photo : ""
          });

        });
      });

      console.log("USERS", users);

      return res.status(200).json({
        users: result.filter(user => user.businessRole !== 'CEO' && user.businessRole !== 'ADMIN')
      });
    } else {
      return res.status(400).json({
        errorMessage: "No data found."
      });
    }
  });
};

export default getUsers;
