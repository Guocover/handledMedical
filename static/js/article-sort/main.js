define(['template/article.tpl',], function(articleTpl){
    var myScroll,
        pullDownEl, pullDownOffset,
        pullUpEl, pullUpOffset,
        generatedCount = 0;
    var encodeHtml = function (str) {
        return (str + '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\x60/g, '&#96;').replace(/\x27/g, '&#39;').replace(/\x22/g, '&quot;');
    };

    /**
     * 下拉刷新 （自定义实现此方法）
     * myScroll.refresh();    // 数据加载完成后，调用界面更新方法
     */
    function pullDownAction () {
        setTimeout(function () {
            // <-- Simulate network congestion, remove setTimeout from production!
            myScroll.refresh();   //数据加载完成后，调用界面更新方法   Remember to refresh when contents are loaded (ie: on ajax completion)
        }, 1000); // <-- Simulate network congestion, remove setTimeout from production!
    }

    /**
     * 滚动翻页 （自定义实现此方法）
     * myScroll.refresh();    // 数据加载完成后，调用界面更新方法
     */
    function pullUpAction () {
        setTimeout(function () {  // <-- Simulate network congestion, remove setTimeout from production!
            var el = $("#article-list");
            console.log(el);

            for (i=0; i<3; i++) {
                $(".article").eq(i).clone().insertAfter(el);
            }

            myScroll.refresh();   // 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
        }, 1000); // <-- Simulate network congestion, remove setTimeout from production!
    }

    /**
     * 初始化iScroll控件
     */
    function loaded() {
        pullDownEl = document.getElementById('pullDown');
        pullDownOffset = pullDownEl.offsetHeight;
        pullUpEl = document.getElementById('pullUp');
        pullUpOffset = pullUpEl.offsetHeight;

        myScroll = new iScroll('article-wrapper', {
            scrollbarClass: 'myScrollbar', /* 重要样式 */
            useTransition: false, /* 此属性不知用意，本人从true改为false */
            topOffset: pullDownOffset,
            onRefresh: function () {
                if (pullDownEl.className.match('loading')) {
                    pullDownEl.className = '';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                } else if (pullUpEl.className.match('loading')) {
                    pullUpEl.className = '';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                }
            },
            onScrollMove: function () {
                if (this.y > 5 && !pullDownEl.className.match('flip')) {
                    pullDownEl.className = 'flip';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
                    this.minScrollY = 0;
                } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                    pullDownEl.className = '';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                    this.minScrollY = -pullDownOffset;
                } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                    pullUpEl.className = 'flip';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
                    this.maxScrollY = this.maxScrollY;
                } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                    pullUpEl.className = '';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                    this.maxScrollY = pullUpOffset;
                }
            },
            onScrollEnd: function () {
                if (pullDownEl.className.match('flip')) {
                    pullDownEl.className = 'loading';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
                    pullDownAction(); // Execute custom function (ajax call?)
                } else if (pullUpEl.className.match('flip')) {
                    pullUpEl.className = 'loading';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                    pullUpAction(); // Execute custom function (ajax call?)
                }
            }
        });

        setTimeout(function () { document.getElementById('article-wrapper').style.left = '0'; }, 800);
    }


    function bindEvent(){
        $(".article").on("click", function(){
            var articleId = $(this).attr("data-articleId"),
                index = $(this).attr("data-index");
            //保存当前的文章index；
            localStorage.setItem("currentArticle_index",index);
            location.href="article-detail.html?articleId=" +articleId;
        })
        //搜索
        $("#searchBtn").on("click", function(){
            var opts = {}, params={}, createTime = new Date();
            //申请数据
            if(+$('[name="type"]').val() !=-1){
                params.type = $('[name="type"]').val();
            }

            if(+$('[name="createTime"]').val() !=-1){
                params.createTime =new Date(createTime -  (+$('[name="createTime"]').val()* 24*60*60*1000));
            }
            if($('[name="title"]').val()!=""){
                params.title = $('[name="title"]').val();
            }
            console.log(params);
            $.extend(opts, {
                params: params,
                cgi: "/controller/articleAction/queryListBySearch.do",
                successCall: function(data){
                    alert(data.msg);
                    var param = {
                        encodeHtml: encodeHtml
                    }


                    $('#article-list').html(articleTpl(data, param));
                    bindEvent();
                    //用localstorage存储上下文章链接

                    localStorage.setItem("article",data.items );//

//                    location.reload();
                },
                errorCall: function(data){
                    alert(data.msg);
                }
                //mail: $(".apply-mail").val()
            });
            DB(opts);
        });

    }

    function init(){
        //初始化绑定iScroll控件
        opts = {
            params: {},
            cgi: "/controller/articleAction/queryListBySearch.do",
            successCall: function(data){
                alert(data.msg);
                var param = {
                    encodeHtml: encodeHtml
                }


                $('#article-list').html(articleTpl(data, param));
                bindEvent();
                document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
                loaded();
                //用localstorage存储上下文章链接
                localStorage.setItem("article",JSON.stringify(data.items) );//
            },
            errorCall: function(data){
                alert(data.msg);
            }
        };
        DB(opts);

    }

    return{
        init: init
    };
});

