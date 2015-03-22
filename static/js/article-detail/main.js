define([], function(){

    function bindEvent(){
        $("#collect-btn").bind("click",function(){
            $(this).toggleClass("collect-btn-collected");
        });
        $("#evaluate-btn").bind("click",function(){
            $(".evaluate-panel").toggle(200);
        });

        $(".evaluate-item").on("click",function(){
            $(this).addClass("evaluate-item-selected");
            var num = $(this).find(".evaluate-item-num").text();
            num = parseInt(num) +1;
            $(this).find(".evaluate-item-num").text(num);
        });
        $("#return-btn").bind("click",function(){
            window.history.go(-1);
        });

        $(".nearLink").on("click", function(e){
            var articles = JSON.parse(localStorage.getItem("article"));
            var index = $(this).attr("data-index");
            localStorage.setItem("currentArticle_index", index);
            if(index > || index < articles.length-1){
                location.href= 'article-detail.html?articleId='+ articles[index].article_id;
            }
        });

    }

    function init(){
        setNearLink();


        bindEvent();
    }
    function setNearLink(){
        var articles = JSON.parse(localStorage.getItem("article")),
            index  = +localStorage.getItem("currentArticle_index");
        if(index < articles.length-1){
          $(".nextpage").attr("data-index",index+1 ).html("下一篇： "+articles[index+1].title);
        }
        if(index > 0){
            $(".prevpage").attr("data-index",index-1 ).text("上一篇： "+articles[index-1].title);
        }

    }
    return{
        init: init
    };
});

