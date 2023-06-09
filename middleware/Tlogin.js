const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Teacher = mongoose.model("Teacher");
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  //authorization === Bearer ewefwegwrherhe
  if (!authorization) {
    return res.status(401).json({ error: "та нэвтэрсэн байх ёстой" });
  }
  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "та нэвтэрсэн байх ёстой" });
    }

    const { _id } = payload;

    Teacher.findById(_id).then((userdata) => {
      req.user = userdata;

      next();
    });
  });
};
