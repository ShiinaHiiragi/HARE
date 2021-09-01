var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var api = require('./bin/api');

var app = express();
var indexRouter = require('./routes/index');
var srcRouter = require('./routes/src');
var dataRouter = require('./routes/data');
var setRouter = require('./routes/set');
var newRouter = require('./routes/new');
var deleteRouter = require('./routes/delete');
logger.token('timestamp', () => api.format(new Date(), "yyyy-MM-dd hh:mm:ss"));

// middlewares for server
app.use(logger('[:remote-addr :timestamp] :method :url :status :response-time ms - :res[content-length]'));
app.use(express.json({ limit: "1536kb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'view')));
if (!process.argv.includes('--disable-cors')) {
  app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ["GET", "POST"],
    alloweHeaders: ['Conten-Type', 'Authorization', 'Accept', 'Origin'],
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    credentials: true,
  }));
};

// router of server
app.use('/', indexRouter);
app.use('/src', srcRouter);
app.use('/data', dataRouter);
app.use('/set', setRouter);
app.use('/new', newRouter);
app.use('/delete', deleteRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.sendFile(path.join(__dirname, `./view/404.html`));
});

module.exports = app;
