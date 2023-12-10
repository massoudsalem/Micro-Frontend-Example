const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', ['@babel/preset-react', { "runtime": "automatic" }]],
                    },
                },
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images',
                    publicPath: 'images',
                    emitFile: true,
                    esModule: false,
                },
            },
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            'React': 'react',
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
        }),
        new ModuleFederationPlugin({
            name: 'HostApp',
            filename: 'remoteEntry.js',
            remoteType: 'var',
            remotes: {
                ReactClient: "ReactClient",
                AngularClient:"AngularClient",
            },
            shared: {
                ...Object.assign({}, ...Object.keys(deps).map((dep) => ({
                    [dep]: {
                        singleton: true,
                        requiredVersion: deps[dep],
                        eager: true,
                    }
                }))),
            },
        }),
    ],
};
