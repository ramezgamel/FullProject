const mongoose = require("mongoose")

const bookingSchema = mongoose.Schema({
  patientName: {
    type: String,
    required: true,
    trim: true,
  },
  docName: {
    type: String,
    required: true,
    trim: true,
  },
  date:{
    type: Date,
    required: true
  },
  time: {
    type: Date,
    required: true
  }
});


module.exports = mongoose.model("booking", bookingSchema)