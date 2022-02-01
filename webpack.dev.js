const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

console.log(
  '///////////////////////////\n' + 'webpack.dev.js is loaded.\n' + '///////////////////////////\n',
);
process.env.NODE_ENV = 'development';

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: {
      rewrites: [
        { from: /\/index/, to: '/index.html' },
      ],
    },
  },
});