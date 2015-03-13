$(function(){
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
});