import * as pg from "pg";

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});

await client.connect();

await client.query(
  "INSERT INTO animals (name, slug) VALUES ('Horse', 'horse');"
);

const res = await client.query("SELECT * FROM animals");

const animals = res.rows;

console.log({ animals });

await client.end();
