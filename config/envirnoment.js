const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});


const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'prateekrai341036@gmail.com', // generated ethereal user
            pass: 'akqjuetwpcvjrsce', // generated ethereal password
        }
    },
    google_client_id: "504166202153-g96e79b37h9r2p2jaa6idudvjjsh4kkk.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }

}


const production =  {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,                                 //in node we add ASSET_PATH:"/assets"
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'prateekrai341036@gmail.com', // generated ethereal user
            pass: 'akqjuetwpcvjrsce', // generated ethereal password
        }
    },
    google_client_id: "504166202153-g96e79b37h9r2p2jaa6idudvjjsh4kkk.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://codeial.com/users/auth/google/callback",
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}



// module.exports = development;
module.exports = eval(process.env.CODEIAL_ENVIRONMENT) === undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);