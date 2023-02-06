-- Active: 1675272283955@@127.0.0.1@3306

CREATE TABLE
    super_heroes(
        id PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        power TEXT NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL
    );

INSERT INTO
    super_heroes(id, name, power)
VALUES (
        "s001",
        "The Flash",
        "Super Speed"
    ), (
        "s002",
        "Thor",
        "Superhuman strength, speed, agility, durability, immunity to most diseases and the power of the thunder"
    ), (
        "s003",
        "Iron Man",
        "Possesses powered armor that gives him superhuman strength and durability, flight, and an array of weapons"
    ), (
        "s004",
        "Spider-man",
        "Superhuman strength, agility, endurance, ability to stick to and climb walls and other surfaces, uses self-designed web-shooters allowing him to fire and swing from sticky webs"
    );

SELECT * FROM super_heroes;