const pool = require('../utils/pool');

class Movies {
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
      SELECT * FROM movies;
      `
    );
    return rows.map((row) => new Movies(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT * from movies
      WHERE id = $1
      `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Movies(rows[0]);
  }

}

module.exports = { Movies };
