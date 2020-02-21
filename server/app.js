import bodyParser from 'body-parser';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from 'cors';
import path from 'path'

import userRouter from './routes/userRouter';
import tripRouter from './routes/tripRouter';


const app = express();
app.use(cors());
const swaggerDoc = YAML.load('./swagger.yaml');
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', userRouter);
app.use('/', tripRouter);
app.get('/', (req, res) => res.status(200).send({ message: 'Welcome to bus-connect' }));
app.use(express.static(path.join(__dirname, '../clients/build')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../clients/build', 'index.html')));


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening from port ${port}`);
});

export default app;
