// JavaScript Document
if(typeof jQuery!=="undefined"){

	// 常用扩展
	;(function($){
		// sudySelect 下拉选择
		$.fn.sudySelect = function(option){
			var defaults = {
					handle:".select-name",
					selects:".select-list",
					trigger:"click",
					effect:"slide",
					speed: 100,
					dir: "down",
					autoWidth: true
				},
			setting = $.extend(true,{},defaults,option);
			return this.each(function(){
				var $c = $(this), $n = $(this).find(setting.handle), $s = $(this).find(setting.selects), posY = $n.outerHeight();
				if(setting.autoWidth){
					$s.children().css({"padding-left":$n.css("padding-left"),"padding-right":$n.css("padding-right")});
				}
				if(setting.dir=="down"){
					$c.addClass("select-down");
					$s.css({top:posY+'px',bottom:"auto"});
				}else if(setting.dir=="up"){
					$c.addClass("select-up");
					$s.css({bottom:posY+'px',top:"auto"});
				}
				function showSelects(){
					if(setting.effect=="slide"){
						$s.stop(true,true).slideDown(setting.speed);
					}else if(setting.effect=="fade"){
						$s.stop(true,true).fadeIn(setting.speed);
					}else{
						$vp.show();
					}
				}
				function hideSelects(){
					if(setting.effect=="slide"){
						$s.stop(true,false).slideUp(setting.speed);
					}else if(setting.effect=="fade"){
						$s.stop(true,false).fadeOut(setting.speed);
					}else{
						$s.hide();
					}
				}
				$n.on(setting.trigger, function(){
					if(setting.trigger=="click"){
						$n.toggleClass("select-open");
						if($n.hasClass("select-open")){
							showSelects();
						}else{
							hideSelects();
						}
					}else{
						$n.addClass("select-open");
						showSelects();
					}
					$s.children().removeClass("hover");
				});
				$c.on("mouseleave",function(){
					$n.removeClass("select-open");
					hideSelects();
				});
				$s.children().mouseenter(function(){
					$(this).addClass("hover").siblings().removeClass("hover");	
				});
				$s.children().on("click",function(){
					$n.text($(this).text());
					$(this).addClass("selected").siblings().removeClass("selected");
					$n.removeClass("select-open");
					hideSelects();
				}).eq(0).trigger("click");
			});
		};
		// 日历
		$.fn.sudyPubdate = function(option){
			var defaults = {
					target:".pubdate",
					lang: "num",
					separator:"-",
					format:"年月日",
					tpl: '<span class="pubdate-month">%m%月</span><span class="pubdate-day">%d%</span>'
				},
			setting = $.extend(true,{},defaults,option);
			function getMonthCN(n) {
				var num = n;
				switch(n){
					case 1:
						num = "一月";
						break;
					case 2:
						num = "二月";
						break;
					case 3:
						num = "三月";
						break;
					case 4:
						num = "四月";
						break;
					case 5:
						num = "五月";
						break;
					case 6:
						num = "六月";
						break;
					case 7:
						num = "七月";
						break;
					case 8:
						num = "八月";
						break;
					case 9:
						num = "九月";
						break;
					case 10:
						num = "十月";
						break;
					case 11:
						num = "十一月";
						break;
					case 12:
						num = "十二月";
						break;
				}
				return num;
			}
			function getMonthEN(n) {
				var num = n;
				switch(n){
					case 1:
						num = "Jan";
						break;
					case 2:
						num = "Feb";
						break;
					case 3:
						num = "Mar";
						break;
					case 4:
						num = "Apr";
						break;
					case 5:
						num = "May";
						break;
					case 6:
						num = "Jun";
						break;
					case 7:
						num = "Jul";
						break;
					case 8:
						num = "Aug";
						break;
					case 9:
						num = "Sep";
						break;
					case 10:
						num = "Oct";
					case 11:
						num = "Nov";
						break;
					case 12:
						num = "Dec";
						break;
				}
				return num;
			}
			return this.each(function(){
				var $c = $(this), $d = $(this).find(setting.target), date = $.trim($d.text()).split(setting.separator), year = parseInt(date[setting.format.indexOf("年")], 10), month = parseInt(date[setting.format.indexOf("月")], 10), day = parseInt(date[setting.format.indexOf("日")], 10);
				if(setting.lang=="en"){
					month = getMonthEN(month);
				}
				if(setting.lang=="cn"){
					month = getMonthCN(month);
				}
				var tpl = setting.tpl.replace('%Y%',year).replace('%m%',month).replace('%d%',day);
				$d.empty().append(tpl).wrapInner('<div class="sudy-pubdate">');
			}); 
		};
		// sudyTab 选项卡切换
		$.fn.sudyTab = function(option){
			var defaults = {
					handle:".tab-menu > li",
					content:".tab-list > li,.tab-more > li",
					trigger:"mouseenter",
					start:1,
					autoPlay:{
						active:false,
						interval:4000,
						pauseHover: true
					}
				},
			setting = $.extend(true,{},defaults,option);
			return this.each(function(){
				var $c = $(this), $m = $(this).find(setting.handle), items = setting.content.split(","), start = setting.start-1, len = $m.length, current = start;
				$.each($m,function(index,m){
					$(m).on(setting.trigger,function(){
						current = index;
						$m.removeClass("selected");
						$(this).addClass("selected");
						$.each(items,function(i,e){
							$(e,$c).removeClass("active").hide()
							$(e,$c).eq(index).addClass("active").show();
						});
					});
				});
				if(setting.autoPlay.active){
					var timer,current;
					var run = function(index){
						$m.eq(index).trigger(setting.trigger);
						timer = setTimeout(function(){
								index++;
								if(index>len-1){
									index=0;
								}
								run(index);
						},setting.autoPlay.interval);
					};
					run(start);
					$c.hover(function(){
						clearTimeout(timer);
					},function(){
						run(current);
					});
				}else{
					$m.eq(start).trigger(setting.trigger);
				}
			});
		};
		// sudyInput 输入框提示
		$.fn.sudyInput = function(option){
			var defaults = {
					tip:".tip"
				},
			setting = $.extend(true,{},defaults,option);
			return this.each(function(){
				var $c = $(this), $t = $(this).find(setting.tip), $inp = $(this).find("input,textarea");
				function showTip(){
					var val = $inp.val();
					if(val!==$t.text() && val!==""){
						$t.hide();
					}else{
						$t.show();
						$inp.val("");
					}
				}
				$c.click(function(){
					$inp.trigger("focus");
				});
				$inp.focus(function(){
					$t.hide();
				});
				$inp.blur(function(){
					showTip();
				});
			});
		};
		// sudyClock 时钟
		$.fn.sudyClock = function(option){
			var defaults = {
					format:"%Y%年%M%月%D%日 %N% %H%:%m%:%s% %W% 距离100周年国庆还有 %CD% 天",
					hour12: false,
					noon: "cn",
					week:"cn",
					countDown:"2049/10/1"
				},
			setting =  $.extend(true,{},defaults,option),
			num = function(n){
				var num = parseInt(n);
				if(num<10){
					num = "0"+num;
				}
				return num;
			},
			getNow = function(){
				var date = new Date(),Year = date.getFullYear(), Month = date.getMonth()+1, Day = date.getDate(), Hour = date.getHours(), Min = date.getMinutes(), Sec = date.getSeconds(), Week = setting.week == "cn" ? ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"][date.getDay()]:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][date.getDay()],Noon = setting.noon =="cn"? ["上午","下午"][Hour<12?0:1]:["AM","PM"][Hour<12?0:1],Count = 0;
				Hour = setting.hour12&&Hour>12?Hour-12:Hour;
				Count = Math.ceil((Date.parse(setting.countDown)-date.getTime())/86400000);
				return {Y:Year,M:num(Month),D:num(Day),H:num(Hour),m:num(Min),s:num(Sec),W:Week,N:Noon,C:Count};
			};
			return this.each(function(){
				var $c = $(this), html;
				function setClock(){
					html = setting.format.replace("%Y%",getNow().Y).replace("%M%",getNow().M).replace("%D%",getNow().D).replace("%H%",getNow().H).replace("%m%",getNow().m).replace("%s%",getNow().s).replace("%W%",getNow().W).replace("%N%",getNow().N).replace("%CD%",getNow().C);
					$c.html(html);
					setTimeout(function(){
						setClock();
					},500);
				}
				setClock();
			});
		};
		
		// Links友情链接
		$.fn.sudyLinks = function(option){
			var defaults = {
					handle:".links-name",
					wrap:".links-wrap",
					trigger:"mouseenter",
					effect:"show",
					speed:300,
					hidePause:0,
					type:"elink", 	// 连接类型，elink友情链接（列表与标题等宽），auto自定义链接（列表宽度自定义）
					width:'block',  // inline自动,block父级元素宽度,或指定值,
					position: true   // 是否由脚本自动定位弹出菜单
				},
			setting = $.extend(true,{},defaults,option);
			return this.each(function(){
				var $c = $(this), $h = $(this).find(setting.handle), $w = $(this).find(setting.wrap), posY = $h.outerHeight(), pos = "", timer, wrapHeight = $w.outerHeight(), posY = $w.css("bottom") ;
				if('block'==setting.width){
					$c.css("display","block");
					$h.css("display","block");
				}
				if(/\d+/.test(setting.width)){
					$c.css("width",setting.width);
					$h.css("display","block");
				}
				if(setting.type=="elink"){
					$w.css("width",$c.width()-2);
				}
				$c.on(setting.trigger,function(){
					var offTop = $c.offset().top, scrolltop = $(window).scrollTop();
					var delta = offTop-scrolltop;
					if(delta < wrapHeight)
						$w.css({bottom:"auto", top:posY});
					else
						$w.css({top:"auto", bottom:posY});

					clearTimeout(timer);
					if(setting.position)
						$c.css("position","relative");
					$h.addClass("wrap-open");
					if(setting.effect=="slide"){
						$w.stop(true,true).hide().slideDown(setting.speed);
					}else if(setting.effect=="fade"){
						$w.stop(true,true).hide().fadeIn(setting.speed);
					}else{
						$w.show();
					}
				});
				$c.mouseleave(function(){
					timer = setTimeout(function(){
						if(setting.position)
							$c.css("position","static");
						$h.removeClass("wrap-open");
						if(setting.effect=="slide"){
							$w.stop(true,true).slideUp(setting.speed);
						}else if(setting.effect=="fade"){
							$w.stop(true,true).fadeOut(setting.speed);
						}else{
							$w.hide();
						}
					},setting.hidePause);
				});
			});
		};
		
		// sudyScroll 滚动
		$.fn.sudyScroll = function(option){
			var defaults = {
					width: 200,
					height: 100,
					display: 2,
					step: 2,
					dir:"y",
					auto:true,
					speed:500,
					hoverPause:5000,
					navigation:true,
					navTrigger:"click",
					pagination:true,
					pagTrigger:"mouseenter"
				},
			setting = $.extend(true,{},defaults,option);
			return this.each(function(){
				$(this).wrap('<div class="sudy-scroll-wrap">');
				var $c = $(this), $s = $(this).children(), len = $s.length, $w = $(this).parent(), id = "scroll-"+Number(new Date()), size = Math.ceil(len/setting.step), index = 0, left = 0, top = 0;
				setting.step = setting.step > setting.display ? setting.display : setting.step;
				$w.wrap('<div class="sudy-scroll" id="'+id+'">');
				var $scroll = $(this).parent().parent();
				if(setting.dir=="x"){
					$scroll.css({width:setting.width*setting.display+'px',height:setting.height+'px'});
					$w.css({width:setting.width*setting.display+'px',height:setting.height+'px'});
					$c.css({width:setting.width*len+'px',height:setting.height+'px',position:"absolute",left:"0px",top:"0px"});
					$s.css({width:setting.width+'px',height:setting.height+'px',float:"left",display:"inline-block"});
				}else{
					$scroll.css({width:setting.width+'px',height:setting.height*setting.display+'px'});
					$w.css({width:setting.width+'px',height:setting.height*setting.display+'px'});
					$c.css({width:setting.width+'px',position:"absolute",left:"0px",top:"0px"});
					$s.css({width:setting.width+'px',height:setting.height+'px'});
				}
				if(setting.navigation){
					$scroll.append('<div class="sudy-scroll-nav"><a href="javascript:;" class="nav-prev">&lt;</a><a href="javascript:;" class="nav-next">&gt;</a></div>');
				}
				if(setting.pagination){
					var pageStr = '<div class="sudy-scroll-page">';
					$.each(new Array(size),function(i,e){
						pageStr = pageStr + '<a class="page-index page-'+i+'" href="javascript:;"><span>'+i+'</span></a>';
					});
					$scroll.append(pageStr);
				}
				function setActive(){
					$(".page-index",$scroll).eq(index).addClass("active").siblings().removeClass("active");
				}
				function showIndex(){
					if(setting.dir=="x"){
						left = -index*setting.step*setting.width;
						$c.stop().animate({left:left+'px'},setting.speed);
					}else{
						top = -index*setting.step*setting.height;
						$c.stop().animate({top:top+'px'},setting.speed);
					}
					setActive();
				}
				showIndex(index);
				function showNext(){
					index++;
					if(index>size-1){
						index = 0;
					}
					showIndex(index);
				}
				function showPrev(){
					index--;
					if(index<0){
						index = size-1;
					}
					showIndex(index);
				}
				if(setting.auto){
					var timer;
					$scroll.hover(function(){
						clearTimeout(timer);
					},function(){
						timer = setTimeout(function(){
							showNext();
							$scroll.trigger("mouseleave")
						},setting.hoverPause);
					}).trigger("mouseleave");
				}
				$(".nav-next", $scroll).on(setting.navTrigger,function(){
					showNext();
				});
				$(".nav-prev", $scroll).on(setting.navTrigger,function(){
					showPrev();
				});
				$(".page-index",$scroll).on(setting.pagTrigger,function(){
					index = $(this).index();
					showIndex(index);
				});
			});
		};
	})(jQuery);

}