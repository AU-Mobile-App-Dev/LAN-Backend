var userFunctions = require('../database/users');
var sessions = require('../database/login-registration');
    
module.exports = function(app){
// =======================
// API REQUESTS ==========
// =======================
app.get('/api/users', function(req,res){
    userFunctions.getAllUsers(function(result){
        if(result == 500){
            res.json({500:"Internal server error"});
        }else{res.json(result);}
    });
});
app.get('/api/users/:username', function(req, res){
    userFunctions.getUserByName(res, req.params.username);
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
app.get('/users/:username/friends/token=:token', function(req,res){
    if ( TokenGenerator.isValid( token ) ) {
     userFunctions.getFriends(function(result){
        if(result == 500){
            res.json({500:"Internal server error"});
        }else{res.json(result);}
    });
} else {
    res.json({403: "Unauthenticated request"}); 
}
    
});

// =======================
// DELETE REQUESTS =======
// =======================



}