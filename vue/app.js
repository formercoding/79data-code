/*组件*/
	// 创建组件构造器

/** 全局组件构造器	
	var MyComponent = Vue.extend({
		// 选项
		template: 
	});
*/

/** 局部组件构造
	var ParentComponent = Vue.extend({
		template: "<div>I am the parent</div><my-component></my-component>",
		components: {
			// my-componnet组件只能在父组件模板内 即templete中
			"my-component": {
				template: "<div>I am a component!</div>"
			}
		}
	});
*/

	// 需注册组件
	//Vue.component(tag, constructor);

/** 先构造在注册
	Vue.component("parent-component", ParentComponent);
*/	

	// 直接注册 自动调用extend构造
	var ParentComponent = Vue.component("parent-component", {
		template: "#parent-template",
		components: {
			// my-componnet组件只能在父组件模板内 templete中
			"my-component": {
				template: "<div>I am in my componenty</div>"
			}
		}
	});

	// 组件选项问题 el & data
	var data = {a:1};
	var OneComponent = Vue.extend({
		data: data // 所有组件实例将共享一个data对象
	});

	var TwoComponent = Vue.extend({
		data: function() {
			return {a: 1}; // 不会共享一个data对象
		}
	});

	// 异步组件
	Vue.component("async", function(resolve, reject){
		setTimeout(function() {
			resolve({
				template: "<div>I am async</div>"
			});
		}, 2000);
	});

	// 父子组件通信
	// 注册子组件 派发当前消息
	Vue.component("child", {
		template: "#child-template",
		props: {
			item: null,
			items: {
				type: [String, Number],
				required: true
			},
			item2: {
				default: function() {
					return 333;
				}
			}

		},
		data: function() {
			return {
				msg: "hello"
			}
		},
		methods: {
			notify: function() {
				if (this.msg.trim()) {
					this.$dispatch("child-msg", this.msg); // 向上派发事件
					this.msg= "";
				}
			}
		}
	});
	// 初始化父组件 
	// 收到消息时将事件推入一个数组

/**
	Vue.directive("my-directive", function(value) { // update
		console.log(value);
	});
*/	
	Vue.directive("my-directive", {
		params: ["a","b"],
		deep: true, // 监测 obj 嵌套属性变化
		twoWay: true, // 允许指令向实例vm写回数据
		acceptStatement: true, // 可以让指令接受内联语句
		// terminal: true // 未知,
		priority: 1000, // 设置指令优先级,默认为1000 terminal为2000， v-if v-for在编译过程拥有最高优先级
		paramWatchers: { // 检测属性值的回调函数
			a: function(val, oldVal) {
				console.log("a changed!");
			}
		},
		bind: function() {
			// 准备工作
			console.log("demo bound");
			console.log("my-directive-a", this.params.a, this.params.b);
		},
		update: function(newValue, oldValue) {
			// 值更新时的操作
			console.log(this.el);
			this.el.innerHTML = 
				"name - " + this.name + "<br>" +
				"expresstion - " + this.expresstion + "<br>" +
				"argument - " + this.arg + "<br>" +
				"modifiers" + JSON.stringify(this.modifiers) + "<br>" +
				"value - " + newValue + oldValue;
		}, 
		unbind: function() {
			// 清理工作
		}
	});
	Vue.elementDirective("element", {
		bind: function() {
			console.log("element done");
		}
	});

	// 自定义过滤器

	Vue.filter("reverse", function(value) {
		return value.split(" ").reverse().join("");
	});

	// 双向过滤
	Vue.filter("currency", {
		read: function(val, params) { // 视图过滤
			return "$" + params + Number(val).toFixed(2);
		},
		write: function(val, oldVal) { // 模型过滤
			var number = +val.replace(/[^\d.]/g,"");
			return isNaN(number) ? 0 : parseFloat(number.toFixed(2));
		}
	});
	// 定义混合对象
	var myMixin = {
		created: function() {
			this.hello();
		},
		methods: {
			hello: function() {
				console.log("hello from mixin!");
			}
		}
	};
	// 定义一个组件，使用这个混合对象
/**
	var Component = Vue.extend({
		mixins: [myMixin]
	});

	var component = new Component(); // -> "hello from mixin!"
*/

	Vue.component("component-d", {
		mixins: [myMixin]
	});

	Vue.mixin({ // 全局混合
		created: function() {
		}
	});


	var vm = new Vue({
			el: "#app",
			mixins: [myMixin],
			data: {
				value: "",
				dollars: 33,
				b: "",
				newItem: "new item",
				newItems: "ss",
				items: [
					{
						uu_id: "1", text: "item1"
					},
					{
						uu_id: "2", text: "item2"
					}
				],
				obj: {
					name: "luo",
					age: 23,
					love: {first: "game"}
				},
				ok: true,
				class: {"red": false},
				mustache: "<div>I am in mustache</div>",
				message: []
			},
			methods: {
				addItem: function() {
					var item = this.newItem.trim();
					if (item) {
						this.items.push({text: item});
						this.newItem = "";
					}
				},
				removeItem: function(index) {
						this.items.splice(index, 1);
				},
				handleIt: function(msg) {
					this.message.push(msg);
				}
			},
			events: {// 接受子组件派发的事件并响应
				/**  处理子组件触发的事件 如 click
				"child-msg": function(msg) {
					// 事件回调的this自动绑定到注册它的实例上
					this.message.push(msg);
				}*/
			}
	})
	vm.items.$set(2, { uu_id: "3", text: "item2"});
	vm.$set("b", "b"); // 此处设置b a-> 也会响应
	vm.a = 2;
	vm.$nextTick(function() {
		console.log("init finished");
		vm.b = vm.b + 1;
	});



