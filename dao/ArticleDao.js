
/**
 *  @info: userDao
 *  @author: coverGuo
 *  @date: 2014-12-30
 */

module.exports  = function (db){
    var article = db.define("article", {
        title       : String,
        content     : String,
        author      : String,
        createTime  : Date,
        type        : Number
    },{
        id: "article_id"
    });

    return article;
};