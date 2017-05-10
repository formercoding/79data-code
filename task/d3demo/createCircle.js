/**
 * [Circle description]
 * @author 沐晓
 * @date     2017-01-02
 * @datetime 2017-01-02T14:32:36+0800
 * @param    {[element]}       wrap     [容器元素：div]
 * @param    {[array]}         data     [绑定数据]
 */
function Circle(wrap, data) {
	this.wrap = wrap;
	this.data = data;
	this.init(); 
}
Circle.prototype = {
	constructor: Circle,
	init: function() {
		console.log(this.wrap);
		// 获取容器宽高，并设定svg宽高
		var width = d3.select(this.wrap).style("width").slice(0, -2);
		var height = d3.select(this.wrap).style("height").slice(0, -2);
		this.svg = d3.select(this.wrap).append("svg");
		this.svg.attr("width", width).attr("height", height);
		// 设定初始平移
		this.translateX = this.svg.attr("width") / 2;
		this.translateY = this.svg.attr("height") / 2;
		// 将x,y赋给svg下的g元素用以监测平移，缩放值
		this.svg.attr('x', this.translateX);
		this.svg.attr('y', this.translateY);
		this.svg.attr('k', 1);
		// 计算初始半径,数据圈数	
		this.r = this.translateX > this.translateY ? this.translateX : this.translateY;
		this.len = this.data.length;
		this.calculate();
		this.render();
	},
	// svg拖拽事件
	started: function() {
		// 起始平移x,y
		var startX = d3.event.x;
		var startY = d3.event.y;
		// 获取起始平移ATTR
		var attrX = parseInt(d3.select(this).attr('x'));
		var attrY = parseInt(d3.select(this).attr('y'));
		var calcX = d3.select(this).attr('x');
		var calcY = d3.select(this).attr('y');
	  d3.event.on("drag", dragged).on("end", ended);

	  function dragged(d) {
	  	// 变化平移值
	  	var alterX = d3.event.x - startX;
	  	var alterY = d3.event.y - startY;
	  	// 计划后平移值
	    calcX = attrX + alterX;
	    calcY = attrY + alterY;
	    d3.select(this).select('g')
				.attr("transform", "translate(" + calcX + "," + calcY + ") scale(" + d3.select(this).attr('k') + ")")
	  }
	  function ended() {
	  	// 设置最终值
	  	d3.select(this).attr('x', calcX);
	  	d3.select(this).attr('y', calcY);
	  }
	},
	// svg缩放事件
	zoom: function() {
		console.log(d3.event.type);
			var attrX = d3.select(this).attr('x');
			var attrY = d3.select(this).attr('y');
			d3.select(this).select('g')
				.attr("transform", "translate(" + attrX + "," + attrY + ") scale(" + d3.event.transform.k + ")");
			d3.select(this).attr('k', d3.event.transform.k);
	},
	// 初始计算
	calculate: function() {
		// 间距 环径比
		this.ratio = 0.5;
		// 计算间距 20%
		this.gap = this.ratio * this.r / this.len;
		// 环径 80%
		this.circleR = (1 - this.ratio) * this.r / this.len;
	},
	// 渲染，图像绘制
	render: function() {
		var self = this;
		this.svg
				.call(d3.drag().on('start', self.started))
				.call(d3.zoom().on('zoom', self.zoom))
				.on("dblclick.zoom", null)
				.append("g")
				.attr("transform", "translate(" + this.translateX + "," + this.translateY + ")")
				.selectAll('g')
				.data(this.data)
					.enter()
					.append("g")
					.each(function(d, i) { // 绘制环形
						d3.select(this).append('path')
							.attr("fill", '#25a1e1')
							.attr("id", function() {
								return d.id;
							})
							.attr("d", function() {
								// 环径计算
								var arc = d3.arc()
							    .innerRadius((self.gap + self.circleR) * (i + 1) - self.circleR)
							    .outerRadius((self.gap + self.circleR) * (i + 1))
							    .startAngle(0)
							    .endAngle(Math.PI * 2 * d.complete);		  
							  	return arc();
							})
							.on('click', function() {
								console.log(d.year);
							})
					})
					.each(function (d, i) {
							d3.select(this).selectAll("circle")
								.data(d.eventList)
								.enter()
								.append("circle")
								.attr('cx', function(dd, ii) {
									return ((self.gap + self.circleR) * (i + 1) - self.circleR / 2) * Math.cos(2 * Math.PI * (dd.occur - 0.25));
								})
								.attr('cy', function(dd, ii) {
									return ((self.gap + self.circleR) * (i + 1) - self.circleR / 2) * Math.sin(2 * Math.PI * (dd.occur - 0.25));
								})
								.attr("r", self.circleR / 3)
								.attr("fill", 'red')
								.attr("stroke", "#fff")
								.attr("id", function(dd, ii) {
									return dd.id;
								})
								.on('click', function(dd) {
									console.log(dd.id);
								})
								.on('mouseover', function(dd) {
									console.log('eent');
								})
					})
	}
}

var myData = 
 	[ { 
 			year: 2013, // 年轮的年份
 			complete: 1, // 年份的完成度，如0.5代表当年过了365*0.5天
 			eventList: [ // 事件列表
 				{
 					title: '事件描述悬浮', // 事件标题
 					occur: 0.1, // 事件发生事件 如0.5表示事件发生时间为当年的365*0.5
 					id: 1 // 事件的id,用于后续AJAX传参数
 				},
 				{
 					title: '事件描述悬浮',
 					occur: 0.2,
 					id: 2
 				},
 				{
 					title: '事件描述悬浮', // 事件标题
 					occur: 0.3, // 事件发生事件 如0.5表示事件发生时间为当年的365*0.5
 					id: 3 // 事件的id,用于后续AJAX传参数
 				},
 				{
 					title: '事件描述悬浮',
 					occur: 0.4,
 					id: 4
 				},
 				{
 					title: '事件描述悬浮', // 事件标题
 					occur: 0.5, // 事件发生事件 如0.5表示事件发生时间为当年的365*0.5
 					id: 5 // 事件的id,用于后续AJAX传参数
 				},
 				{
 					title: '事件描述悬浮',
 					occur: 0.6,
 					id: 6
 				},
 				{
 					title: '事件描述悬浮', // 事件标题
 					occur: 0.7, // 事件发生事件 如0.5表示事件发生时间为当年的365*0.5
 					id: 7 // 事件的id,用于后续AJAX传参数
 				},
 				{
 					title: '事件描述悬浮',
 					occur: 0.8,
 					id: 8
 				},
 				{
 					title: '事件描述悬浮', // 事件标题
 					occur: 0.9, // 事件发生事件 如0.5表示事件发生时间为当年的365*0.5
 					id: 9 // 事件的id,用于后续AJAX传参数
 				},
 				{
 					title: '事件描述悬浮',
 					occur: 1,
 					id: 10
 				}
 			]
 		},
 		{ 
 			year: 2014, // 年轮的年份
 			complete: 1, // 年份的完成度，如0.5代表当年过了365*0.5天
 			eventList: [ // 事件列表
 				{
 					title: '事件描述悬浮', // 事件标题
 					occur: 0.2, // 事件发生事件 如0.5表示事件发生时间为当年的365*0.5
 					id: 1
 				},
 				{
 					title: '事件描述悬浮',
 					occur: 1,
 					id: 2
 				}
 			]
 		},
 		{ 
 			year: 2015, // 年轮的年份
 			complete: 1, // 年份的完成度，如0.5代表当年过了365*0.5天
 			eventList: [ // 事件列表
 				{
 					title: '事件描述悬浮', // 事件标题
 					occur: 0.7, // 事件发生事件 如0.5表示事件发生时间为当年的365*0.5
 					id: 1
 				},
 				{
 					title: '事件描述悬浮',
 					occur: 1,
 					id: 2
 				}
 			]
 		},
 		{ 
 			year: 2016, // 年轮的年份
 			complete: 1, // 年份的完成度，如0.5代表当年过了365*0.5天
 			eventList: [ // 事件列表
 				{
 					title: '事件描述悬浮', // 事件标题
 					occur: 0.5, // 事件发生事件 如0.5表示事件发生时间为当年的365*0.5
 					id: 1
 				},
 				{
 					title: '事件描述悬浮',
 					occur: 0.1,
 					id: 2
 				}
 			]
 		},
 		{ 
 			year: 2017, // 年轮的年份
 			complete: 1, // 年份的完成度，如0.5代表当年过了365*0.5天
 			eventList: [ // 事件列表
 				{
 					title: '事件描述悬浮', // 事件标题
 					occur: 0.3, // 事件发生事件 如0.5表示事件发生时间为当年的365*0.5
 					id: 1
 				},
 				{
 					title: '事件描述悬浮',
 					occur: 0.5,
 					id: 2
 				}
 			]
 		},
 		{ 
 			year: 2018, // 年轮的年份
 			complete: 0.8, // 年份的完成度，如0.5代表当年过了365*0.5天
 			eventList: [ // 事件列表
 				
 				{
 					title: '事件描述悬浮',
 					occur: 0,
 					id: 2
 				}
 			]
 		}
 	]
 	var wrap = d3.selectAll(".year-demo")["_groups"][0][0];
 	var monthDiv = d3.selectAll(".month-event")["_groups"][0][0];
 	var circle = new Circle(wrap, myData, monthDiv);
 	//wrap, data, monthDiv, eventDiv
