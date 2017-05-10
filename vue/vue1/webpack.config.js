module.exports = {
    entry: './entry.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    resolve: {
	  alias: {
	    'vue$': 'vue/dist/vue.common.js'
	 }
}
}