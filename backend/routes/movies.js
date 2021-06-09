const express = require("express");
const MovieModel = require("../models/movie");
const router = express.Router();

router.get("/", function (req, res) {
  MovieModel.find({}).then(function (movies) {
    console.log(movies[0]._id);
    res.json(movies);
  });
});

router.post("/new", function (req, res) {
  const newMovie = new MovieModel({
    name: req.body.name,
    date: req.body.date,
  });
  newMovie
    .save()
    .then(function () {
      res.json("ok");
    })
    .catch(function (error) {
      res.json({ erreur: error });
    });
});

module.exports = router;
