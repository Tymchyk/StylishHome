const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:51236';

const proxyConfig = {
  "/items/getitems": {
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  },
  "/items/getitem": {
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    },
    pathRewrite: { '^/items/getitem': '/items/getitem' },
  },
  "/items/addtocard": {
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  },
  "/items/fromcard": {
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  },
  "/items/confirmeorder": {
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  },
  "/items/myorders": {
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  },
};

const onError = (err, req, resp, target) => {
  console.error(`${err.message}`);
}

module.exports = function (app) {
  for (const [context, config] of Object.entries(proxyConfig)) {
    const appProxy = createProxyMiddleware(context, {
      proxyTimeout: 10000,
      ...config,
      onError: onError,
    });

    app.use(appProxy);
  }
};
