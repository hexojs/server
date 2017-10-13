/* global hexo */

'use strict';

var assign = require('object-assign');

hexo.config.server = assign({
  address: '0.0.0.0:80',
  log: false,
  compress: false,
  header: true
}, hexo.config.server);

hexo.extend.console.register('server', 'Start the server.', {
  desc: 'Start the server and watch for file changes.',
  options: [
    {name: '-a, --address', desc: 'Override the default server address. Bind to localhost:4000 by default.'},
    {name: '-s, --static', desc: 'Only serve static files.'},
    {name: '-l, --log [format]', desc: 'Enable logger. Override log format.'},
    {name: '-o, --open', desc: 'Immediately open the server url in your default web browser.'}
  ]
}, require('./lib/server'));

hexo.extend.filter.register('server_middleware', require('./lib/middlewares/header'));
hexo.extend.filter.register('server_middleware', require('./lib/middlewares/gzip'));
hexo.extend.filter.register('server_middleware', require('./lib/middlewares/logger'));
hexo.extend.filter.register('server_middleware', require('./lib/middlewares/route'));
hexo.extend.filter.register('server_middleware', require('./lib/middlewares/static'));
hexo.extend.filter.register('server_middleware', require('./lib/middlewares/redirect'));
