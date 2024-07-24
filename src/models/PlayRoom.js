
const db = require('../config/db');

class PlayRoom {
  static createPlayRoom(roomData) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO playrooms SET ?', roomData, (err, result) => {
        if (err) reject(err);
        else resolve(result.insertId); // Return the ID of the newly inserted chat room
      });
    });
  } 

  static getPlayRoomById(roomId) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM playrooms WHERE id = ?', roomId, (err, rows) => {
        if (err) reject(err);
        else {
          if (rows.length > 0) resolve(rows[0]);
          else reject(new Error('Play room not found'));
        }
      });
    });
  }
}

module.exports = PlayRoom;
