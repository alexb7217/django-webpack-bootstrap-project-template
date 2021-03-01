const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {
  entry: [
    './main/src/index.js',
    './main/src/index.css'
  ],
  plugins: [
    new CleanWebpackPlugin(),  // removes outdated assets from the output dir
    new WebpackManifestPlugin(),  // generates the required manifest.json file
  ],
  output: {
    publicPath: '',
    filename: '[name].[contenthash].js',  // renames files from example.js to example.8f77someHash8adfa.js
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/, //regex for css files
        use: [
          {
            loader: "style-loader" //injects CSS into DOM via <link> tag
          },
          {
            loader: "css-loader", //parse and transform CSS file into modules (opt follows)
            options: {
              modules: true,
              importLoaders: 1,
              sourceMap: true,
            }
          }
        ]
      }
    ]
  }
};