/*组件*/
	// 创建组件构造器
	var MyComponent = Vue.extend({
		// 选项
		template: "<div>I am a component!</div>"
	});
	// 需注册组件
	//Vue.component(tag, constructor);

	Vue.component("my-component", MyComponent);
	new Vue({
		el: "#component"
	});