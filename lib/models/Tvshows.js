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

  static async insert({ name, seasons, episodes, years }) {
    const { rows } = await pool.query(
      `
        INSERT INTO tvshows (name, seasons, episodes, years)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
      [name, seasons, episodes, years]
    );
    return new Tvshows(rows[0]);
  }

  static async updateById(id, values) {

    const tvShows = await Tvshows.getById(id);
    if (!tvShows) return null;

    const updates = { ...tvShows, ...values };

    const { rows } = await pool.query(
      `
      UPDATE tvshows
      SET name = $2, seasons = $3, episodes = $4, years = $5
      WHERE id = $1
      RETURNING *;
      `,
      [
        id,
        updates.name,
        updates.seasons,
        updates.episodes,
        updates.years,
      ]
    );
    return new Tvshows(rows[0]);
  }

}

module.exports = { Tvshows };
