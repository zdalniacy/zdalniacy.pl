module.exports = {
  development: {
    port: process.env.PORT || 3000,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET
  },
  production: {
    port: process.env.PORT || 80,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET
  }
};