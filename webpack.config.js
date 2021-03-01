const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: [
    './main/src/index.js',
    './main/src/index.scss'
  ],
  plugins: [
    new CleanWebpackPlugin(),  // removes outdated assets from the output dir
    new WebpackManifestPlugin(),  // generates the required manifest.json file
    new MiniCssExtractPlugin(),
  ],
  output: {
    publicPath: '',
    filename: '[name].[contenthash].js',  // renames files from example.js to example.8f77someHash8adfa.js
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/, //regex for css files
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
          {
            // Check https://webpack.js.org/loaders/postcss-loader/#plugins for more details
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            }
          },
          { loader: "sass-loader" } // compiles Sass to CSS
        ]
      }
    ]
  }
};