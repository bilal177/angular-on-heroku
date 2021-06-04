require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/auth/user.router")
const path = require('path');
app.use(express.json());
app.use("/api/auth", userRouter);
app.use(express.static(__dirname + '/dist/Dalstock'));

app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname + '/dist/Dalstock/index.html'));
});
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('ssl/key.pem'),
  cert: fs.readFileSync('ssl/server.crt')
};

// const httpsServer = https.createServer(options, app);
// httpsServer.listen(process.env.PORT || 4000);

app.listen(process.env.PORT || process.env.APP_PORT,() => {
  console.log("server up and running on port : ", process.env.PORT || process.env.APP_PORT);
});
