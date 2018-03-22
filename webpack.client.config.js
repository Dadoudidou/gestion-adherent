const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const webpack = require('webpack');

//#region PRODUCTION DEVELOPMENT
if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";
else process.env.NODE_ENV = process.env.NODE_ENV.trim().toLowerCase();
const production = (process.env.NODE_ENV) ? process.env.NODE_ENV === 'production' : false;
//#endregion


const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'build/static');


const extractCss = new ExtractTextPlugin({
    filename: "css/[name].css",
    disable: !production
});

const plugins = [
    new HTMLWebpackPlugin({
        title: 'Dev server',
        chunksSortMode: 'dependency',
        template: path.resolve(__dirname, 'src/client/index.ejs'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    extractCss
];
if(production){
    plugins.push(new webpack.optimize.UglifyJsPlugin());
}

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
        loaders: [
            // -- ts - tsx
            {
                test: /.tsx?$/,
                include: path.resolve('./src'),
                exclude: [ /node_modules/ , path.resolve(__dirname, 'node_modules')],
                use: [
                    { loader: 'babel-loader' },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        }
                    }
                ]
            },
            // -- js
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: { compact: false },
            },
            // -- sass - css
            {
                test: /\.s?css$/,
                loader: extractCss.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader' },
                        { loader: 'sass-loader'}
                    ]
                })
            },
            // -- images
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                query: {
                    name: "img/img-[hash:6].[ext]",
                    limit: 50
                }
            },
            // -- fonts
            {
                test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
                query: {
                    name: "fonts/[name].[ext]",
                    publicPath: (!production) ? undefined : "../",
                    limit: 10000
                }
            }
        ],
    },
    plugins,
    devtool: !production ? 'inline-source-map' : 'source-map',
    devServer: {
        hot: true,
        inline: true,
        port: 9081,
        stats: {
            warnings: false
        },
        proxy: {
            "*": {
                target: "http://localhost:9080",
                //secure: false
            }
        }
    }
};