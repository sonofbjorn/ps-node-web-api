var r = require('request').defaults({
  // send data in json format
  json: true
});

var async = require('async');

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
          r({
            uri: 'http://localhost:3001/dog'
          }, function(error, response, body) {
            if (error) {
              callback({
                service: 'dog',
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
        }
      },
      function(error, results) {
        var y = 1;
        for(var x=0; x<200000; x++) {
          y+=x;
          console.log(x);
        }
        res.json({
          error: error,
          results: results
        })
      });
  });
  app.get('/ping', function(req, res) {
    res.json({
      pong: Date.now()
    });
  });
}