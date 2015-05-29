/**
 * Created by FOlive40 on 24/05/2015.
 */
var models = require('../model/index');
var util = require('./util');
var logger = require('../utilities/log').logger;

module.exports.gravarAcessoPagina = function(request, response) {
    logger.info("call gravarAcessoPagina...");

    util.handleRequest(request, function(error, jsonData) {
        try {
            if (error) {
                util.error400Response(response, error);
                return;
            }

            //set IP Adress
            jsonData.ip = request.socket.remoteAddress;

            models.cadastrarAcessoUsuario(jsonData, function(err, result) {
                if(err) {
                    util.error400Response(response, err);
                    return;
                }
                util.jSon200Response(response, result);
            });

        }catch(err) {
            util.error400Response(response, err);
            return;
        }
    });
};