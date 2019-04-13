import initFirebase from "../../initFirebase";

const getUsers = (req, res) => {
  console.log("USERSID", req.query.email);

  // console.log(initFirebase.firestore().collection("users").where("firstname", "==", "Ahmed"));

  // Get single document
  initFirebase
    .firestore()
    .collection("users").where("email" ,'==',req.query.email)
    .get()
    .then(snapshot => {
      let users = [];
      snapshot.forEach(doc => {
        console.log(doc.id, "=>", doc.data());
        users.push(doc.data())
      });
      return res.status(200).json({
        user: users[0]
      });
      // if (!doc.exists) {
      //   console.log("No such document!");
      //   return res.status(400).json({
      //     user: {}
      //   });
      // } else {
      //   console.log("Document data:", doc.data());
      //   return res.status(200).json({
      //     user: doc.data()
      //   });
      // }
    })
    .catch(err => {
      console.log("Error getting document", err);
    });

  //Get all documents in a collection
  // initFirebase
  //   .firestore()
  //   .collection("users")
  //   .get()
  //   .then(snapshot => {
  //     let users = [];
  //     snapshot.forEach(doc => {
  //       console.log(doc.id, "=>", doc.data());
  //       users.push(doc.data())
  //     });
  //     return res.status(200).json({
  //       users: users
  //     });
  //   })
  //   .catch(err => {
  //     console.log("Error getting documents", err);
  //     res.status(400).json({
  //       error: err
  //     });
  //   });
};

export default getUsers;
