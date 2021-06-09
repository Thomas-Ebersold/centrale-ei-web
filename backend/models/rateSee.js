const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RateSeeSchema = new Schema({
  id_movie: { type: Schema.Types.ObjectId, ref: "MovieModel" },
  id_user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  id_composite: { type: String, required: true, unique: true },
  see: { type: Boolean },
  rate: { type: Number },
});

const RateSeeModel = mongoose.model("RateSeeModel", RateSeeSchema, "RateSee");

module.exports = RateSeeModel;
