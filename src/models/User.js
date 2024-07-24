
const db = require('../config/db');

class User {
  static getAllUsers() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
}

module.exports = User;
