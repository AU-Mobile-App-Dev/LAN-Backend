var userFunctions = require('../database/users');
var sessions = require('../database/login-registration');
var errorCodes = require('./error-codes.js');
    
module.exports = function(app){
// =======================
// API REQUESTS ==========
// =======================

app.get('/api/users/api=:apikey', function(req,res){
    sessions.verifyKey(req.params.apikey, function(result){
        if(result){
          userFunctions.getAllUsers(function(result){
              errorCodes.responseCodeHandler(result, function(foundError, code){
                  if(foundError){
                      res.json(code);
                  }
                  else{res.json(result);}
              });
          });
        }
        else{
         res.json({403: "Unauthenticated API request for friends list"});  
        }
    });
    
});

app.get('/api/users/:username/api=:apikey', function(req, res){
     sessions.verifyKey(req.params.apikey, function(result){
        if(result){
          userFunctions.getUserByName(req.params.username, function(result){
              errorCodes.responseCodeHandler(result, function(foundError, code){
                  if(foundError){
                      res.json(code);
                  }
                  else{
                      res.json(result);
                    }
              });
          });
        }
        else{
         res.json({403: "Unauthenticated API request for friends list"});  
        }
    });
});


// =======================
// GET REQUESTS =========
// =======================
app.get('/users/:username/friends/:session', function(req,res){
    sessions.getSession(req.params.username, req.params.session, function(result){
        if(result){
            res.json({200: "Authorized request for friends list!"});
        }
        else{
            res.json({403: "Unauthenticated request for friends list"});
        }
    });
    
});
// =======================
// POST REQUESTS =========
// =======================


// =======================
// DELETE REQUESTS =======
// =======================



}