import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import fs from 'fs';
import logger from 'morgan';
import errorhandler from 'errorhandler';
import dotenv from 'dotenv';
import indexRouter from './routes/index';

dotenv.config();

const app = express();
const accessLogStream = fs.createWriteStream(`${__dirname}/access.log`, { flags: 'a' });
const isProduction = process.env.NODE_ENV === 'production';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev', { stream: accessLogStream }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

/* Index router */
app.use('/', indexRouter);

if (!isProduction) {
  app.use(errorhandler());
}

// catch 404 and forward to error handler
// eslint-disable-next-line
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (!isProduction) {
  // eslint-disable-next-line
  app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

app.listen(process.env.PORT || 3000, () => {
  console.log(`Shopmate listeninnng on port ${process.env.PORT || 3000}`);
});

export default app;
