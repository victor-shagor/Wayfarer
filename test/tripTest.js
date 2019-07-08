import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();


describe('trips', () => {
  let token;
  it('should login user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'ojoabiola@gmail.com', password: 'oladimeji1',
      })
      .end((err, res) => {
        token = res.body.data.token;
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
  let token1;
  it('should login user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'doyin@gmail.com', password: 'adedoyin1',
      })
      .end((err, res) => {
        token1 = res.body.data.token;
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
  it('should create a trip', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .set({
        token,
      })
      .send({
        bus_id: '1', origin: 'lagos', destination: 'kaduna', trip_date: '06/06/2020', fare: '2000',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        done();
      });
  });
  it('should not create a trip without bus id', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .set({
        token,
      })
      .send({
        bus_id: '', origin: 'ojo', destination: 'alabama', trip_date: '06/06/2020', fare: '3000',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not create a trip without origin', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .set({
        token,
      })
      .send({
        bus_id: '1', origin: '', destination: 'alabama', trip_date: '06/06/2020', fare: '3000',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not create a trip without destination', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .set({
        token,
      })
      .send({
        bus_id: '1', origin: 'ojo', destination: '', trip_date: '06/06/2020', fare: '3000',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not create a trip without trip date', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .set({
        token,
      })
      .send({
        bus_id: '1', origin: 'lagos', destination: 'alabama', trip_date: '', fare: '3000',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not create a trip with wrong trip date format', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .set({
        token,
      })
      .send({
        bus_id: '1', origin: 'lagos', destination: 'alabama', trip_date: '20/02/2020', fare: '3000',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not create a trip with past trip date ', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .set({
        token,
      })
      .send({
        bus_id: '1', origin: 'lagos', destination: 'alabama', trip_date: '02/02/2004', fare: '3000',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not create a trip without fare', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .set({
        token,
      })
      .send({
        bus_id: '1', origin: 'lagos', destination: 'alabama', trip_date: '06/06/2020', fare: '',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not create a trip when bus id is not a number', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .set({
        token,
      })
      .send({
        bus_id: 're', origin: 'lagos', destination: 'alabama', trip_date: '06/06/2020', fare: '3000',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not create a trip when bus id is not in the database', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .set({
        token,
      })
      .send({
        bus_id: '20', origin: 'lagos', destination: 'alabama', trip_date: '06/06/2020', fare: '3000',
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not create a trip with a bus already on a trip', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .set({
        token,
      })
      .send({
        bus_id: '1', origin: 'lagos', destination: 'alabama', trip_date: '06/06/2020', fare: '3000',
      })
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not create a trip without a token', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .set({
        token: '',
      })
      .send({
        bus_id: '3', origin: 'lagos', destination: 'alabama', trip_date: '06/06/2020', fare: '3000',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not create a trip with a wrong token', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .set({
        token: '123ed',
      })
      .send({
        bus_id: '3', origin: 'lagos', destination: 'alabama', trip_date: '06/06/2020', fare: '3000',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not create a trip with a non admin token', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .set({
        token: token1,
      })
      .send({
        bus_id: '3', origin: 'lagos', destination: 'alabama', trip_date: '06/06/2020', fare: '3000',
      })
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
  });
