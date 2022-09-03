const { vehicleType, parkingStatus } = require("../constants");
const ParkingSpot = require("../models/parking");
const fs = require("fs");
const { parse } = require("csv-parse");



const getParkingSpots = async (req, res) => {
    try {
        const spots = await loadParkingSpots();
        res.status(200).json(spots);
    } catch (error) {
        console.log(error);
    }
};

const addParkingSpots = async (req, res) => {
    try {
        fs.createReadStream("././defaults/ParkingSpots.csv")
            .pipe(parse({ delimiter: ",", from_line: 2 }))
            .on("data", async function (row) {
                const existingSpot = await ParkingSpot.findOne(
                    { spotNumber: row[0] }
                );
                if (!existingSpot) {
                    const spot = new ParkingSpot({
                        spotNumber: row[0],
                        vehicleType: row[1]
                    });
                    spot.save();
                }

            })
        return res.status(200).send("Parking spots added successfully");
    } catch (error) {
        console.log(error);
    }
}

const getParking = async (req, res) => {
    try {
        const spots = await loadParkingSpots();
        const totalNumberOfSpots = spots.length;
        const totalNumberOfOccupiedSpots = totalNumberOfSpots - spots
            .filter(spot => spot.status === parkingStatus.occupied).length;
        const totalNumberOfVacantSpots = totalNumberOfSpots - totalNumberOfOccupiedSpots;
        const numberOfVacantTwoWheelerSpot = totalNumberOfVacantSpots - spots
            .filter(spot => spot.status === parkingStatus.available && spot.vehicleType === vehicleType.twoWheeler).length;
        const numberOfVacantFourWheelerSpot = totalNumberOfVacantSpots - numberOfVacantTwoWheelerSpot;
        const parking = {
            parkingSpots: spots,
            totalNumberOfSpots,
            totalNumberOfOccupiedSpots,
            totalNumberOfVacantSpots,
            numberOfVacantFourWheelerSpot,
            numberOfVacantTwoWheelerSpot
        };

        res.status(200).json(parking);
    } catch (error) {
        console.log(error);
    }
}

async function loadParkingSpots() {
    return (await ParkingSpot.find()).map(spot => {
        return {
            spotNumber: spot.spotNumber,
            status: spot.status ? parkingStatus.available : parkingStatus.occupied,
            vehicleType: spot.vehicleType
        };
    }).sort((a, b) => Number(a.spotNumber.replace("P", "")) - Number(b.spotNumber.replace("P", "")));
}

module.exports = {
    getParkingSpots,
    addParkingSpots,
    getParking
}

