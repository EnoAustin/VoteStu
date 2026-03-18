// Candidate section

const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    matricule: {
      type: String,
      required: true,
    },
    election: {
      type: mongoose.Schema.Type.ObjectId,
      ref: "Election",
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    feesDocument: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    applicationDeadline: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
