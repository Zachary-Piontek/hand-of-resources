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

  it('#POST /predictions create a prediction', async () => {
    const newPrediction = {
      predict: 'Antarctica is the fastest developing country',
      year: 2099,
      actual: 'tbh...',
    };
    const resp = await request(app).post('/predictions').send(newPrediction);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newPrediction,
    });
  });

  it('#PUT /predictions/:id updates prediction list', async () => {
    const resp = await request(app).put('/predictions/1').send({
      year: 2026,
    });
    expect(resp.status).toBe(200);
    expect(resp.body.year).toBe(2026);
    console.log(resp.body);
  });

  it('#DELETE /predictions/:id deletes a prediction', async () => {
    const resp = await request(app).delete('/predictions/2');
    expect(resp.status).toBe(200);
    const deletePrediction = await request(app).get('/predictions/2');
    expect(deletePrediction.status).toBe(404);
    console.log(deletePrediction.status);
  });

  afterAll(() => {
    pool.end();
  });
});
