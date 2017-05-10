/**
 * Created by Administrator on 2016/10/31.
 */
//$(function(){
//    $("#addPage").click(function(){
//        $("#mask").css("display","block");
//        $(".pop_up").css("display","block");
//        $.ajax({
//            type: "POST",
//            url: "/admin.php?namespace=co&controller=index&action=ListWidget",
//            success: function(data){
//                var result=eval("("+data+")") ;
//                var id;
//                for(var i=0;i<result.length;i++){
//                    var str='<li > <a id="'+result[i].english_name+'">'+result[i].name+'</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span>'+result[i].desc+'</span> </li>';
//                   console.log(str)
//                    id=result[i].english_name;
//                    $("#pop_content").append(str);
//                    console.log(id)
//                    $("#"+result[i].english_name).addEventListener("click",(function(i){
//                        return function(){
//                            $("#mask").css("display","none");
//                            $(".pop_up").css("display","none");
//                            $("#addPos").load("module/text.html  #'+result[i].english_name+'");
//                        }
//                    })(i))
//                    //$("#"+id).click(function(){
//                    //    console.log(result[i].english_name)
//                    //    $("#mask").css("display","none");
//                    //    $(".pop_up").css("display","none");
//                    //    $("#addPos").load("module/text.html  #'+result[i].english_name+'");
//                    //    return  false;
//                    //})
//                }
//
//            }
//        })
//    })
//
//
//
//})
var app=angular.module("myapp",['ngSanitize'])
    app.controller("myCtrl",function($scope,$http, $compile){
        $scope.name={
            test:"测试11"
        };
    $scope.borderBg=false;
    $scope.ifMove=false;
    $scope.pencil=false;
    $scope.nohide=true;
    $scope.data_left = 0;
    $scope.data_right = 0;
    $scope.luo = "shuaigezhu";
        //将数据库的模块名称显示到页面上
        $http({
            method :'POST',
            url : "/admin.php?namespace=co&controller=index&action=ListWidget",
        }).success(function(response) {
            console.log(response)
            $scope.widgetItemList=response;
        }).error(function(){
            console.log("读取数据失败")
        });
    //编辑页面
    $scope.editPage=function(){
        $scope.borderBg=true;
        $scope.ifMove=true;
        $scope.nohide=false;
        $scope.pencil=true;
    }
    //保存页面
    $scope.savePage=function(){
        $scope.nohide=true;
        $scope.pencil=false;
        $scope.borderBg=false;
        $scope.ifMove=false;

    }
    //添加页面
        $scope.addPage=function(){
            $("#mask").css("display","block");
            $(".pop_up").css("display","block");

        }
//    关闭窗口
    $scope.close=function(){
        $("#mask").css("display","none");
        $(".pop_up").css("display","none");
    }
// 添加具体的功能
    $scope.addWidget=function($event){
        $("#mask").css("display","none");
        $(".pop_up").css("display","none");
        $scope.nohide=true;
        $scope.pencil=false;
        $scope.borderBg=false;
        $scope.ifMove=false;
        console.log("加载成功")
        $event.preventDefault();
    }
//    移除小控件
    $scope.removeWidget1 = function ($event, id) {
        $scope.addModelShow = false;
        $scope.dd = id;
        console.log(dd)
        console.log(id);
        console.log("加载成功")
        $event.preventDefault();
    }
    //    自定义服务
    //    app.factory("myService",function($http){
    //        var publicUrl="/admin.php?namespace=co&controller=index&action=InitWidget";
    //        var runUserRest=function(pos){
    //            return $http({
    //                    method: 'POST',
    //                url:publicUrl+'&pos='+pos,
    //                }).success(function (response) {
    //                    console.log("response", response);
    //                    $scope.widgetItem= response;
    //                    angular.forEach($scope.widgetItem, function (item, index) {
    //                        var widgetName = $scope.widgetItem[index].widgets.english_name;
    //                        console.log("widgetName", $scope.widgetItem);
    //                        $http.get("/admin.php?namespace=co&controller=widget&action=" + widgetName)
    //                            .success(function (data) {
    //                                console.log("data", data);
    //                                $scope.widgetItem[index].control_name = data;
    //                            }).error(function () {
    //                            console.log("加载控件内容失败 ");
    //                        });
    //                    });
    //                }).error(function () {
    //                    alert("error");
    //                })
    //        }
    //        return {
    //            events:function(pos){
    //                return runUserRest(pos);
    //            }
    //        }
    //
    //
    //    })
    //    app.controller("mode1Ctrl",function($scope,myService){
    //        $scope.widgetItem2=myService.runUserRest(2)
    //    })
    $http({
        url: "/admin.php?namespace=co&controller=index&action=InitWidget",
        method: 'POST',
    }).success(function (response) {
        $scope.widgetItem1 = response;
        $scope.data_right += response.length;
        console.log(response.length, "dddddddddddd");
        angular.forEach($scope.widgetItem1, function (item, index) {
            var widgetName = $scope.widgetItem1[index].widgets.english_name;
            console.log("widgetName", widgetName);
            $http.get("/admin.php?namespace=co&controller=widget&action=" + widgetName)
                .success(function (data) {
                    $scope.widgetItem1[index].control_name = data;
                    $compile()($scope)
                    $scope.data_left++;
                    $scope.msg = {
                        time: "2013-11-11",
                        complete: 30,
                        article: 20,
                        relay: 33,
                        grow: 20,
                        content: [
                            {
                                start: "2012-22-12",
                                end: "2013-01-33",
                                done: 2,
                                section: 2
                            },
                            {
                                start: "2012-22-12",
                                end: "2013-01-33",
                                done: 5,
                                section: 20
                            },
                            {
                                start: "2012-22-12",
                                end: "2013-01-33",
                                done: 2,
                                section: 23
                            }
                        ]
                    }
                })
                .error(function () {
                    console.log("加载控件内容失败 ");
            });
        });
    })  
    .error(function () {
        alert("error");
    })
    $http({
        url: "/admin.php?namespace=co&controller=index&action=InitWidget",
        params:{'pos':'2'},
        method: 'POST',
    }).success(function (response) {
        $scope.widgetItem2 = response;
        $scope.data_right += response.length;
        angular.forEach($scope.widgetItem2, function (item, index) {
            var widgetName = $scope.widgetItem2[index].widgets.english_name;
            $http.get("/admin.php?namespace=co&controller=widget&action=" + widgetName)
                .success(function (data) {
                    $scope.widgetItem2[index].control_name = data;
                    $scope.data_left++;
                }).error(function () {
                console.log("加载控件内容失败 ");
            });
        });
    }).error(function () {
        alert("error");
    })
        $http({
            url: "/admin.php?namespace=co&controller=index&action=InitWidget",
            params:{'pos':'3'},
            method: 'POST',
        }).success(function (response) {
            $scope.widgetItem3 = response;
            $scope.data_right += response.length;
            angular.forEach($scope.widgetItem3, function (item, index) {
                var widgetName = $scope.widgetItem3[index].widgets.english_name;
                $http.get("/admin.php?namespace=co&controller=widget&action=" + widgetName)
                    .success(function (data) {
                        $scope.widgetItem3[index].control_name = data;
                        $scope.data_left++;
                    }).error(function () {
                    console.log("加载控件内容失败 ");
                });
            });
        }).error(function () {
            alert("error");
        })
        $http({
            url: "/admin.php?namespace=co&controller=index&action=InitWidget",
            params:{'pos':'4'},
            method: 'POST',
        }).success(function (response) {
            $scope.widgetItem4 = response;
            $scope.data_right += response.length;
            angular.forEach($scope.widgetItem4, function (item, index) {
                var widgetName = $scope.widgetItem4[index].widgets.english_name;
                $http.get("/admin.php?namespace=co&controller=widget&action=" + widgetName)
                    .success(function (data) {
                        $scope.widgetItem4[index].control_name = data;
                        $scope.data_left++;
                    }).error(function () {
                    console.log("加载控件内容失败 ");
                });
            });
        }).error(function () {
            alert("error");
        })
        $http({
            url: "/admin.php?namespace=co&controller=index&action=InitWidget",
            params:{'pos':'5'},
            method: 'POST',
        }).success(function (response) {
            $scope.widgetItem5 = response;
            $scope.data_right += response.length;
            console.log()
            angular.forEach($scope.widgetItem5, function (item, index) {
                var widgetName = $scope.widgetItem5[index].widgets.english_name;
                 $http.get("/admin.php?namespace=co&controller=widget&action=" + widgetName)
                    .success(function (data) {
                        $scope.widgetItem5[index].control_name = data;
                        $scope.data_left++;
                    }).error(function () {
                    console.log("加载控件内容失败 ");
                });
            });
        }).error(function () {
            alert("error");
        })
})
app.filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        }
    }]
);
app.directive("ngHtmlCompile", function($compile, $timeout) {
    return {
        restrict: "AEC",
        link: function(scope, element, attrs) {
            scope.$watch("data_left", function(newValue, oldValue) {
                console.log(scope.data_left, scope.data_right)
                if (scope.data_left == scope.data_right) {
                    $timeout(function() {
                        $compile(element.contents())(scope);
                            /*angular.element( ".calendar" ).datepicker({
                                inline: true,
                                dateFormat: "yy-mm-dd",
                                buttonImage: "../images/index/time.",
                            });*/
                    }, 100);
                }
            });
           /* return {
                pre: function(telement, tattrs, transclude) {
                    console.log(scope, element, attrs);
                    console.log(telement, tattrs, transclude);                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
                },
                post: function(sceope, ele, attrs) {

                }
            }*/
        }
    }
});

/*app.directive("ngHtmlCompile", ["$compile", function($compile) {
        return {
            replace: true,
            restrict: 'EA',
            link: function(scope, elm, iAttrs) {
                var DUMMY_SCOPE = {
                        $destroy: angular.noop
                    },
                    root = elm,
                    childScope,
                    destroyChildScope = function() {
                        (childScope || DUMMY_SCOPE).$destroy();
                    };

                iAttrs.$observe("html", function(html) {
                    if (html) {
                        destroyChildScope();
                        childScope = scope.$new(false);
                        var content = $compile(html)(childScope);
                        root.replaceWith(content);
                        root = content;
                    }

                    scope.$on("$destroy", destroyChildScope);
                });
            }
        };
    }])
*/