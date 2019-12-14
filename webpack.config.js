const path = require('path');
module.exports = {
  entry: {
    index: './src/js/index.js',
    privacy: './src/js/privacy.js',
    terms: './src/js/terms.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/js'),
  },
  devtool: 'source-map'
};