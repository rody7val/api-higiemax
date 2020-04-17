const express = require('express');
const cors = require('cors');
const sms = require('telesignsdk');
const path = require('path');
const app = express();

app.use(cors({ origin: true }));
app.use(express.static(path.join(__dirname, '/')));

app.get("/sms", (req, res) => {
  console.log(req.query);
  const client = new sms(
    "B94F8D0D-FC53-4A54-8E26-D60CF4B89F7D", //customerId
    "Kb3FlCtANQwGMTb0WoBCirb9SwcJCfBytA4yhKHo1Epwn+LzyzkqRMf/wBcLglEfPm58zq/Kb2XPtkN9EwIStw==", //apiKey
    "https://rest-api.telesign.com", //rest_endpoint
    10*1000 // 10 secs
  );
  client.sms.message(
    (err, res) => { //callback
      if (err) {
        console.log("err", err);
        //alert("No se pude enviar el Mensaje");
      } else {
        //alert("Mensaje enviado!")
        console.log("success", res);
      }
    },
    "542923699363", //number
    `${req.query.name}: ${req.query.message}. Email: ${req.query.email}`, //message
    "ARN", //messageType
  );
  return res.json({success: true});
});

app.listen(process.env.PORT || 8000, "0.0.0.0", function () {
  console.log('Servidor funcionando!');
});