import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer';
import uuid from 'uuid/v1';

const registerUser = ({ db, body }, res) => {

  console.log('[CREATE USER] ', body);

  db.collection("users").find({
    email: body.email
  }).toArray((error, result) => {
    if (error) {
      return res.status(500).json({
        errorMessage: "Something went wrong."
      });
    }

    if (result.length > 0) {
      return res.status(500).json({
        errorMessage: "Email already used"
      });
    } else {
      db.collection("users").find({}).toArray((error, result) => {
        if (error) {
          return res.status(500).json({
            errorMessage: "Something went wrong."
          });
        }

        db.collection('users').insertOne({
          userId: uuid(),
          email: body.email,
          password: bcrypt.hashSync(body.password),
          displayName: `${body.firstName} ${body.lastName}`,
          firstName: body.firstName,
          lastName: body.lastName,
          jobTitle: body.jobTitle,
          businessRole : body.businessRole,
          group: body.group,
        }, function (err, result) {
          if (err) {
            console.log("An error occured.");
            return res.status(400).json({
              error: err
            });
          } else if (result) {
            console.log("RESULT:", result);

            db.collection("users").find({ email: body.email }).toArray((error, addedUser) => {
              if (error) {
                return res.status(500).json({
                  errorMessage: "Something went wrong."
                });
              }

              var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'ahmed.tux@gmail.com',
                  pass: 'ahmed1989'
                }
              });

              var mailOptions = {
                from: 'tracktime@system.com',
                to: addedUser[0].email,
                subject: 'Registration',
                text: `
                Welcome to TrackTime\n
                
                Your credentials: \n
                  identifier: ${addedUser[0].email}\n
                  pass: ${body.password}
                `
              };

              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });

              if (addedUser) {
                return res.status(200).json({
                  user: addedUser[0]
                });
              }
            })
          }
        });
      });
    }
  });
}

export default registerUser;