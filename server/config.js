const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://velingkar:margao@ds161162.mlab.com:61162/raven-planner',
  port: process.env.PORT || 8000,
};

export default config;
