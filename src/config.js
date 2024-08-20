module.exports = {
  jwtSecret: process.env.JWT_SECRET || '05061992',
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || '05061992',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || '05061992',
};
