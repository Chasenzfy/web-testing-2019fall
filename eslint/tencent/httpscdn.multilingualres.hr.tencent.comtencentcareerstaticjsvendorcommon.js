function IsPC() {
	var userAgentInfo = navigator.userAgent;
	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}

$(function () {
	resize();
	/*完整简历模块数量*/
	function resModuleNum(ele, target) {
		if ($(ele).length != "" && $(ele).length != 1) {
			$(target).text($(ele).length)
		} else {
			$(target).hide();
		}
	}
	resModuleNum(".education-module", ".education-number")
	resModuleNum(".work-experience-module", ".work-experience-number")
})

$(window).resize(function () {
	resize();
})

function resize() {
  //移动端切换，暂时注释掉
	// if (document.body.clientWidth < 1024) {
	// 	$(".header,.content,.footer,.children-menu").addClass('mobile');
	// 	$(".menu-list").removeClass(".active");
	// } else {
	// 	$(".menu").show();
	// }
}

/*
1.welfare、tencentstory、jobdesc不需要
2.jobopportunity、jobcategory、citymain、cityinfo、campusrecruit已处理*/
// $(".nav-ul .nav-list").click(function () {
// 	$(".nav-ul .nav-list").removeClass('active');
// 	$(".more-list").removeClass('active');
// 	$(".down-list").children(".down-li").removeClass("active");
// 	$(".nav-item .first-list-arrow.active-up").hide().prev().show();
// 	$(this).addClass("active");
// 	var index = $(this).index()
//  $(".nav-ul-none .nav-list").removeClass("active");
//	$(".nav-ul-none .nav-list").eq(index).addClass("active")
// 	$(".nav-content .nav-content-list").hide();
// 	$(".nav-content .nav-content-list").eq(index).show();
// })

/*cookies策略控制*/
$(function () {
	//写
	function createCookie(name, value, days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			var expires = "; expires=" + date.toGMTString();
		} else expires = "";
		document.cookie = name + "=" + value + expires + "; path=/";
	}
	//读
	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return false;
	}
	var cookieValue = readCookie("loading");
	if (cookieValue == false) {
		$(".cookie-box").show();
	} else {
		$(".cookie-box").hide();
	}
	$(".cookie-btn").click(function () {
		$(".cookie-box").hide();
		createCookie("loading", "agree", 30);
	})
})

// function hoverAnimation(target, hov, nor) {
// 	$(target).hover(function () {
// 		$(this).removeClass(nor).addClass(hov)
// 	})

// 	$(target).mouseleave(function () {
// 		$(this).removeClass(hov).addClass(nor)
// 	})
// }

// // hoverAnimation(".header .menu .menu-list", "hover", "normal");
// hoverAnimation(".header .login .login-btn", "hover", "normal");
// // hoverAnimation(".login .user-info", "hover", "normal");

// /* target目标元素 children目标元素的自己 nor动画normal态  hov动画hover态 */
function menuSelect(target,children,nor,hov) {
	$(target).mouseenter(function () {
		$(this).children(children).removeClass(nor).addClass(hov).show();
	})
	$(target).mouseleave(function () {
		$(this).children(children).addClass(nor).removeClass(hov).slideUp(100);
	})
}
// menuSelect(".menu-list", ".children-menu", "normal", "hover")
// menuSelect(".user-info", ".children-menu", "normal", "hover")
//2019.04.24 add
menuSelect(".user-info", ".user-arrow", "normal", "hover")


// $(".nav-ul .nav-list").click(function () {
// 	var currentIndex = $(this).index();
// 	var adaptionWid = $(".nav-ul-none .nav-list").eq(currentIndex).width()
// 	var adaptionLeft = $(".nav-ul-none .nav-list").eq(currentIndex).offset().left

// 	var parLe = $(".nav-scroll.nav-title").offset().left;
// 	var left = adaptionLeft - parLe
// 	$(".move-border").css({
// 		width: adaptionWid,
// 		"transform": "translate(" + left + "px,0)"
// 		// left: adaptionLeft,
// 	})
// })

// function borderMove(target, targePar, ele) {
// 	var adaptionWid = $(target).width();
// 	var adaptionLeft = $(target).offset().left;
// 	var parLe = $(targePar).offset().left;
// 	var left = adaptionLeft - parLe
// 	$(ele).css({
// 		width: adaptionWid,
// 		"transform": "translate(" + left + "px,0)",
// 	})
// }
function borderMove(TabItemWid, TabItemWidScale, tar, parset, border, moreBtn) {
	// 储存当前tab宽度	
	TabItemWid = [];
	// 储存当前tab放大后宽度
	TabItemWidScale = []
	var adaptionWid
	var Len = $(".nav-list").length;
	for (var i = 0; i < Len; i++) {
		TabItemWid.push(parseFloat($(".nav-list").eq(i).width()))
		TabItemWidScale.push(parseInt($(".nav-list").eq(i).width() * 1.375))
	}

	$(tar).eq(0).css({
		"padding-left": parseFloat(TabItemWidScale[0] - TabItemWid[0]) / 2,
		"padding-right": parseFloat(TabItemWidScale[0] - TabItemWid[0]) / 2,
		"transition": "0.2s transform linear,0.2s padding linear"
	})

	setTimeout(function () {
		adaptionWid = TabItemWidScale[0]
		$(border).css({
			width: adaptionWid,
			"transform": "translate(0,0)"
		})
	}, 201)

	$(tar).click(function () {
		if (moreBtn) {
			var moreBtnPadRig = parseInt($(moreBtn).css("padding-right"))
			$(moreBtn).css({
				"padding-left": 0,
				"padding-right": moreBtnPadRig,
			})
		}
		var _index = $(this).index();
		// 还原tab放大后的padding值
		$(tar).css({
			"padding-left": "0",
			"padding-right": "0",
			"transition": "0.2s all linear"
		})
		// tab放大后重排
		$(this).css({
			"padding-left": parseInt((TabItemWidScale[_index] - TabItemWid[_index]) / 2),
			"padding-right": parseInt((TabItemWidScale[_index] - TabItemWid[_index]) / 2),
		})
		setTimeout(function () {
			adaptionWid = TabItemWidScale[_index];
			var adaptionLeft = $(tar).eq(_index).find(".nav-item").offset().left;
			var parLe = $(parset).offset().left;
			var left = Math.ceil(adaptionLeft - parLe)
			$(border).css({
				width: adaptionWid,
				"transform": "translate(" + left + "px,0)"
			})
		}, 201)
	})
}

// 除头部之外的还原为jquery实现
$(function () {
  var p = 0;
	var t = 10;
	// var affixBtn = $(".container.no-search .resume-operation");
  var affixBtn = $(".resume-operation");
  $(window).scroll(function (e) {
    p = $(this).scrollTop();
    if (t < p && p > 50) { // 鼠标下滚
      // $(".header").addClass("fixed").removeClass("blue adaption-color");
      // $(".index-header").addClass("fixed").removeClass("blue adaption-color");
      affixBtn.addClass("affix-down").removeClass("affix-up");
    } else if (t > p) { // 鼠标上滚
      // $(".header").removeClass("fixed");
      affixBtn.addClass("affix-up").removeClass("affix-down");
    }
    t = p;
    // if (p == 0) {
    //   $(".index-header").addClass("blue adaption-color")
    // }
  })
})

var userAgent = navigator.userAgent;
// var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1;
// if (isSafari) {
// 	$(".index-header").addClass("safari")
// }

if (userAgent.indexOf("MSIE") >= 0) {
	$('.recruit-list .recruit-text').ellipsis({
		row: 2
	});
}

//解决IE9 placeholder问题
// $(function() {
//     var hasplaceArr = $("input[placeholder]");
//     hasplaceArr.each(function() {
//         var current = $(this), currentPlace = current.attr("placeholder"), currentType = (current.attr("type") || '').toLowerCase();
//         if (currentPlace != "") {
//             current.val(currentPlace);
//             placeholderFill(current, currentPlace, currentType);
//             if (currentType == 'password') {
//                 current.attr("type", "text");
//             }
//         }
//     });
// });
// function placeholderFill(inputObj, inputValue, inputType) {
//     inputObj.focus(function() {
//         if ($.trim(inputObj.val()) == inputValue) {
//             inputObj.val('');
//             if (inputType == 'password') {
//                 inputObj.attr("type", "password");
//             }
//         }
//     });
//     inputObj.blur(function() {
//         if ($.trim(inputObj.val()) == '') {
//             inputObj.val(inputValue);
//             if (inputType == 'password') {
//                 inputObj.attr("type", "text");
//             }
//         }
//     });
// }
