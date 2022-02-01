const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack')


module.exports = {
  entry: {
    index: path.resolve(__dirname, './src/pages/index.tsx'),
    'reset.css': './src/public/css/destyle.css',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['index'],
      template: path.resolve(__dirname, './src/public/template.html'),
      filename: 'index.html',
      title: 'index',
    }),
    new Dotenv()
  ],
  module: {
    rules: [
      {
        test: [/\.tsx?$/, /\.ts?$/],
        use: [{ loader: 'babel-loader' }, { loader: 'ts-loader' }],
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.(png|jpg|gif|ico)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name:'./src/public/[name].[ext]'
            }
          },
        ],
        type: 'javascript/auto'
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  target: ['web', 'es6'],
};