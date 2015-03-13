
/**
 *  @info: doctorDao
 *  @author: coverGuo
 *  @date: 2014-12-30
 */

module.exports  = function (db){
    var doctor = db.define("doctor", {
        name        : String,
        job          : String,
        hospital    : String,
        createTime  : Date,
        telephone   : Number,
        description        : String,
        doctor_account : String,
        city        : String,
        direction  : String

    },{
        id: "doctor_id"
    });

    return doctor;
};