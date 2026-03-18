// Everything about the election

const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    posts: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);
const Election = mongoose.model("Election", electionSchema);

module.exports = Election;
