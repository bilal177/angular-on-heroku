const pool = require("../../config/database");

module.exports = {
  create: (data, callback) => {
    pool.query(
      `insert into registration(firstName, lastName, email, password, number)
                values(?,?,?,?,?)`,
                [
                  data.firstName,
                  data.lastName,
                  data.email,
                  data.password,
                  data.number
                ],
                (error, results, fields) => {
                  if (error){
                    callback(error);
                  }
                  return callback(null, results)
                }
      );
  },
  getUsers: callback => {
    pool.query(
      `select id, firstName, lastName, email, password, number from registration`,
                [],
                (error, results, fields) => {
                  if (error){
                    callback(error);
                  }
                  return callback(null, results)
                }
      );
  },
  getUserById: (id, callback) => {
    pool.query(
      `select id, firstName, lastName, email, password, number from registration where id = ?`,
                [id],
                (error, results) => {
                  if (error){
                    callback(error);
                    return;
                  }
                  return callback(null, results)
                }
      );
  },
  updateUser: (data, callback) => {
    pool.query(
      `update registration set firstName = ?, lastName = ?, email = ?, password = ?, number = ? where id = ?`,
                [
                  data.firstName,
                  data.lastName,
                  data.email,
                  data.password,
                  data.number,
                  data.id
                ],
                (error, results) => {
                  if (error){
                    callback(error);
                  }
                  return callback(null, results)
                }
      );
  },
  deleteUser: (data, callback) => {
    pool.query(
      `delete from registration where id = ?`,
                [data.id],
                (error, results) => {
                  if (error){
                    callback(error);
                  }
                  return callback(null, results)
                }
      );
  },
  getUserByEmail: (email, callback) => {
    pool.query(
      `select * from registration where email = ?`,
      [email],
      (error, results) => {
        if (error){
          callback(error);
        }
        return callback(null, results[0]);
      }
    );
  }
};
