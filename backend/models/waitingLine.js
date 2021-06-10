const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WaitingLineSchema = new Schema({
  id_movie: { type: Schema.Types.ObjectId, ref: "MovieModel" },
  id_user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  id_composite: { type: String, required: true, unique: true },
  waiting: { type: Boolean },
  ranking: { type: Number },
  rate: { type: Number },
});

const WaitingLineModel = mongoose.model(
  "WaitingLineModel",
  WaitingLineSchema,
  "waitingLine"
);

module.exports = WaitingLineModel;
