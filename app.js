const express = require('express'),

    flash = require("connect-flash"),

    session = require("express-session"),

    MongoDBStore = require('connect-mongodb-session')(session),
    {
        mongoURI,
        sessions,
        sessionsURI,
        dbname
    } = require("./config/keys"),
    sess_store = new MongoDBStore({
            uri: sessionsURI || mongoURI,
            // databaseName: sessions,
            collection: dbname,
            useNewUrlParser: true

        },
        function(error) {
            if (error) {
                console.log(error);
            }
        });
const ejs = require('ejs');
const app = express();
const PORT = process.env.PORT || 5505;

// Session
app.use(session({
    secret: 'fdferedsdweferewedwrersdfs484',
    cookie: {
        // secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week 
    },
    store: sess_store,
    resave: true,
    saveUninitialized: true
}));

// EJS
app.use(ejs);
app.set("view engine", "ejs");

// Listen
app.listen(PORT, console.log(`Server listening at ${PORT}`));