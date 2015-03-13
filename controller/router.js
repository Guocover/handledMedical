/**
 * @info : 页面申请路由
 * @author : coverguo
 * @date : 2014-12-16
 */

var DoctorAction = require('./action/DoctorAction'),
    ArticleAction = require('./action/ArticleAction'),
    UserAction = require("./action/UserAction"),
    IndexAction = require("./action/IndexAction"),
    StatisticsAction = require("./action/StatisticsAction"),
    ApproveAction = require("./action/ApproveAction"),
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
            userDao.one({account : params.account, password:params.password} ,function (err , user) {
                if(isError(res,err)){
                    return;
                }
//                console.log(user.name);
                if(!user){
                    res.send(403, 'Sorry! you can not see that.');
                    return;
                }else{

                    req.session.user = user;
                    logger.info("Old User:"+ req.session.user.name);

                    if(user.type ==0){
                        res.redirect("/index.html");
                        return;
                    }else{
                        res.redirect("/doctor-index.html");
                        return;
                    }

                }

            });
        }




    });
    app.get('/login.html', function (req , res){
        res.render('login', {});
        return;
    });

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
        res.render('index', {index: 'index'});
        return;
    });
    app.get('/index.html', function (req , res){
        res.render('index', {index: 'index'});
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
    app.get('/article-sort.html', function (req , res){
        res.render('article-sort', {index:'article-sort'});
        return;
    });
    app.get('/search.html', function (req , res){
        res.render('search', {index:'search'});
        return;
    });

    //html页面请求
    app.get('/doctor-bank.html', DoctorAction.index);
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

    })


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
//                    case "log" : LogAction[operation](params,req, res); break;
//                    case "userApply": UserApplyAction[operation](params,req, res);break;
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
