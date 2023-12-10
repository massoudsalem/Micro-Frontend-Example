const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
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
                    name: 'images/[name].[ext]',
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
            name: 'ReactClient',
            filename: 'remoteEntry.js',
            exposes: {
                './rightSidebar': './src/App.js',
            },
            shared: {
                'react': { singleton: true, eager: true, requiredVersion: '^18.2.0' },
                'react-dom': { singleton: true, eager: true, requiredVersion: '^18.2.0' },
                'react-router-dom': { singleton: true, eager: true, requiredVersion: '^6.12.1' },
            }
        }),
    ],
};
