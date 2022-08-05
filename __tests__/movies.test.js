const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /movies returns list of movies', async () => {
    const resp = await request(app).get('/movies');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Total Recall',
        released: 1990,
        gross: '$119.4 million dollars worldwide',
      },
      {
        id: '2',
        name: 'Goodfellas',
        released: 1990,
        gross: '$46.8 million dollars worldwide',
      },      
      {
        id: '3',
        name: 'Dances with Wolves',
        released: 1990,
        gross: '$184.2 million dollars worldwide',
      },
    ]);
  });

  it('#GET /movies:id returns a movie', async () => {
    const resp = await request(app).get('/movies/2');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual(     
      {
        id: '2',
        name: 'Goodfellas',
        released: 1990,
        gross: '$46.8 million dollars worldwide',
      }
    );
  });

  it('#POST /movies create a new movie', async () => {
    const newMovies = {
      name: 'The Hunt for Red October',
      released: 1990,
      gross: '$122 million dollars worldwide',
    };
    const resp = await request(app).post('/movies').send(newMovies);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newMovies,
    });
  });

  afterAll(() => {
    pool.end();
  });
});
