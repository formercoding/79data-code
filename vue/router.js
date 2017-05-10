/*var Vue = require("vue");
var VueRouter = require("vue-router");*/

Vue.use(VueRouter);

// 定义组件
var Foo = {
	template: "<p>this is foo!</p>" + 
			  "<router-view></router-view>"
}

var Bar = {
	template: "<p>this is bar!</p>" +
			  "<router-view></router-view>"

}

// 路由器需要一个组件
// 出于演示的目的，这里使用一个空的组件，直接使用html作为应用的模板
var App = {}

// 创建一个路由器实例
// 创建实例时可以传入配置参数进行定制，为保持简单，这里使用默认配置

var router = new VueRouter();

// 定义路由规则
// 每条路由规则应该映射到一个组件，这里的组件可以是一个
// 使用vue.extend创建的组件构建函数，也可以是一个组件选项对象

router.map({
	"/foo": {
		component: Foo,
		// 在/foo下设置一个路由
		subRouters: {
			// 默认子路由
			"/": {
				component: {
					template: "<p>default sub view foo</p>"
				}
			},
			"/bar": {
				// 一个bar组件
				component: Bar // 路由会隐式调用 Vue.extend
			}
			
		}
	},
	"bar": {
		component: Bar
	}
});

// 启动应用
// 路由器会创建一个app实例 并且挂载在#app匹配的元素上

router.start(App, "#app");


