let
    GoogleStrategy = require('passport-google-oauth2').Strategy;
let google = require('./keys').google,
    bcrypt = require("bcryptjs");

let glLogin = (passport, registerSocial) => {
    passport.use(
        new GoogleStrategy({
                clientID: google.client_id,
                clientSecret: google.app_secret,
                callbackURL: google.callback_url,
                profileFields: ['id', 'displayName', 'first_name', 'last_name', 'photos', 'address', 'email'],
                passReqToCallback: true,
            },
            (req, accessToken, refreshToken, profile, done) => {
                let data = profile._json;
                // console.log(data);

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
                            provider: 'google',
                            profile_picture: data.picture,
                            id: data.sub,
                            meta: {
                                provider: 'google',
                                token: accessToken,
                            }
                        },
                        done
                    );
                }
            }
        ));
    return {
        GoogleRoutes: {
            authenticate: (req, res, next) => {
                return passport.authenticate('google', {
                    scope: ['email', 'profile']

                })(req, res, next)
            },
            callback: (req, res, next) => {
                return passport.authenticate('google', {
                    successRedirect: '../../../dashboard',
                    failureRedirect: '/users/auth/goole/failed'
                })(req, res, next)
            }
        }

    }
}

module.exports = glLogin