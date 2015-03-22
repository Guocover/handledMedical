
/**
 *  @info: ApplyDao
 *  @author: coverGuo
 *  @date: 2014-12-30
 */
//status: 0 审核中- 1-审核通过， 2-审核失败
module.exports  = function (db){
    var answer = db.define("answer", {
        answer       : String,
        doctor_name  : String,
        createTime   : Date,
        question_id  : Number
    }, {
        id: "answer_id"
    });

    return answer;
}