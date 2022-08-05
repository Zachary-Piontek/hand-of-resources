
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

  it('#POST /favorites create a new movie', async () => {
    const updateMovies = {
      name: 'The Last Boy Scout',
      released: 1991,
      gross: '$59.5 million dollars worldwide',
    };
    const resp = await request(app).post('/favorites').send(updateMovies);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...updateMovies,
    });
  });

  it('#PUT /favorites/:id updates movie list', async () => {
    const resp = await request(app).put('/favorites/1').send({
      released: 19911991,
    });
    expect(resp.status).toBe(200);
    expect(resp.body.released).toBe(19911991);
    console.log(resp.body);
  });

  it('#DELETE /favorites/:id deletes a movie', async () => {
    const resp = await request(app).delete('/favorites/3');
    expect(resp.status).toBe(200);
    const movieDeleted = await request(app).get('/favorites/3');
    expect(movieDeleted.status).toBe(404);
    console.log(movieDeleted.status);
  });

  afterAll(() => {
    pool.end();
  });
});




