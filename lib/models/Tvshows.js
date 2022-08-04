const pool = require('../utils/pool');

class Tvshows {
  id;
  name;
  seasons;
  episodes;
  years;
    
  constructor(row){
    this.id = row.id;
    this.name = row.name;
    this.seasons = row.seasons;
    this.episodes = row.episodes;
    this.years = row.years;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT * FROM tvshows;
      `
    );
    return rows.map((row) => new Tvshows(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT * from tvshows
      WHERE id = $1
      `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Tvshows(rows[0]);
  }

}

module.exports = { Tvshows };
