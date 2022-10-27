const mongoose = require("mongoose")

const bookingSchema = mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Doctor",
  },
  patientName: {
    type: String,
    required: true,
    trim: true,
  },
  doctorName: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
});


module.exports = mongoose.model("booking", bookingSchema)