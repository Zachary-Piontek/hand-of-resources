const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /predictions returns list of predictions', async () => {
    const resp = await request(app).get('/predictions');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        predict: 'Bitcoin becomes world currency',
        year: 2032,
        actual: 'tbd...',
      },
      {
        id: '2',
        predict: 'Transhuman upgrades',
        year: 2041,
        actual: 'tbd...',
      },      
      {
        id: '3',
        predict: 'End of oil age',
        year: 2060,
        actual: 'tbd...',
      },
    ]);
  });

  it('#GET /predictions:id returns a prediction', async () => {
    const resp = await request(app).get('/predictions/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual(     
      {
        id: '1',
        predict: 'Bitcoin becomes world currency',
        year: 2032,
        actual: 'tbd...',
      }
    );
  });

  afterAll(() => {
    pool.end();
  });
});
