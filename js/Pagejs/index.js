$(function() {
	var indexList = "";
	$.AjaxGet({
		url: 'IndexProductList',
		success: function(res) {
			// console.log('res', res)
			$.each(res.data, function(i, val) {
				console.log('res.data',i, val);
				var $gb=$(".gb"+(i+1));
				$gb.attr("data-id",val.guid);
				$gb.find("span:first").html(val.name);
				var sonHtml=[];
				var joinStr="<span>|</span>";
				$.each(val.sonlist,function(n,son){
					// console.log(n,'n')
					// console.log(son,'son')
					if(i>2)
						joinStr="";
					sonHtml.push('<a href="javacript:void(0);">'+son.name+'</a>');
					
				})
				$gb.find("p").html(sonHtml.join(joinStr));
			})
			browserRedirect();
			// 鼠标移入效果
			$(".gongBorder2").on("mouseover", function() {
				$(this).css({
					"transform": "scale(1.05)",
					"box-shadow": "6px 6px 20px #ddd",
					"z-index": "111"
				})
			})
			$(".gongBorder2").on("mouseleave", function() {
				$(this).css({
					"transform": "scale(1)",
					"box-shadow": "0 0 0 0 #ffffff",
					"z-index": "0"
				})
			})
			// 点击跳转页面
			$(".gongBorder2,.gongBorder1").on("click", function() {
				var id = $(this).attr("data-id");
				window.location.href = "sort.html?id=" + id;
			})

			$(".gongBorder1").on("mouseover", function() {
				$(this).css({
					"transform": "scale(1.05)",
					"box-shadow": "6px 6px 20px #ddd",
					"z-index": "111"
				})
			})
			$(".gongBorder1").on("mouseleave", function() {
				$(this).css({
					"transform": "scale(1)",
					"box-shadow": "0 0 0 0 #ffffff",
					"z-index": "0"
				})
			})
		}
	})
})

function browserRedirect() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
		//跳转移动端页面
		console.log('首页ipone端');
		window.location.href = "http://www.baidu.com";
	} else {
		//跳转pc端页面
		console.log('首页pc端');
		// window.location.href="http://www.baidu.com";
	}
}
//IndexProductList 首页九宫格分类
//HotMenu 404
//GetMenuCategoryList 404
//CategoryProductList 成功没数据
