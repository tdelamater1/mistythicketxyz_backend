const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const details = require("./details.json");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("The server started on port 3000");
});

app.get('/test', function (req, res) {
  console.log("request came");
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let messagePayload = req.body;
  sendMail(messagePayload, info => {
    console.log(`The mail has beed sent 😃!! id: ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(messagePayload, callback) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: details.user,
      pass: details.password
    }
  });

  const mailOptions = {
    from: 'tdelamaterthrowaway@gmail.com',
    to: 'tdelamater@gmail.com',
    subject: `mistythicket.xzy message from: ${messagePayload.name}`,
    html: `<h1>Message from ${messagePayload.name}</h1><br>
      <h4>Message: ${messagePayload.message}</h4>`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      // do something useful
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}
