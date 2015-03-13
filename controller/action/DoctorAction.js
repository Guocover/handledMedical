/**
 * @info : Doctor Action
 * @author : coverguo
 * @date : 2015-01-07
 */


var log4js = require('log4js'),
    logger = log4js.getLogger(),
    _ = require('underscore'),
    DoctorService = require('../../service/DoctorService'),
    isError = function (res , error){
        if(error){
            res.json({ret : 1 , msg : error});
            return true;
        }
        return false;
    };



var doctorAction = {
    index: function(req, res){
        res.render('doctor-bank', {});
        return;
    },
    addDoctor: function(params, req , res){

    },
    queryListBySearch : function (params, req , res) {
        var doctorService = new DoctorService();
        var searchParam = {};

        doctorService.queryListBySearch(searchParam,function(err, items){
            if(isError(res, err)){
                return;
            }
            res.json({ret:0, msg: "success", data: items});
        });
    },
    update:function(params,cb){
        var as = new ApplyService();
        as.update(params,cb);
    }

};

module.exports = doctorAction;

