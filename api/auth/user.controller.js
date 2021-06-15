const {create, getUserById, getUsers, updateUser, deleteUser, getUserByEmail} = require("./user.service");
const {compare, genSaltSync,hashSync} = require("bcrypt");
const {sign} = require("jsonwebtoken");
const { env } = require("process");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    console.log(body);
    body.password = hashSync(body.password,salt);
    create(body, (err, results) => {
      if (err){
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    })
  },

  getUserById: (req, res) => {
    const id = req.params.id;
    getUserById(id, (err, results) => {
      if(err){
        console.log(err);
        return;
      }
      if (!results.length)
      {
        return res.json({
          success: 0,
          message: "Record not found."
        });
      }
      return res.json({
        success: 1,
        data: results
      });
    })
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err){
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  updateUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err){
        console.log(err);
        return;
      }
      if (!results.length){
        return res.json({
        success: 0,
        message: "Failed to update user."
      });
      }
      return res.json({
        success: 1,
        message: "updated successfully."
      });
    });
  },
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err){
        console.log(err);
        return;
      }
      if (!results.affectedRows){
        console.log(results);
        return res.json({
          success: 0,
          message: "Record not found."
        });
      }
      return res.json({
        success: 1,
        message: "Deleted successfully."
      });
    });
  },
  login: (req, res) => {
    const data = req.body;
    getUserByEmail(data.email, (err, results) =>{
      if (err){
        console.log(err);
        return;
      }
      if (!results){
        return res.json({
          success: 0,
          message: "Invalid email or password."
        });
      }
      compare(data.password, results.password, function(err, result){
        console.log(result);
        if (result)
      {
        results.password = undefined;
        const accessToken = sign({result: results},process.env.JSON_TOKEN_KEY,{
        expiresIn: "2h"
      });
      const refreshToken = sign({result: results},process.env.JSON_TOKEN_KEY,{
        expiresIn: "24h"
      });
      return res.json({
        success: 1,
        message: "Login sucessfull.",
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresIn: accessToken.expiresIn
      });
      } else {
        return res.json({
          success: 0,
          message: "Invalid email or password."
        })
      }
      });


    });
  },
  getUserByEmail: (req, res) => {
    const email = req.body.email;
    getUserByEmail(email, (err, results) => {
      if(err){
        console.log(err);
        return;
      }
      if (!results)
      {
        console.log(results);
        return res.json({
          success: 0,
          message: "Record not found."
        });
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  }
}
