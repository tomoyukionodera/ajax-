// $(document).ready(function() {

// 	var main;
// 	main = new PagePlugin();

// 	$(window).on('load',this,function(){s
// 		main.init();
// 		$(document).on('click','a[href^=#]',function(){
// 			main.pageScroll(this);
// 		});
// 	});
// });	

// クラス定義（コンストラクタ）
// PagePlugin = function(op) {
// 	this.speed=500;
// };

// メソッド定義
// PagePlugin.prototype = {

// 	init: function(){
// 		var self;
// 		self = this;
		
// 	},
// 	pageScroll:function(el){

// 		var self,href,target,position;
// 		self = this;
		
// 		href= $(el).attr("href");
// 		target = $(href == "#" || href == "" ? 'html' : href);
// 		position = target.offset().top;
// 		$("html, body").animate({scrollTop:position}, self.speed);

// 	}
	
// };

