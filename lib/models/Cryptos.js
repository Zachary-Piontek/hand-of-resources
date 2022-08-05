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

}

module.exports = { Cryptos };


