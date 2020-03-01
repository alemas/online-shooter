const path = require('path');
const copyWebPackPlugin = require('copy-webpack-plugin');

const clientConfig = {
  entry: "./src/client/app.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js' ]
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist/public')
  },
  plugins: [
    new copyWebPackPlugin([
      {
        from: path.resolve(__dirname, "./src/client/index.html"),
        to: path.resolve(__dirname, "dist")
      },
      {
        from: path.resolve(__dirname, "./src/client/assets"),
        to: path.resolve(__dirname, "dist/public/assets")
      }
    ])
  ],
  mode: 'development',
  target: 'web'
};

const serverConfig = {
  entry: "./src/server/app.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js' ]
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  target: 'node',
  node: {
    net: 'empty',
    fs: 'empty',
    __dirname: false
  }
};

module.exports = [clientConfig, serverConfig];