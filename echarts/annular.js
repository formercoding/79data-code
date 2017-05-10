
var dataStyle = {
    normal: {
        label: {
            show: false
        },
        labelLine: {
            show: false
        },
        shadowBlur: 40,
        shadowColor: 'rgba(40, 40, 40, 0.5)',
    }
};
var placeHolderStyle = {
    normal: {
        color: 'rgba(0,0,0,0)',
        label: {
            show: false
        },
        labelLine: {
            show: false
        }
    },
    emphasis: {
        color: 'rgba(0,0,0,0)'
    }
};
option = {
    backgroundColor: '#f4f2e3',
    color: ['#85b6b2', '#6d4f8d', '#cd5e7e', '#e38980', '#f7db88'],
    tooltip: {
        show: true,
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        itemGap: 12,
        data: ['01', '02', '03', '04', '05']
    },
    toolbox: {
        show: true,
        feature: {
            mark: {
                show: true
            },
            dataView: {
                show: true,
                readOnly: false
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        }
    },
    series: [{
            name: 'Line 1',
            type: 'pie',
            hoverAnimation: false,
            selectedOffset: 10,
            clockWise: false,
            radius: [180, 200],
            itemStyle: dataStyle,
            hoverAnimation: false,
            label: {
                normal:{
                    show: true
                }
            },
            labelLine: {
                normal: {
                    show: true
                }
            },
            data: [{
                    value: 300,
                    name: '01',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0, color: '#ff9037' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#ff39db' // 100% 处的颜色
                            }], false),
                            borderColor: "#ff9037",
                            shadowBlur: 0,
                        }
                    }
                }, {
                    value: 50,
                    name: 'invisible',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0, color: '#ff39db' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#ff9037' // 100% 处的颜色
                            }], false),
                            shadowBlur: 0,
                        }
                    }    
                }, {
                    value: 50,
                    name: 'invisible',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0, color: '#ff9037' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#ff39db' // 100% 处的颜色
                            }], false),
                            shadowBlur: 0,
                        }
                    }    
                }

            ]
        }, {
            name: 'Line 2',
            type: 'pie',
            selectedOffset: 10,
            clockWise: false,
            radius: [160, 180],
            itemStyle: dataStyle,
            hoverAnimation: true,

            data: [{
                value: 150,
                name: '02'
            }, {
                value: 60,
                name: 'invisible',
                itemStyle: placeHolderStyle
            }]
        }, {
            name: 'Line 3',
            type: 'pie',
            clockWise: false,
            selectedOffset: 10,
            hoverAnimation: true,
            radius: [140, 160],
            itemStyle: dataStyle,

            data: [{
                value: 80,
                name: '03'
            }, {
                value: 50,
                name: 'invisible',
                itemStyle: placeHolderStyle
            }]
        }, {
            name: 'Line 4',
            type: 'pie',
            clockWise: false,
            hoverAnimation: true,
            radius: [120, 140],
            itemStyle: dataStyle,

            data: [{
                value: 45,
                name: '04'
            }, {
                value: 30,
                name: 'invisible',
                itemStyle: placeHolderStyle
            }]
        }, {
            name: 'Line 5',
            type: 'pie',
            clockWise: false,
            hoverAnimation: true,
            radius: [100, 120],
            itemStyle: dataStyle,

            data: [{
                value: 30,
                name: '05'
            }, {
                value: 30,
                name: 'invisible',
                itemStyle: placeHolderStyle
            }]
        },

    ]
};
var annular = echarts.init(document.getElementsByClassName("annular")[0]);
annular.setOption(option);