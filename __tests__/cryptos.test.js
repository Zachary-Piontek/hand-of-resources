const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /cryptos returns list of cryptos', async () => {
    const resp = await request(app).get('/cryptos');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Bitcoin',
        created: 2008,
        creator: 'Satoshi Nakamoto',
      },
      {
        id: '2',
        name: 'Ethereum',
        created: 2015,
        creator: 'Vitalik Buterin',
      },      
      {
        id: '3',
        name: 'Dogecoin',
        created: 2013,
        creator: 'Billy Markus',
      },
    ]);
  });

  it('#GET /cryptos:id returns a movie', async () => {
    const resp = await request(app).get('/cryptos/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual(     
      {
        id: '1',
        name: 'Bitcoin',
        created: 2008,
        creator: 'Satoshi Nakamoto',
      }
    );
  });

  afterAll(() => {
    pool.end();
  });
});
