
/**
 * [Circle description]
 * @author 沐晓
 * @date     2017-01-02
 * @datetime 2017-01-02T14:32:36+0800
 * @param    {[element]}       wrap     [容器元素：div]
 * @param    {[array]}         data     [绑定数据]
 * @param    {[element]}       monthDiv [月份事件悬浮元素]
 * @param    {[element]}       eventDiv [事件描述悬浮]
 * @param    {[number]}        gap      [环形内外径之差px]
 * @param    {[number]}        stageNum [阶段数,默认为12月份]
 * @param    {[number]}        circleR  [圆圈的大小px]
 * @param    {[number]}        ratio    [g元素大小占svg大小]
 */
function Circle(wrap, data, monthDiv, eventDiv, gap, stageNum, circleR, ratio) {
	this.wrap = wrap;
	this.data = data;
	this.monthDiv = monthDiv;
	this.eventDiv = eventDiv;
	//this.gap = gap;
	//this.stageNum = stageNum;
	//this.circleR = circleR;
	//this.ratio = ratio;
	this.delta = 1;
	this.init();
}
Circle.prototype = {
	constructor: Circle,
	init: function() {
		console.log(this.wrap);
		var width = d3.select(this.wrap).style("width").slice(0, -2);
		var height = d3.select(this.wrap).style("height").slice(0, -2);
		this.svg = d3.select(this.wrap).append("svg");
		this.svg.attr("width", width).attr("height", height);
		this.translateX = this.svg.attr("width") / 2;
		this.translateY = this.svg.attr("height") / 2;		
		this.r = this.translateX > this.translateY ? this.translateX : this.translateY;
		this.len = this.data.length;
		this.event = [];
		this.isDrag = false;
		this.bindDrag();
		this.calculate();
		this.render();
		this.bindScale();
	},
	calculate: function() {
		this.gap = this.r / (this.len * 1.2);
	},
	bindDrag: function() {
		var self = this;
		console.log(this.delta);
		this.drag = d3.drag().on("drag", function() {
			var ele = this;
			console.log(ele);
			self.move(ele);
			self.isDrag = true;
			console.log(self.isDrag, "dragend");
		});
	},
	bindScale: function() {
		var self = this;
		document.body.addEventListener("mousewheel", function(event){
			if (event.target != self.svg["_groups"][0][0] && event.target.parentNode.parentNode != self.svg["_groups"][0][0]) {
				return false;
			}
			if (event.wheelDelta > 0) {
				self.delta = self.delta + 0.1;
			} else {
				self.delta = self.delta - 0.1;
			};
		  	self.svg.select("g").attr("transform", "translate(" + self.translateX + "," + self.translateY + ")scale(" + self.delta + ")");
		  	event.preventDefault();
		},false);
		document.body.addEventListener("DOMMouseScroll", function(event) {
		    if (event.target != self.svg["_groups"][0][0] && event.target.parentNode.parentNode != self.svg["_groups"][0][0]) {
				return false;
			}
			if (event.detail < 0) {
				self.delta = self.delta + 0.1;
			} else {
				self.delta = self.delta - 0.1;
			}
		  	self.svg.select("g").attr("transform", "translate(" + self.translateX + "," + self.translateY + ")scale(" + self.delta + ")");
		  	event.preventDefault();
		});
	},
	render: function() {
		var self = this;
		this.svg.append("g")
				.attr("transform", "translate(" + this.translateX + "," + this.translateY + ")")
				.call(this.drag)
				.selectAll("i")
				.data(this.data)
					.enter()
					.append("text")
					.each(function(d, i) {
						var time = d.time;
						self.svg.select("g").selectAll("path.arc")
						.data(d.month)
							.enter()
							.append("path")
							.attr("fill", function(dd, ii) {
								return dd.color;
							})
							.attr("stroke", function(dd, ii) {
								return "none";
							})
							.attr("id", function(dd) {
								return dd.id;
							})
							.attr("time", function(dd) {
								return dd.time;
							})
							.attr("switcher", "off")
							.attr("d", function(dd, ii) {
								var complete = dd.complete;
								var outer = self.gap * 1.2 * (i + 1);
								var inner = outer - self.gap;
								var arc = d3.arc().outerRadius(inner).innerRadius(outer);
								var angle = 2 * Math.PI / 12;
								return arc({startAngle: angle * ii, endAngle: angle * ii + angle*dd.complete}, ii)
							})
							.on("mouseover", function(dd) {
								var x = d3.event.pageX;
								var y = d3.event.pageY;
								var array = d.eventList;
								var str = "<p>" + d.title + "</p>";
								for (var i = 0; i < array.length; i++) {
									var obj = d.eventList[i];
									var time = obj.time;
									var title = obj.title;
									str = str + "<label>" + title + "</label>"  + "<p>" + time + "</p>";
									d3.select(self.monthDiv).style("top", y + 20 + "px") 
									  .style("left", x + 10 + "px")
									  .style("display", "block")
									  .html(str);
								}
							})
							.on("mouseout", function() {
								var x = d3.event.pageX;
								var y = d3.event.pageY;
								d3.select(self.monthDiv).style("display", "none");
							})
							.on("mousedown", function() {
								self.isDrag = false;
								console.log(self.isDrag, "mousedownend");
							})
							.on("click", function() {
								console.log( self.isDrag, "clickbegin");
								if (self.isDrag) {
									self.isDrag = false;
									return false;
								}
								self.isDrag = false;
								var switcher = d3.select(this).attr("switcher");
								var data = d3.select(this).attr("data-time");
								console.log(d.time);
								if (switcher == "off") {
									d3.selectAll("path").style("display", "none");
									d3.selectAll("circle").style("display", "none");
									d3.selectAll("path").each(function() {
										if (d3.select(this).attr("time").slice(0, 4) == d.time) {
											d3.select(this).style("display", "block");
										}
									});
									d3.selectAll("circle").each(function() {
										if (d3.select(this).attr("time").slice(0, 4) == d.time) {
											d3.select(this).style("display", "block");
										}
									});
									d3.select(this).attr("switcher", "on");
								} else {
									d3.selectAll("path").style("display", "block");
									d3.selectAll("circle").style("display", "block");
									d3.select(this).attr("switcher", "off");
								}
								console.log(self.isDrag, "clickend");
							})
					})
					.each(function (d, i) {
						var event = d.event;
						var outer = (self.r / self.len) * (i + 1);
						var time = d.time;
						for (var j = 0; j < event.length; j++) {
							var complete = event[j].occur;
							var id = event[j].id;
							var color = event[j].color;
							var evetime = event[j].time;
							self.event[id] = event[j].detail;
						self.svg.select("g")
							.append("circle")
							.attr("cx", 0 + (outer - self.gap / 2) * Math.cos(2 * Math.PI * complete))
							.attr("cy", 0 + (outer - self.gap / 2) * Math.sin(2 * Math.PI * complete))
							.attr("r", self.gap / 3)
							.attr("fill", color)
							.attr("stroke", "#fff")
							.attr("id", id)
							.attr("data-time", time)
							.attr("time", evetime)
							.on("mouseover", function() {
								var x = d3.event.pageX;
								var y = d3.event.pageY;
								d3.select(this)
									.transition()
									.duration(300)
									.attr("r", self.gap)
									.style("opacity", 0.5)
									.transition()
									.duration(300)
									.attr("r", self.gap / 3)
									.style("opacity", 1)
									.transition()
									.duration(300)
									.attr("r", self.gap)
									.style("opacity", 0.5)
									.transition()
									.duration(300)
									.attr("r", self.gap / 3)
									.style("opacity", 1)
							})
							.on("click", function(dd) {
								var x = d3.event.pageX;
								var y = d3.event.pageY;
								var id = d3.select(this).attr("id");
								var str = self.event[id];
								console.log(str);
									d3.select(self.monthDiv).style("top", y + 20 + "px") 
									  .style("left", x + 10 + "px")
									  .style("display", "block")
									  .html(str);
							})
						}
					})

	},
	move: function(ele) {
		var self = this;
		var x = d3.event.x,
		 	y = d3.event.y;
		console.log(x, y, d3.event.dx, d3.event.dy);
		self.translateX = self.translateX + d3.event.dx;
		self.translateY = self.translateY + d3.event.dy;
		d3.select(ele).attr("transform", function(d) {
			return "translate(" + self.translateX + "," + self.translateY + ")scale(" + self.delta + ")";
		});
		console.log("na li move");
	}
}

var myData = 
 	[ { // 数组 -> 对象
 			init: 2021,
 			title: "this year",
 			time: 2013, // 年份
 			eventList: [{
	 				time: "2013-1-2",
	 				title: "event1",
	 				detail: "event detail1"
	 			},{
	 				time: "2013-2-2",
	 				title: "event2",
	 				detail: "event-detail2"

	 			}, {
	 				time: "2013-1-2",
	 				title: "event1",
	 				detail: "event detail1"
	 			},{
	 				time: "2013-2-2",
	 				title: "event2",
	 				detail: "event-detail2"

	 			}, {
	 				time: "2013-1-2",
	 				title: "event1",
	 				detail: "event detail1"
	 			},{
	 				time: "2013-2-2",
	 				title: "event2",
	 				detail: "event-detail2"

	 			}
 			],
 			month: [{ // 月份, 数组 -> 对象
	 				color: "#25a1e1", // 该月颜色
	 				complete: "1", // 该月已过比例
	 				id: 2, 			// 该月id，月份唯一id
	 				time: "2013-1" // 该月时间
	 			}, {
	 				color: "#25a1e1",
	 				complete: "1",
	 				id: 5,
	 				time: "2013-2",
	 			}, { // 月份, 数组 -> 对象
	 				color: "#25a1e1", // 该月颜色
	 				complete: "1", // 该月已过比例
	 				id: 2, 			// 该月id，月份唯一id
	 				time: "2013-1" // 该月时间
	 			}, {
	 				color: "#25a1e1",
	 				complete: "1",
	 				id: 5,
	 				time: "2013-2",
	 			}, { // 月份, 数组 -> 对象
	 				color: "#25a1e1", // 该月颜色
	 				complete: "1", // 该月已过比例
	 				id: 2, 			// 该月id，月份唯一id
	 				time: "2013-1" // 该月时间
	 			}, {
	 				color: "#25a1e1",
	 				complete: "1",
	 				id: 5,
	 				time: "2013-2",
	 			}, { // 月份, 数组 -> 对象
	 				color: "#25a1e1", // 该月颜色
	 				complete: "1", // 该月已过比例
	 				id: 2, 			// 该月id，月份唯一id
	 				time: "2013-1" // 该月时间
	 			}, {
	 				color: "#25a1e1",
	 				complete: "1",
	 				id: 5,
	 				time: "2013-2",
	 			}, { // 月份, 数组 -> 对象
	 				color: "#25a1e1", // 该月颜色
	 				complete: "1", // 该月已过比例
	 				id: 2, 			// 该月id，月份唯一id
	 				time: "2013-1" // 该月时间
	 			}, {
	 				color: "#25a1e1",
	 				complete: "1",
	 				id: 5,
	 				time: "2013-2",
	 			}, { // 月份, 数组 -> 对象
	 				color: "#25a1e1", // 该月颜色
	 				complete: "1", // 该月已过比例
	 				id: 2, 			// 该月id，月份唯一id
	 				time: "2013-1" // 该月时间
	 			}, {
	 				color: "#25a1e1",
	 				complete: "1",
	 				id: 5,
	 				time: "2013-2",
	 			}
 			],
 			event: [ // 发生事件, 数组 -> 对象
	 			{
	 				occur: 0.8, // 事件开始时间在一年中所占比例
	 				id: 5, // 事件的事件id，事件唯一id
	 				color: "#EAA2E1", // 事件颜色
	 				time: "2013-2-3", // 事件时间
	 				detail: "event detail 1"
	 			}, {
	 				id: 10,
	 				occur: 0.5,
	 				color: "#25a1e1",
	 				time: "2013-2-3",
	 				detail: "event detail 2"
	 			}, {
	 				occur: 0.8, // 事件开始时间在一年中所占比例
	 				id: 5, // 事件的事件id，事件唯一id
	 				color: "#EAA2E1", // 事件颜色
	 				time: "2013-2-3", // 事件时间
	 				detail: "event detail 1"
	 			}, {
	 				id: 10,
	 				occur: 0.5,
	 				color: "#25a1e1",
	 				time: "2013-2-3",
	 				detail: "event detail 2"
	 			}, {
	 				occur: 0.8, // 事件开始时间在一年中所占比例
	 				id: 5, // 事件的事件id，事件唯一id
	 				color: "#EAA2E1", // 事件颜色
	 				time: "2013-2-3", // 事件时间
	 				detail: "event detail 1"
	 			}, {
	 				id: 10,
	 				occur: 0.5,
	 				color: "#25a1e1",
	 				time: "2013-2-3",
	 				detail: "event detail 2"
	 			}, {
	 				occur: 0.8, // 事件开始时间在一年中所占比例
	 				id: 5, // 事件的事件id，事件唯一id
	 				color: "#EAA2E1", // 事件颜色
	 				time: "2013-2-3", // 事件时间
	 				detail: "event detail 1"
	 			}, {
	 				id: 10,
	 				occur: 0.5,
	 				color: "#25a1e1",
	 				time: "2013-2-3",
	 				detail: "event detail 2"
	 			}
 			]
 		}, { // 数组 -> 对象
 			title: "this year",
 			time: 2014, // 年份
 			eventList: [{
	 				time: "2014-1",
	 				title: "event1",
	 				detail: "event detail1"
	 			},{
	 				time: "2014-2",
	 				title: "event2",
	 				detail: "event-detail2"

	 			}
 			],
 			month: [{ // 月份, 数组 -> 对象
	 				color: "#25a1e1", // 该月颜色
	 				complete: "1", // 该月已过比例
	 				id: 2, 			// 该月id，月份唯一id
	 				time: "2014-1" // 该月时间
	 			}, {
	 				color: "#25a1e1",
	 				complete: "1",
	 				id: 5,
	 				time: "2014-2",
	 			}
 			],
 			event: [ // 发生事件, 数组 -> 对象
	 			{
	 				occur: 0.8, // 事件开始时间在一年中所占比例
	 				id: 5, // 事件的事件id，事件唯一id
	 				color: "#EAA2E1", // 事件颜色
	 				time: "2014-2-3", // 事件时间
	 				detail: "event detail 1"
	 			}, {
	 				id: 10,
	 				occur: 0.5,
	 				color: "#25a1e1",
	 				time: "2014-2-3",
	 				detail: "event detail 2"
	 			}
 			]
 		}
 	]
 	var wrap = d3.selectAll(".year-demo")["_groups"][0][0];
 	var monthDiv = d3.select(".month-event")["_groups"][0][0];
 	var circle = new Circle(wrap, myData, monthDiv);
 	//wrap, data, monthDiv, eventDiv
