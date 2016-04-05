/**
 * Created by Luc on 04/04/2016.
 */

module.exports = function(router, configuration){

    router.get('/', function(req, res){
        res.render('index.ejs', {title: configuration.app.title, copyright: configuration.app.copyright});
    });

};