var express = require("express");
var app =  express();
var path = require('path');
var bodyParser = require('body-parser');
var usersRoutes = require('./routes/users');
var loginRoutes = require('./routes/login-registration');
var errorRoutes = require('./routes/error-handling');
var client = require('redis').createClient('redis://redistogo:efb9dbbdf5d63e9da1be1865ece518cb@gar.redistogo.com:9236/');
var limitConfig = require('./server-config/limiter');

var port = process.env.PORT || 5000;



/*app configs*/
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname +'/lib'));
app.enable('trust proxy');
var secret = "superSecretLanSocialSecretShhhh";
app.set('superSecret', secret);
limitConfig(app, client);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**Base Route*/
app.get("/home",function(req,res){
    res.sendFile(path.join(__dirname + '/views/index.html'));
});



/**Set up the routes*/
usersRoutes(app);
loginRoutes(app);

/*=====Make sure this is the last route function app gets passed to=====*/
errorRoutes(app);

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);