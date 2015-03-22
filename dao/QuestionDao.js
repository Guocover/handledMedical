
/**
 *  @info: questionDao
 *  @author: coverGuo
 *  @date: 2014-12-30
 */

module.exports  = function (db){
    var article = db.define("question", {
        question    : String,
        answer      : String,
        user_account: String,
        doctor_id   : Number,
        doctor_name : String,
        createTime  : Date,
        modifyTime  : Date,
        sex: Number,
        age: Number
    },{
        id: "question_id"
    });

    return article;
};