var loginRegFunctions = require('../database/login-registration');


 
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
        console.log(result);
        if(result){
            res.json({ success: true, message: 'User is authorized', sessionkey: session});           
        }
        else{
            res.json({ success: false, message: 'Authentication failed.' });
        }
    });
});
app.post('/register', function(req, res) {
        /**Create object out  of passed params*/
        var userObject = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        };
        // ==========================
        // Check for duplicate emails
        // and usernames ===========
        // =========================
        loginRegFunctions.checkDups(userObject, res);
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