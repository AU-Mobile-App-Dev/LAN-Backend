var loginRegFunctions = require('../database/login-registration');
var geocoder = require('geocoder');
var errorCodes = require('./error-codes.js');

module.exports = function(app){
// =======================
// POST REQUESTS =========
// =======================   
app.post('/authenticate', function(req, res){
    var userObject = {
        username: req.body.username,
        password: req.body.password
    }
    loginRegFunctions.authenticate(userObject, function(result, session){
        if(result){
            res.json({ success: true, message: 'User is authorized', session: session});           
        }
        else{
            res.json({ success: false, message: 'Authentication failed.' });
        }
    });
});
app.post('/register', function(req, res) {
    //Get the lat and lon for the username
    geocoder.geocode(req.body.location, function ( err, data ) {
        if(err){
            res.json({400:"The request could not be understood by the server due to malformed syntax."});
        }
        /**Create object out  of passed params*/
        var userObject = {
            username: req.body.username,
            password: req.body.password,
            lat: data.results[0].geometry.location.lat,
            lon: data.results[0].geometry.location.lng,
            email: req.body.email
        };
        // ==========================
        // Check for duplicate emails
        // and usernames ===========
        // =========================
        loginRegFunctions.checkDups(userObject, function(result){
            errorCodes.responseCodeHandler(result, function(foundError, code){
                  if(foundError){
                      res.json(code);
                  }
                  else{
                      res.json(code);
                    }
              });
        });
      });
});

app.post('/users/getKey', function(req, res){
    var userObject = {
        username: req.body.username,
        password: req.body.password
    }
    loginRegFunctions.generateKey(userObject, function(result, key){
        console.log(result);
        if(result){
            res.json({ success: true, message: 'Here is your API key, do not lose it or share it', apiKey: key});           
        }
        else{
            res.json({ success: false, message: 'Authentication failed.' });
        }
    });
    
});

    
}