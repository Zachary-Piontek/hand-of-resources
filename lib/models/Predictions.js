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

}

module.exports = { Predictions };
