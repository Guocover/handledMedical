
$("#return-btn").on("click",function(){
    window.history.go(-1);
});

$("#search-button").on("click",function(){

    $(".index-search-panel").slideToggle(300);
});

var encodeHtml = function (str) {
    return (str + '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\x60/g, '&#96;').replace(/\x27/g, '&#39;').replace(/\x22/g, '&quot;');
};

function DB(opts) {
    var suc = opts.successCall;
        err = opts.errorCall;

    var cgi = opts.cgi;
    opts.params._t = new Date()-0;
    $.ajax({
        url: cgi,
        data: opts.params,
        type: opts.method?opts.method:"get",
        success: function(data) {
            suc && suc(data)

        },
        error: function(data) {
            err && err(data);
        }
    });
}
//日期转换
var dateFormat  = function (date , fmt){
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};