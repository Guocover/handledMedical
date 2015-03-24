/**
 * @info : 页面申请路由
 * @author : coverguo
 * @date : 2014-12-16
 */

var DoctorAction = require('./action/DoctorAction'),
    ArticleAction = require('./action/ArticleAction'),
    UserAction = require("./action/UserAction"),
    QuestionAction = require("./action/QuestionAction"),
    AnswerAction = require("./action/AnswerAction"),
    IndexAction = require("./action/IndexAction"),
    StatisticsAction = require("./action/StatisticsAction"),
    UserApplyAction = require("./action/UserApplyAction");

var log4js = require('log4js'),
    logger = log4js.getLogger();

var pageTitles = {
    "accountCenter ": "个人中心",
    "doctor-index"  : "掌上医疗",
    "article-write" : "文章编写",
    "healthy_news"  : "健康文摘"
}
module.exports = function(app){
    var isError = GLOBAL.isError = function (res , error){
        if(error){
            console.log(0);
            res.json({ret : 1 , msg : error});
            return true;
        }
        return false;

    };

    //登录请求路径
    app.post("/login.do", function(req, res){
        var params = req.body,
        //获取用户model
        userDao = global.models.userDao;
        console.log(params);
        if(GLOBAL.DEBUG){
            var user = {
                account: 'coverguo',
                password: '123456',
                createTime: new Date(),
                type: 0,
                name: 'cover'
            }
            userDao.create(user, function (err, user) {
                if(isError(err)){
                    return;
                }
                console.log(err);
                res.send("insert into user");

                return;
            });
        }else{
            userDao.one({account : params.account} ,function (err , user) {
                if(isError(res,err)){
                    return;
                }
              console.log(user);
                if(!user){
                    res.json({ret : 2 , msg : "没有该用户"});
                    return;
                }else{
                    if(user.password !== params.password){
                        res.json({ret : 3 , msg : "密码错误，请重试"});
                        return;
                    }else{
                        req.session.user = user;
                        logger.info("Old User:"+ req.session.user.name);

                        if(user.type ==0){
                            console.log(user.type);
                            res.json({ret : 10 ,type:0, msg : user.account+"登录成功"});
                            return;
                        }else{
                            res.json({ret : 11 ,type:1, msg : user.name+"医生，欢迎登录"});
                            return;
                        }
                    }


                }

            });
        }




    });
    //注册请求路径
    app.post("/register.do", function(req, res){
        var params = req.body,
        //获取用户model
            userDao = global.models.userDao;
        console.log(params);
        params.createTime = new Date();

            userDao.create(params, function (err, user) {
                if(err && err.errno == 1062){
                    res.json({ret : err.code , msg : "该用户已存在"});
                    return;
                }
                console.log(err);

                res.json({ret : 0 , msg : "注册成功，将会在稍后跳往登录页面"});
                return;
            });

    });
    app.get('/register.html', function (req , res){
        res.render('register', {index: 'index', pageTitle: '账号注册'});
        return;
    });
    app.get('/login.html', function (req , res){
        res.render('login', {});
        return;
    });
    //判断是否登录了
    app.use(function (req , res , next){
        var params = req.query,
            user  = req.session.user,
        //获取用户model
            userDao = req.models.userDao;
        if(GLOBAL.DEBUG){
            user = req.session.user = {loginName: "coverguo", chineseName: '郭锋棉' ,role : 1, id:1}
        }


        req.indexUrl = req.protocol + "://" + req.get('host') + '/index.html';
        //判断是否登录
        if(req.session.user){
            next();
        }else{
            res.redirect("/login.html");
            return;
        }
    });


    app.get('/', function (req , res){
        res.render('index', {index: 'index', pageTitle: '掌上医疗'});
        return;
    });
    app.get('/index.html', function (req , res){
        res.render('index', {index: 'index', pageTitle: '掌上医疗'});
        return;
    });

    app.get('/healthy_news.html', function (req , res){
        res.render('healthy_news', {});
        return;
    });
    app.get('/accountCenter.html', function (req , res){
        res.render('accountCenter', {index:'accountCenter'});
        return;
    });
    app.get('/article-sort.html', ArticleAction.index);
    app.get('/article-detail.html', ArticleAction.detail);
    //doctor页面请求
    app.get('/doctor-bank.html', DoctorAction.index);
    app.get('/doctor-detail.html', DoctorAction.detail);

    app.get('/askQuestion.html', QuestionAction.ask);
    app.get('/search.html', function (req , res){
        res.render('search', {index:'search'});
        return;
    });

    app.get('/doctor-answerQuestion.html', AnswerAction.answer);
//
////    app.get('/login.html', function (req , res){
////        user = req.session.user = {loginName: "coverguo", chineseName: '郭锋棉' ,role : 1, id:1};
////        res.render('login', {});
////    });
//    app.get('/healthy_news.html', function (req , res){
//        res.render('healthy_news', {});
//        return;
//    } );
    app.use(function(req, res, next){
        if(req.url == '/favicon.ico'){
            return;
        }
        console.log(req.url.match(/\/(.*)\.html/i));
        var match = req.url.match(/\/(.*)\.html/i);
        if(match && match[1]){
            res.render(match[1], {pageTitle:"掌上医疗", userType: req.session.user.type});
            return;
        }else{
            next();
        }

    });


    // 请求路径为： controller/xxxAction/xxx.do (get || post)
    app.use(function(req, res , next){
        //controller 请求action
        if(/^\/controller/i.test(req.url)){
            var url = req.url;
            var action = url.match(/controller\/(\w*)Action/i)[1];
            var operation = url.match(/\/(\w+)\.do/i)[1];
            if(GLOBAL.DEBUG){
                logger.info("the operation is: " + action + " --operation: "+ operation);
            }
            //判断是get还是post请求， 获取参数params
            var method = req.method.toLowerCase();
            var params = method =="post"? req.body : req.query;
            params.user = req.session.user;

            //根据不同actionName 调用不同action
            try{
                switch(action){
                    case "user": UserAction[operation](params,req, res);break;
                    case "article": ArticleAction[operation](params,req,  res);break;
                    case "doctor": DoctorAction[operation](params,req, res);break;
                    case "question" : QuestionAction[operation](params,req, res); break;
                    case "answer": AnswerAction[operation](params,req, res);break;
//                    case "statistics" : StatisticsAction[operation](params, req, res); break;

                    default  : next();
                }
            }catch(e){
                res.send(404, 'Sorry! can not found action.');
            }
            return;
        }else{
            next();
        }
    });






};
