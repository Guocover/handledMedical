
/**
 *  @info: userDao
 *  @author: coverGuo
 *  @date: 2014-12-30
 */

module.exports  = function (db){
    var user = db.define("user", {
        name        : String,
        account     : String,
        password    : String,
        createTime  : Date,
        type        : Number
    },{
        id: "user_id"
    });

    return user;
};