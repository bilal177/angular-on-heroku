require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router")

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.use("/api/users", userRouter);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/dist/src/index.html'));
});

app.listen(process.env.PORT || process.env.APP_PORT,() => {
  console.log("server up and running on port : ", process.env.PORT || process.env.APP_PORT);
});
