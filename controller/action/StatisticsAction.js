/**
 * Created by chriscai on 2015/1/15.
 */


var BusinessService = require('../../service/BusinessService'),
    _ = require('underscore'),
    StatisticsService = require('../../service/StatisticsService');

var  log4js = require('log4js'),
    logger = log4js.getLogger();

var StatisticsAction = {


    index :  function(param, req, res){
        var params = req.query,
            user  = req.session.user;

        var businessService =  new BusinessService();

        businessService.findBusinessByUser(user.loginName , function (err, item){
            res.render(param.tpl, { layout: false, user: user, index:'statistics' , statisticsTitle:param.statisticsTitle,  items : item});
        });
    },
    queryByChart : function (param, req, res) {
        console.log(param);
        var statisticsService =  new StatisticsService();
        console.log(11);
        if(!param.projectId || isNaN(param.projectId) || !param.timeScope){
            res.json({ret:0 , msg:'success' , data : {} });
            return ;
        };

        statisticsService.queryByChart({userName : param.user.loginName , projectId : param.projectId-0 , timeScope:param.timeScope-0}  , function (err, data){
            if(err){
                res.json({ret:-1, msg:"error"});
                return;
            }
            res.json(data);
            return;
        });
    },
    queryById:function (param , req, res ){
        var statisticsService =  new StatisticsService();
        if(!req.query.projectId || isNaN(req.query.projectId) || !req.query.startDate){
            res.json({ret:0 , msg:'success' , data : {} });
            return ;
        }
        statisticsService.queryById({userName : param.user.loginName , projectId : req.query.projectId-0 , startDate : new Date(param.startDate + " 00:00:00")}  , function (err, data){
            if(data.data && data.data[0] ){
                data.data[0].content = JSON.parse(data.data[0].content);
                data.data[0].content = _.map(data.data[0].content, function(value, key){
                    return {title : key , total : value};
                });

                data.data[0].content = data.data[0].content.sort(function ( a, b){
                    if(a.total < b.total){
                        return 1;
                    }else {
                        return -1;
                    }
                })
            }
            res.json(data);
        });
    }

};

module.exports = StatisticsAction;