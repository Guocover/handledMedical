/**
 * Created by chriscai on 2015/1/15.
 */


var BusinessService = require('../../service/BusinessService');

var  log4js = require('log4js'),
    logger = log4js.getLogger();

var IndexAction = {


    index :  function(parm , req, res){
        var params = req.query,
            user  = req.session.user;

        var businessService =  new BusinessService();

        businessService.findBusinessByUser(user.loginName , function (err, item){
            res.render('index', { layout: false, user: user, index:"index" , items : item} );
        });


    }
};

module.exports = IndexAction;