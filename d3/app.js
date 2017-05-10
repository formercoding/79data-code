











// demo bar

var target = d3.select(".target").text("hellow world").attr("prop","luo");
var data1 = [10, 15, 30, 50, 80, 65, 55, 30, 20, 10, 8];
function render1(data) {

	// enter
	d3.select("body").selectAll("div.h-bar")
	.data(data1)
	.enter()
		.append("div")
			.attr("class", "h-bar")
			.append("span");

	// update
	d3.select("body").selectAll("div.h-bar")
	.data(data1)
	.style("width", function (d) {
		return (d*10) + "px";
		// body...
	})
	.select("span")
	.text(function (d) {
		// body...
		return d;
	});

	// exit
	d3.select("body").selectAll("div.h-bar")
	.data(data1)
	.exit()
		//.remove();
	// body...
}
render1(data1);


// demo easing
var data = [ // <-A
			"linear", "cubic", "cubic-in-out", 
			"sin", "sin-out", "exp", "circle", "back", 
			"bounce",
			function(t){ // <-B
				return t * t;
			}
		],
colors = d3.scale.category20();
	d3.select("body")
    .data(data) // <-C
.enter()
.append("div")
    .attr("class", "fixed-cell")
    .style("top", function (d, i) {
        return i * 40 + "px";
    })
    .style("background-color", function (d, i) {
        return colors(i);
    })
    .style("color", "white")
    .style("left", "500px")
    .text(function (d) {
        if(typeof d === 'function') return "custom";
        return d;
    });
console.log("dd")
setInterval(function() {
	d3.selectAll(".fixed-cell").each(function(d){
		var left = 500 * Math.random();
        d3.select(this)
			.transition().ease(d) // <-D
			.duration(2500)
			.style("left", left + "px");
    });
}, 2500);


// my-demo
var svg = d3.select("body .svg-demo").append("svg");
var width = 600;
var height = 600;

svg.attr("height",height).attr("width", width);


svg.append("circle")
	.attr("cx", 300)
	.attr("cy", 300)
	.attr("class", "circle2")
	.attr("r", 100);
svg.append("circle")
	.attr("cx", 300)
	.attr("cy", 300)
	.attr("class", "circle1")
	.attr("r", 50);
svg.append("circle")
	.attr("cx", 300 + 50 * Math.sin(1))
	.attr("cy", 300 + 50 * Math.cos(1))
	.attr("class", "circle3")
	.attr("r", 10);
var bubble = d3.select(".circle3");
console.log(bubble);
bubble.on("click", function() {
	console.log("ddd")
	alert("I am a bubble");
});


// annular

var width = 400;
var height = 400;
var fullAngle = 2 * Math.PI;
var colors = d3.scale.category20c();

var svg2 = d3.select("body").append("svg")
			.attr("class", "pie")
			.attr("height", height)
			.attr("width", width);
	function render2(innerRadius, endAngle){
		if (!endAngle) {
			endAngle = fullAngle;
		}
		var dataAnnular = [
			{startAngle: 0, endAngle: Math.PI},
			{startAngle: 0.1 * endAngle, endAngle: 0.2 * endAngle},
			{startAngle: 0.2 * endAngle, endAngle: 0.4 * endAngle},
			{startAngle: 0.4 * endAngle, endAngle: 0.6 * endAngle},
			{startAngle: 0.6 * endAngle, endAngle: 0.7 * endAngle},
			{startAngle: 0.7 * endAngle, endAngle: 0.9 * endAngle},
			{startAngle: 0.9 * endAngle, endAngle: endAngle}
		];

		var arc = d3.svg.arc().outerRadius(100).innerRadius(50);


		svg2.select("g").remove();
		svg2.append("g")
			.attr("transform", "translate(100, 100)")
			.selectAll("path.arc")
			.data(dataAnnular)
				.enter()
				.append("path")
				.attr()
				.attr("fill", function(d, i) {
					return colors(0);
				})
				.attr("d", function(d, i) {
					console.log("start", d,i)
					return arc(d, i);
				})
	}
	render2();
 

 // my demo
 var myData = 
 	[ { // 数组 -> 对象
 			month: [{
	 				color: "green",
	 				complete: "1",
	 				id: 2
	 			}, {
	 				color: "blue",
	 				complete: "1",
	 				id: 5,
	 			}, {
	 				color: "purple",
	 				complete: "1",
	 				id: 4
	 			}
 			],
 			complete: 1, // 是否为整年，整年为一
 			time: 2011, // 年份
 			event: [ // 发生事件
	 			{
	 				occur: 0.2, // 开始时间在一年中的时间百分比
	 				id: 1 // 每个时间唯一id
	 			},
	 			{
	 				occur: 0.3,
	 				id: 2,
	 			}
 			]
 		}, {
 			month: [{
	 				color: "red",
	 				complete: "1",
	 				id: 2
	 			}, {
	 				color: "pink",
	 				complete: "1",
	 				id: 5,
	 			}, {
	 				color: "pink",
	 				complete: "1",
	 				id: 4
	 			}
 			],
 			complete: 1,
 			time: 2012,
 			event: [
	 			{
	 				occur: 0.4,
	 				id: 6,
	 				color: "pink"
	 			},
	 			{
	 				occur: 0.8,
	 				id: 7,
	 				color: "black"
	 			}
 			]
 		}, {
 			month: [{
	 				color: "yellow",
	 				complete: "1",
	 				id: 2
	 			}, {
	 				color: "blue",
	 				complete: "1",
	 				id: 5,
	 			}, {
	 				color: "pink",
	 				complete: "1",
	 				id: 4
	 			}
 			],
 			complete: 1,
 			time: 2012,
 			event: [
	 			{
	 				occur: 0.4,
	 				id: 6
	 			},
	 			{
	 				occur: 0.8,
	 				id: 7
	 			}
 			]
 		}
 	]

/*var inner = myData.inner;
var len = inner.length;
console.log(inner);
	for (var i = 0; i < len; i++) {
		var j = len - i -1;
		console.log("j", j)
		console.log(inner[0])
		var time = inner[j].time;
		var event = inner[j].event;
		var ratio = (j + 1) / len;
		svg.append("circle")
			.attr("cx", o[0])
			.attr("cy", o[1])
			.attr("class", "circle2")
			.attr("r", r * ratio);
		console.log(event);
		for (var a = 0; a < event.length; a++) {
			var id = event[a].id;
			var occur = event[a].occur;
			svg.append("circle")
			.attr("cx", o[0] +  r * ratio * Math.sin(2 * Math.PI * occur))
			.attr("cy", o[1] + r * ratio * Math.cos(2 * Math.PI * occur))
			.attr("class", "circle1")
			.attr("r", 20)
			.attr("id", id);
		}
	}*/
var svg = d3.select("body .year-demo").append("svg");
var width = 2000;
var r = 500;
var gap = 20;
var len = myData.length;
svg.attr("height",width).attr("width", width);
var delta = 1;
var translateX = 1000;
var translateY = 1000;
//document.documentElement.style.overflow='hidden';
document.body.addEventListener("mousewheel",function(event){
	document.body.scrollTop = document.body.scrollTop;
	console.log(event.wheelDelta);
	console.log(event.target.parentNode);
	if (event.target != document.getElementsByTagName('svg')[1] && event.target.parentNode.parentNode != document.getElementsByTagName('svg')[1]) {
		console.log(event.target, document.getElementsByTagName('svg')[1], false);
		return false;
	}
	if (event.wheelDelta > 0) {
		delta = delta + 0.1;
	} else {
		delta = delta - 0.1;
	}
  	d3.select("g").attr("transform", "translate(" + translateX + "," + translateY + ")scale(" + delta + ")");
  	//event.stopPropogation();
  	event.preventDefault();
},false);
document.body.addEventListener("DOMMouseScroll", function(event) {
    console.log(event.wheelDelta);
	if (event.detail > 0 ) {
		delta = delta + 0.1;
	} else {
		delta = delta - 0.1;
	}
  	d3.select("g").attr("transform", "translate(500, 500)scale("+ delta + ")")
});
var drag = d3.behavior.drag().on("drag", move);
svg.append("g")
.attr("transform", "translate(1000, 1000)")
.call(drag)
			.selectAll("i")
			.data(myData)
				.enter()
				.append("i")
				.each(function(d, i) {
					console.log(myData.length, "lo00000000000000000op");
					d3.select("g").selectAll("path.arc")
					.data(d.month)
						.enter()
						.append("path")
						.attr("fill", function(dd, ii) {
							console.log("ddcolor", dd.color);
							return dd.color;
						})
						.attr("id", function(dd) {
							return dd.id;
						})
						.attr("d", function(dd, ii) {
							var complete = d.complete;
							var outer = (r / len) * (i + 1);
							var inner = outer - gap;
							var arc = d3.svg.arc().outerRadius(inner).innerRadius(outer);
							var angle = Math.PI / 3 * 2;
							console.log(angle, dd.complete, ii);
							return arc({startAngle: angle * ii, endAngle: angle * (ii + 1) * dd.complete}, ii)
						})
						.on("mouseover", function(dd) {
							var x = d3.event.pageX;
							var y = d3.event.pageY;
							console.log(y, d3.select(".month-event"))
							d3.select(".month-event").style("top", y + "px")
							  .style("left", x + "px")
							  .style("display", "block")
							  .select("p")
							  .html(dd.id)
							//console.log(d3.select(this).attr("id"));
						})
						.on("mouseout", function() {
							console.log(d3.event);
							var x = d3.event.pageX;
							var y = d3.event.pageY;
							console.log(y, d3.select(".month-event"))
							d3.select(".month-event").style("display", "none");
							//console.log(d3.select(this).attr("id"));
						})
				})
				.each(function (d, i) {
					var event = d.event;
					var outer = (r / len) * (i + 1);
					for (var j = 0; j < event.length; j++) {
						var complete = event[j].occur;
						var id = event[j].id;
						d3.select("g")
						.append("circle")
						.attr("cx", 0 + (outer - 0.5 * gap) * Math.cos(2 * Math.PI * complete))
						.attr("cy", 0 + (outer - 0.5 * gap) * Math.sin(2 * Math.PI * complete))
						.attr("r", gap / 2)
						.attr("fill", "yellow")
						.attr("stroke", "pink")
						.attr("id", id)
						.on("mouseover", function() {
							d3.select(this).attr("r", "50px")
						})
						.on("mouseout", function() {
							d3.select(this).attr("r", "10px")
						})
						.on("click", function() {
							alert(d3.select(this).attr("id"));
						})
					}
				})
	function move(d) {
		console.log(this, "thisssssssssssssss");
		var x = d3.event.x,
		 	y = d3.event.y;
		translateX = x;
		translateY = y;
		d3.select(this)
		.attr("transform", function(d) {
			return "translate(" + translateX + "," + translateY + ")scale(" + delta + ")";
		})
	}



				



    
