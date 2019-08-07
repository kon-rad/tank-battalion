const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: './',
  },
  resolve: {
    modules: [ path.resolve(__dirname, 'src/js'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader?sourceMap',
            options: {
              sourceMap: true,
              sourceMapContents: false
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|webp|png|JPG)$/,
        use:[
          'file-loader'
        ],
      },
      {
        test: /\.(woff|woff2|eot|otf|ttf)$/,
        use: [
          'file-loader'
        ]
      },
    ]
  },
};