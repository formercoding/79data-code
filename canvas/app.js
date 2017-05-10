









var draw = document.getElementById("draw");
// 确认浏览器支持canvas元素
if (draw.getContext) {
	var context = draw.getContext("2d");
	//context.fillStyle = "bleu";
	context.strokeStyle = "blue"; 
	//context.lineWidth = 5;
	//context.strokeRect(0, 0, 200, 150);

	context.beginPath(); // 圈圈圈圈
	context.arc(250, 250, 60, 0, 2*Math.PI, false);
	context.stroke(); // 描边圈圈圈圈


	//context.translate(250, 250); // 变换原点
	//context.rotate(1); // 旋转表针

	context.beginPath(); // 圆圆圆圆
	//context.moveTo(320*Math.sin(1), 250);
	context.arc(250 + 60*Math.sin(1), 250 + 60*Math.cos(1), 10, 0, 2*Math.PI, false);

	//context.moveTo(250, 320);
	context.arc(250 + 60*Math.sin(3), 250 + 60*Math.cos(3), 10, 0, 2*Math.PI, false);

	context.fill(); // 填充圈圈圈圈

	context.beginPath(); // 圆圆圆圆
	context.moveTo(330, 250); 
	context.arc(250, 250, 80, 0, 2*Math.PI, false);



	context.moveTo(350, 250);
	context.arc(250, 250, 100, 0, (4/3)*Math.PI, false);
	context.stroke();

	


}
