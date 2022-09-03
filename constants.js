const vehicleType = {
    fourWheeler: "FourWheeler",
    twoWheeler: "TwoWheeler"
};

const vehicleTypes = [
    vehicleType.fourWheeler,
    vehicleType.twoWheeler
]

const parkingStatus = {
    occupied: "Occupied",
    available: "Available"
}

const chargeType = {
    initialParkingCharge: "InitialParkingCharge",
    remainingParkingCharge: "RemainingParkingCharge",
    extraParkingCharge: "ExtraParkingCharge",
    rent: "Rent"
}

const chargeTypes = [
    chargeType.initialParkingCharge,
    chargeType.remainingParkingCharge,
    chargeType.extraParkingCharge,
    chargeType.rent,
]

module.exports = {
    vehicleType,
    parkingStatus,
    vehicleTypes,
    chargeType,
    chargeTypes
}
