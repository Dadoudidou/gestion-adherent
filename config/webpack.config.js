var serverConfig = require('./webpack/server.config.js');

module.exports = mode => {
    return [serverConfig];
}