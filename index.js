const app = require('./app.js');
const connectDB = require('./db/index');
const NODE_ENV = require('./config');

const start = async () => {
  try {
    console.log('Connecting to database');
    await connectDB();
    console.log('Connected to database');
    
    await app.listen(NODE_ENV.PORT || 4000);
    console.log(`🚀  GraphQL server running at port: ${process.env.PORT || 4000 }`);
  } catch {
    console.log('Not able to run GraphQL server');
  }
};

start();