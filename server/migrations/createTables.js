import '@babel/polyfill';
import pool from '../config';

const createTables = `
  CREATE TABLE IF NOT EXISTS users (
   user_id SERIAL PRIMARY KEY,
   email VARCHAR,
   first_name VARCHAR(20),
   last_name VARCHAR(20),
   password VARCHAR,
   google_id VARCHAR,
   is_verified BOOLEAN,
   is_admin BOOLEAN
  );
  CREATE TABLE IF NOT EXISTS bus (
   ID SERIAL PRIMARY KEY,
   number_plate VARCHAR,
   manufacturer VARCHAR,
   model VARCHAR,
   year INT,
   capacity INT
  );
  CREATE TABLE IF NOT EXISTS trips (
   id SERIAL PRIMARY KEY,
   bus_id INT,
   origin VARCHAR,
   destination VARCHAR,
   trip_date DATE,
   trip_time VARCHAR,
   fare FLOAT,
   status VARCHAR
  );
  CREATE TABLE IF NOT EXISTS bookings (
   id SERIAL PRIMARY KEY,
   trip_id INT,
   user_id INT,
   bus_id INT,
   trip_date DATE,
   trip_time VARCHAR,
   seat_number INT,
   first_name VARCHAR,
   origin VARCHAR,
   destination VARCHAR,
   last_name VARCHAR,
   email VARCHAR,
   status VARCHAR,
   created_on TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    user_id INT,
    is_read BOOLEAN,
    message VARCHAR,
    created_on TIMESTAMP
   );
`;
const createDatabaseTables = async () => {
  await pool.query(createTables).then(() => {
    console.log('Tables successfully created');
  });
};

createDatabaseTables();
