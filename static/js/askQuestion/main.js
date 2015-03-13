$(function(){

	$("#choose-btn").bind("click",function(){
		$(".doctorBank-search-panel").slideToggle(300);
	});
	$("#return-btn").bind("click",function(){
		window.history.go(-1);
	});

});