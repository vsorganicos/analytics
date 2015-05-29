/**
 * Created by FOlive40 on 27/05/2015.
 */
module.exports.MONGODB_USERNAME = "";

module.exports.MONGODB_PASSWORD = "";

module.exports.MONGODB_SCHEMA = "vidasaudavelorganicos";

module.exports.MONGODB_SERVER = "localhost";

module.exports.MONGODB_PORT = "27017";

module.exports.MONGODB_USERNAME_PRD = process.env.OPENSHIFT_MONGODB_DB_USERNAME;

module.exports.MONGODB_PASSWORD_PRD = process.env.OPENSHIFT_MONGODB_DB_PASSWORD;

module.exports.MONGODB_SCHEMA_PRD = process.env.OPENSHIFT_APP_NAME;

module.exports.MONGODB_SERVER_PRD = process.env.OPENSHIFT_MONGODB_DB_HOST;

module.exports.MONGODB_PORT_PRD = process.env.OPENSHIFT_MONGODB_DB_PORT;

module.exports.PASSPORT_SECRET = "2324kljhlaskfhdlsk21413rdj=JLKJDF%^$%^$sd!@xdglk";

module.exports.getURLConnection = function(env) {
    var url;

    if(env == "dev") {
        url = 'mongodb://' + this.MONGODB_SERVER + ':' + this.MONGODB_PORT + '/' + this.MONGODB_SCHEMA;
    }else {
        url = 'mongodb://' + this.MONGODB_USERNAME_PRD + ':' + this.MONGODB_PASSWORD_PRD;
        url += '@' + this.MONGODB_SERVER_PRD + ':' + this.MONGODB_PORT_PRD + '/' + this.MONGODB_SCHEMA_PRD;
    }
    return url;
};