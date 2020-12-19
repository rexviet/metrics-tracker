const conf = {
  HOST: process.env.HOST,
  PORT: Number(process.env.PORT),
  DB_NAME: process.env.DB_NAME,
  DB_HOSTS: process.env.DB_HOSTS,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
};

export default (): any => conf;