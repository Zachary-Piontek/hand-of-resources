const pool = require('../utils/pool');

class Predictions {
  id;
  predict;
  year;
  actual;
    
  constructor(row){
    this.id = row.id;
    this.predict = row.predict;
    this.year = row.year;
    this.actual = row.actual;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT * FROM predictions;
      `
    );
    return rows.map((row) => new Predictions(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT * from predictions
      WHERE id = $1
      `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Predictions(rows[0]);
  }

  static async insert({ predict, year, actual }) {
    const { rows } = await pool.query(
      `
        INSERT INTO predictions (predict, year, actual)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [predict, year, actual]
    );
    return new Predictions(rows[0]);
  }

  static async updateById(id, values) {

    const predictions = await Predictions.getById(id);
    if (!predictions) return null;

    const updates = { ...predictions, ...values };

    const { rows } = await pool.query(
      `
      UPDATE predictions
      SET predict = $2, year = $3, actual = $4
      WHERE id = $1
      RETURNING *;
      `,
      [
        id,
        updates.predict,
        updates.year,
        updates.actual,
      ]
    );
    return new Predictions(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE from predictions
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );
    return new Predictions(rows[0]);
  }

}

module.exports = { Predictions };
