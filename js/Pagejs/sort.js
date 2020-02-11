$(function() {
	var totalSort = "";
	var tatalListHtl = "";
	var pram = $.GetUrlParam()
	$.AjaxGet({
		url: 'CategoryProductList',
		success: function(res) {
			var totalSortHl = res.data.moduleList
			var tatalList = res.data.proList
			console.log(tatalList, 'tatalList')
			for (var i = 0; i < tatalList.length; i++) {
				tatalListHtl +=
					`
				<div class="progressBox progressBox1 item ${tatalList[i].moduleGuid}">
				<img src="${weburl}${tatalList[i].img}" class="bjimg">
					<div class="pgbox">
					  <div class="pgbox_box">
						<div class="progressTitle">
							<p class="weight">${tatalList[i].title}</p>
							<div class="weightimg">
								<img src="${weburl}${tatalList[i].icon}" class="gray"/>
							</div>
						</div>
						
						<ul class="progressList">
							<li>${tatalList[i].desc}</li>
						</ul>
						<div class="progressMoney" style="color:#ed6f1f">¥${tatalList[i].minPrice}起</div>
						<div class="progressArrow">
							<img src="../img/Pageimg/sort/jiantou.png" class="gray"/>
						</div>
					  </div>
					</div>
				</div>
				`
			}
			var id = pram.id
			console.log(id, 'id')
			for (var i = 0; i < totalSortHl.length; i++) {
				let guid = totalSortHl[i].guid
				totalSort += '<li class="' + (id == guid ? "totalSortHover" : "") + '"  data-filter=".' + guid + '">' +
					totalSortHl[i].name + '</li>'
			}

			$(".progressMain").html(tatalListHtl)
			$(".totalSortRight").html(totalSort)
			// 全部分类
			$(".totalSortRight>li").click(function() {
				$(this).addClass("totalSortHover").siblings("li").removeClass("totalSortHover")
			})
			// 蒙版
			// $(".progressMain").find("div").eq(0).find(".gray").hide()
			// $(".progressMain").find("div").eq(0).find(".white").show()
			// $(".pgbox").mouseover(function() {
			// 	$(this).addClass("progressBoxHover")
			// 	$(this).find(".gray").hide()
			// 	$(this).find(".white").show()
			// })
			// $(".pgbox").mouseout(function() {
			// 	$(this).removeClass("progressBoxHover")
			// 	$(this).find(".gray").show()
			// 	$(this).find(".white").hide()
			// })
			browserRedirect();
			// 随机切换插件
			var container = new Isotope('.isotope', {
				itemSelector: '.item',
				layoutMode: 'fitRows'
			});
			container.arrange({
				filter: '.' + id
			});
			var filterFns = {};
			var filtersElem = document.querySelector('.totalSortRight');
			filtersElem.addEventListener('click', function(event) {
				console.log("event", event.target)
				if (!matchesSelector(event.target, 'li')) {
					return;
				}
				var filterValue = event.target.getAttribute('data-filter');
				filterValue = filterFns[filterValue] || filterValue;
				container.arrange({
					filter: filterValue
				});
			});

			// var url = window.location.href;
			// var arrurl = url.split("?id=");
			// console.log('arrurl', arrurl[1])
			// container.arrange({
			// 	filter:'0efce993-ff2b-4d30-97ce-08d75766eee5'
			// })
		},
	})
})

function browserRedirect() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
		//跳转移动端页面
		// alert('首页ipone端');
		window.location.href = "http://www.baidu.com";
	} else {
		//跳转pc端页面
		console.log('9分类pc端');
		// window.location.href="http://www.zhihu.com";
	}
}
