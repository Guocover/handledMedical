/**
 * Created by coverguo on 2015/01/08.
 */

var http = require('http');

var  log4js = require('log4js'),
    logger = log4js.getLogger();



var DoctorService = function (){
    this.doctorDao = global.models.doctorDao;
//    this.user_doctorDao = global.models.user_doctorDao;
};



DoctorService.prototype = {

    queryListBySearch : function (searchParam , callback){

        this.doctorDao.find(searchParam ,["createTime", "Z"], function (err , items){
            if(err){
                callback(err);
                return;
            }
            console.log(items);
            callback(null,items);
        });
    },
    add: function(target, callback){
        var self = this;
        var userId = target.user.id;
        this.doctorDao.create(target , function (err , newApply){
            if(err){
                callback(err);
                return;
            }
            if(GLOBAL.DEBUG){
                logger.info("Insert into b_apply success! target1: ",newApply);
            }
            //创建项目的即为管理员 故role ==1
            var userApply = {
                userId : userId,
                applyId : newApply.id,
                role: 1,
                createTime : new Date()
            };
            console.log(userApply);
            self.userApplyDao.create(userApply, function (err, items) {
                if(err){
                    callback(err);
                    return;
                }
                callback(null);
            })

        });
    },
    remove : function(target, callback){
        this.doctorDao.one({id: target.id }, function (err, apply) {
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
        this.doctorDao.one({id: target.id }, function (err, apply) {
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


module.exports =  DoctorService;

