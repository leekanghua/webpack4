const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')

const prodConfig = {
  mode: 'production',
  // devtool: 'cheap-module-source-map',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
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
    }),
    // 配置pwa
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    }),
    new BundleAnalyzerPlugin()
  ],
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js'
  }
}

module.exports = merge(commonConfig,prodConfig)