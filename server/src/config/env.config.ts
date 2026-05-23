import "dotenv/config";

const envConfig = {
  PORT: process.env.PORT || 8080,

  DATABASE_URL: process.env.DATABASE_URL,

  REFRESH_TOKEN: process.env.REFRESH_TOKEN || "your_refresh_token_secret",
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",

  ACCESS_TOKEN: process.env.ACCESS_TOKEN || "your_access_token_secret",
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",

  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_SERVICE: process.env.SMTP_SERVICE,

  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,

};

export default envConfig;
