const pool = require('../utils/pool');

class Cryptos {
  id;
  name;
  created;
  creator;
    
  constructor(row){
    this.id = row.id;
    this.name = row.name;
    this.created = row.created;
    this.creator = row.creator;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT * FROM cryptos;
      `
    );
    return rows.map((row) => new Cryptos(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT * from cryptos
      WHERE id = $1
      `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Cryptos(rows[0]);
  }

  static async insert({ name, created, creator }) {
    const { rows } = await pool.query(
      `
        INSERT INTO cryptos (name, created, creator)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [name, created, creator]
    );
    return new Cryptos(rows[0]);
  }

}

module.exports = { Cryptos };


