const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');                       //used to call layouts
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal =require('./config/passport-local-strategy');
const { default: mongoose } = require('mongoose');
const MongoStore = require("connect-mongo");
const sassMiddleware = require('node-sass-middleware');


app.use(sassMiddleware({
     src: './assets/scss',
     dest : './assets/css',
     debug: true,
     outputStyle: 'expanded',
     prefix: '/css'                                                  //css folder of assets
}));


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));                                //it is used to search all static css and js files in assets folder
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
       maxAge: (1000*60*60)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1/test-app',                            //urlto mongo db
        autoRemove: 'interval',
        // autoRemove: 'disabled',
        autoRemoveInterval: 10 ,                     // In minutes. Default
      })

}));

app.use(passport.initialize());
app.use(passport.session());

app.set(passport.setAuthenticatedUser);



//use express router
app.use('/' , require('./routes/index'));



app.listen(port , function(err){
    if(err)
    {
        console.log('Error in running the server :  ' , err);
    }
    
    
    console.log('Server is running on port :' , port);
});
