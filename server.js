const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });  // Is first to set Config.env for app
const app = require('./app');

// DATABASE CONNECTION STRING
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to Database!'));


const port = process.env.PORT || 5000;


const server = app.listen(port, () => {
    console.log(`App listening on port ${port}...`);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });
  
  process.on('SIGTERM', () => {
    console.log('SIGTERM SHUTTING DWON A SERVER!');
    server.close(() => {
      console.log('Process terminated!');
    });
  });