const path = require('path');
const webpack = require('webpack');
// todo: use gulp for tasks, webpack for js only
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: './',
  },
  devtool: 'eval-source-map',
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
        test: /\.css$/,
        use: [
          'css-loader',
          'resolve-url-loader',
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