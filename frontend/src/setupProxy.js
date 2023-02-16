const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://i8b108.p.ssafy.io",
      changeOrigin: true,
    })
  );
};
