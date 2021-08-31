const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const studentRouter = require('./routes/studentRoutes');
const AppError = require('./utils/appError');
const globalErrorController = require('./controllers/errorController');

const app = express();

// Enable CORS
app.use(cors());
app.options('*', cors());

app.enable('trust proxy');

// Security HTTP Headers
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Limits requests for specific api
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'To many requsets from current API! Try again in 1 hour',
});
app.use('/api', limiter);

// Read data from client side as json
app.use(express.json({ limit: '10kb' })); //  for req.body
app.use(cookieParser());

// Data sanitization against NOSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use(compression());

// ROUTES
app.use('/api/v1/students', studentRouter);
// ... other future routes

// Serve static assets in production (development in current case)
if (process.env.NODE_ENV === 'development') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.get('*', (req, res) => {
  res.status(404).render('error', {
    title: 'Error',
  });
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//  Error Handler
app.use(globalErrorController);

module.exports = app;