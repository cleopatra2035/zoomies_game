const path = require('path');

module.exports = {
    context: __dirname,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
        filename: './bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: ["@babel/plugin-proposal-optional-chaining"],
                        exclude: /node_modules/
                    }
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            // you can specify a publicPath here
                            // by default it uses publicPath in webpackOptions.output
                            name: "[name].[ext]",
                            outputPath: "images/",
                            publicPath: "images/"
                        }
                    }
                ]
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: [".js"],
    }
};
