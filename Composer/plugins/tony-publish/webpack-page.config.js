const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/page/index.tsx',
  mode: 'production',
  output: {
    filename: 'page.js',
    path: resolve(__dirname, 'dist'),
  },
  externals: {
    // expect react & react-dom to be available in the extension host iframe
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  module: {
    rules: [{ test: /\.tsx?$/, use: 'ts-loader' }],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/ui/index.html',
    }),
  ],
};
