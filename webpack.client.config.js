const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'build/static');

const plugins = [
    new HTMLWebpackPlugin({
        title: 'Dev server',
        template: path.resolve(__dirname, 'src/client/index.ejs'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
    }),
];

/*if (process.env.NODE_ENV === 'analyse') {
    plugins.push(new BundleAnalyzerPlugin());
}*/

module.exports = {
    context: srcPath,
    target: 'web',
    entry: {
        client: `${srcPath}/client/index.tsx`,
        vendor: ['react', 'react-dom'],
    },
    output: {
        path: distPath,
        filename: 'js/[name].js',
        publicPath: '/static/',
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['*', '.js', '.json', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /.tsx?$/,
                loader: ['babel-loader','ts-loader'],
                exclude: [ /node_modules/ , path.resolve(__dirname, 'node_modules')],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: { compact: false },
            },
        ],
    },
    plugins,
    devtool: 'source-map',
};