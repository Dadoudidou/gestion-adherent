const nodeExternals = require('webpack-node-externals');
const merge = require("webpack-merge");
const baseConfig = require("./base.config");

module.exports = merge(baseConfig.webpackConfig, {
    name: "Server",
    entry: "server2/server.ts",
    output: {
        path: baseConfig.distPath,
        filename: "server.js",
        publicPath: "/static/"
    },
    target: "node",
    externals: [ nodeExternals(), 'pg', 'sqlite3', 'tedious', 'pg-hstore'],
});