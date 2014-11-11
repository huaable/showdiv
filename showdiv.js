(function($) {
	var showDiv = function(selector, option) {

		var settings = {
			"showModal": false,
			"onClose": null
		}

		var _this = this;
		_this.element = $(selector)
		_this.option = $.extend(settings, option);

		// 事件
		$(document).on({
			"click": function(e) {
				if ($(e.target).is(".ui-show-mask") && (!_this.option.showModal)) {
					_this.hide()
				}
			}
		})
	}

	showDiv.prototype = {
		show: function() {	// 显示
			var _this = this;
			_this.isShow = true;
			// 遮罩
			if ($(".ui-show-mask").length == 0) {
				$("body").append('<div class="ui-show-mask"></div>')
			}
			// 弹出层
			_this.element.addClass("ui-show-container").appendTo($("body")).show()
			// 自动居中
			function dialogCenter() {
				_this.element.css('marginTop', -_this.element.innerHeight() / 2 + $(window).scrollTop())
				_this.element.css('marginLeft', -_this.element.innerWidth() / 2)
			}

			dialogCenter()
			$(document).on("scroll", function() {
				if (_this.isShow == true) {
					dialogCenter()
				}
			})
		},
		hide: function() {
			var _this = this;
			_this.isShow = false;
			_this.element.hide();
			$(".ui-show-mask").remove()
			if (typeof _this.option.onClose == 'function') {
				_this.option.onClose()
			}
		}
	}

	$.fn.showDiv = function(option) {
		return this.each(function() {
			var $this = $(this)
			var data = $this.data("showDiv")
			if (!data) {
				$this.data("showDiv", new showDiv($this, option))
			}
			if (typeof option == "string") {
				$this.data("showDiv")[option]();
			}
		})
	}
})(jQuery)