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

  it('#POST /cryptos create a new crypto', async () => {
    const updateCrypto = {
      name: 'FOMO',
      created: 2055,
      creator: 'Unknown',
    };
    const resp = await request(app).post('/cryptos').send(updateCrypto);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...updateCrypto,
    });
  });

  it('#PUT /cryptos/:id updates crypto list', async () => {
    const resp = await request(app).put('/cryptos/1').send({
      name: 'Sats',
    });
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe('Sats');
    console.log(resp.body);
  });

  it('#DELETE /cryptos/:id deletes a movie', async () => {
    const resp = await request(app).delete('/cryptos/3');
    expect(resp.status).toBe(200);
    const cryptoDeleted = await request(app).get('/cryptos/3');
    expect(cryptoDeleted.status).toBe(404);
    console.log(cryptoDeleted.status);
  });

  afterAll(() => {
    pool.end();
  });
});
