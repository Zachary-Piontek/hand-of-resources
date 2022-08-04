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
}

module.exports = { Tvshows };
