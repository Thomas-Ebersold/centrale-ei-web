const express = require("express");
const MovieModel = require("../models/movie");
const router = express.Router();

router.get("/", function (req, res) {
  MovieModel.find({}).then(function (movies) {
    console.log("get movies reussi");
    res.json(movies);
  });
});

router.post("/new", function (req, res) {
  const newMovie = new MovieModel({
    name: req.body.name,
    date: req.body.date,
    id: req.body.id,
    path: req.body.path,
  });
  newMovie
    .save()
    .then(function () {
      res.json("post movie/new reussi");
    })
    .catch(function (error) {
      res.json({ erreur: error, message: "post movie/new echec" });
    });
});

module.exports = router;
