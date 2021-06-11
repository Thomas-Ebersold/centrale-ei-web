const express = require("express");
const WaitingLineModel = require("../models/waitingLine");
const MovieModel = require("../models/movie");
const UserModel = require("../models/user");
const router = express.Router();

router.get("/", function (req, res) {
  UserModel.find({ nickname: req.body.nickname }).then(function (user) {
    WaitingLineModel.find({ id_user: user[0]._id, waiting: true })
      .populate("id_movie")
      .then(function (s) {
        res.json(s);
      });
  });
});

router.post("/", function (req, res) {
  UserModel.find({ nickname: req.body.nickname }).then(function (user) {
    WaitingLineModel.find({ id_user: user[0]._id, waiting: true })
      .populate("id_movie")
      .then(function (s) {
        res.json(s);
      });
  });
});

router.post("/vue", function (req, res) {
  UserModel.find({ nickname: req.body.nickname }).then(function (user) {
    WaitingLineModel.find({ id_user: user[0]._id, rate: { $gt: 1 } })
      .populate("id_movie")
      .then(function (s) {
        res.json(s);
      });
  });
});

router.post("/movies", function (req, res) {
  UserModel.find({ nickname: req.body.nickname }).then(function (user) {
    console.log("salur");
    console.log(req.body);
    MovieModel.find({ name: req.body.movieName }).then(function (movie) {
      WaitingLineModel.find({ id_composite: movie[0]._id + user[0]._id }).then(
        function (sol) {
          res.json(sol);
        }
      );
    });
  });
});
router.get("/coucou", function (req, res) {
  UserModel.find({ nickname: req.body.nickname }).then(function (user) {
    MovieModel.find({ name: req.body.movieName }).then(function (movie) {
      WaitingLineModel.findOneAndUpdate(
        { id_composite: movie[0]._id + user[0]._id },
        { waiting: req.body.waiting }
      )
        .then(function () {
          res.json("on est la");
        })
        .catch(function () {
          res.json("erreur waiting");
        });
    });
  });
});

router.post("/new", function (req, res) {
  UserModel.find({ nickname: req.body.nickname }).then(function (user) {
    const userid = user[0]._id;
    MovieModel.find({ name: req.body.movieName }).then(function (movie) {
      WaitingLineModel.find({ id_composite: movie[0]._id + user[0]._id }).then(
        function (sol) {
          console.log(sol);
          if (sol.length != 0) {
            WaitingLineModel.findOneAndUpdate(
              { id_composite: movie[0]._id + user[0]._id },
              { waiting: req.body.waiting, rate: req.body.rate }
            ).then(function (sol) {
              console.log(sol.waiting);
            });
          } else {
            const newWaiting = new WaitingLineModel({
              id_movie: movie[0]._id,
              id_user: userid,
              id_composite: movie[0]._id + userid,
              waiting: req.body.waiting,
              ranking: 0,
              rate: req.body.rate,
            });
            newWaiting
              .save()
              .then(function () {
                res.json("ok");
              })
              .catch(function (error) {
                res.json(error);
              });
          }
        }
      );
    });
  });
});

module.exports = router;
