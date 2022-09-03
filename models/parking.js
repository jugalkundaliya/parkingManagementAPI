const mongoose = require('mongoose');
const { vehicleType } = require('../constants');

const parkingSchema = new mongoose.Schema({
    spotNumber: {
        type: String,
        unique: true,
        dropDups: true,
        required: [true, 'Spot Number is required'],
    },
    status: {
        type: Boolean,
        default: false,
    },
    vehicleType: {
        type: String,
        enum: [vehicleType.fourWheeler, vehicleType.twoWheeler],
    },
});
module.exports = mongoose.model('ParkingSpot', parkingSchema);
