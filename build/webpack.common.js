const path = require('path')
const HtmlWebpackPligin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
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
        use: {
            loader: 'url-loader',
            options: {
              limit:5000,
              name: '[name].[ext]',
              outputPath: 'iconfont'
            }
          }
      }
    ]
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',   
  //     minSize: 30000
  //   }
  // },
  optimization: {
    usedExports: true,
    splitChunks: {
      // chunks: one of (all, async, initial)
      // all means chunks can be shared even between async and non-async chunks
      chunks: 'all',  

      // minSize: Minimum size, in bytes, for a chunk to be generated.
      minSize: 30000,

      // minRemainingSize: 0,    webpack5.0.0 API
      
      // 进行二次分割
      maxSize: 0,

      // minChunks: Minimum number of chunks that must share a module before splitting.
      minChunks: 1,

      // maxAsyncRequests:  Maximum number of parallel requests when on-demand loading.
      maxAsyncRequests: 6,

      // maxInitialRequests: Maximum number of parallel requests at an entry point.
      maxInitialRequests: 4,
       
      // This option lets you specify the delimiter to use for the generated names. 
      // (e.g. vendors~main.js).
      automaticNameDelimiter: '~', 

      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,

          // If the current chunk contains modules already split out from the main bundle, 
          // it will be reused instead of a new one being generated.
          // This can impact the resulting file name of the chunk.
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [ 
    new HtmlWebpackPligin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico'
    }),
    new CleanWebpackPlugin(),
  ]
}