const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /tvshows returns list of shows', async () => {
    const resp = await request(app).get('/tvshows');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'The Sopranos',
        seasons: 6,
        episodes: 86,
        years: '1999-2007',
      },
      {
        id: '2',
        name: 'Trailer Park Boys',
        seasons: 13,
        episodes: 115,
        years: '2001-2008, 2014-Present',
      },      
      {
        id: '3',
        name: 'Everybody Loves Raymond',
        seasons: 9,
        episodes: 210,
        years: '1996-2005',
      },
    ]);
  });

  it('#GET /tvshows:id returns a show', async () => {
    const resp = await request(app).get('/tvshows/3');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual(     
      {
        id: '3',
        name: 'Everybody Loves Raymond',
        seasons: 9,
        episodes: 210,
        years: '1996-2005',
      }
    );
  });

  it('#POST /tvshows create a new tv show', async () => {
    const newTvShow = {
      name: 'Married... with Children',
      seasons: 11,
      episodes: 259,
      years: '1987-1997',
    };
    const resp = await request(app).post('/tvshows').send(newTvShow);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newTvShow,
    });
  });

  it('#PUT /tvshows/:id updates listed tv show', async () => {
    const resp = await request(app).put('/tvshows/2').send({
      name: 'TRAILER PARK BOYS',
      seasons: 99,
      years: '1000-2000'
    });
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe('TRAILER PARK BOYS');
    expect(resp.body.seasons).toBe(99);
    expect(resp.body.years).toBe('1000-2000');
    console.log(resp.body);
  });

  afterAll(() => {
    pool.end();
  });
});
