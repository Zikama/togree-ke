let User = require("../models/User"),
    bcrypt = require("bcryptjs");

function registerSocial(user, callback) {

    User.findOne({
            user_id: `${user.id}`
        })
        .then(existing_user => {
            if (existing_user) {
                let user = existing_user
                    // console.log();
                return callback(null, user);
            } else {
                let newUser = new User({
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    contact: user.contact,
                    address: user.address,
                    country: user.country,
                    password: user.password,
                    region: user.region,
                    city: user.city,
                    referral: user.referral,
                    provider: user.provider,
                    profile_picture: user.profile_picture,
                    email_verified: true,
                    social: user.meta,
                    user_id: user.id,
                });
                newUser.save()
                    .then(user => {
                        // req.flash("success_msg", "Registered");
                        // res.redirect("/dashboard");
                        // console.log(user);
                        callback(null, user);
                    })
                    .catch(err => console.log(err));

            }
        })
        .catch(err => console.log(err))
}

function registerSocial2(user, callback) {
    User.findOne({
            user_id: `${user.id}`
        })
        .then(existing_user => {
            if (existing_user) {
                let user = existing_user
                    // console.log();
                return callback(null, user);
            } else {
                let newUser = new User({
                    name: user.name,
                    email: user.email,
                    contact: user.contact,
                    address: user.address,
                    country: user.country,
                    password: user.password,
                    region: user.region,
                    city: user.city,
                    referral: user.referral,
                    provider: user.provider,
                    profile_picture: user.profile_picture,
                    email_verified: true,
                    social: user.meta,
                    user_id: user.id,
                });
                newUser.save()
                    .then(user => {
                        // req.flash("success_msg", "Registered");
                        // res.redirect("/dashboard");
                        // console.log(user);
                        callback(null, user);
                    })
                    .catch(err => console.log(err));

            }
        })
        .catch(err => console.log(err))
}

module.exports = {
    registerSocial,
    registerSocial2,
}