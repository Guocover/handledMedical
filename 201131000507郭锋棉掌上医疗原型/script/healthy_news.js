$(function(){

	$(".indexSquare").bind("click",function(){
		$(this).addClass("indexSquare-current").siblings().removeClass("indexSquare-current");
	})
	
});