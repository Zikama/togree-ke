let FacebookStrategy = require('passport-facebook');
let facebook = require('./keys').facebook,
    bcrypt = require("bcryptjs");

let fbLogin = (passport, registerSocial) => {
    passport.use(
        new FacebookStrategy({
                clientID: facebook.client_id,
                clientSecret: facebook.app_secret,
                callbackURL: facebook.callback_url,
                profileFields: ['id', 'displayName', 'first_name', 'last_name', 'photos', 'address', 'email'],
                passReqToCallback: true,
            },
            (req, accessToken, refreshToken, profile, done) => {
                let data = profile._json;
                if (registerSocial) {
                    registerSocial({
                            username: data.name.split("")[1],
                            name: data.name,
                            email: data.email == undefined ? data.email = "null" : data.email = data.email || "null",
                            contact: data.contact == undefined ? data.contact = "null" : data.contact = data.contact,
                            address: data.address == undefined ? data.address = "null" : data.address = data.address,
                            country: data.country == undefined ? data.country = "null" : data.country = data.country,
                            password: data.password == undefined ? data.password = "null" : data.password = data.password,
                            region: data.region == undefined ? data.region = "null" : data.region = data.region,
                            city: data.city == undefined ? data.city = "null" : data.city = data.city,
                            referral: data.referral == undefined ? data.referral = "null" : data.referral = data.referral,
                            provider: 'facebook',
                            profile_picture: data.picture.data.url,
                            id: profile.id,
                            meta: {
                                provider: 'facebook',
                                token: accessToken,
                            }
                        },
                        done
                    );
                }
            }
        ));
    return {
        FacebookRoutes: {
            authenticate: (req, res, next) => {
                return passport.authenticate('facebook', {
                    scope: ['email', 'user_hometown', 'public_profile', 'user_location']
                })(req, res, next)
            },
            callback: (req, res, next) => {
                return passport.authenticate('facebook', {
                    successRedirect: '../../../dashboard',
                    failureRedirect: '/users/auth/facebook/failed'
                })(req, res, next)
            }
        }

    }
}

module.exports = fbLogin