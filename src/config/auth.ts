export default {
  jwt: {
    secret: process.env.JWT_SECRET as string,
    expiresIn: '20s'
  },
  refreshToken: {
    secret: process.env.REFRESH_SECRET as string,
    expiresIn: 7
  }
}