/**
 * @info : Article ACION
 * @author : coverguo
 * @date : 2015-01-07
 */


var log4js = require('log4js'),
    logger = log4js.getLogger(),
    _ = require('underscore'),
    QuestionService = require('../../service/QuestionService'),
    isError = function (res , error){
        if(error){
            res.json({ret : 1 , msg : error});
            return true;
        }
        return false;
    };



var QuestionAction = {
    index: function(req, res){
        var params = req.query,
            user  = req.session.user;

        var questionService =  new QuestionService();

        questionService.queryListBySearch({} , function (err, item){
            res.render('askQuestion', { layout: false, pageTitle: '疾病咨询'   ,items : item});
        });
    },
    ask: function(req, res){
        var params = req.query,
            user  = req.session.user;

        var questionService =  new QuestionService();

        questionService.queryListBySearch({} , function (err, item){
            res.render('askQuestion', { layout: false,  pageTitle: '疾病咨询' ,items : item});
        });
    },
    detail:function(req, res){
        if(!req.query.articleId){
            res.redirect("/404.html");
            return;
        }
        var params ={
            article_id: +req.query.articleId
        };


        var articleService =  new QuestionService();
        articleService.queryListBySearch(params , function (err, item){
            console.log(item[0].title);
            res.render('article-detail', { layout: false,  index:'article' ,item : item[0]});
        });
    },
    addQuestion: function(params, req , res){
        //必要信息为空，则报错

        var question = params;
        question.user_account = params.user.account;
        question.createTime = new Date();

        var questionService = new QuestionService();
        questionService.add(question,function(err, items){
            if(isError(res, err)){
                return;
            }
            res.json({ret:0, msg: "success-add"});
        });
    },
    queryListByUser : function (params, req , res) {
        var questionService = new QuestionService();
//        var searchParam = {
//
//        }
        questionService.queryListByUser(params,function(err, items){
            if(isError(res, err)){
                return;
            }
            res.json({ret:0, msg: "success", data: {role :params.user.role , item :  processData(items)}});
        });


    },
    queryListBySearch : function (params, req , res) {
        var questionService = new QuestionService();

        var searchParam = params;


        questionService.queryListBySearch(searchParam,function(err, items){
            if(isError(res, err)){
                return;
            }
            res.json({ret:0, msg: "success", data: {role :params.user.role , item :processData(items)}});
        });
    },
    update:function(params,cb){
        var as = new QuestionService();
        as.update(params,cb);
    },
    remove: function(){
        var as = new QuestionService();
        as.remove(params,cb);
    }

};

module.exports = QuestionAction;

