module.exports = function(app){
// =======================
// GET REQUESTS ==========
// =======================
app.get('/*', function(req, res){
     res.json({ success: 400, message: 'The server cannot or will not process the request that is perceived to be a client error (e.g. malformed request, syntax error, or deceptive request routing).' });
});

}