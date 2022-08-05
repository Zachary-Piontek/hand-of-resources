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

  static async updateById(id, values) {

    const favorites = await Favorites.getById(id);
    if (!favorites) return null;

    const updates = { ...favorites, ...values };

    const { rows } = await pool.query(
      `
      UPDATE favorites
      SET name = $2, released = $3, gross = $4
      WHERE id = $1
      RETURNING *;
      `,
      [
        id,
        updates.name,
        updates.released,
        updates.gross,
      ]
    );
    return new Favorites(rows[0]);
  }

}

module.exports = { Favorites };
