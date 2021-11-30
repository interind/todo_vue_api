require('dotenv').config();
const mongoose = require('mongoose');
const config = require('config');
const app = require('./app.js');
const { errorConsoleLogger } = require('./middlewares/logger.js');

const PORT = process.env.PORT || config.get('PORT');
const BASE_PATH = `Port:${PORT}`;
const URL_MONGO = process.env.NODE_ENV === 'production' ? process.env.URL_BASE : config.get('mongodbUrl');

async function start() {
  try {
    await mongoose.connect(URL_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    app.listen(PORT, () => {
      console.log(`the server is running at ${BASE_PATH}`);
    });
  } catch (err) {
    errorConsoleLogger(err);
    process.exitCode = 1;
  }
}

start();
