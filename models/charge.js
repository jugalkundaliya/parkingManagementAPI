const mongoose = require('mongoose');
const { vehicleTypes, chargeTypes } = require('../constants');

const chargeSchema = new mongoose.Schema({
    versionKey: false,
    vehicleType: {
        type: String,
        enum: [...vehicleTypes],
        required: [true, 'Vehicle type is required'],
    },
    chargeName: {
        type: String,
        enum: [...chargeTypes],
        required: [true, 'Charge Name is required'],
    },
    chargeValue: {
        type: Number,
        required: [true, 'Charge Value is required'],
    },
    chargeDuration: {
        type: String,
        required: [true, 'Charge Duration is required'],
    },
});
module.exports = mongoose.model('Charge', chargeSchema);
