const path = require('path')
const HtmlWebpackPligin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        use: {
          loader: 'url-loader',       // file-loader 只能将图片转成base64的图片
          options: {
            name: '[name].[ext]',
            outputPath: 'image',
            limit:10240
          }
        }
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use:[
          {
            loader: 'url-loader',
            options: {
              limit:5000,
              name: '[name].[ext]',
              outputPath: 'iconfont'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
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
          'style-loader',
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
          'style-loader',
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
          'style-loader',
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
    splitChunks: {
      chunks: 'all',   //initial 同步代码  async 异步代码
      minSize: 30000
    }
  },
  plugins: [ 
    new HtmlWebpackPligin({
      template: 'src/index.html',
      favicon: path.resolve('favicon.ico') 
    }),
    new CleanWebpackPlugin()
  ]
}