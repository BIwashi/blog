module.exports = {
  ci: {
    collect: {
      numberOfRuns: 2,
      // staticDistDir: "./docs",
      startServerCommand: "hugo server",
      url: ["http://localhost:1313/blog/"]
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
