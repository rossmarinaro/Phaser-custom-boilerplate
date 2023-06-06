const port = process.env.PORT || 9000,

  webpack = require('webpack'),
  path = require('path'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  entry: ['./src/scripts/core/Application.ts', './webpack/credits.js'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      'System' : path.resolve(__dirname, '../src/scripts/core/Config')
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          filename: '[name].bundle.js'
        }
      }
    }
  },
  module: {

     rules: [
       {
         test: [/\.vert$/, /\.frag$/],
         use: 'raw-loader'
       },
       {
         test: /\.(gif|png|ogg|jpe?g|svg|xml|mp3|woff|mtl|obj|glb|gltf|bin)$/i, 
         loader: 'file-loader',
         options: {esModule: false},
         exclude: [
           path.resolve(__dirname, '../src/assets/', '../src/') 
         ]
       },
       {
         test: /\.css$/i, 
         use: 
            ['style-loader', 'css-loader']
       },
       {
        test: /\.ts$/i, 
        use: 
           ['ts-loader'],
        exclude: '/node/modules'
      }
 
     ]
   },
  devServer: {
    port: port,
    proxy: { 
      '../socket.io.min.js': { 
        target: port, 
        ws: true 
      } 
    },
  },
  plugins: [

    new webpack.ProvidePlugin({
      System: ['System', 'System']
    }),

    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),

    new HtmlWebpackPlugin({ gameName: 'Custom Phaser / ENABLE3D TEMPLATE - PASTABOSS ENTERPRISE', template: 'src/index.html', inject: 'body' }),
    
    new CopyWebpackPlugin([
      { from: 'src/assets', to: 'assets' },
      { from: 'pwa', to: '' }
    ]),
    
    new InjectManifest({
      swSrc: path.resolve(__dirname, '../pwa/sw.js')
    })
  ]
}
