const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

  entry: {
    index: './src/scripts/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader?sourceMap' // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader?sourceMap' // compiles Sass to CSS, using Node Sass by default
          },{
            loader:'postcss-loader?sourceMap',
            options: {
              sourceMap: 'source-map'
            }
          }
        ]
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new WebpackBar(),
    new MiniCssExtractPlugin({}),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin({

    }),
    new webpack.DefinePlugin({
      MY:JSON.stringify('my')
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true

      /**
       * Minification
       */
      // collapseWhitespace: true,
      // removeComments: true,
      // removeRedundantAttributes: true,
      // removeScriptTypeAttributes: true,
      // removeStyleLinkTypeAttributes: true,
      // useShortDoctype: true
    })
  ],
  resolve: {
    extensions: ['.ts', '.js', '.scss']
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 9000,
    open: true,
    hot:true
  },
  mode: 'development',
  watch: true
};
