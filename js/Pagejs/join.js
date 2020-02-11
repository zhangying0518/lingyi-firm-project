var isload = false;
var joinData = function() {
	var htmlJoin = "";
	var joinmoney = "";
	$.AjaxGet({
		url:'join',
		success: function(res) {
			// 岗位需求
			var postRequest = res.data.post.data;
			// 薪酬与福利
			var Money = res.data.money.data;
			var hrEmail = res.data.hrEma;
			$(".hrEmail").html(hrEmail);
			for (var i = 0; i < postRequest.length; i++) {
				htmlJoin +=
					`
				<div class="col-md-4 col-lg-4 col-sm-4 content_right-box">
					<img src="${postRequest[i].icon}" />
					<span>${postRequest[i].title}</span>
					<p>${postRequest[i].content}</p>
				</div>
				`
			}
			for (var i = 0; i < Money.length; i++) {
				joinmoney += `<p>${i+1}.${Money[i].content}</p>`
			}
			$(".postRequest").html(htmlJoin)
			$(".content_right-boxMoney").html(joinmoney)
			$(".content_right-boxMoney p").each(function() {
				$(this).html($(this).text().replace(new RegExp("\n", "gm"), '<br/>'))
			});
			browserRedirect()
		},
		error: function(msg) {}
	})

}

function browserRedirect() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
		//跳转移动端页面
		// alert('首页ipone端');
		window.location.href = "http://www.baidu.com";
	} else {
		//跳转pc端页面
		console.log('加入我们pc端');
		// window.location.href="http://www.zhihu.com";
	}
}
