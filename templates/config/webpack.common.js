const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolvePath = (_path) => path.resolve(__dirname, _path)

module.exports = {
  entry: {
    app: './src/main.tsx'
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: resolvePath('../dist'),
    clean: true
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': resolvePath('../src')
    }
  },
  module: {
    rules: [
      {
        //匹配js或jsx类型的文件
        test: /\.jsx?$/,
        //排除node_modules下的文件，因为node_module下的文件不用我们去处理，人家已经处理过了
        exclude: /node_modules/,
        //使用的loader
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: [resolvePath('../src')],
        use: {
          loader: 'ts-loader'
        }
      }
    ]
  },
  plugins: [
    //生成html文件
    new HtmlWebpackPlugin({
      //使用html模板的目录
      template: resolvePath('../public/index.html'),
      //自动引入打包后的文件，默认值true
      inject: true
    })
  ]
}
