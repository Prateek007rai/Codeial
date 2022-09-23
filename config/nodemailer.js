const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');
const env = require('./envirnoment');



// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(env.smtp);


  let renderTemplate = (data , relativePath) =>{
        let mailHtml ;
        ejs.renderFile(
            path.join(__dirname , '../views/mailers' , relativePath),                //relative path means the place from where this fun is called
            data,
            function(err ,template){
                if(err){ console.log('Error in rendering' ,err ); return ; }

                mailHtml = template ;
            }
        )
        return mailHtml;
  }


  module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
  }