import express from 'express';
import compression from 'compression'
import renderEngine from './routes/renderEngine';

//  Instantiating an express app
const app = express();


//  Express Middlewares
app.use(compression());
app.use(express.static('public'));

app.use('/', renderEngine);


// Server Port
const port = process.env.PORT || 3000;

// Start server
const server = app.listen(port, () => {
  console.info(`Server Listening on port ${port}`);
});


