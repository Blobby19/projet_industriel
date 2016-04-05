/**
 * Created by Luc on 05/04/2016.
 */

var port = process.env.PORT || 1337;
var server = require('./server.js')();
server.listen(port, function(){
    console.log('Server is listening on port '+port);
});