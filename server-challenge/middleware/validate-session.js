const jwt = require("jsonwebtoken");
const User = (require = require("../db").import("../models/user"));

const validateSession = (req, res, next) => {
  const token = req.headers.authorization;
  console.log("token here -->", token);
  if (!token) {
    return res;
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
      console.log("decodeToken here -->", decodeToken);
      if (!err && decodeToken) {
        User.findOne({
          where: { id: decodeToken.id },
        })
          .then((user) => {
            console.log("user here -->", user);
            if (!user) throw err;
            console.log("req here -->", req);
            req.user = user;
            return next();
          })
          .catch((err) => next(err));
      } else {
        req.errors = err;
        return res.status(500).send("You are not allowed");
      }
    });
  }
};

module.exports = validateSession;
