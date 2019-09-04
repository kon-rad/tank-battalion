const path = require('path');
const webpack = require('webpack');
// todo: migrate all build process from gulp to webpack
// todo: need to load images from html, plus no css is showing
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