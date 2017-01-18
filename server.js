var path = require('path');
var webpack = require('webpack');
var express = require('express');
var devMiddleware = require('webpack-dev-middleware');
var hotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack/webpack.config');
var history = require('connect-history-api-fallback');
var proxy = require('http-proxy-middleware');
var dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || '3000';
const API_URL = process.env.API_URL || 'http://localhost:3010';

var app = express();
var compiler = webpack(config);

app.use(history());

const apiProxy = proxy({ target: API_URL });
app.use('/graphql', apiProxy);
app.use('/graphiql', apiProxy);
app.use('/signin', apiProxy);
app.use('/user', apiProxy);

app.use(devMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  historyApiFallback: true,
}));

app.use(hotMiddleware(compiler));

app.listen(PORT, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log(`Listening at http://localhost:${PORT}`);
});
