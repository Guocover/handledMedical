define([], function(){
    function bindEvent(){
        $(".login-goDown").click(function(){
            $(".show-login").hide(300);
            $("#loginForm").slideDown(0);
        });
        $("#loginBtn").on('click',  function(e) {
            login();
        });
    }

    function login(){
            var opts = {};
            //申请数据
            $.extend(opts, {
                params: {
                    account: $('[name="account"]').val(),
                    password: $('[name="password"]').val()
                },
                method:'post',
                cgi: "/login.do",
                successCall: function (data) {
                    alert(data.msg);
                    switch (data.ret){
                        case 10: location.href="index.html";break;
                        case 11: location.href="doctor-index.html";break;
                    }

                },
                errorCall: function (data) {
                    alert(data.msg);
                }
                //mail: $(".apply-mail").val()
            });
            DB(opts);

    };
    function init(){
        bindEvent();
    }

    return{
        init: init
    };
})

