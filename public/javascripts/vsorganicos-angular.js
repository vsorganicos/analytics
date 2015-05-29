/**
 * Registrar o acesso das páginas por IP ou Usuário
 **/
jQuery.createCookie = function(sessionId) {
    var idSessao = $.cookie('vidasaudavel')==null ?
                    $.cookie('vidasaudavel', sessionId, {expires: 1}).vidasaudavel :
                    $.cookie('vidasaudavel');

    return idSessao;
};

jQuery.gravarAcesso = function(sessionId, nome, email) {

    var acessoPagina;
        acessoPagina = '';
        acessoPagina = '{"nome" : "';
        acessoPagina += 'Felipe Guerra';
        acessoPagina += '",';
        acessoPagina += '"ip" : "",';
        acessoPagina += '"email" : "';
        acessoPagina += 'felipeguerra19@gmail.com';
        acessoPagina += '",';
        acessoPagina += '"pagina" : "';
        acessoPagina += window.location.pathname;
        acessoPagina += '",';
        acessoPagina += '"sessionId" : "' + sessionId +'"';
        acessoPagina += '}';

    $.post('/vso-analytics/gravar/acesso', acessoPagina,
            function(data){
                alert(JSON.stringify(data));
            }
    );

}