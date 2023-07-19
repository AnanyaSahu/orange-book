module.exports = {
    "/": {
      logLevel: "debug",
      target: "http://localhost:4200",
      bypass: (req, res, proxyOptions) => {
        res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
        res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
        res.setHeader("Access-Control-Allow-Origin", "*");
      },
    },
  };