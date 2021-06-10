const express = require("express");
const WaitingLineModel = require("../models/waitingLine");
const MovieModel = require("../models/movie");
const UserModel = require("../models/user");
const router = express.Router();

router.get("/", function (req, res) {
  UserModel.find({ nickname: req.body.nickname }).then(function (user) {
    WaitingLineModel.find({ id_user: user[0]._id })
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
      const newWaiting = new WaitingLineModel({
        id_movie: movie[0]._id,
        id_user: userid,
        id_composite: movie[0]._id + userid,
        waiting: true,
        ranking: 0,
        rate: 0,
      });
      newWaiting
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
