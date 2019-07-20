const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: './public/',
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
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|jpeg|webp|png|JPG)$/,
        use: 'file-loader',
      },
      {
        test: /\.(woff|woff2|eot|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
          test: /\.ttf$/,
          use: ['ttf-loader']
      }
    ]
  },
};