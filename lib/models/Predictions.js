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

}

module.exports = { Predictions };
