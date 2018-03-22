const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js',
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js',
    publicPath: '/',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
<<<<<<< HEAD
        loader: 'babel-loader'
      },

      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      }
    ],


  }
=======
        loader: 'babel-loader',
      },
    ],
  },
>>>>>>> 3d0722d559e3313f9edc7d816bcfd97732e71aa5
}
