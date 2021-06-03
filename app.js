require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router")
const path = require('path');

app.use(express.json());
app.use(express.static(__dirname + '/dist/dalstock'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/dist/dalstock/index.html'));
});

app.listen(process.env.PORT || process.env.APP_PORT,() => {
  console.log("server up and running on port : ", process.env.PORT || process.env.APP_PORT);
});
