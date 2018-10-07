if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI: process.env.MONGO_URI,
    secretOrKey: process.env.SECRET_OR_KEY
  };
} else {
  module.exports = {
    mongoURI: 'mongodb://localhost:27017/taskscheduler',
    secretOrKey: 'superSecretKey'
  };
}
