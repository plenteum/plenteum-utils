'use strict'

const CopyWebPackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    filename: 'PlenteumUtils.js',
    library: 'PlenteumUtils',
    libraryTarget: 'umd'
  },
  node: {
    fs: 'empty'
  },
  target: 'web',
  plugins: [
    new CopyWebPackPlugin([
      { from: 'lib/plenteum-crypto/plenteum-crypto-wasm.js', to: 'plenteum-crypto-wasm.js' }
    ])
  ]
}
