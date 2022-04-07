const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = function(options) {
  return {
    mode: options.mode,
    entry: path.resolve(__dirname, '../src/index.tsx'),
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, '../src'),
      },
    },
    cache: {
      type: 'filesystem',
    },
    devtool: options.devtool || false,
    module: {
      rules: [
        {
          test: /\.[t|j]sx?$/,
          loader: 'esbuild-loader',
          options: {
            loader: 'tsx',
            target: 'es2015',
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
      ],
    },
    devServer: {
      ...options.devServer,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),
      }),
      ...options.plugins,
    ],
    stats: options.stats,
  }
}
