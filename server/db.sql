create TABLE client(
    id SERIAL PRIMARY KEY,
    email  VARCHAR(255) UNIQUE,
    password  VARCHAR(255)
);

create TABLE money(
    id SERIAL PRIMARY KEY,
    client_id INTEGER,
    January VARCHAR(500),
    February VARCHAR(500),
    March VARCHAR(500),
    April VARCHAR(500),
    May VARCHAR(500),
    June VARCHAR(500),
    July VARCHAR(500),
    August VARCHAR(500),
    September VARCHAR(500),
    October VARCHAR(500),
    November VARCHAR(500),
    December VARCHAR(500)
);

create TABLE income(
    id SERIAL PRIMARY KEY,
    client_id INTEGER,
    January VARCHAR(500),
    February VARCHAR(500),
    March VARCHAR(500),
    April VARCHAR(500),
    May VARCHAR(500),
    June VARCHAR(500),
    July VARCHAR(500),
    August VARCHAR(500),
    September VARCHAR(500),
    October VARCHAR(500),
    November VARCHAR(500),
    December VARCHAR(500)
);

drop table money;
drop table client;
