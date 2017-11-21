const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

function base() {
  return {
    output: {
      filename: '[hash].bundle.js',
    },
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loader: 'babel',
        include: [/src[\/\\]node_modules/]
      }, {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'resolve-url', 'sass'],
      }, {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss']
      }, {
        test: /\.png$/,
        loader: 'file'
      },
        {test: /\.woff$/, loader: 'url?limit=10000&minetype=font/woff'},
        {test: /\.woff2$/, loader: 'url?limit=10000&minetype=font/woff2'},
        {test: /\.ttf$/, loader: 'file'},
        {test: /\.eot$/, loader: 'file'},
        {test: /\.svg$/, loader: 'file'}
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
        fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
        Request: 'imports?this=>global!exports?global.Request!whatwg-fetch',
        Response: 'imports?this=>global!exports?global.Response!whatwg-fetch',
        Headers: 'imports?this=>global!exports?global.Headers!whatwg-fetch',
      }),
    ],
    externals: {},
    postcss: function () {
      return [autoprefixer];
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.json'],
    },
    sassLoader: {
      sourceMap: true
    },
  };
}

function inlineSourceMaps(wc) {
  wc.devtool = 'inline-source-map';
  return wc;
}

function sourceMaps(wc) {
  wc.devtool = 'source-map';
  return wc;
}

function uglify(wc) {
  wc.plugins.push(new webpack.optimize.UglifyJsPlugin());
  return wc;
}

function env(wc) {
  wc.plugins.unshift(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    }
  }));
  return wc;
}

function jsonLoader(wc) {
  wc.module.loaders.push({test: /\.json$/, loader: 'json'});
  return wc;
}

/* externals required if we want react to work correctly with karma */
function reactKarmaExternals(wc) {
  wc.externals['react/addons'] = true;
  wc.externals['react/lib/ExecutionEnvironment'] = true;
  wc.externals['react/lib/ReactContext'] = true;
  return wc;
}

function babelRewirePlugin(wc) {
  wc.module.loaders[0].query = {
    /* this will be merged with appropriate .babelrc file (and .babelrc has priority) */
    plugins: ['rewire']
  };

  return wc;
}

const dev = _.flow(base, sourceMaps);
const prod = _.flow(base, env, uglify);
const karma = _.flow(base, inlineSourceMaps, jsonLoader, reactKarmaExternals, babelRewirePlugin);

module.exports = {
  dev: dev,
  prod: prod,
  karma: karma
};
