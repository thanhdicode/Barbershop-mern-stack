const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const appointmentSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    contactNumber: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    preferredHairdresser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceCategory', required: true },
    serviceType: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    additionalNotes: { type: String, trim: true, required: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    appointmentDateTime: { type: Date, required: true },
    status: { type: String, enum: ['Upcoming', 'Past', 'Cancelled'], default: 'Upcoming' },
  },
  {
    timestamps: true,
  }
);

// Add plugins
appointmentSchema.plugin(toJSON);
appointmentSchema.plugin(paginate);

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
