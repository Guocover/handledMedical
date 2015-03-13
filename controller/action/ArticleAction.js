/**
 * @info : Article ACION
 * @author : coverguo
 * @date : 2015-01-07
 */


var log4js = require('log4js'),
    logger = log4js.getLogger(),
    _ = require('underscore'),
    ArticleService = require('../../service/ArticleService'),
    isError = function (res , error){
        if(error){
            res.json({ret : 1 , msg : error});
            return true;
        }
        return false;
    };



var articleAction = {

    addArticle: function(params, req , res){
        //必要信息为空，则报错
        if(params.title == "" || params.content ==""){
            res.json({ret:1002, msg:"params error"});
            return;
        }

        var article = params;
        article.author = params.user.name;
        article.createTime = new Date();

        var articleService = new ArticleService();
        articleService.add(article,function(err, items){
            if(isError(res, err)){
                return;
            }
            res.json({ret:0, msg: "success-add"});
        });
    },
    queryListByUser : function (params, req , res) {
        var applyService = new ApplyService();
        if(params.user.role !=1){
            applyService.queryListByUser(params,function(err, items){
                if(isError(res, err)){
                    return;
                }
                res.json({ret:0, msg: "success", data: {role :params.user.role , item :  processData(items)}});
            });
        }else {
            applyService.queryListByAdmin(params,function(err, items){
                if(isError(res, err)){
                    return;
                }
                res.json({ret:0, msg: "success", data: {role :params.user.role , item :  processData(items)}});
            });
        }

    },
    queryListByAdmin : function (params, req , res) {
        var applyService = new ApplyService();
        //不是管理员的话直接返回错误提示
        if(params.user.role !=1){
            res.json({ret:1003, msg: "权限不足"});
            return;
        }
        applyService.queryListByAdmin(params,function(err, items){
            if(isError(res, err)){
                return;
            }
            res.json({ret:0, msg: "success", data: processData(items)});
        });
    },
    queryListBySearch : function (params, req , res) {
        var applyService = new ApplyService();

        var searchParam = {};
        if(params.user.role !=1){
            searchParam.userName  = params.user.loginName;
        }

        //搜索全部
        if(params.statusType != 3){
            searchParam.status = params.statusType;
        }

        applyService.queryListBySearch(searchParam,function(err, items){
            if(isError(res, err)){
                return;
            }
            res.json({ret:0, msg: "success", data: {role :params.user.role , item :processData(items)}});
        });
    },
    update:function(params,cb){
        var as = new ApplyService();
        as.update(params,cb);
    },
    remove: function(){
        var as = new ApplyService();
        as.remove(params,cb);
    }

};

module.exports = articleAction;

