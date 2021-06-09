const express = require("express");
const RateSeeModel = require("../models/rateSee");
const MovieModel = require("../models/movie");
const UserModel = require("../models/user");
const router = express.Router();

router.get("/", function (req, res) {
  UserModel.find({ nickname: req.body.nickname }).then(function (user) {
    RateSeeModel.find({ id_user: user[0]._id })
      .populate("id_movie")
      .then(function (s) {
        res.json(s);
      });
  });
});

router.post("/new", function (req, res) {
  UserModel.find({ nickname: req.body.nickname }).then(function (user) {
    const userid = user[0]._id;
    MovieModel.find({ name: req.body.movieName }).then(function (movie) {
      const newRating = new RateSeeModel({
        id_movie: movie[0]._id,
        id_user: userid,
        id_composite: movie[0]._id + userid,
        see: true,
        rate: req.body.rate,
      });
      newRating
        .save()
        .then(function () {
          res.json("ok");
        })
        .catch(function (error) {
          res.json(error);
        });
    });
  });
});

module.exports = router;
