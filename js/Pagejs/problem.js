// 绑定数据
var problemData = function() {
	var html = "";
	$.AjaxGet({
		url:'Problem',
		success: function(res) {
			var pullDown = res.data
			for (var i = 0; i < pullDown.length; i++) {
				html +=
					`<li>
						<p class="aboutHowListSelP">${pullDown[i].title}</p>
						<div class="aboutHowListSel" style="display: block;height:0px;">`;
				for (var k = 0; k < pullDown[i].data.length; k++) {
					if (pullDown[i].data[k].type == 1) {
						html +=
							`<div class="aboutcollect_quest">
									<div><img src="../img/Pageimg/problem/zixun.png"></img></div>
									<div class="aboutcollect_questP">
										<p>${pullDown[i].data[k].content}</p>
										<img src="../img/Pageimg/problem/sanjiaobeijing.png" />
									</div>
								</div>`;
					} else {
						html +=
							`<div class="aboutcollect_ans">
									<div class="aboutcollect_ansP">
										<p>${pullDown[i].data[k].content}</p>
										<img src="../img/Pageimg/problem/sanjiao.png"/>
									</div>
									<div><img src="../img/Pageimg/problem/erweima.png"></img></div>
								</div>`
					}
				}
				html += `</div>
					</li>`
			}
			$(".content_right .aboutHowList ul").html(html)
			$(".aboutHowListSelP").first().trigger("click");
			// html += html.replace(/\n/g,'<br/>');
			$(".aboutcollect_ansP p").each(function() {
				$(this).html($(this).text().replace(new RegExp("\n","gm"),'<br/>'))
			});
			browserRedirect()
		},
		error: function(msg) {
		}
	})
	
	$(".content_right").off().delegate(".aboutHowList li .aboutHowListSelP", "click", function() {
		if (!$(this).hasClass("aboutHowListBac")) {
			$(this).siblings(".aboutHowListSel").animate({
				height:300
			})
			$(this).addClass("aboutHowListBac");
		} else {
			$(this).siblings(".aboutHowListSel").animate({
				height: 0
			})
			$(this).removeClass("aboutHowListBac");
		}
	});
	function browserRedirect() {
		var sUserAgent = navigator.userAgent.toLowerCase();
		if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
			//跳转移动端页面
			// alert('首页ipone端');
			window.location.href="http://www.baidu.com";
		} else {
			//跳转pc端页面
			console.log('常见问题pc端');
			// window.location.href="http://www.zhihu.com";
		}
	}
}
