const webpack = require("webpack");
const path = require('path');

const srcPath = path.resolve(__dirname, './../../src');
const distPath = path.resolve(__dirname, './../../build');

//#region PRODUCTION DEVELOPMENT
if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";
else process.env.NODE_ENV = process.env.NODE_ENV.trim().toLowerCase();
const production = (process.env.NODE_ENV) ? process.env.NODE_ENV === 'production' : false;
//#endregion

module.exports = {
    srcPath: srcPath,
    distPath: distPath,
    production: production,
    webpackConfig:{
        context: srcPath,
        mode: process.env.NODE_ENV,
        node: { console: true, fs: 'empty', net: 'empty', tls: 'empty' },
        optimization:{

        },
        devtool: !production ? 'inline-source-map' : 'source-map',
        resolve: {
            extensions: ["*", ".json", ".ts", ".tsx", ".js"],
            alias: { 
                "@shared": path.join(srcPath, 'shared'),
                "@server": path.join(srcPath, 'server2'),
                "@client": path.join(srcPath, 'client2'),
                "@modules": path.join(srcPath, 'modules'),
            },
            modules: [ "src", "node_modules" ],
            mainFields: ['browser', 'main', 'module'],
        },
        module: {
            rules:[
                // -- typescript
                {
                    test: /.tsx?$/,
                    exclude: [ /node_modules/ , path.resolve(srcPath, 'node_modules')],
                    include: path.resolve(srcPath),
                    use: [
                        { loader: 'babel-loader' },
                        { loader: 'ts-loader' }
                    ]
                },
                // -- javascript
                {
                    test: /.jsx?$/,
                    loader: ['babel-loader'],
                    exclude: [ /node_modules/ , path.resolve(srcPath, 'node_modules')],
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            })
        ],
        stats: {
            colors: true,
            hash: false,
            version: false,
            timings: false,
            assets: false,
            chunks: false,
            modules: false,
            reasons: false,
            children: false,
            source: false,
            errors: true,
            errorDetails: true,
            warnings: false,
            publicPath: false
        }
    }
}