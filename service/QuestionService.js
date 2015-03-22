/**
 * Created by coverguo on 2015/01/08.
 */

var http = require('http');

var  log4js = require('log4js'),
    logger = log4js.getLogger();



var QuestionService = function (){
    this.questionDao = global.models.questionDao;
};



QuestionService.prototype = {

    queryListByAdmin : function (target , callback){

        this.questionDao.find(["createTime", "Z"], function (err , items){
            if(err){
                callback(err);
                return;
            }
            callback(null,items);
        });
    },
    queryListByUser : function (target , callback){
        this.questionDao.find({userName: target.user.loginName},["createTime", "Z"], function (err , items){
            if(err){
                callback(err);
                return;
            }
            callback(null,items);
        });
    },
    queryListBySearch : function (searchParam , callback){

        console.log(searchParam);
        this.questionDao.find(searchParam ,["createTime", "Z"], function (err , items){
            if(err){
                callback(err);
                return;
            }
            callback(null,items);
        });
    },
    //插入新文章
    add: function(target, callback){

        this.questionDao.create(target , function (err , newArticle){
            if(err){
                callback(err);
                return;
            }
            if(GLOBAL.DEBUG){
                logger.info("Insert into b_apply success! target1: ", newArticle);
            }
            callback(null);
            return;
        });
    },
    remove : function(target, callback){
        this.questionDao.one({id: target.id }, function (err, apply) {
            // SQL: "SELECT * FROM b_apply WHERE name = 'xxxx'"
            for(key in target){
                apply[key] = target[key];
            };
            apply.remove(function (err) {
                callback(null,{ret:0, msg:"success remove"});
            });
        });
    },
    update : function(target, callback){
        this.questionDao.one({id: target.id }, function (err, apply) {
            // SQL: "SELECT * FROM b_apply WHERE name = 'xxxx'"
            for(key in target){
                apply[key] = target[key];
            };
            apply.save(function (err) {
                // err.msg = "under-age";
                callback(null,{ret:0, msg:"success remove"});
            });
        });
    }
}


module.exports =  QuestionService;

