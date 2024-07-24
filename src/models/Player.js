
const db = require('../config/db');

class Player {
  static createPlayer(playData) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO playrooms SET ?', playData, (err, result) => {
        if (err) reject(err);
        else resolve(result.insertId); // Return the ID of the newly inserted chat room
      });
    });
  } 

  static getPlayer(playerId) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM playrooms WHERE id = ?', playerId, (err, rows) => {
        if (err) reject(err);
        else {
          if (rows.length > 0) resolve(rows[0]);
          else reject(new Error('Play room not found'));
        }
      });
    });
  }
}

module.exports = Player;
