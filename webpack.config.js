const path = require('path');

const clientConfig = {
  entry: "./src/public/app.ts",
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
  mode: 'development',
  target: 'web'
};

const serverConfig = {
  entry: "./src/server.ts",
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
    filename: 'server.js',
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

// module.exports = {
//   entry: {
//     app: './src/public/app.ts',
//     server: './src/server.ts'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         use: 'ts-loader',
//         exclude: /node_modules/
//       }
//     ]
//   },
//   resolve: {
//     extensions: [ '.ts', '.tsx', '.js' ]
//   },
//   output: {
//     filename: '[name].js',
//     path: path.resolve(__dirname, 'dist')
//   },
//   mode: 'development',
//   target: 'web',
//   node: {
//     net: 'empty',
//     fs: 'empty',
//     __dirname: false
//   }
// };