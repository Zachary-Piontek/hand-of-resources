-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS tv_shows

CREATE TABLE tv_shows (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    seasons INT NOT NULL,
    episodes INT NOT NULL,
    years INT NOT NULL
);

INSERT INTO
    tv_shows (name, seasons, episodes, years)
VALUES
    (
        'The Sopranos',
        '6',
        '86',
        '1999-2007'
    ),
    (
        'Trailer Park Boys',
        '13',
        '115',
        '2001-2008, 2014-Present'
    ),
    (
        'Everybody Loves Raymond',
        '9',
        '210',
        '1996 - 2005'
    );
