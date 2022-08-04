const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /tv_shows returns list of shows', async () => {
    const resp = await request(app).get('/tv_shows');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        id: 1,
        name: 'The Sopranos',
        seasons: '6',
        episodes: '86',
        years: '1999-2007',
      },
    ]);
  });
  afterAll(() => {
    pool.end();
  });
});
