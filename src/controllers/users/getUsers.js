import initFirebase from "../../initFirebase";

const getUsers = (req, res) => {
  // console.log(initFirebase.firestore().collection("users").where("firstname", "==", "Ahmed"));

  console.log();

  //Get single document
  // initFirebase
  //   .firestore()
  //   .collection("users")
  //   .doc("HiXBZkOYGlm9tATzSQeR")
  //   .get()
  //   .then(doc => {
  //     if (!doc.exists) {
  //       console.log("No such document!");
  //     } else {
  //       console.log("Document data:", doc.data().firtsname);
  //     }
  //   })
  //   .catch(err => {
  //     console.log("Error getting document", err);
  //   });

  //Get all documents in a collection
  initFirebase
    .firestore()
    .collection("users")
    .get()
    .then(snapshot => {
      let users = [];
      snapshot.forEach(doc => {
        console.log(doc.id, "=>", doc.data());
        users.push(doc.data())
      });
      return res.status(200).json({
        users: users
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
      res.status(400).json({
        error: err
      });
    });
};

export default getUsers;
