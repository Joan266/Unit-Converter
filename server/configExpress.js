const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const { createServer } = require('http');

const conversionRoutes = require('./conversionRoutes.js')

const { PORT } = require('./dotenv.js');


const configExpress = async () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Parse JSON bodies
  app.use(bodyParser.json());

  // Error Handling Middleware
  app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })  

  //routes
  app.use('/api/conversion', conversionRoutes)

  const httpServer = createServer(app);

  httpServer.listen(PORT || 5000, () => {
    console.log(`Listening on port ${PORT || 5000}`);
  });

};

module.exports = configExpress