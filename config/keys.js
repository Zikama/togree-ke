module.exports = {
        mongoURI: process.env.MONGODB_URI || "mongodb://localhost:27017/throners" || `mongodb+srv://nemie:kampala@sadja00@cluster0-7hg6q.mongodb.net/throners?retryWrites=true` || "mongodb://localhost:27017/throners",
        dbname: `throners`,
        sessionsURI: process.env.MONGODB_URI || `mongodb+srv://nemie:kampala@sadja00@cluster0-7hg6q.mongodb.net/mySessions?retryWrites=true` || `mongodb://nemie:kampalaSadja00@ds157956.mlab.com:57956/heroku_f1f2spdw` || "mongodb://localhost:27017/mySessions",
        sessions: `sessions`,
        sessionsDBname: `heroku_f1f2spdw`,
        facebook: {
            client_id: "2270308143207888",
            app_secret: "0af6dea8635b72b86153787be548b2f4",
            callback_url: "https://intense-coast-36294.herokuapp.com/users/auth/facebook/callback"
        },
        google: {
            client_id: "121277709561-vbm7qtuupthh9ip4ul8lear7im0etjc4.apps.googleusercontent.com",
            app_secret: "a_p4CL58JN1UAlRC2a-jCdIb",
            callback_url: "https://intense-coast-36294.herokuapp.com/users/auth/google/callback"
        },
        stack: 'Bearer sk_test_631cd3e5faeb09386591ef059276185ac134d732',
        autoPass: "admipass",
        pass: "s1YueLO{G[=",
        user: /*  (user) => user ||  */ "donotreply@throneshoppers.com"
    }
    // Bearer sk_test_ec6f60ba2554f44a968ca025c3db9bd9591af948