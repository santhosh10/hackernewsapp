import "@babel/polyfill";
import express from 'express';
import compression from 'compression'
import { matchRoutes } from 'react-router-config';
import Routes from './routes/Routes';
import renderEngine from './renderer/renderEngine';
import createStore from './renderer/createStore';

//  Instantiating an express app
const app = express();


//  Express Middlewares
app.use(compression());
app.use(express.static('public'));



// initial Route
app.use('/', (req, res) => {
  console.log('EntryPoint');
  const store = createStore();
  const dataLoadTasks = matchRoutes(Routes, req.path).map(({route}) => {
    return route.loadData ? route.loadData(store) : null;
  });
  Promise.all(dataLoadTasks).then(() => {
    res.send(renderEngine(req, store));
  })
});

// Server Port
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
  console.info(`Server Listening on port ${port}`);
});


