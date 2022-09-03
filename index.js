const express = require('express');
const app = express();
const cors = require('cors');
const connect = require('./db/connect');
const parkingRouter = require('./routes/parking');
const chargesRouter = require('./routes/charge');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Parking Management API." });
});
app.use('/api/parking', parkingRouter);
app.use('/api/charges', chargesRouter);

const PORT = process.env.PORT || 8080;

const startDatabaseConnection = async () => {
    try {
        await connect();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    } catch (error) {
        console.error(error);
    }
}
startDatabaseConnection();