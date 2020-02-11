var weburl = 'http://121.40.117.135:9993/';
function defulvalue(parm, deful) {
	return parm == undefined ? deful : parm;
}
(function($) {
	$.extend({
		//数据验证
		Vali: function(options, func) {
			var objData = {};
			for (var i = 0; i < options.length; i++) {
				var vali = new _vali_func();
				var valiResult = vali.init(options[i]);
				objData[options[i].id] = valiResult.value;
				//console.log(valiResult, objData);
				if (!valiResult.result) {
					return false;
				}
			}
			if (typeof func === "function")
				func(objData);
			return true;
		},
		ValiFunc: {
			//是否为空：true:不为空   false：为空
			isNull: (val) => {
				return !(val || "").length == 0;
			},
			//是否是邮箱：true:是  false：不是
			isEmail: (val) => {
				var reg_email =
					/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;
				return reg_email.test((val || ""));
			},
			//是否是手机号： true:是  false：不是
			isPhone: (val) => {
				var reg_phone = /[0-9-()（）]{7,18}/; //手机号验证
				return reg_phone.test(val || "");
			},
			//是否是姓名(1-6个汉字)  true:是  false：不是
			isName: (val) => {
				var reg_name = /^([a-zA-Z0-9\u4e00-\u9fa5\·]{1,6})$/; //中文+（1-6个长度）限制
				return reg_name.test(val || "");
			},

			//是否是身份证 true:是  false：不是
			isIDCard: (val) => {
				var reg_idcard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //身份证验证
				return reg_idcard.test(val || "");
			},
			//是否是中文(汉字内容长度在pramArr范围)  true:是  false：不是
			zhLength: (val, pramArr) => {
				var reg_zh = /^[\u4E00-\u9FA5]$/; //中文
				return reg_zh.test(val || "") && $.ValiFunc.lenRange(val, pramArr);
			},
			//是否内容长度在pramArr范围： true:是  false：不是
			lenRange: (val, pramArr) => {
				var minNum = pramArr[0],
					maxNum = pramArr[1];
				return val.length >= minNum && val.length <= maxNum;
			}
		},
		//返回当前URL地址栏中的参数-返回对象
		GetUrlParam: function() {
			var keyArr = (window.location.search || "").replace("?", "").split("&") || [];
			var obj = {};
			if ((window.location.search || "").length == 0)
				return obj
			for (var i in keyArr) {
				var key = keyArr[i].split("=")[0];
				var value = keyArr[i].split("=")[1];
				obj[key] = value;
			}
			return obj;
		},
		BindCaseCategory: function(success) {
			$.AjaxGet({
				url: 'web/page/CategoryProductList', //请求url
				success: function(result) {
					success(result);
				},
				error: function(result) {
					console.log(result);
				}
			});
		},
		AjaxGet: function(parm) {
			var ajax_new = new _ajax_public();
			parm.method = "get";
			ajax_new.init(parm);
		},
		AjaxPost: function(parm) {
			var ajax_new = new _ajax_public();
			parm.method = "post";
			ajax_new.init(parm);
		},
	});

})(jQuery);

///////////////////////////////////////////////////////////==Ajax请求==///////////////////////////////////////////////////////////
var _ajax_public = function() {};
_ajax_public.prototype.init = function(parm) {
	parm = parm || {};
	parm.method = parm.method || 'POST';
	parm.url = parm.url || '';
	parm.apiurl = parm.apiurl || 'http://121.40.117.135:9993/web/page/';
	parm.async = defulvalue(parm.async, true);
	parm.data = parm.data || null;
	parm.success = parm.success || function() {};
	parm.dataType = parm.dataType || 'json';
	parm.complete = parm.complete || function() {};
	parm.error = parm.error || function() {};
	parm.errormsg = parm.errormsg || '操作失败！';
	parm.closeloading = parm.closeloading || 0;
	var loading;
	$.ajax({
		type: parm.method,
		url: parm.apiurl + parm.url,
		data: parm.data,
		dataType: parm.dataType,
		async: parm.async,
		success: function(result) {
			parm.success(result);
		},
		error: function(status) {
			parm.error(status);
			// layer.msg(parm.errormsg);
		},
		complete: function(result) {
			parm.complete(result);
			//if (parm.closeloading == 0)
			//    layui.use(['layer', 'form'], function () { layer = layui.layer, form = layui.form; layer.close(loading); });
		},
		beforeSend: function(result) {
			//if (parm.closeloading == 0)
			//    layui.use(['layer', 'form'], function () { layer = layui.layer, form = layui.form; loading = layer.load(0); });
		}
	});
}
///////////////////////////////////////////////////////////==Ajax请求==///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////==表单数据验证==///////////////////////////////////////////////////////////
var _vali_func = function() {};
_vali_func.prototype.init = function(option) {
	var pram = {};
	pram.id = option.id || ""; //元素ID：元素的id，用于jq通过id查找val【返回的对象值-也是此名称】
	pram.type = option.type || "isNull"; //验证类型：根据 ValiFunc 对象属性名称而来【当前方法的下方】默认非空验证
	pram.typeparam = pram.typeparam || []; //验证所需参数
	pram.msg = option.msg || ""; //提示内容：为空时-不验证此字段的
	pram.value = option.value || ""; //验证的值：优先级高于通过Jq查找id对应的Value【值优先】
	pram.valifunc = option.valifunc;

	var data = "";
	//【zc-修改】某些不能通过ID获取值的时候，直接传入Value来验证
	if (pram.value.length != 0)
		data = pram.value || "";
	else
		data = $("#" + pram.id).val() || "";
	//是否验证通过
	var isValiOk = true;
	//是否有自己的验证函数-有：自行写好逻辑执行验证   无：根据type类型进行验证
	if (pram.msg.length != 0) {
		if ($.isFunction(pram.valifunc)) {
			isValiOk = pram.valifunc(data);
		} else {
			isValiOk = $.ValiFunc[pram.type](data, pram.typeparam);
		}
		//如果当前无提示-不验证【可返回指定值】
		if (!isValiOk) {
			alert(pram.msg);
		}
	}
	var resultData = {
		result: isValiOk, //结果
		value: data, //当前值
	};
	return resultData;
};
///////////////////////////////////////////////////////////==表单数据验证==///////////////////////////////////////////////////////////
