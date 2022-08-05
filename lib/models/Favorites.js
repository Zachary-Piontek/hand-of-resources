const pool = require('../utils/pool');

class Favorites {
  id;
  name;
  released;
  gross;
    
  constructor(row){
    this.id = row.id;
    this.name = row.name;
    this.released = row.released;
    this.gross = row.gross;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT * FROM favorites;
      `
    );
    return rows.map((row) => new Favorites(row));
  }

}

module.exports = { Favorites };
