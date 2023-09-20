import express from 'express';
const app = express();
const port = 3000;
import { Collection } from './models/collection';

new Collection(app, 'model');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
// npm start to run