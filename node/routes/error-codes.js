/**Create exports variable*/
var exports = module.exports = {};

exports.responseCodeHandler = function(code, callback){
    switch(code) {
    case 200:
        callback(false, {200: "Success"});
        break;
    case 201:
        callback(false, {201: "The request has been fulfilled and resource has been updated."});
        break;
    case 204:
        callback(true, {204: "Your request successfully processed but no content could be found."});
        break;
    case 400:
        callback(true, {400: "The request could not be understood by the server due to malformed syntax."});
        break;
    case 401:
        callback(true, {401: "This request requires authentication."});
        break;
    case 403:
        callback(true, {403: "The server understood the request, but level of access is denied."});
        break;
    case 500:
        callback(true, {500: "Internal server error."});
        break;
    case 501:
        callback(true, {501: "Not implemented."});
        break;
     case 503:
        callback(true, {503: "Service unavailable."});
        break;
     default:
        callback(false, {});
    }
   
}