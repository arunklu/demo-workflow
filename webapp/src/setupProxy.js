const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/dg_api/",
    createProxyMiddleware({
      target: "https://dg.delivery-guru.co.uk/",
      changeOrigin: true,
    })
  );
};


// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = app => {
//   app.use(
//     "/dg_api/",
//     createProxyMiddleware({
//       target: "https://dg.delivery-guru.co.uk/",
//       changeOrigin: true
//     })
//   );
// };

