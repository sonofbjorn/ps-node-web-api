var r = require('request').defaults({
  // send data in json format
  json: true
});

var async = require('async');
var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1')

module.exports = function(app) {
  // Read

  app.get('/pets', function(req, res) {
    async.parallel({
        cat: function(callback) {
          r({
            uri: 'http://localhost:3000/cat'
          }, function(error, response, body) {
            if (error) {
              callback({
                service: 'cat',
                error: error
              });
              return;
            }
            if (!error && response.statusCode === 200) {
              callback(null, body);
            } else {
              res.send(response.statusCode);
            }
          });
        },
        dog: function(callback) {
          var dogUri = 'http://localhost:3001/dog';
          client.get(dogUri, function(error, dogs) {
            if (error) {
              throw error;
            }
            if (dogs) {
              callback(null, JSON.parse(dogs));
            } else {
              r({
                uri: dogUri
              }, function(error, response, body) {
                if (error) {
                  callback({
                    service: 'dog',
                    error: error
                  });
                  return;
                }
                if (!error && response.statusCode === 200) {
                  callback(null, body.data);
                  client.setex(dogUri, 10, JSON.stringify(body.data));
                } else {
                  res.send(response.statusCode);
                }
              });
            }
          });
        }
      },
      function(error, results) {
        // var y = 1;
        // for(var x=0; x<200000; x++) {
        //   y+=x;
        //   console.log(x);
        // }
        res.json({
          error: error,
          results: results
        });
      });
  });
  app.get('/ping', function(req, res) {
    res.json({
      pong: Date.now()
    });
  });
}