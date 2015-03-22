define([], function(){
    var acticleWriteForm = $("#acticleWriteForm");
    function bindEvent(){

        acticleWriteForm.on('click', '#submitBtn', function(e){
            e.preventDefault();

            var opts = {};
            //申请数据
            $.extend(opts, {
                params:{
                    title: $('.article-title').val(),
                    content: $('.article-text').val(),
                    type: $()
                },

                cgi: "/controller/articleAction/addArticle.do",
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

    function init(){
        bindEvent();
    }

    return{
        init: init
    };
});

