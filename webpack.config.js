var path = require('path');

module.exports = {
    entry: {
        'live': './app/live.js',
        'redux': './app/redux.js',
        'react-redux': './app/react-redux.js',
        'combine-reducers': './app/combine-reducers.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            }
        ]
    },
    node: {
        fs: "empty",
        readline: "empty"
    },
    resolve: {
        alias: {
            Modules: path.resolve(__dirname, 'app/modules/')
        },
        extensions: ['.js', '.jsx', '.scss']
    }
};
