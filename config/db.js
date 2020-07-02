const mongoose = require("mongoose"),
    db = require("./keys").mongoURI,

    // Connect to mongodb
    conn = mongoose.connect(db, { useNewUrlParser: true });
// Connect to mongodb
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("mongoDB connected..."))
    .catch(err => console.log(err));
module.exports = conn