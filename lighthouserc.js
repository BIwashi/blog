module.exports = {
  ci: {
    collect: {
      numberOfRuns: 2,
      staticDistDir: "./docs",
      // startServerCommand: "hugo server",
      // url: ["http://localhost:1313/blog/"]
    },
    upload: {
      // target: "temporary-public-storage",
      target: "lhci",
      serverBaseUrl: "https://lhci-heroku-biwashi.herokuapp.com",
      token: "16f83bd7-013b-4c47-a1cd-538f5764bfc4",
    },
  },
};
