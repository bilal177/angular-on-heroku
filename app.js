require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router")

if (process.env.NODE_ENV === "production"{
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("/src",  "build", "index.html"));
  });
}else{
  app.use(express.json());
}

app.use("/api/users", userRouter);

app.listen(process.env.PORT || process.env.APP_PORT,() => {
  console.log("server up and running on port : ", process.env.PORT || process.env.APP_PORT);
});
