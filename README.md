# Wayfarer

[![Build Status](https://travis-ci.org/victor-shagor/Wayfarer.svg?branch=develop)](https://travis-ci.org/victor-shagor/Wayfarer)
[![Maintainability](https://api.codeclimate.com/v1/badges/60fdeaa27fa0c206d517/maintainability)](https://codeclimate.com/github/victor-shagor/Wayfarer/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/60fdeaa27fa0c206d517/test_coverage)](https://codeclimate.com/github/victor-shagor/Wayfarer/test_coverage)
[![Coverage Status](https://coveralls.io/repos/github/victor-shagor/Wayfarer/badge.svg?branch=develop)](https://coveralls.io/github/victor-shagor/Wayfarer?branch=develop)


## Project Overview
Bus-connect is an application that enables a registered user book trips

## Features
---
### Users
- Signup 
- Login
- View Trips
- Book Trips
- View Bookingss
- Delete Bookings

### Admin
- Create Trips
- View Trips
- View Bookings
- Cancel Trips

## Optional Feature
- user can filter trips with destination
- user can filter trips with origin
- user can specify seat number while booking a trip

### Pivotal Tracker
Project is built with the Project Management Tool, Pivotal [Pivotal tracker stories](https://www.pivotaltracker.com/n/projects/2361794)

API
The API is currently in version 1 (v1) and is hosted at https://bus-connect.herokuapp.com/

API Documentation
The API Documentation is currently hosted at https://bus-connect.herokuapp.com/api/v1/docs



## Technologies Used
- [NodeJS](https://nodejs.org/en/download/)
- [ExpressJS](https://expressjs.com/)
- [PostgreSQL]


## Getting Started
---

### Installing/Run locally
- Make sure you have `nodejs`, `postgres` installed.
- Clone repo 

  ```bash
    - git clone https://github.com/victor-shagor/bus-connect.git
    - cd Wayfarer
    - npm install
    - Create/configure `.env` environment with your credentials
    - Run `npm run start` to start the server 
  ```

### Testing
- To test or consume the API locally, you can make use of [*Postman*](https://www.getpostman.com) to simulate a front-end client.
- You can also test by running `npm test`.


## HTTP Requests
All API requests are made by sending a secure HTTPS request using one of the following methods, depending on the action being taken:

- `POST` Create a data
- `PATCH` Update a data
- `GET` Get a data or datas
- `DELETE` Delete a data


### HTTP Response Codes
Each response will be returned with one of the following HTTP status codes:

- `200` `OK` The request was successful
- `201` `Created` The request was successful created
- `400` `Bad Request` There was a problem with the request (security, malformed)
- `401` `Unauthorized` The supplied API credentials are invalid
- `403` `Forbidden` The credentials provided do not have permissions to access the requested resource

