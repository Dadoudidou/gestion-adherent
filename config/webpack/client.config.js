const nodeExternals = require('webpack-node-externals');
const merge = require("webpack-merge");
const baseConfig = require("./base.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');


var webpackClientConfig = {
    target: "web",
    //externals: [nodeExternals(), 'pg', 'sqlite3', 'tedious', 'pg-hstore'],
    plugins: [],
    module: {
        rules: []
    }
}

// --- name
webpackClientConfig.name = "Client";

// --- entry
webpackClientConfig.entry = {
    client: "client2/index.tsx",
    vendor: [
        'react', 'react-dom',
        'react-router', 'react-router-dom',
        'react-apollo', 'apollo-boost',
        '@material-ui/core', 'jss', 'react-jss', 'jss-preset-default',
        'moment', 'isomorphic-fetch', 'deep-extend', 'es6-promise'
    ],
}

// --- output
webpackClientConfig.output = {
    path: path.join(baseConfig.distPath, "static"),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    publicPath: '/static/',
};

// --- optimization
webpackClientConfig.optimization = {
    minimize: false,
    splitChunks: {
        cacheGroups: {
            vendor: {
                chunks: 'all',
                name: 'vendor',
                test: 'vendor',
                enforce: true
            },
        }
    }
}
if (baseConfig.production) {
    webpackClientConfig.optimization.minimize = true;
    webpackClientConfig.optimization.minimizer = [
        new UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            },
            mangle: true
        })
    ]
}


// --- rules

// ------ sass css
const extractCss = new MiniCssExtractPlugin({
    filename: "css/[name].css",
    chunkFilename: "css/[name].css",
    disable: !baseConfig.production,
});
webpackClientConfig.module.rules.push({
    test: /\.s?css$/,
    use: [
        !baseConfig.production ? 'style-loader' : MiniCssExtractPlugin.loader,
        "css-loader",
        "sass-loader"
    ]
})
webpackClientConfig.plugins.push(extractCss);

// ------ images
webpackClientConfig.module.rules.push({
    test: /\.(png|jpg|gif)$/,
    loader: 'file-loader',
    query: {
        name: "img/img-[name]-[hash:6].[ext]"
    }
});

// ------ fonts
webpackClientConfig.module.rules.push({
    test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader',
    query: {
        name: "fonts/[name].[ext]",
        publicPath: (!baseConfig.production) ? undefined : "../",
        limit: 10000
    }
});


module.exports = merge(baseConfig.webpackConfig, webpackClientConfig);