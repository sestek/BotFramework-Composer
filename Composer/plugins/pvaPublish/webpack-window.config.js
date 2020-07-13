const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
  entry: './src/ui/index.tsx',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    // the return value of this plugin's bundle / entrypoint
    // library: 'pvaPublishPlugin',
    // libraryTarget: 'window',
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
      //inlineSource: '.js$', // embed all javascript inline
    }),
    //new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
  ],
};
