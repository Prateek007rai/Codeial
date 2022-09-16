const nodeMailer = require('../config/nodemailer');




exports.newComment = (comment)=>{
    let htmlString = nodeMailer.renderTemplate({comment : comment} , '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'prateekrai341036@gmail.com',                                                          // sender address
        to: comment.user.email,                                                      // list of receivers
        subject: "Hello ✔ , new Comment published",                                  // Subject line
        text: "Hello world?",                                                             // plain text body
        html: htmlString,                                                              // html body
    }, 
    (err , info) =>{
        if(err){ console.log('error in sending mails '); return; }

        // console.log('Message sent',info);
        return;
    });
}