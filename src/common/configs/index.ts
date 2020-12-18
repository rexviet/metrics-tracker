const conf = {
  HOST: process.env.HOST,
  PORT: Number(process.env.PORT),
};

export default (): any => conf;