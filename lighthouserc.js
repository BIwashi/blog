module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      staticDistDir: "./docs",
    },
    upload: {
      // target: "temporary-public-storage", 
      target: "lhci",
      serverBaseUrl: "https://lhci-heroku-biwashi.herokuapp.com",
      token: "16f83bd7-013b-4c47-a1cd-538f5764bfc4",
    },
  },
};
