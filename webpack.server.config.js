const webpack = require("webpack");
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'build');

module.exports = {
    name: "Server",
    context: srcPath,
    entry: "./server2/server.ts",
    output: {
        path: distPath,
        filename: "server.js",
        publicPath: "/static/"
    },
    target: "node",
    resolve: {
        extensions: [".json", ".ts", ".tsx", ".js"],
        alias: { 
            "@shared": path.join(__dirname, 'src/shared'),
            "@server": path.join(__dirname, 'src/server2'),
            "@modules": path.join(__dirname, 'src/modules')
        },
        modules: [ "src", "node_modules" ]
    },
    externals: [ nodeExternals(), 'pg', 'sqlite3', 'tedious', 'pg-hstore'],
    module: {
        rules: [
            {
                test: /.tsx?$/,
                exclude: [ /node_modules/ , path.resolve(__dirname, 'node_modules')],
                include: path.resolve('./src'),
                use: [
                    { loader: 'babel-loader' },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            configFile : "tsconfig.server.json"
                        }
                    }
                ]
            },
            {
                test: /.jsx?$/,
                loader: ['babel-loader'],
                exclude: [ /node_modules/ , path.resolve(__dirname, 'node_modules')],
            }

        ]
    },
    plugins: [

    ],
    stats: {
        warnings: false
    }
}