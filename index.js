const app = require('./app.js');
const connectDB = require('./db/index');
require('dotenv').config();

const start = async () => {
  try {
    console.log('Connecting to database');
    await connectDB();
    console.log('Connected to database');
    
    await app.listen(process.env.PORT || 4000);
    console.log(`🚀  GraphQL server running at port: ${process.env.PORT || 4000 }`);
  } catch {
    console.log('Not able to run GraphQL server');
  }
};

start();