const helmet = require('helmet')
const express = require('express');
const cors = require('cors');
const errorMiddleware = require('../middleware/error')

// Routers 
const authRouter = require('../api/auth/auth');


module.exports = function (app) {
  // Middlewares

  const corsOptions = {
    exposedHeaders: 'bearer-token',
  };
  
  app.use(cors(corsOptions));

  app.use(helmet()); // Security
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use("/auth", authRouter);

  app.get('/', (req, res) => {
    res.send('Server up!')
  })  

  // Error Middleware
  app.use(errorMiddleware);
};
