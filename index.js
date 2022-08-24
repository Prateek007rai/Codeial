const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');                       //used to call layouts
const db = require('./config/mongoose');


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));                                //it is used to search all static css and js files in assets folder
app.use(expressLayouts);
                                                                       
app.set('layout extractStyles' , true);                             //extract the style and script from Sub-pages to the layout
app.set('layout extractScripts' , true);



//use express router
app.use('/' , require('./routes/index'));

//set up the view engine
app.set('view engine','ejs');
app.set('views' , './views');



app.listen(port , function(err){
    if(err)
    {
        console.log('Error in running the server :  ' , err);
    }
    
    
    console.log('Server is running on port :' , port);
});
