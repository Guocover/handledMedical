define([], function(){
    var registerBtn = $("#registerBtn");
    function bindEvent(){

        registerBtn.on('click', function(e){
            e.preventDefault();

            var opts = {},
                account = $('[name="account"]').val(),
                name = $('[name="name"]').val(),
                type = +$('select[name="type"]').val(),
                password = $('[name="password"]').val();

            //申请数据
            if(account!="" && name!=""  && password!=""){
                $.extend(opts, {
                    params:{
                        account: $('[name="account"]').val(),
                        name: $('[name="name"]').val(),
                        type: +$('select[name="type"]').val(),
                        password: $('[name="password"]').val()
                    },
                    method: "post",
                    cgi: "/register.do",
                    successCall: function(data){
                        alert(data.msg);
                        if(data.ret==0){
                            setTimeout(function(){
                                location.href = "login.html";
                            },3000)
                        }
                    },
                    errorCall: function(data){
                        alert(data.msg);
                    }
                    //mail: $(".apply-mail").val()
                });
                console.log(opts);
                DB(opts);
            }else{
                alert("请填写全部内容");
            }


        })
    }

    function init(){
        bindEvent();
    }

    return{
        init: init
    };
});

