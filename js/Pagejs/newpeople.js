var newpeopleData = function() {
	var htmlNp = ""
	$.AjaxGet({
		url:'Helper',
		success: function(res) {
			var newHelp = res.data
			for (var i = 0; i < newHelp.length; i++) {
				htmlNp +=
					`<div class="newItem">
					<div class="newItemQues">
						<span>${newHelp[i].title}</span>
					</div>
					<div class="newItemAns">
						${newHelp[i].data}
					</div>
				</div>`
			}
			$(".newMain").html(htmlNp);
			$(".newItemAns").each(function() {
				$(this).html($(this).text().replace(new RegExp(";", "gm"), '<br/>'))
			});
			browserRedirect()
		},
		error: function(msg) {
		}
	})
	$('.panel-heading img').off().click(function() {
		if ($(this).attr("src") == "../img/Publicimg/style/tuikuan.png") {
			$(this).attr('src', '../img/Publicimg/style/tuandui.png');
		} else {
			$(this).attr('src', '../img/Publicimg/style/tuikuan.png');
		}
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
		console.log('新手帮助pc端');
		// window.location.href="http://www.zhihu.com";
	}
}
