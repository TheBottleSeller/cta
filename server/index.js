/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');

const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

const ServerConfig = {
  workflow: 'http://localhost:5001',
  chart: 'http://localhost:4001',
}

var _options = function(req, url) {
  return {
    url: url,
    method: req.method,
    headers: req.headers,
    qs: req.query,
    qsStringifyOptions: { arrayFormat: 'repeat' },
    body: JSON.stringify(req.body)
  }
};

// proxy requests to Workflow API
app.use('/api/workflow', bodyParser.json(), function(req, res) {
  const url = ServerConfig.workflow + req.url;
  request(_options(req, url), function(error, response, body) {
    if (error) {
      res.status(500).send(error).end();
    } else {
      let bodyJSON = JSON.parse(body);
      bodyJSON.statusCode = response.statusCode;
      res.status(response.statusCode).send(bodyJSON).end();
    }
  });
});

// proxy requests to Chart API
app.use('/api/chart', bodyParser.json(), function(req, res) {
  const url = ServerConfig.chart + req.url;
  request(_options(req, url), function(error, response, body) {
    if (error) {
      res.status(500).send(error).end();
    } else {
      let bodyJSON = JSON.parse(body);
      bodyJSON.statusCode = response.statusCode;
      res.status(response.statusCode).send(bodyJSON).end();
    }
  });
});

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended port number, use port 3000 if not provided
const port = argv.port || process.env.PORT || 3000;

// Start your app.
app.listen(port, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, url);
    });
  } else {
    logger.appStarted(port);
  }
});
