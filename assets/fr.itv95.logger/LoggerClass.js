/**
 * Created by Fedora on 10/03/2016.
 */

var bunyan = require('bunyan');
module.exports = function(name){
    var logger = bunyan.createLogger({
        name: name,
        streams: [
            {
                level: 'info',
                stream: process.stdout
            },
            {
                level: 'error',
                path: './logs/error.log'
            }
        ]
    });
    return logger;
};