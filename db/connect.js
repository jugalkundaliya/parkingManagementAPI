const mongoose = require("mongoose");
module.exports = () =>
    mongoose.connect("mongodb+srv://jugalkundaliya:m3LjgOqs5o6KgYG6@cluster0.hi0nukw.mongodb.net/?retryWrites=true&w=majority")
        .then(() => console.log("Connected…"))
        .catch(err => console.error("Connection failed…"));
