const path = require('path');

module.exports = {
  entry: {
    pedido: './pupuseriaApp/static/js/pedido.tsx',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'pupuseriaApp/static/dist'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'pupuseriaApp/static'),
    },
  },
};

