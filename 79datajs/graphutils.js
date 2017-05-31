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
    if (!this.svg.select('image')._groups[0][0]) {
      this.svg.append('image')
              .attr('x', this.svg.attr('width') / 2 - 100)
              .attr('y', this.svg.attr('height') / 2 - 100)
              .attr('xlink:href', '../../../../public/home/images/watermark.png');
    }
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
              .on('click', function(dd) {
                yearClick(dd);
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
                  circleClick(d.eventList, dd);
                })
                .on('mouseover', function(dd) {
                  
                })
          })
  }
}
// 构造函数 股权关系
function CompareGraph(wrap, data) {
  this.wrap = wrap;
  this.data = data;
  this.init();
}
CompareGraph.prototype = {
  init: function() {
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
    this.zoom = d3.zoom().on('zoom', this.zoomed);
    this.calculate();
  },
  calculate: function() {
    var R = this.translateX < this.translateY ? this.translateX : this.translateY;
    var personCount = 0;
    var companyCount = 0;
    var i = 0;
    var j = 0;
    this.data.nodes.forEach(function(item) {
      if (item.group == 1) {
        personCount++;
      } else if (item.group == 2) {
        companyCount++;
      }
    });
    this.data.nodes.forEach(function(item, index) {
      if (item.group == 1) {
        item.x = R / 2 * Math.cos(2 * i * Math.PI / personCount);
        item.y = R / 2 * Math.sin(2 * i * Math.PI / personCount);
        i++;
      } else if (item.group == 2) {
        item.x = (R - 30) * Math.cos(2 * j * Math.PI / companyCount);
        item.y = (R - 30) * Math.sin(2 * j * Math.PI / companyCount);
        j++;
      } else {
        item.x = 0;
        item.y = 0;
      }
    });
    this.calculateLink();
  },
  dragCircle: function(self) {
    // 起始平移x,y
    var startX = d3.event.sourceEvent.pageX;
    var startY = d3.event.sourceEvent.pageY;
    d3.event.on("drag", dragged).on("end", ended);

    function dragged(d) {
      // 变化平移值
      var alterX = d3.event.sourceEvent.pageX - startX;
      var alterY = d3.event.sourceEvent.pageY - startY;
      console.log(d3.event.sourceEvent);
      d.x = parseFloat(d3.select(this).attr('cx')) + alterX;
      d.y = parseFloat(d3.select(this).attr('cy')) + alterY;
      self.svg.select('g').remove();
      self.calculateLink();
    }
    function ended(d) {
    }
  },
  calculateLink: function() {
    this.data.links.forEach(function(item, index) {
      this.data.nodes.forEach(function(node) {
        if (node.id == item.target) {
          item.x1 = node.x;
          item.y1 = node.y;
        }
        if (node.id == item.source) {
          item.x2 = node.x;
          item.y2 = node.y;
        }
      });  
    });
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
  zoomed: function() {
    var attrX = d3.select(this).attr('x');
    var attrY = d3.select(this).attr('y');
    d3.select(this).select('g')
      .attr("transform", "translate(" + attrX + "," + attrY + ") scale(" + d3.event.transform.k + ")");
    d3.select(this).attr('k', d3.event.transform.k);
  },
  render: function() {
    if (!this.svg.select('image')._groups[0][0]) {
      this.svg.append('image')
              .attr('x', this.svg.attr('width') / 2 - 100)
              .attr('y', this.svg.attr('height') / 2 - 100)
              .attr('xlink:href', '../../../../public/home/images/watermark.png');
    }
    var self = this;
    this.svg.call(d3.drag().on('start', self.started))
        .call(self.zoom)
    this.svg.append('g')
        .attr("transform", "translate(" + this.svg.attr('x') + "," + this.svg.attr('y') + ") scale(" + this.svg.attr('k') + ")")
        .selectAll('line')
        .data(this.data.links)
        .enter()
        .append('line')
        .attr('x1', function(d) {
          return d.x1;
        })
        .attr('y1', function(d) {
          return d.y1;
        })
        .attr('x2', function(d) {
          return d.x2;
        })
        .attr('y2', function(d) {
          return d.y2;
        })
        .attr('stroke', '#63CECB')
    this.svg.select('g')
      .selectAll('path')
      .data(this.data.links)
      .enter()
      .append("path")
      .attr("stroke", "#d1b5cf")
      .attr("class", "link")
      .attr("d", function(d) {
        var x1 = d.x1 / 2;
        var y1 = d.y1 / 2;
        var x2 = d.x2 / 2;
        var y2 = d.y2 / 2;
        var slopy,cosy,siny;  
        var Par=10.0;  
        var x3,y3;  
        slopy=Math.atan2((y1-y2),(x1-x2));     
        cosy=Math.cos(slopy);     
        siny=Math.sin(slopy);   
         
        // path="M"+x1+","+y1+" L"+x2+","+y2;  
             
        x3=(Number(x1)+Number(x2))/2;  
        y3=(Number(y1)+Number(y2))/2;  
    
        path = " M"+x3+","+y3;  
          
        path +=" L"+(Number(x3)+Number(Par*cosy-(Par/2.0*siny)))+","+(Number(y3)+Number(Par*siny+(Par/2.0*cosy)));  
    
        path +=" M"+(Number(x3)+Number(Par*cosy+Par/2.0*siny)+","+ (Number(y3)-Number(Par/2.0*cosy-Par*siny)));  
        path +=" L"+x3+","+y3;  
    
        return path;  
      })
    this.svg.select('g')
      .selectAll('.descr')
      .data(this.data.links)
      .enter()
      .append("text")
      .attr("class", "descr")
      .attr("fill", "#d1b5cf")
      .attr("x", function(d) {
        return (d.x1 + d.x2) / 2;
      })
      .attr("y", function(d) {
        return (d.y1 + d.y2) / 2;
      })
      .text(function(d) {
        return d.value;
      })
      .attr("transform", function(d) {
        var x = Math.ceil((d.x1 + d.x2) / 2);
        var y = Math.ceil((d.y1 + d.y2) / 2);
        var angle = Math.atan((d.y2 - d.y1) / (d.x2 - d.x1)) * 360 / (2 * Math.PI);
          return "rotate(" + angle + "," + x + "," + y + ")";
      })
    this.svg.select('g')
        .selectAll('circle')
        .data(this.data.nodes)
        .enter()
        .append('circle')
        .attr('cx', function(d) {
          return d.x;
        })
        .attr('cy', function(d) {
          return d.y;
        })
        .attr('r', function(d) {
          return 30;
        })
        .attr('fill', function(d) {
          return '#D86477';
        })
        .call(d3.drag().on('start', function() {
          self.dragCircle(self);
        }))
    this.svg.select('g')
        .selectAll('.text')
        .data(this.data.nodes)
        .enter()
        .each(function(d, i) {
          var line = Math.ceil(d.id.length / 5);
          for(var j = 0; j < line; j++) {
          self.svg.select('g').append("text")
              .attr('flag', function() {
                return d.id;
              })
              .attr('class', '.text')
              .attr("fill", "#fff")
              .attr("x", function() {
                return d.x - 20 ;
              })
              .attr("y", function() {
                return d.y + j * 15;
              })
              .text(function() {
                return d.id.slice(j * 5, j * 5 + 5);
              }) 
          } 
        })
    
    
  }
}
// 构造函数 企业图谱
function Relative(wrap, data) {
  this.wrap = wrap;
  this.data = data;
  this.init();
}
Relative.prototype = {
  constructor: Relative,
  init: function() {
    var width = d3.select(this.wrap).style("width").slice(0, -2);
    var height = d3.select(this.wrap).style("height").slice(0, -2);
    this.svg = d3.select(this.wrap).append("svg");
    this.svg.attr("width", width).attr("height", height);
    // 设定初始平移
    this.translateX = this.svg.attr("width") / 2;
    this.translateY = this.svg.attr("height") / 2;

    this.svg.attr('x', width / 2);
    this.svg.attr('y', height / 2);
    this.svg.attr('k', 1);
    this.zoom = d3.zoom().on('zoom', this.zoomed);

    this.formatData();
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
      d3.select(this).selectAll('g')
        .attr("transform", "translate(" + calcX + "," + calcY + ") scale(" + d3.select(this).attr('k') + ")")
    }
    function ended() {
      // 设置最终值
      d3.select(this).attr('x', calcX);
      d3.select(this).attr('y', calcY);
    }
  },
  project: function(x, y, add) {
    var width = parseFloat(d3.select(this.wrap).style("width").slice(0, -2));
    var height = parseFloat(d3.select(this.wrap).style("height").slice(0, -2));
    var r = width > height ? height / 2 - 100 : width / 2 - 100;
    var angle = x * Math.PI * 2, 
        radius = y * r;
    if (add) {
      radius += add;
    }
      return [radius * Math.cos(angle), radius * Math.sin(angle)];
  },
  formatData: function() {
    this.root = d3.hierarchy(this.data).sort(function(a, b) { 
      return a.height - b.height; 
    });
  },
  rootUpdate: function(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    this.svg.selectAll('g').remove();
    this.render();
  },
  zoomed: function() {
    console.log('dd');
    var attrX = d3.select(this).attr('x');
    var attrY = d3.select(this).attr('y');
    d3.select(this).selectAll('g')
      .attr("transform", "translate(" + attrX + "," + attrY + ") scale(" + d3.event.transform.k + ")");
    d3.select(this).attr('k', d3.event.transform.k);
  },
  render: function() {
    if (!this.svg.select('image')._groups[0][0]) {
      this.svg.append('image')
              .attr('x', this.svg.attr('width') / 2 - 100)
              .attr('y', this.svg.attr('height') / 2 - 100)
              .attr('xlink:href', '../../../../public/home/images/watermark.png');
    }
    var self = this;
    var i = 0;
    var color = d3.scaleOrdinal(d3.schemeCategory20c).domain([2, 20]);
    d3.cluster()(this.root);
    
    this.svg
        .call(d3.drag().on('start', self.started))
        .call(self.zoom)
    this.svg.append('g').attr("transform", "translate(" + self.svg.attr('x') + "," + self.svg.attr('y') + ") scale(" + self.svg.attr('k') + ")")
    // 线条绘制 
    var updateLink = this.svg
        .select('g')
        .selectAll("path.link")
        .data(this.root.descendants().slice(1), function() {
          return i++;
        });
    var enterLink = updateLink.enter()
      .append("path")
      .attr("class", "link")
      .attr("fill", "none")
      .style("stroke", function(d) {
          return '#02B2EE';
      })
      .attr("d", function(d) {
        if (d.x0) {
          return "M" + self.project(d.x0, d.y0)
            + "C" + self.project(d.x0, (d.y0 + d.parent.y0) / 2)
            + " " + self.project(d.parent.x0, (d.y0 + d.parent.y0) / 2)
            + " " + self.project(d.parent.x0, d.parent.y0);
        } else {
          return "M" + self.project(d.parent.x, d.parent.y)
            + "C" + self.project(d.parent.x, (d.parent.y + d.parent.y) / 2)
            + " " + self.project(d.parent.x, (d.parent.y + d.parent.y) / 2)
            + " " + self.project(d.parent.x, d.parent.y);
        }
    });

    // 圆点绘制
    var updateNode = this.svg
      .select('g')
      .selectAll(".node")
      .data(this.root.descendants(), function(d) { 
               return ++i; });

    var enterNode = updateNode.enter()
      .append("circle")
      .attr("class", "node")
      .attr("r", function(d) {
        return 20 / (d.depth + 1);
      })
      .style("stroke-width", "2px")
      .style("stroke", function(d) {
        return color(d.depth);
      })
      .style("fill", function(d) {
        if (d.children || d._children) {
          return color(d.depth + 1);
        } else {
          return color(d.depth);
        }
      })
      .attr("transform", function(d) {
        if (d.x0) {
          return "translate(" + self.project(d.x0, d.y0) + ")";
        } else if (d.parent){
          return "translate(" + self.project(d.parent.x, d.parent.y) + ")";
        } else {
          return "translate(" + self.project(d.x, d.y) + ")";
        }
      })
      .on("click", function(d) { // 点击事件
          console.log('ddd');
          self.rootUpdate(d);
      });
    // 文本绘制
    var updateText = this.svg
      .select('g')
      .selectAll(".text")
      .data(this.root.descendants(), function(d) { 
               return ++i; });

    var enterText = updateText.enter()
      .append("text")
      .attr("class", "text")
      .attr("text-anchor", function(d) {
        if (d.x > 0.25 && d.x < 0.75) {
          return "end";
        } else {
          return "start";
        }
      })
      .attr("transform", function(d) {
        if (d.x > 0.25 && d.x < 0.75) {
          var deg = 360 * d.x - 180;
          return "translate(" + self.project(d.x, d.y, 10) + ")rotate(" + deg + ")";
        } else {
          return "translate(" + self.project(d.x, d.y, 10) + ")rotate(" + d.x * 360 + ")";
        }
      })
      .style("opacity", 0)
      .text(function(d) { 
        return d.data.name;
      })
    // 线条更新
    enterLink.transition()
      .duration(2000)
      .attr("d", function(d) {
          return "M" + self.project(d.x, d.y)
            + "C" + self.project(d.x, (d.y + d.parent.y) / 2)
            + " " + self.project(d.parent.x, (d.y + d.parent.y) / 2)
            + " " + self.project(d.parent.x, d.parent.y);
      });

    // 圆点更新       
    enterNode.transition()
      .duration(2000)
      .attr("transform", function(d) {
          return "translate(" + self.project(d.x, d.y) + ")";
      })

    // 文本更新
    enterText.transition()
      .duration(2000)
      .style("opacity", "1");

    // 圆点退出模式
    var exitNode = updateNode.exit()
      .attr("transform", function(d) {
        if (d.parent) {
          return "translate(" + project(d.parent.x0, d.parent.y0) + ")";
        } else {
          return "translate(" + project(d.x0, d.y0) + ")";
        }
      })
      .remove();

    // 文字退出模式
    var exitLink = updateText.exit()
      .transition()
      .duration(1000)
      .style("opacity", 100)
      .remove();

    // 线条退出模式
    var exitLink = updateLink.exit()
      .remove();
    this.root.descendants().forEach(function(d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }
}
// 构造函数 股权关系
function CashGraph(wrap, data) {
  this.wrap = wrap;
  this.data = data;
  this.init();
}
CashGraph.prototype = {
  constructor: CashGraph,
  init: function() {
    var self = this;
    // 获取容器宽高，并设定svg宽高
    var width = parseFloat(d3.select(this.wrap).style("width").slice(0, -2));
    var height = parseFloat(d3.select(this.wrap).style("height").slice(0, -2));
    console.log('height', height)
    var r = height > width ? width / 3 : height / 3;
    this.svg = d3.select(this.wrap).append("svg");
    this.svg.attr("width", width).attr("height", height);
    this.simulation = d3.forceSimulation()
                      .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(function() {
                        return r; 
                      }))
                      .force("charge", d3.forceCollide().radius(function(d) {
                        if (d.group == 1) {
                          return -r;
                        } else {
                          var len = self.data.nodes.length - 1;
                          return Math.sin(1 / len * Math.PI) * r / 2;
                        }
                      }))
                      .force("center", d3.forceCenter(0, 0));
    // 设定初始平移
    this.translateX = this.svg.attr("width") / 2;
    this.translateY = this.svg.attr("height") / 2;
    // 将x,y赋给svg下的g元素用以监测平移，缩放值
    this.svg.attr('x', width / 2);
    this.svg.attr('y', height / 2);
    this.svg.attr('k', 1);

    this.zoom = d3.zoom().on('zoom', this.zoomed);
    this.render();
  },
  // svg缩放事件
  zoomed: function() { // d3.event.transform.k -> zoom.scaleTo(circle.svg, k) 动态修改
      var attrX = d3.select(this).attr('x');
      var attrY = d3.select(this).attr('y');
      d3.select(this).select('g')
        .attr("transform", "translate(" + attrX + "," + attrY + ") scale(" + d3.event.transform.k + ")");
      d3.select(this).attr('k', d3.event.transform.k);
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
    /*var self =this;
    d3.event.on("drag", dragged).on("end", dragended);
   
    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
    d3.event.subject.fx = d3.event.subject.x;
    d3.event.subject.fy = d3.event.subject.y;

    function dragged() {
      d3.event.subject.fx = d3.event.x;
      d3.event.subject.fy = d3.event.y;
    }

    function dragended() {
      if (!d3.event.active) self.simulation.alphaTarget(0);
      d3.event.subject.fx = null;
      d3.event.subject.fy = null;
    }*/
  },
  dragsubject: function() {
    return this.simulation.find(d3.event.x, d3.event.y);
  },
  render: function() {
    if (!this.svg.select('image')._groups[0][0]) {
      this.svg.append('image')
              .attr('x', this.svg.attr('width') / 2 - 100)
              .attr('y', this.svg.attr('height') / 2 - 100)
              .attr('xlink:href', '../../../../public/home/images/watermark.png');
    }
    var self = this;
    this.svg
        .call(d3.drag().on('start', this.started))
        .call(this.zoom);
    var self = this;
    this.simulation
        .alpha(0.05)  // alpha是动画的冷却系数，运动过程中会不断减小，直到小于0.005为止，此时动画会停止 
        .nodes(this.data.nodes)
        .on("tick", function() {
          self.ticked();
        });
    this.simulation.force("link")
        .links(this.data.links)
        .distance(this.translateX > this.translateY ? this.translateY - 20: this.translateX - 20);
  },
  ticked: function() {
    var i = 0;
    this.svg.selectAll('g').remove();
    var wrapg = this.svg.append('g').attr("transform", "translate(" + this.translateX + "," + this.translateY + ")")
    var links = wrapg.selectAll(".link").data(this.data.links, function(d) { return ++i;});
    var enterLinks = links.enter()
      .append("path")
      .attr("stroke", "#d1b5cf")
      .attr("class", "link")
      .attr("d", function(d) {
        var x1 = d.target.x;
        var y1 = d.target.y;
        var x2 = d.source.x;
        var y2 = d.source.y;
        var slopy,cosy,siny;  
        var Par=10.0;  
        var x3,y3;  
        slopy=Math.atan2((y1-y2),(x1-x2));     
        cosy=Math.cos(slopy);     
        siny=Math.sin(slopy);   
         
        path="M"+x1+","+y1+" L"+x2+","+y2;  
             
        x3=(Number(x1)+Number(x2))/2;  
        y3=(Number(y1)+Number(y2))/2;  
    
        path +=" M"+x3+","+y3;  
          
        path +=" L"+(Number(x3)+Number(Par*cosy-(Par/2.0*siny)))+","+(Number(y3)+Number(Par*siny+(Par/2.0*cosy)));  
    
        path +=" M"+(Number(x3)+Number(Par*cosy+Par/2.0*siny)+","+ (Number(y3)-Number(Par/2.0*cosy-Par*siny)));  
        path +=" L"+x3+","+y3;  
    
        return path;  
      })
    var exitLink = links.exit().remove();

    var nodes = wrapg.selectAll(".node").data(this.data.nodes, function(d) {return ++i;});
    var enterNode = nodes.enter()
                    .append("circle")
                    .attr("fill", function(d) {
                      //console.log(d.id);
                      if (d.group == 1) {
                        return "#e281e3";
                      } else {
                        return "#91b8ff";
                      }
                    })
                    .attr("class", "node")
                    .attr("cx", function(d) {
                      return d.x;
                    })
                    .attr("cy", function(d) {
                      return d.y;
                    })
                    .attr("r", function(d) {
                      if (d.group == 1) {
                        return 50;
                      } else {
                        return 40;
                      }
                    })
                    .on('click', function(d) {
                      compClick(d);
                    });

    var exitNode = nodes.exit().remove();

    var texts = wrapg.selectAll(".text").data(this.data.links, function(d) {return ++i;
    });

    var enterText = texts.enter()
                    .append("text")
                    .attr("class", "text")
                    .attr("fill", "#d1b5cf")
                    .attr("x", function(d) {
                      return (d.source.x + d.target.x) / 2;
                    })
                    .attr("y", function(d) {
                      return (d.source.y + d.target.y) / 2;
                    })
                    .text(function(d) {
                      return d.value;
                    })
                    .attr("transform", function(d) {
                      var x = Math.ceil((d.source.x + d.target.x) / 2);
                      var y = Math.ceil((d.source.y + d.target.y) / 2);
                      var angle = Math.atan((d.source.y - d.target.y) / (d.source.x - d.target.x)) * 360 / (2 * Math.PI);
                        return "rotate(" + angle + "," + x + "," + y + ")";
                    })

    var exitText = texts.exit().remove();

    var nodeTexts = wrapg.selectAll(".node-text").data(this.data.nodes, function(d) {return ++i;
    });

    var enterNodeTexts = nodeTexts.enter().append("g").attr('class', 'node-text');
      

    enterNodeTexts.each(function(d, i) {
      var line = Math.ceil(d.id.length / 5);
      for(var j = 0; j < line; j++) {
        d3.select(this).append("text")
            .attr("fill", "#fff")
            .attr("x", function(d) {
              if (d.group == 1) {
                return d.x;
              } else {
                return d.x;
              }
            })
            .attr("y", function(d) {
              if (d.group == 1) {
                return d.y + j * 16 - (line / 2) * 8;
              } else {
                return d.y + 7;
              }
            })
            .text(function() {
              return d.id.slice(j * 5, j * 5 + 5);
              //return '我是一只';
            })
            .attr('text-anchor', 'middle')
            .attr('font-size', function(d) {
              if (d.group == 1) {
                return '16px';
              } else {
                return '20px';
              }
            })
            .on('click', function(d) {
              compClick(d);
            });
        } 
    })
    var exitNodeTexts = nodeTexts.exit().remove();
  }
}
// 构造函数 字段图
function CreateField(wrap, data, style) {
  this.wrap = wrap;
  this.data = data;
  this.style = style;
  this.init();
}
CreateField.prototype = {
  init: function() {
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
    this.svg.attr('y', 15);
    this.svg.attr('k', 1);
    this.zoom = d3.zoom().on('zoom', this.zoomed);
    this.root = d3.hierarchy(data);
    this.root.descendants().forEach(function(item, index) {
      if (item.depth >= 2 && item.children) {
        item._children = item.children;
        item.children = null;
      }
    })
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
  zoomed: function() {
    var attrX = d3.select(this).attr('x');
    var attrY = d3.select(this).attr('y');
    d3.select(this).select('g')
      .attr("transform", "translate(" + attrX + "," + attrY + ") scale(" + d3.event.transform.k + ")");
    d3.select(this).attr('k', d3.event.transform.k);
  },
  rootUpdate: function(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    this.svg.selectAll('g').remove();
    this.render();
  },
  project: function(d) {
    return d - this.translateX;
  },
  render: function() {
    if (!this.svg.select('image')._groups[0][0]) {
      this.svg.append('image')
              .attr('x', this.svg.attr('width') / 2 - 100)
              .attr('y', this.svg.attr('height') / 2 - 100)
              .attr('xlink:href', '../../../../public/home/images/watermark.png');
    }
    var self = this;
    this.svg.call(d3.drag().on('start', self.started))
        .call(self.zoom)
    var width = d3.select(this.wrap).style("width").slice(0, -2);
    var height = d3.select(this.wrap).style("height").slice(0, -2);

    var tree = d3.tree().size([width, height - 50]);

    var g = this.svg.append('g')
                    .attr('transform', 'translate(' + this.translateX + ', 15)')
    // 线条更新
    var updateLink = g.selectAll(".link").data(tree(this.root).descendants().slice(1));
    if (this.style == "hook") {
      // 线条进入
      var enterLink = updateLink.enter()
                                .append("path")
                                .attr("class", "link")
                                .attr('fill', 'none')
                                .attr('stroke', 'rgb(2, 178, 238)')
                                .attr("d", function(d) {
                                  if (d.x0) {
                                    return "M" + self.project(d.parent.x0) + "," + d.parent.y0
                                        + "L" + self.project(d.x0) + "," + (d.y0 + d.parent.y0) / 2
                                        + "L" + self.project(d.x0) + "," + d.y0
                                  } else {
                                    return "M" + self.project(d.parent.x) + "," + d.parent.y
                                        + "L" + self.project(d.x) + "," + (d.y + d.parent.y) / 2
                                        + "L" + self.project(d.x) + "," + d.y
                                  }
                                });

      // 线条动画 
      enterLink.transition()
               .duration(1000)
               .attr("d", function(d) {
                  return "M" + self.project(d.parent.x) + "," + d.parent.y
                                        + "L" + self.project(d.x) + "," + (d.y + d.parent.y) / 2
                                        + "L" + self.project(d.x) + "," + d.y
                });
      // 线条退出
      var exitLink = updateLink.exit().remove();
    } else if (this.style == "gently") {
      // 线条进入
      var enterLink = updateLink.enter()
                                .append("path")
                                .attr("class", "link")
                                .attr('fill', 'none')
                                .attr('stroke', 'rgb(2, 178, 238)')
                                .attr("d", function(d) {
                                  if (d.x0) {
                                    return "M" + self.project(d.x0) + "," + d.y0
                                        + "C" + self.project((d.x0 + d.parent.x0) / 2) + "," + d.y0
                                        + " " + self.project((d.x0 + d.parent.x0) / 2) + "," + d.parent.y0
                                        + " " + self.project(d.parent.x0) + "," + d.parent.y0;
                                  } else {
                                    return "M" + self.project(d.x) + "," + d.y
                                        + "C" + self.project((d.x + d.parent.x) / 2) + "," + d.y
                                        + " " + self.project((d.x + d.parent.x) / 2) + "," + d.parent.y
                                        + " " + self.project(d.parent.x) + "," + d.parent.y;
                                  }
                                });

      // 线条动画 
      enterLink.transition()
               .duration(1000)
               .attr("d", function(d) {
                  return "M" + self.project(d.x) + "," + d.y
                                        + "C" + self.project((d.x + d.parent.x) / 2) + "," + d.y
                                        + " " + self.project((d.x + d.parent.x) / 2) + "," + d.parent.y
                                        + " " + self.project(d.parent.x) + "," + d.parent.y;
                });
      // 线条退出
      var exitLink = updateLink.exit().remove();
    } else if (this.style == "normal") {
      // 线条进入
      var enterLink = updateLink.enter()
                                .append("path")
                                .attr("class", "link")
                                .attr('fill', 'none')
                                .attr('stroke', 'rgb(2, 178, 238)')
                                .attr("d", function(d) {
                                  if (d.x0) {
                                    return "M" + self.project(d.parent.x0) + "," + d.parent.y0
                                        + "L" + self.project(d.parent.x0) + "," + (d.y0 + d.parent.y0) / 2
                                        + "L" + self.project(d.x0) + "," + (d.y0 + d.parent.y0) / 2
                                        + "L" + self.project(d.x0) + "," + d.y0
                                  } else {
                                    return "M" + self.project(d.parent.x) + "," + d.parent.y
                                        + "L" + self.project(d.parent.x) + "," + (d.y + d.parent.y) / 2
                                        + "L" + self.project(d.x) + "," + (d.y + d.parent.y) / 2
                                        + "L" + self.project(d.x) + "," + d.y
                                  }
                                });

      // 线条动画 
      enterLink.transition()
               .duration(1000)
               .attr("d", function(d) {
                    return "M" + self.project(d.parent.x) + "," + d.parent.y
                          + "L" + self.project(d.parent.x) + "," + (d.y + d.parent.y) / 2
                          + "L" + self.project(d.x) + "," + (d.y + d.parent.y) / 2
                          + "L" + self.project(d.x) + "," + d.y
                });
      // 线条退出
      var exitLink = updateLink.exit().remove();
    }
    // 节点更新
    var updateNode = g.selectAll(".node")
                      .data(this.root.descendants())
    // 节点进入
    var enterNode = updateNode.enter()
                              .append("g")
                              .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
                              .attr("transform", function(d) {
                                if (d.x0) {
                                  return "translate(" + self.project(d.x0) + "," + d.y0 + ")";
                                } else {
                                  return "translate(" + self.project(d.x) + "," + d.y + ")";
                                }
                              });
                                
    enterNode.append("circle")
        .attr("r", 10)
        .attr('fill', 'rgb(49, 130, 189)')
        .attr('stroke-width', function(d) {
          if (d.children || d._children) {
            return '3px';
          } else {
            return 0;
          }
        })
        .attr('stroke', 'rgb(158, 202, 225)')
        .on('click', function(d) {
          self.rootUpdate(d);
        })
    console.log('dd');
    enterNode.append("text")
        .attr("dy", 20)
        .attr("dx", -10)
        //.attr("x", function(d) { return d.children ? -8 : 8; })
        //.style("text-anchor", function(d) { return d.children ? "end" : "start"; })
        .text(function(d) {
          return d.data.name;});
    // 节点动画
    enterNode.transition()
             .duration(1000)
             .attr('transform', function(d) {
                return "translate(" + self.project(d.x) + "," + d.y + ")";
             })
    // 节点退出
    updateNode.exit()
              .remove();

    this.root.descendants().forEach(function(d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
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
function drawPic(wrap) {
    var svg = d3.select(wrap).select('svg');
    if (svg.select('image')._groups[0][0]) {
      svg.select('image')
          .attr('x', svg.attr('width') / 2 - 100)
          .attr('y', svg.attr('height') / 2 - 100)
          .attr('xlink:href', '../../../../public/home/images/watermark.png');
    }
    svg.attr("xmlns", "http://www.w3.org/2000/svg");
    var width = svg.attr('width');
    var height = svg.attr('height');
    var svgXml = wrap.innerHTML;
    var image = new Image();
        image.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svgXml)));
    setTimeout(function() {
        //image = document.getElementsByClassName("")
        var canvas = document.createElement("canvas");  //准备空画布
            canvas.width = width;
            canvas.height = height;
        var context = canvas.getContext('2d');  //取得画布的2d绘图上下文
        console.log(image);
        var watermark = new Image();
        watermark.src='../../public/home/images/watermark.png';
        context.drawImage(watermark, canvas.width/2-100, canvas.height/2-100);
        context.drawImage(image, 0, 0);
        // document.body.appendChild(canvas);
        savePic(canvas, "jpg")
    }, 1000);
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
// 左侧栏目展开
$('.graph .graph-nav').children('span').click(function() {
  if ($(this).hasClass('fa-angle-double-left')) {
    $(this).siblings('.nav-2').show().siblings('.nav-1').hide();
    $(this).closest('.graph-nav').css('width', '38px');
    $(this).removeClass('fa-angle-double-left').addClass('fa-angle-double-right');
  } else {
    $(this).siblings('.nav-1').show().siblings('.nav-2').hide();
    $(this).closest('.graph-nav').css('width', '160px');
    $(this).removeClass('fa-angle-double-right').addClass('fa-angle-double-left');
  }
})
// close 
$('.close').click(function() {
  $(this).closest('.close-target').hide();
});





