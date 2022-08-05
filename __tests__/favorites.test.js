
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /favorites returns list of favorites', async () => {
    const resp = await request(app).get('/favorites');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Terminator 2: Judgment Day',
        released: 1991,
        gross: '$204.8 million dollars worldwide',
      },
      {
        id: '2',
        name: 'JFK',
        released: 1991,
        gross: '$70.4 million dollars worldwide',
      },      
      {
        id: '3',
        name: 'Bugsy',
        released: 1991,
        gross: '$49.1 million dollars worldwide',
      },
    ]);
  });

  it('#GET /favorites:id returns a movie', async () => {
    const resp = await request(app).get('/favorites/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual(     
      {
        id: '1',
        name: 'Terminator 2: Judgment Day',
        released: 1991,
        gross: '$204.8 million dollars worldwide',
      }
    );
  });

  afterAll(() => {
    pool.end();
  });
});




