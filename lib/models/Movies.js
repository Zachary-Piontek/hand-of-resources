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

  static async insert({ name, released, gross }) {
    const { rows } = await pool.query(
      `
        INSERT INTO movies (name, released, gross)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [name, released, gross]
    );
    return new Movies(rows[0]);
  }

  static async updateById(id, values) {

    const movies = await Movies.getById(id);
    if (!movies) return null;

    const updates = { ...movies, ...values };

    const { rows } = await pool.query(
      `
      UPDATE movies
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
    return new Movies(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE from movies
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );
    return new Movies(rows[0]);
  }

}

module.exports = { Movies };
