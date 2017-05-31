
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
  function getData() {
    var compantId = router_path.gs_basic_id;
    $.ajax({
        url: router_path.circle_api,
        async: false,
        success: function(data) {
          var data = JSON.parse(data);
          //var myD = [];
          if (data == 0) {
            myData = 0;
            return false;
          }
          data.forEach(function(item, index) {
            if (item.yearpct) {
              item.complete = item.yearpct;
            }
            if (item.lst) {
              item.eventList = item.lst;
              item.eventList.forEach(function(items, indexs) {
                items.title = items.item;
                items.occur = items._pct;
                items.id = 0;
              })  
            } else {
              item.eventList = [];
            }
          });
          myData = data;
        }
    });  
  }
  getData();
  // 创建图形对象
  var wrap = d3.selectAll(".year")["_groups"][0][0];
  if (myData) {
    var circle = new Circle(wrap, myData);
  } else {
    $('.graph').append('<div class="noData">暂无相关数据！</div>');
  }
  if (myData) {
    // 点击放大
    d3.select('.fa-plus').on('click', function(d) {
      var k = parseFloat(circle.svg.attr('k')) + 0.2;
      circle.zoom.scaleTo(circle.svg, k);
      circle.svg.attr('k', k);
    });
    // 点击缩小
    d3.select('.fa-minus').on('click', function(d) {
      var k = parseFloat(circle.svg.attr('k')) - 0.2;
      if (k <= 0.2) {
        return false;
      }
      circle.zoom.scaleTo(circle.svg, k);
      circle.svg.attr('k', k);
    });
    // 点击全屏
    d3.select('.fa-arrows-alt').on('click', function(d) {
      circle.svg.attr('width', "100%");
      circle.svg.attr('height', "100%");
      fullScreen(wrap);
    });
    // 点击全屏 退出全屏
    d3.select('.screen-hook').on('click', function(d) {
      var hook = d3.select(this).classed('fa-arrows-alt');
      if (hook) {
        fullScreen(d3.select('.pic')["_groups"][0][0]);
      } else {
        exitFullscreen();
      } 
    }); 
    // 监听全屏切换
    screenChange(function() {
      var hook = d3.select('.screen-hook');
      if (hook.classed('fa-arrows-alt')) {
        hook.classed('fa-arrows-alt', false);
        hook.classed('fa-compress', true);
        d3.select('.pic').style('padding-top', 0);
        circle.svg.attr('width', d3.select(circle.wrap).style('width').slice(0, -2));
        circle.svg.attr('height', d3.select(circle.wrap).style('height').slice(0, -2));
      } else {
        d3.select('.pic').style('padding-top', '160px');
        hook.classed('fa-arrows-alt', true);
        hook.classed('fa-compress', false);
      }
    });
    // 点击刷新
    d3.select('.fa-refresh').on('click', function() {
      d3.select('svg').remove();
      var data = myData;
      getData();
      circle = new Circle(wrap, myData);
    });
    // 点击保存图片
    d3.select('.fa-download').on('click', function() {
      drawPic(wrap);
    })
  }
  // ajax
  function circleClick(d, dd) {
    if (d.length > 0) {
      $('.graph .right').show();
      var str = '';
      d.forEach(function(item, index) {
        if (item.change_date = dd.change_date) {
          str += '<li>'
                    + '<span class="date">' + item.change_date + '</span>'
                    + '<div>'
                        + '<span>事件：</span>'
                        + '<span>' + item.item + '</span>'
                    + '</div>'
                    + '<div>'
                        + '<span>变更前：</span>'
                        + '<span>' + item.content_before + '</span>'
                    + '</div>'
                    + '<div>'
                        + '<span>变更后：</span>'
                        + '<span>' + item.content_after + '</span>'
                    + '</div>'
                + '</li>'  
        }
      });
      $('.graph .right').find('ul').html(str);
    } else {
      $('.graph .right').hide();
    }
  }
  function yearClick(d) {
    if (d.eventList.length > 0) {
      $('.graph .right').show();
      var str = '';
      d.eventList.forEach(function(item, index) {
        str+= '<li>'
                  + '<span class="date">' + item.change_date + '</span>'
                  + '<div>'
                      + '<span>事件：</span>'
                      + '<span>' + item.item + '</span>'
                  + '</div>'
                  + '<div>'
                      + '<span>变更前：</span>'
                      + '<span>' + item.content_before + '</span>'
                  + '</div>'
                  + '<div>'
                      + '<span>变更后：</span>'
                      + '<span>' + item.content_after + '</span>'
                  + '</div>'
              + '</li>'
      });
      $('.graph .right').find('ul').html(str);
    } else {
      $('.graph .right').hide();
    }
  }
 
  