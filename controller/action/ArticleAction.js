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

var dateFormat  = function (date , fmt){
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

var articleAction = {
    index: function(req, res){
        var params = req.query,
            user  = req.session.user;

        res.render('article-sort', { layout: false,  index:'article-sort'});

    },
    detail:function(req, res){
        if(!req.query.articleId){
            res.redirect("/404.html");
            return;
        }
        var params ={
            article_id: +req.query.articleId
        };


        var articleService =  new ArticleService();
        articleService.queryListBySearch(params , function (err, item){
            console.log(item[0].title);
            res.render('article-detail', { layout: false,  index:'article' ,item : item[0]});
        });
    },
    addArticle: function(params, req , res){
        //必要信息为空，则报错
        if(params.title == "" || params.content ==""){
            res.json({ret:1002, msg:"params error"});
            return;
        }

        var article = params;
        article.author = params.user.name;
        article.createTime = new Date();
        article.type = +params.type;

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
                res.render('article-sort', { layout: false,  index:'article-sort' ,items : items});
            });
        }else {
            applyService.queryListByAdmin(params,function(err, items){
                if(isError(res, err)){
                    return;
                }
                res.render('article-sort', { layout: false,  index:'article-sort' ,items : items});
            });
        }

    },
    queryListBySearch : function (params, req , res) {
        var articleService = new ArticleService();

        var searchParam = {};
        if(params.type){
            searchParam.type = +params.type;
        }
        console.log(params);
        if(params.createTime){
            console.log(1);
            searchParam.createTime  = dateFormat(new Date(params.createTime), 'yyyy-MM-dd hh:mm:ss');
            articleService.queryListWithinTime(searchParam,function(err, items){
                if(isError(res, err)){
                    return;
                }
                res.json({ret:0, msg: "查询成功", items: items});
            });
        }else{
            articleService.queryListBySearch(searchParam,function(err, items){
                if(isError(res, err)){
                    return;
                }
                res.json({ret:0, msg: "查询成功", items: items});
            });
        }

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

