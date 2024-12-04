const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.dev');


const compiler = webpack(config);
const devServerOptions = { ...config.devServer, open: true };
const server = new WebpackDevServer(devServerOptions, compiler);
server.startCallback((err) => {
  if (err) {
    return;
  }
  if (process.send) {
    process.send('ok');
  }
});
