const LocalStrategy = require("passport-local").Strategy,
    //mongoose = require("mongoose"),
    bcrypt = require("bcryptjs"),
    // Get keys
    keys = require("./keys"),
    // Get Nodemailer
    nodemailer = require("nodemailer"),
    // User model here for check up
    User = require("../models/User"),
    // Get the mailer
    mail = require("../mail"),
    // Address model
    Addresses = require("../models/address"),
    // Requests Model
    Request = require("../models/requests"),
    // BoxSize Model
    BoxSize = require("../models/BoxSize");
// Orders Model
Order = require("../models/orders");

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({
            usernameField: 'email'
        }, (email, password, done) => {
            // Match user email
            User.findOne({
                    // email: email
                    $or: [{
                        email: email
                    }, {
                        username: email
                    }]
                })
                .then(user => {
                    // for (let user of users) {

                    if (!user) {
                        return done(null, false, {
                            message: 'That email is not registered'
                        })
                    }

                    function sendNotification(params) {

                        // We can also send another email as a reminder
                        const art_mail = new mail(nodemailer, keys.user, keys.pass); //Authenticate SMTP
                        // Send an email
                        const message = `
                        <h3>Hello ${user.name}</h3>
                        <p>Thank you for signing up for <a href="https://throneshoppers.com">Throne Shoppers.</a></p>
                        <p>Please activate your account to countinue enjoying our services with <a style="text-decoration:none" href="https://throneshoppers.com">Thronehoppers.com</a></p>
                        <p> Click <a style="text-decoration:none" href = "https://intense-coast-36294.herokuapp.com/user/verify/${user._id}" > Here </a> to Activate</p>
                        <br>
                        <div style="margin:auto;display:flex;justify-content:center;">
                        <a style="text-decoration:none" href = "https://intense-coast-36294.herokuapp.com/user/verify/${user._id}" > <button style= "font-size: 21pt;padding: 8 px 13 px;border-radius: 5 px;margin: auto;margin-bottom: 43 px;border: 0;color: white;background: #00c3b3; cursor: pointer; width: 96%; cursor:pointer">Activate</button></a>
                        </div>
                        <div style="width:100%;display:none;flex-wrap:wrap;background:#ccc">
                            <h2>Throne Shoppers</h2>
                            <span>
                            <ul>
                            <a><li>Contacts</li>
                            </a>
                            <a><li>Services</li>
                            </a>
                            <a><li>About</li>
                            </a>
                            <a><li>Follow us</li>
                            </a>
                            </ul>
                            </span>
                        </div>
                        `;
                        art_mail.send("Email verification", message, `${user.email}`)
                            .then(sent => console.log(sent)).catch(err => console.log(err))
                        return done(null, false, {
                            message: 'This account is not verified, please check your email  for verification'
                        });
                    }
                    // match the user password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                            if (err) throw err;
                            if (isMatch) {
                                if (!user.email_verified) {
                                    return sendNotification();
                                }
                                return done(null, user)
                            } else {
                                return done(null, false, {
                                    message: 'Password incorrect, check your password and try again!'
                                })
                            }
                        })
                        // }
                })
                .catch(err => console.log(err))
        })
    )
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            // done(err);
            Addresses.find({}, (err, address) => {
                Request.find({}, (err, requests) => {
                    BoxSize.find({}, (err, boxsizes) => {
                        User.find({})
                            .then(users => {
                                Order.find({
                                    userId: id
                                }).sort([
                                    ['date', 1]
                                ]).then(orders_ => {
                                    if (address && address.length && requests && boxsizes && users && orders_ && user.permission < 4) {
                                        done(err, [user, address, requests, boxsizes, users, orders_])
                                    } else {
                                        Order.find({}).sort([
                                            ['date', 1]
                                        ]).then(_order => {
                                            if (address && address.length && requests && boxsizes && users && user.permission >= 4) {

                                                done(err, [user, address, requests, boxsizes, users, _order]);
                                            } else {
                                                done(err, [user]);
                                            }
                                        })
                                    }
                                }).catch(err => console.log(err))


                            })
                    })
                })
            })
        });
    });
}