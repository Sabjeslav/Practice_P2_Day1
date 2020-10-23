var path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    //...
    context: path.resolve(__dirname, 'src'),
    entry: './main.js',
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        compress: true,
        port: 8080
    }
};
