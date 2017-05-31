// 公共方法函數，不可刪除
// 获取hash参数
function getHash(str) {
  var hash = window.location.hash.trim();
  if (!hash || !hash.match(str)) {
    return null;
  } else {
    var index = hash.indexOf('&' + str);
    var start = hash.indexOf('=', index);
    var end = hash.indexOf('&', start) == -1 ? hash.length : hash.indexOf('&', start);
    return hash.slice(start + 1, end);
  }
}

// 设置hash参数
function setHash(str, param) {
  var hash = window.location.hash.trim();
  if (!hash || !hash.match(str)) {
     // console.log("hash",window.location.hash + '&' + str + '=' + param)
    return window.location.hash + '&' + str + '=' + param;
  } else {
    var index = hash.indexOf('&' + str);
    var start = hash.indexOf('=', index);
    var end = hash.indexOf('&', start) == -1 ? hash.length : hash.indexOf('&', start);
    return hash.slice(0, start + 1) + param + hash.slice(end);
  }
}
// 获取search参数
function getSearch(str) {
  var search = window.location.search.trim();
  if (!search || !search.match(str)) {
    return null;
  } else {
    var index = search.indexOf('&' + str);
    var start = search.indexOf('=', index);
    var end = search.indexOf('&', start) == -1 ? search.length : search.indexOf('&', start);
    return search.slice(start + 1, end);
  }
}

// 设置search参数
function setSearch(str, param) {
  var search = window.location.search.trim();
  if (!search || !search.match(str)) {
    return window.location.search + '&' + str + '=' + param;
  } else {
    var index = search.indexOf('&' + str);
    var start = search.indexOf('=', index);
    var end = search.indexOf('&', start) == -1 ? search.length : search.indexOf('&', start);
    return search.slice(0, start + 1) + param + search.slice(end);
  }
}
// 拼接search参数
function joinSearch(init, str, param) {
  var search = init;
  if (!search || !search.match(str)) {
    return window.location.search + '&' + str + '=' + param;
  } else {
    var index = search.indexOf('&' + str);
    var start = search.indexOf('=', index);
    var end = search.indexOf('&', start) == -1 ? search.length : search.indexOf('&', start);
    return search.slice(0, start + 1) + param + search.slice(end);
  }
}

// 设置Storage存储参数
function setSessionStorage(key, value) {
  window.sessionStorage.setItem(key, value);
}

// 获取Storage存储参数
function getSessionStorage(key) {
  return window.sessionStorage.getItem(key);
}
// 动态数字模拟
function numberFormat(number, id, leap, interval, obj) { // 数值 id 跳跃数字 间隔
    var number = parseInt(number);
    if (leap) {
      console.log($("#" + id)[0]);
      if ($("#" + id)[0].timer) {
        clearInterval($("#" + id)[0].timer);
      }
      $("#" + id)[0].timer = setInterval(function () {
        number = number + Math.ceil(leap * Math.random());
        numStr = number.toString();
          var len = Math.floor(numStr.length / 3);
          for (var i = 0; i < len; i++) {  // 千分位转换
          if (numStr.slice(0, -i * 4 - 3) == "") {
            break;
          }
          numStr = numStr.slice(0, -i * 4 - 3) + "," + numStr.slice(-4 * i - 3);
          }
          $("#" + id).text(numStr);
      }, interval);
    } else {
        numStr = number.toString();
        var len = Math.floor(numStr.length / 3);
        for (var i = 0; i < len; i++) {  // 千分位转换
        if (numStr.slice(0, -i * 4 - 3) == "") {
          break;
        }
        numStr = numStr.slice(0, -i * 4 - 3) + "," + numStr.slice(-4 * i - 3);
        }
        $("#" + id).text(numStr);
    }
    $("#" + id).text(number);
}
/**
 * [Circle description] 年轮图
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
    this.r = this.translateX < this.translateY ? this.translateX : this.translateY;
    this.len = this.data.length;
    this.calculate();
    this.zoom = d3.zoom().on('zoom', this.zoomed);
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
  zoomed: function() { // d3.event.transform.k -> zoom.scaleTo(circle.svg, k) 动态修改
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
        .call(self.zoom)
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
// 浏览器全屏API
function fullScreen(element) { 
  if(element.requestFullScreen) { 
    element.requestFullScreen(); 
  } else if(element.webkitRequestFullScreen ) { 
    element.webkitRequestFullScreen(); 
  } else if(element.mozRequestFullScreen) { 
   element.mozRequestFullScreen(); 
  } 
}
// 浏览器退出全屏API
function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}
// 监听全屏API
function screenChange(func) {
  document.onwebkitfullscreenchange = function() {
    func();
  }
  document.onmozfullscreenchange = function() {
    func();
  }
  document.onmsfullscreenchange = function() {
    func();
  }
}
// svg转化为canvas格式
function drawPic() {
    var svgXml = document.getElementsByClassName("wrap")[0].innerHTML;
    var image = new Image();
        image.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svgXml)));
    setTimeout(function() {
      //image = document.getElementsByClassName("")
        var canvas = document.createElement("canvas");  //准备空画布
        console.log(width, height);
            canvas.width = width;
            canvas.height = height;
        var context = canvas.getContext('2d');  //取得画布的2d绘图上下文
        console.log(image);
        context.drawImage(image, 0, 0);
        document.body.appendChild(canvas);
          savePic(canvas, "jpg")
    }, 1000)
}
// canvas格式图片下载
function savePic(canvas, type) {
        //设置保存图片的类型
        var imgdata = canvas.toDataURL(type);
        //将mime-type改为image/octet-stream,强制让浏览器下载
        var fixtype = function (type) {
            type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
            var r = type.match(/png|jpeg|bmp|gif/)[0];
            return 'image/' + r;
        }
        imgdata = imgdata.replace(fixtype(type), 'image/octet-stream')
        //将图片保存到本地
        var saveFile = function (data, filename) {
            var link = document.createElement('a');
            link.href = data;
            link.download = filename;
            var event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            link.dispatchEvent(event);
        }
        var filename = new Date().toLocaleDateString() + '.' + type;
        saveFile(imgdata, filename);
      }
