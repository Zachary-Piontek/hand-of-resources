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

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT * from favorites
      WHERE id = $1
      `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Favorites(rows[0]);
  }

  static async insert({ name, released, gross }) {
    const { rows } = await pool.query(
      `
        INSERT INTO favorites (name, released, gross)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [name, released, gross]
    );
    return new Favorites(rows[0]);
  }

}

module.exports = { Favorites };
