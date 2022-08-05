-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS tvshows;
DROP TABLE IF EXISTS movies;

CREATE TABLE tvshows (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    seasons INT NOT NULL,
    episodes INT NOT NULL,
    years VARCHAR NOT NULL
);

CREATE TABLE movies (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    released INT NOT NULL,
    gross VARCHAR NOT NULL
);

INSERT INTO
    tvshows (name, seasons, episodes, years)
VALUES
    (
        'The Sopranos',
        6,
        86,
        '1999-2007'
    ),
    (
        'Trailer Park Boys',
        13,
        115,
        '2001-2008, 2014-Present'
    ),
    (
        'Everybody Loves Raymond',
        9,
        210,
        '1996-2005'
    );

INSERT INTO
    movies (name, released, gross)
VALUES
    (
        'Total Recall',
        1990,
        '$119.4 million dollars worldwide'
    ),
    (
        'Goodfellas',
        1990,
        '$46.8 million dollars worldwide'
    ),
    (
        'Dances with Wolves',
        1990,
        '$184.2 million dollars worldwide'
    );