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

  static async updateById(id, values) {

    const cryptos = await Cryptos.getById(id);
    if (!cryptos) return null;

    const updates = { ...cryptos, ...values };

    const { rows } = await pool.query(
      `
      UPDATE cryptos
      SET name = $2, created = $3, creator = $4
      WHERE id = $1
      RETURNING *;
      `,
      [
        id,
        updates.name,
        updates.created,
        updates.creator,
      ]
    );
    return new Cryptos(rows[0]);
  }

}

module.exports = { Cryptos };


