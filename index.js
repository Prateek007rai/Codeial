const env = require('./config/envirnoment');
const express = require('express');

const logger = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
require('./config/view-helpers')(app);
const port = 8000;
const expressLayouts = require('express-ejs-layouts');                       //used to call layouts
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal =require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const { default: mongoose } = require('mongoose');
const MongoStore = require("connect-mongo");
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');


// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');

const path = require('path');


// if(env.name == 'development'){
//     app.use(sassMiddleware({
//         src: path.join(__dirname , env.asset_path , '/scss'),
//         dest : path.join(__dirname , env.asset_path , '/css'),
//         debug: true,
//         outputStyle: 'expanded',
//         prefix: '/css'                                                  //css folder of assets
//    }));
// }

if(env.name == 'development'){
    app.use(sassMiddleware({
        src: './assets/scss',
        dest: './assets/css',
        prefix: '/css'
    }));
}
    


app.use(logger(env.morgan.mode, env.morgan.options));

app.use(express.urlencoded({extended:false}));

app.use(cookieParser());

// app.use(express.static(env.asset_path));                                //it is used to search all static css and js files in assets folder
app.use(express.static(path.join(__dirname, env.asset_path)));


// make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));



app.use(expressLayouts);
                                                                       
app.set('layout extractStyles' , true);                             //extract the style and script from Sub-pages to the layout
app.set('layout extractScripts' , true);




//set up the view engine
app.set('view engine','ejs');
app.set('views' , './views');


//MongoStore is used to store the seesion cookie in the DB.
app.use(session({
    name: 'codeial',
    //change the secret before deployment in production mode
    secret : 'blahsomething',
    saveUninitialized: false ,                                                //prevents to save extraa data in cookies
    resave : false,
    cookie:{                                                                 // automatic cooking expires time
       maxAge: (1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1/test-app',                            //url to mongo db
        autoRemove: 'interval',
        // autoRemove: 'disabled',
        autoRemoveInterval: 10 ,                     // In minutes. Default
      })

}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/' , require('./routes/index'));


app.listen(port , function(err){
    if(err)
    {
        console.log('Error in running the server :  ' , err);
    }
    
    
    console.log('Server is running on port :' , port);
});
