
(function (argument) {
	// body...
	$(document).ready(function() {
		/*var time = 1;
		setInterval(function() {
			$(".full-bg").animate({
				opacity: "0.6"
			}, {
				duration: 3000,
				complete: function() {
				   $(this).hide();
				},
				step: function() {
				   $(".full-bg-" + time).show().animate({
				   		opacity: "1"
				   },0);
				}
			});
			time++;
			if (time == 3) {
				time = 1;
			}
		}, 3000);*/
		$(".sidebar-menu .has-sub").click(function (argument) {
			// body...
			$(this).contents("ul").slideToggle();
		});
		$(".sidebar-menu .has-sub-sub").click(function (e) {
			// body...
			$(this).contents("ul").slideToggle("slideUp");
			e.stopPropagation();
		});
		$(".skins").find("a").click(function (argument) {
			// body...
			var skin = $(this).text();
			$(".switch-skin").attr("href", "css/theme/" +skin+ ".css");
		});
	})
})();