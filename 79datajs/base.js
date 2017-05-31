//用户登录后初始化提醒消息的小铃铛
if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){ ////如果不为IE6-9
  new WOW().init();
};
var array_province = new Array();
array_province[11] = '北京';
array_province[12] = '天津';
array_province[13] = '河北';
array_province[14] = '山西';
array_province[15] = '内蒙古';
array_province[21] = '辽宁';
array_province[22] = '吉林';
array_province[23] = '黑龙江';
array_province[31] = '上海';
array_province[32] = '江苏';
array_province[33] = '浙江';
array_province[34] = '安徽';
array_province[35] = '福建';
array_province[36] = '江西';
array_province[37] = '山东';
array_province[41] = '河南';
array_province[42] = '湖北';
array_province[43] = '湖南';
array_province[44] = '广东';
array_province[45] = '广西';
array_province[46] = '海南';
array_province[50] = '重庆';
array_province[51] = '四川';
array_province[52] = '贵州';
array_province[53] = '云南';
array_province[54] = '西藏';
array_province[61] = '陕西';
array_province[62] = '甘肃';
array_province[63] = '青海';
array_province[64] = '宁夏';
array_province[65] = '新疆';
function login(obj){
    $(".rigister").stop().animate({
     top: "-370%"
     });
    $("#pop_login").stop().animate({
     top: "141px"
     });
    $("#mask").show();
}
function register(obj){
    $(".login_pop").stop().animate({
     top: "-370%"
     });
    $("#pop_rigister").stop().animate({
     top: "141px"
     });
    $("#mask").show();
}
function forgetPWD(obj){
    $("#forget").on("click",function(){
    $(".login_pop").stop().animate({
     top: "-370%"
     });
    $("#findPwd").show();
    $("#findPwd-tel").val($("#telephone1").val());

  })
}
// 检查注册格式函数
function register_check(id,pass1,pass2){
  var register_input = $("#"+id+" .input");
   var pass1 = $("#"+id+" ."+pass1).val();
     var pass2 = $("#"+id+" ."+pass2).val();
   for(var i=0;i<register_input.length;i++){
            if(register_input[i].value==""){
                var css=$.toast({
                              text: '不能有空值',
                              icon: 'warning',
                              loader: false,
                              position: 'top-center'
                            });
                              eval(css);
                register_input[i].focus();
                return false;
            }else if(pass1=="" || pass2==""){
                var css=$.toast({
                              text: '密码不能为空',
                              icon: 'warning',
                              loader: false,
                              position: 'top-center'
                            });
                              eval(css);
                return false;
            }else if(pass1!=pass2){
                var css=$.toast({
                              text: '密码不一致',
                              icon: 'warning',
                              loader: false,
                              position: 'top-center'
                            });
                              eval(css);
                return false;
            }
        }
}
// 搜索放大镜效果的变换
$(function(){
	$("#add").mouseover(function(){
    $(this).find("i").addClass("search2");
    $(this).find("i").removeClass("search1");
   }).mouseout(function(){
    $(this).find("i").addClass("search1");
    $(this).find("i").removeClass("search2");
   })
})
// 用户下拉菜单的动画
$(function() {
  $(".headImg").mouseenter(function() {
    $(".dropdown-menu").css("display", "block");
  }).mouseleave(function() {
    $(".dropdown-menu").css("display", "none");
  });
})
// 首页搜索框的重写
$(function(){
  var inpus=$(".searBar").get();
  inpus.forEach(function(inpu){
  $(inpu).focus(function(){
    var len=$(inpu).closest("form").siblings(".historyList").children();
    if(len.length<=1){
    $(".historyList").hide();
    }else{
      $(inpu).closest("form").siblings(".historyList").show();
    }
  })
})
  $(".searBar").on("click", function() {
    var len = $(this).closest("form").siblings(".historyList").children();
    if (len.length <= 1) {
      $(this).closest("form").siblings(".historyList").hide();
    } else {
      $(this).closest("form").siblings(".historyList").show();
    }
  })
})
$(function(){
    // 选择地区添加样式  
    $(".search .select").click(function(event){
      // console.log('sleeleclick', $("#selectCom"));
       event.stopPropagation();
       $("#selectCom").show();
       $("#mask").show();
       $(this).find("#getPos").next().removeClass("fa-angle-right");
       $(this).find("#getPos").next().addClass("fa-angle-down");
    });
    $(".search .select").mouseenter(function(){
      $(this).find("#getPos").next().removeClass("fa-angle-right");
      $(this).find("#getPos").next().addClass("fa-angle-down");
    }).mouseleave(function(){
      $(this).find("#getPos").next().removeClass("fa-angle-down");
      $(this).find("#getPos").next().addClass("fa-angle-right");
    })
    // 点击触发事件关闭弹窗
    document.onclick=function(event){
      var target=event.target.id;
      if(target=="mask"){
         $("#selectCom").hide();
        $("#mask").hide();
      }
    } 
  // 选择历史记录
  $(".historyList li .del").on("click",function(){
        $(this).closest("li").remove();
        $("#search_text").val("");
    })
  $(".historyList li").on("click",function(){
    if($(this).attr("class") == "clearHistory"){
    }else{
    $("#search_text").val($(this).find('a:first').text());
    $(".historyList").hide();
    }
  })
  $(document).click(function (event) {
        var target =event.target.id;
           if (target == "historyList") {
              $(".historyList").show(); 
           }else if(target == "search_text"){
             if($(".historyList li").length < 2){
                 $(".historyList").hide(); 
              }
          }else{
            $(".historyList").hide(); 
          }
  })
  // 清空所有
  $(".historyList .clearHistory a").on("click",function(){
     if($(this).closest(".clearHistory").attr("class") == "clearHistory"){
      $(this).closest("li").siblings().remove();
      $(this).text("无历史记录");
      $(".historyList").hide();
    }
  })
  // 登陆 聚焦样式
  $(".panel form input").click(function(){
    $(this).css({"box-shadow":"0 0 8px rgb(225, 159, 20)","border":"1px solid #ff9f14"});
    if($(this).attr("id") == "code"){    
      $(this).siblings().css({"width": "100px","height": "34px","line-height": "34px", "background-position": "0 -91px"})
    }else if($(this).attr("id") == "code1"){    
      $(this).siblings().css({"width": "100px","height": "40px","line-height": "40px", "background-position": "0 -91px"})
    }else{
      $(this).siblings().css({"background-position": "0 -22px","outline:":"none"});
    }

    if($(this).attr("id") == "pwd1" || $(this).attr("id") == "paswd1" ||$(this).attr("id") == "paswd2"){

    $(this).closest("li").find("i").css({"width": "22px","height": "22px", "background-position": "0 0"});
    $(this).closest("li").siblings().find("i").css({"width": "22px","height": "24px", "background-position": "0px  -114px"});
    
    }else if($(this).attr("id") == "tel" || $(this).attr("id") == "telephone1" || $(this).attr("id") == "telephone" || $(this).attr("id") == "rigister-tel"){
      $(this).closest("li").find("i").css({"width": "22px","height": "24px", "background-position": "0px  -91px"});
        $(this).closest("li").siblings().find("i").css({"width": "22px","height": "24px","background-position": "0px  -22px"});
    }
        $(this).closest("li").siblings().find("input").css({"box-shadow":"none","border":"1px solid #d1d7e0"});
  })
})

// 获取hash参数
function getHash(str) {
  var hash = window.location.hash.trim();
  if (!hash || !hash.match(str)) {
    return null;
  } else {
    var index = hash.indexOf('&' + str + '=');
    var start = hash.indexOf('=', index);
    var end = hash.indexOf('&', start) == -1 ? hash.length : hash.indexOf('&', start);
    if (hash.slice(start + 1, end) === 'null') {
      return null;
    }
    return decodeURI(hash.slice(start + 1, end));
  }
}

// 设置hash参数
function setHash(str, param) {
  var hash = window.location.hash.trim();
  if ((!hash || !hash.match(str)) && param === null) {
    return hash;
  } else if (!hash || !hash.match(str)) {
    return window.location.hash + '&' + str + '=' + param;
  } else if (param === null) {
    var index = hash.indexOf('&' + str);
    var start = hash.indexOf('=', index);
    var end = hash.indexOf('&', start) == -1 ? hash.length : hash.indexOf('&', start);
    return hash.slice(0, index) + hash.slice(end);
  } else {
    var index = hash.indexOf('&' + str);
    var start = hash.indexOf('=', index);
    var end = hash.indexOf('&', start) == -1 ? hash.length : hash.indexOf('&', start);
    return hash.slice(0, start + 1) + param + hash.slice(end);
  }
}
// 获取search参数
function getSearch(str) {
  var search = decodeURI(window.location.search.trim());
  if (!search || !search.match(str)) {
    return null;
  } else {
    var index = search.indexOf('&' + str + '=');
    var start = search.indexOf('=', index);
    var end = search.indexOf('&', start) == -1 ? search.length : search.indexOf('&', start);
    return decodeURI(search.slice(start + 1, end));
  }
}

// 设置search参数
function setSearch(str, param) {
  var search = decodeURI(window.location.search.trim());
  if ((!search || !search.match(str)) && param === null) {
    return search;
  } else if (!search || !search.match(str)) {
    return window.location.search + '&' + str + '=' + param;
  } else if (param === null) {
    var index = search.indexOf('&' + str);
    var start = search.indexOf('=', index);
    var end = search.indexOf('&', start) == -1 ? search.length : search.indexOf('&', start);
    return search.slice(0, index) + search.slice(end);
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
  if ((!search || !search.match(str)) && param === null) {
    return search;
  } else if (!search || !search.match(str)) {
    return window.location.search + '&' + str + '=' + param;
  } else if (param === null) {
    var index = search.indexOf('&' + str);
    var start = search.indexOf('=', index);
    var end = search.indexOf('&', start) == -1 ? search.length : search.indexOf('&', start);
    return search.slice(0, index) + search.slice(end);
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
// 搜索地区选择 样式切换 
function changeSearch() {
    $(this).closest(".search").find("#SearProv").next().removeClass("fa-angle-right");
    $(this).closest(".search").find("#SearProv").next().addClass("fa-angle-down");
    $(this).addClass("active").closest("tr").siblings().find("a").removeClass("active");
    $(this).addClass("active").closest("li").siblings().find("a").removeClass("active");
    $("#selectCom").hide();
    $("#mask").hide();
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


  
