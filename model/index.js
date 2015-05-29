/**
 * Created by FOlive40 on 22/05/2015.
 */
var config = require('./config');
var mongoose = require('mongoose');
var logger = require('../utilities/log').logger;

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UsuarioSchema = new Schema({
    id : ObjectId
    ,ip : String
    ,nome : String
    ,email : String
    ,dataCadastro: {type: Date, default: Date.now}
    ,acessos : [{type: mongoose.Schema.Types.ObjectId, ref: 'Acesso'}]
});

UsuarioSchema.statics.buscarUsuarioPorIp = function(ipAddress, callback) {
    return this.findOne({ ip: ipAddress }, callback);
};

UsuarioSchema.statics.buscarUsuarioPorEmail = function(email, callback) {
    return this.findOne({ email: email }, callback);
};

var AcessoSchema = new Schema({
    id : ObjectId
    , url: String
    , ip : String
    , data: {type: Date, default: Date.now}
});

var user = mongoose.model('Usuario', UsuarioSchema);
var access = mongoose.model('Acesso', AcessoSchema);

var url = config.getURLConnection(process.env.OPENSHIFT_NODEJS_IP || "dev");

mongoose.connect(url, function(err){
    if(err) {
        logger.error("Error open connection: " + err);
        throw new Error("Error open connection: " + err);
    }else {
        logger.warn("Connection open: " + url);
    }
});

module.exports.cadastrarAcessoUsuario = function(data, callback) {
    if(data.email!=null && data.email!=="undefined") {
        user.buscarUsuarioPorEmail(data.email, function(err, usuario) {
            //Validar se é um usuário logado no sistema

            gravarAcesso(err, usuario);
        });
    }else {
        user.buscarUsuarioPorIp(data.ip, function(err, usuario) {

            gravarAcesso(err, usuario);
        });
    }

    var gravarAcesso = function(err, usuario) {
        if(err) {
            logger.error(err);
            callback(err, null);
            return;
        }
        var acesso = new access;
        acesso.url = data.pagina;
        acesso.ip = data.ip;

        acesso.save(function(err, acesso) {
            if(err) {
                logger.error("Error saving acesso: " + err);
                callback(err, null);
                return;
            }
        });

        if(usuario!=null) {
            usuario.acessos.push(acesso);

            usuario.save(function(err, u) {
                if(err){
                    logger.error("Error updating usuario: " + err);
                    callback(err, null);
                    return;
                }
                callback(null, usuario);
            });

        }else {
            var u = new user;
            u.nome = data.nome!=="undefined" ? data.nome : "";
            u.email = data.email!=="undefined" ? data.email : "";
            u.ip = data.ip;
            u.acessos.push(acesso);

            u.save(function(err, u) {
                if(err) {
                    logger.error("Error saving usuario: " + err);
                    callback(err, null);
                    return;
                }
                callback(null, u);
            });
        }
    };
};
