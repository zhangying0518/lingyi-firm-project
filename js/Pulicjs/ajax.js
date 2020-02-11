(function ($) {
    $.extend({
        AjaxPost: function (param) {
            param.type = "post";
            $.AjaxPublic(param);
        },
        AjaxGet: function (param) {
            param.type = "get";
            $.AjaxPublic(param);
        },
        AjaxPublic: function (param) {
            var _ajax = function () { };
            _ajax.prototype.init = function (param) {
                param.error = param.error || function () { };
                $.ajax({
                    type: param.type,
                    url: param.url || "",
                    data: param.data || {},
                    dataType: "json",
                    success: function (result) {
                        param.success(result);
                    },
                    error: function (result) {
                        param.error(result);
                    }
                });
            };
            var _new_ajax = new _ajax();
            _new_ajax.init(param);
        }
    });
})(jQuery);