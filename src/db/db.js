const mongoose = require('mongoose');

// Caching database to reuse an existing database connection used to optimize performance
// let cachedDb = null;
// async function connectToDatabase() {
//   if (cachedDb) {
//     return cachedDb;
//   }

//   const uri = process.env.MONGODB_ATLAS_URI;
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//   try {
//     console.log('Connecting to MongoDB Atlas...');
//     await client.connect();
//     cachedDb = client.db(process.env.DB_NAME);
//     console.log('Connected to MongoDB Atlas');
//     return cachedDb;
//   } catch (error) {
//     console.error('Error connecting to MongoDB Atlas:', error);
//     throw error;
//   }
// }

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    throw error;
  }
};

module.exports = { connectToDatabase };
