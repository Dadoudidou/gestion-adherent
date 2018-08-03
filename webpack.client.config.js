const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

//#region PRODUCTION DEVELOPMENT
if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";
else process.env.NODE_ENV = process.env.NODE_ENV.trim().toLowerCase();
const production = (process.env.NODE_ENV) ? process.env.NODE_ENV === 'production' : false;
//#endregion

console.log("Compilation en mode PRODUCTION:", production);

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'build/static');

var webpackConfig = {
    context: srcPath,
    mode: process.env.NODE_ENV,
    target: 'web',
    node: { console: true, fs: 'empty', net: 'empty', tls: 'empty' }
};

// -- entries
webpackConfig.entry = {
    client: `${srcPath}/client/index.tsx`,
    vendor: [
        'react', 'react-dom', 
        'react-router', 'react-router-dom',
        'react-apollo', 'apollo-boost',
        'material-ui', 'jss', 'react-jss', 'jss-preset-default',
        'moment', 'isomorphic-fetch', 'deep-extend', 'es6-promise'
    ],
}

// -- output
webpackConfig.output = {
    path: distPath,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    publicPath: '/static/',
}

// -- resolve
webpackConfig.resolve = {
    modules: ['node_modules', 'src'],
    extensions: ['*', '.js', '.json', '.ts', '.tsx'],
    mainFields: ['browser', 'main', 'module'],
    alias: {
        "@shared": path.join(__dirname, 'src/shared')
    }
}

// -- Optimisations
// ---- optimisation vendors.js
webpackConfig.optimization = {};
webpackConfig.optimization.minimize = false;
webpackConfig.optimization.splitChunks = {
    name: 'vendor',
    minChunks: Infinity
}

// ---- compression en production
if (production) {
    webpackConfig.optimization.minimize = true;
    webpackConfig.optimization.minimizer = [
        new UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            },
            mangle: true
        })
    ]
}

// -- plugins
webpackConfig.plugins = []


// ---- node environnement
webpackConfig.plugins.push(
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
);


// ---- serveur de développement
if (!production) {
    webpackConfig.plugins.push(
        new HTMLWebpackPlugin({
            title: 'Dev server',
            chunks: ["main"],
            chunksSortMode: 'dependency',
            template: path.resolve(__dirname, 'src/client/index.ejs'),
        })
    );
    webpackConfig.devServer = {
        hot: false,
        inline: true,
        port: 3081,
        stats: {
            warnings: false
        },
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        proxy: {
            "**": {
                target: "http://localhost/WebPlanning/",
                //secure: false
                changeOrigin: true,
                logLevel: "debug"
            }
        }
    }
}

// -- développement
webpackConfig.devtool = !production ? 'inline-source-map' : 'source-map';

// -- modules
webpackConfig.module = {};
webpackConfig.module.rules = [];

// ---- typescript
webpackConfig.module.rules.push({
    test: /.tsx?$/,
    include: path.resolve('./src'),
    exclude: [/node_modules/, path.resolve(__dirname, 'node_modules')],
    use: [
        { loader: 'babel-loader' },
        {
            loader: 'ts-loader',
            options: {
                transpileOnly: true,
            }
        }
    ]
})

// ---- js
webpackConfig.module.rules.push({
    test: /\.js$/,
    exclude: /(node_modules)/,
    loader: 'babel-loader',
    query: { compact: false },
});

// ---- sass css
const extractCss = new MiniCssExtractPlugin({
    filename: "css/[name].css",
    chunkFilename: "css/[name].css",
    disable: !production,
});
webpackConfig.module.rules.push({
    test: /\.s?css$/,
    use: [
        !production ? 'style-loader' : MiniCssExtractPlugin.loader,
        "css-loader",
        "sass-loader"
    ]
})
webpackConfig.plugins.push(
    extractCss
);

// ---- images
webpackConfig.module.rules.push(
    {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        query: {
            name: "img/img-[name]-[hash:6].[ext]"
        }
    }
);


// ---- fonts
webpackConfig.module.rules.push(
    {
        test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        query: {
            name: "fonts/[name].[ext]",
            publicPath: (!production) ? undefined : "../",
            limit: 10000
        }
    }
);


module.exports = webpackConfig;

/*if (process.env.NODE_ENV === 'analyse') {
    plugins.push(new BundleAnalyzerPlugin());
}*/

/*

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
        minChunks: Infinity
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    extractCss,
    
];
if(production){
    plugins.push(new webpack.optimize.UglifyJsPlugin());
}



//vendor: Object.keys(package.dependencies)

module.exports = {
    context: srcPath,
    target: 'web',
    entry: {
        client: `${srcPath}/client/index.tsx`,
        vendor: [
            'react', 'react-dom', 
            'react-router', 'react-router-dom',
            'react-apollo', 'apollo-boost',
            'material-ui', 'jss', 'react-jss', 'jss-preset-default',
            'moment', 'isomorphic-fetch', 'deep-extend', 'es6-promise'
        ],
    },
    output: {
        path: distPath,
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js',
        publicPath: '/static/',
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['*', '.js', '.json', '.ts', '.tsx'],
        alias: {
            "@shared": path.join(__dirname, 'src/shared')
        }
    },
    optimization: {
        minimize: production ? true : false,
        splitChunks: {
            name: 'vendor',
            minChunks: Infinity
        },
        minimizer: !production ? undefined : [
            new UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_console: true
                },
                mangle: true
            })
        ]
    },
    module: {
        rules: [
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

*/