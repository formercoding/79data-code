var express = require('express');
var config = require('.confug/index');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('/', function (req, res, next) {
  // body...
  req.url = '/index.html';
  next();
});

app.use(router);

var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

var apiRouters = express.Router();

apiRouters.get('/seller', function(req, res) {
  res.json({
    errno: 0,
    data: seller
  })
});

apiRouters.get('/goods', function(req, res) {
  res.json({
    errno: 0,
    data: goods
  })
});

apiRouters.get('/ratings', function(req, res) {
  res.json({
    errno: 0,
    data: ratings
  })
});

app.use('/api', apiRouters);

app.use(express.static('.dist'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    // opn(uri)
  }
})


