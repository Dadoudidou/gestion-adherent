// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const webpack = require('webpack');
const path = require('path');

module.exports = (baseConfig, env, defaultConfig) => {

    defaultConfig.plugins.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify("development")
        })
    )

    defaultConfig.resolve.alias = {
        ...defaultConfig.resolve.alias,
        "@shared": path.join(__dirname, '../src/shared'),
        "@server": path.join(__dirname, '../src/server2')
    }

    defaultConfig.resolve.extensions.push('.ts', '.tsx');
    defaultConfig.module.rules.push({
        test: /.tsx?$/,
        //include: path.resolve('./../src'),
        exclude: [
            /node_modules/, 
            path.resolve(__dirname, '../node_modules'), 
            path.resolve(__dirname, "../src/server"),
            path.resolve(__dirname, "../src/server2"),
            path.resolve(__dirname, "src/server"),
            path.resolve(__dirname, "src/server2")
        ],
        use: [
            { loader: 'babel-loader' },
            { loader: 'ts-loader' }
        ]
    })

    defaultConfig.module.rules.push({
        test: /\.scss$/,
        include: path.resolve('./../'),
        use: ['style-loader', "css-loader", "sass-loader"]
    })



    return defaultConfig;

};
