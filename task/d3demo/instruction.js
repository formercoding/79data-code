/**
 *
 * 使用方法：
 * 			开始： 引入d3-3.5.16.js createCircle.js
 *
 * 			生成年轮： 
 *
 * 				 var circle = new Circle(wrap, data, showDiv);
 *
 * 			参数说明： 
 * 			
 * 				 wrap		图形容器元素
 * 				 
 * 				 showDiv	悬浮容器（信息显示）
 *
 *				 data 		JSON数据
 *
 * 			数据格式：
 *
 * 				var data = [ {
		 			title: "2016工商显示信息", // 悬浮窗口标题
		 			time: 2013, // 年份
		 			eventList: [{ // 当年事件信息列表
			 				time: "2013-1-2",  // 事件时间
			 				title: "title", // 事件标题
			 				detail: "event detail1" // 事件基本信息
			 			}, {
							..........
			 			}
		 			],
		 			month: [{ // 月份对象
			 				color: "#25a1e1", // 该月环形块颜色
			 				complete: "0.1", // 月份完成比例 如 1月3日占一月时间 0.1
			 				time: "2013-1" // 该月时间
			 			}, {
			 				...........
			 			}
		 			],
		 			event: [{ // 事件对象
			 				occur: 0.0082, // 事件开始时间在一年中所占比例 如 一月3日占2016年 3/365
			 				id: 5, // 事件的id,唯一
			 				color: "#EAA2E1", // 事件圆圈显示颜色
			 				time: "2013-2-3", // 事件发生时间
			 				details: "details"; // 事件详细信息
			 			}, {
			 				..........
			 			}
		 			]
		 		}, {
		 			..........
		 		}
		 	]

		相关说明：年轮图直径由外容器宽高决定

				  各环形大小由外容器和年份总数计算后决定

				  圈圈直径占环形2/3

				  鼠标在wrap元素上滚轮滚动缩放图形

				  鼠标悬停环形中悬浮窗出现，显示当年事件列表

				  鼠标点击事件圈圈悬浮窗出现，显示事件详细信息

				  鼠标经过事件圈圈，圈圈闪动

				  鼠标拖拽元素进行移动

				  鼠标点击年轮，其他年份环形消失，再次点击出现

 */