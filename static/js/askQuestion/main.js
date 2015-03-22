define([], function(){
    function bindEvent(){

        $(".ask-submit-btn").on('click', function(e){

            var opts = {};
            //申请数据
            $.extend(opts, {
                params:{
                    age: +$('[name="age"]').val(),
                    sex: $('[name="sex"]').val(),
                    question: $('[name="description"]').val()
                },
                method: "post",
                cgi: "/controller/questionAction/addQuestion.do",
                successCall: function(data){
                    alert(data.msg);
                    location.reload();
                },
                errorCall: function(data){
                    alert(data.msg);
                }
                //mail: $(".apply-mail").val()
            });
            DB(opts);

        })
    }
    var Question = {

    }
    function init(){
        bindEvent();
//        Question.init();
    }

    return{
        init: init
    };
});
