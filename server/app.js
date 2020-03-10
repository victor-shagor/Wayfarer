import bodyParser from 'body-parser';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from 'cors';
import path from 'path';
import socketIo from 'socket.io';
import passportSetup from './passport-setup';
import passport from 'passport';

import userRouter from './routes/userRouter';
import tripRouter from './routes/tripRouter';
import notificationRoute from './routes/notificationRoute'
import socialRouter from './routes/socialRouter'


const app = express();
app.use(cors());
const swaggerDoc = YAML.load('./swagger.yaml');
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../clients/build')));
}
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`Listening from port ${port}`);
});

export const io = socketIo(server);
io.on('connection', (socket) => { console.info(`${socket.id} connected`); });

app.use((req, res, next) => {
  req.io = io;
  next();
});


app.use('/', socialRouter);
app.use('/', userRouter);
app.use('/', tripRouter);
app.use('/', notificationRoute);
app.get('/', (req, res) => res.status(200).send({ message: 'Welcome to bus-connect' }));
app.use('*', (req, res) => res.status(404).send({ message: 'route not found' }));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../clients/build', 'index.html')));





export default app;
