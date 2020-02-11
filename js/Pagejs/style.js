$(function() {
	//头和底
	$("#head").load("top.html"); //局部刷新头部
	$("#root").load("bottom.html"); //局部刷新底部
	// 底部弹框
	$(".root").delegate(".bottom_center_tip", "mouseover", function() {
		$(this).find(".quick").stop().fadeIn()
	})
	$(".root").delegate(".bottom_center_tip", "mouseout", function() {
		$(this).find(".quick").stop().hide();
	})
	$(".root").delegate(".img2", "click", function() {
		$(this).parent(".quickWai").parent(".quick").hide()
	})
})
