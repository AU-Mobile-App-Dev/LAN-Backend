/**Create exports variable*/
var exports = module.exports = {};

exports.responseCodeHandler = function(result, callback){
    switch(result) {
    case 204:
        callback("Your request successfully processed but no content could be found");
        break;
    case 400:
        callback("Your request successfully processed but no content could be found");
        break;
    case 403:
        callback("Unauthenticated API request");
    default:
        false
}
}