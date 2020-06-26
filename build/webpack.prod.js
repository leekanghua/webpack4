const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const commonConfig = require('./webpack.common')

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { 
              importLoaders:1   // 保证@import语法引入的css文件也执行 postcss-loader 这个loader 
            }
          }, 
          'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders:2,
              // modules:true
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders:2,
              // modules:true
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.styl$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders:2,
              // modules:true
            }
          },
          'postcss-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin()
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
}

module.exports = merge(commonConfig,prodConfig)