/**Rater limiter configuration file*/
module.exports = function(app, client){
var hammerLimit = require('express-limiter')(app, client);
var apiLimit = require('express-limiter')(app, client);

hammerLimit({
  path: '*',
  method: 'all',
  lookup: ['connection.remoteAddress'],
  // 150 requests per 5 minutes 
  total: 150,
  expire: 1000 * 60 * 5,
  onRateLimited: function (req, res, next) {
    next({ message: 'Brute force limit exceeded', status: 429 });
  }
});

apiLimit({
  path: '/api/*',
  method: 'all',
  lookup: ['connection.remoteAddress'],
  // 150 requests per hour 
  total: 150,
  expire: 1000 * 60 * 60,
  onRateLimited: function (req, res, next) {
    next({ message: 'API rate limit exceeded', status: 429 });
  }
});

}