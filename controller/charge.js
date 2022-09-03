const { vehicleType, parkingStatus, chargeType } = require('../constants');
const Charges = require('../models/charge');
const fs = require('fs');
const { parse } = require('csv-parse');
const charge = require('../models/charge');

const getCharges = async (req, res) => {
    try {
        const charges = await loadCharges();
        res.status(200).json(charges);
    } catch (error) {
        console.log(error);
    }
};

const addCharges = async (req, res) => {
    try {
        fs.createReadStream('././defaults/Charges.csv')
            .pipe(parse({ delimiter: ',', from_line: 2 }))
            .on('data', async function (row) {
                const existingCharge = await Charges.findOne({
                    vehicleType: row[0],
                    chargeName: row[1]
                });
                if (!existingCharge) {
                    const charge = new Charges({
                        vehicleType: row[0],
                        chargeName: row[1],
                        chargeValue: Number(row[2]),
                        chargeDuration: row[3]
                    });
                    charge.save();
                }
            });
        return res.status(200).send('Charges added successfully');
    } catch (error) {
        console.log(error);
    }
};

const loadCharges = async () =>
    sanitizeCharges(
        await Charges.find({ chargeName: { $ne: chargeType.rent } }).lean()
    );

const sanitizeCharges = (charges) =>
    charges.map(({ vehicleType, chargeName, chargeValue, chargeDuration }) => {
        return {
            vehicleType,
            chargeName,
            chargeValue,
            chargeDuration
        };
    });

module.exports = {
    getCharges,
    addCharges
};
