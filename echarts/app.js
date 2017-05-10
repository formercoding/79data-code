	// 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementsByClassName('echart1')[0]);

    // 指定图表的配置项和数据
    var option = {
    	backgroundColor: '#2c343c',
    	textStyle: {
	        color: 'rgba(255, 255, 255, 0.3)'
	    },
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        visualMap: {
		    // 不显示 visualMap 组件，只用于明暗度的映射
		    show: false,
		    // 映射的最小值为 80
		    min: 5,
		    // 映射的最大值为 600
		    max: 40,
		    inRange: {
		        // 明暗度的范围是 0 到 1
		        colorLightness: [0, 1]
		    }
		},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    // 基于准备好的dom，初始化echarts实例
    var myChart1 = echarts.init(document.getElementsByClassName('echart2')[0]);

    // 指定图表的配置项和数据
    myChart1.setOption({
    	//roseType: 'angle', 南丁格尔图
    	// 数值映射颜色
    	visualMap: {
		    // 不显示 visualMap 组件，只用于明暗度的映射
		    show: false,
		    // 映射的最小值为 80
		    min: 80,
		    // 映射的最大值为 600
		    max: 600,
		    inRange: {
		        // 明暗度的范围是 0 到 1
		        colorLightness: [0, 1]
		    }
		},
    	itemStyle: {
		    normal: {
		        // 阴影的大小
		        shadowBlur: 200,
		        // 阴影水平方向上的偏移
		        shadowOffsetX: 0,
		        // 阴影垂直方向上的偏移
		        shadowOffsetY: 0,
		        // 阴影颜色
		        shadowColor: 'rgba(0, 0, 0, 0.5)',
		        // 扇形颜色
		        color: '#c23531' 
		    },
		     emphasis: {
		        shadowBlur: 200,
		        shadowColor: 'rgba(0, 0, 0, 0.5)'
		    }
		},
	    series : [
	        {
	            name: '访问来源',
	            type: 'pie',
	            radius: '55%',
	            data:[
	                {
	                	value:400, name:'搜索引擎',
                		label: {
						    normal: {
						        textStyle: {
						            color: 'rgba(0, 255, 0, 0.3)'
						        }
						    }
						},
						labelLine: {
						    normal: {
						        lineStyle: {
						            color: 'rgba(255, 255, 255, 0.3)'
						        }
						    }
						}
					},
	                {value:335, name:'直接访问'},
	                {value:310, name:'邮件营销'},
	                {value:274, name:'联盟广告'},
	                {value:235, name:'视频广告'}
	            ]
	        }
	    ]
	});

   	var echart3 = echarts.init(document.getElementsByClassName("async")[0]);

   	echart3.setOption({
   		backgroundColor: '#2c343c',
    	textStyle: {
	        color: 'rgba(255, 255, 255, 0.3)'
	    },
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        visualMap: {
		    // 不显示 visualMap 组件，只用于明暗度的映射
		    show: false,
		    // 映射的最小值为 80
		    min: 5,
		    // 映射的最大值为 600
		    max: 40,
		    inRange: {
		        // 明暗度的范围是 0 到 1
		        colorLightness: [0, 1]
		    }
		},
        series: [{
            name: '销量',
            type: 'bar',
            data: []
        }]
   	});
   	// 异步加载数据 echart3
/**
	$.get('data.json').done(function (data) {
	    // 填入数据
	    console.log(data);
	    echart3.setOption({
	        series: [{
	            // 根据名字对应到相应的系列
	            name: '销量',
	            data: data
	        }]
	    });
	});
*/
	var echart4 = echarts.init(document.getElementsByClassName("echart4")[0]);

	echart4.setOption({
		xAxis: {
	        type: 'value'
	    },
	    yAxis: {
	        type: 'value'
	    },
	    dataZoom: [
	        {   // 这个dataZoom组件，默认控制x轴。
	            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
	            start: 10,      // 左边在 10% 的位置。
	            end: 60         // 右边在 60% 的位置。
	        },
	        {   // 这个dataZoom组件，也控制x轴。
	            type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
	            start: 10,      // 左边在 10% 的位置。
	            end: 60         // 右边在 60% 的位置。
        	},
        	{
	            type: 'slider',
	            yAxisIndex: 0,
	            start: 30,
	            end: 80
	        },
	        {
	            type: 'inside',
	            yAxisIndex: 0,
	            start: 30,
	            end: 80
	        }
	    ],
	    series: [
	        {
	            type: 'scatter', // 这是个『散点图』
	            itemStyle: {
	                normal: {
	                    opacity: 0.8
	                }
	            },
	            symbolSize: function (val) {
	                return val[2] * 40;
	            },
	            data: [
	            		["14.616","7.241","0.896"],
	            		["3.958","5.701","0.955"],
	            		["2.768","8.971","0.669"],
	            		["9.051","9.710","0.171"],
	            		["14.046","4.182","0.536"],
	            		["12.295","1.429","0.962"],
	            		["4.417","8.167","0.113"],
	            		["0.492","4.771","0.785"],
	            		["7.632","2.605","0.645"],
	            		["14.242","5.042","0.368"]
	            ]
	        }
	    ]
	});
	