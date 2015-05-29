services = require('../service');

exports.routes = function(app){

    app.get('/', function(request, response) {
        response.render('index');
    });

    app.post('/vso-analytics/gravar/acesso', services.gravarAcessoPagina);

};

