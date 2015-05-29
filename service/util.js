/**
 * Created by FOlive40 on 24/05/2015.
 */
var logger = require('../utilities/log').logger;

module.exports.handleRequest = function(request, callback) {
    var payload = "";
    request.on("data", function(data){
        return payload += data;
    });
    request.on("error", function(err) {
        callback(err, null);
    });
    return request.on("end", function(){
       var erro, jsonData;
        try {
            jsonData = JSON.parse(payload);
            logger.log("Request payload:" + payload, {timestamp: Date.now(), pid: process.pid});
            callback(null, jsonData);
       }catch(_err) {
           erro = _err;
           console.error("Request error: " + _err);
           callback(erro, null)
       }
    });
};

module.exports.jSon200Response = function(response, data) {
    var result = "";

    try {
        result = JSON.stringify(data, null, 4);

        result = new Buffer(result, "utf-8");

    }catch(err) {
        result = "Ocorreu um erro ao processar a resposta";
    }

    response.writeHead(200,
        {
            "Content-Type": "application/json",
            "Content-Length": result.length,
            "Access-Control-Allow-Origin": "*.*.*.*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
            "Access-Control-Allow-Headers": "Content-Type"
        }
    );

    response.write(result);
    return response.end();
};

module.exports.error400Response = function(response, error) {
    var result_str;
    result_str = error.toString();

    response.writeHead(400, {
        "Content-Type": "application/text",
        "Content-Length": result_str.length
    });
    console.error(error);
    response.write(result_str);
    response.end();
};