import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import config from "../../../config/config.json";

const authenticate = ({ db, body }, res) => {

  const { email, pass } = body;

  if (email && pass) {
    console.log('[AUTHENTICATION] ', body);

    db.collection('users').findOne({
      email
    }, function (err, result) {
      if (err) {
        throw err;
      }

      if (result) {
        const { _id, ...user } = result;

        if (bcrypt.compareSync(pass, user.password)) {
          const token = jwt.sign({ user }, config.secret, { expiresIn: '168h' });
          const { password, ...userWithoutPassword } = user;

          jwt.verify(token, config.secret, (err, decoded) => {
            if (decoded) {
              return res.status(200).json({
                user: {
                  ...userWithoutPassword,
                  token,
                  expires: decoded.exp
                }
              });
            }
          });

        } else {
          return res.status(400).json({ error: 'Wrong password.' });
        }

      } else {
        return res.status(400).json({ error: 'Unknown user.' });
      }
    });
  } else {
    return res.status(400).json({ error: 'Bad informaions supplied.' });
  }
};

export default authenticate;