'use strict';
const express = require('express');
const serverless = require('serverless-http'); 
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const cinemaRoutes = require('./routes/cinemaRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const { connectToDatabase } = require('./db/db');

// Middleware
app.use(express.json());

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/user', userRoutes);
app.use('/movie', movieRoutes);
app.use('/booking', bookingRoutes);
app.use('/', cinemaRoutes);

// const Cinema = require('./models/cinemaModel'); // For testing
// const Movie = require('./models/movieModel'); // For testing
// const Show = require('./models/showModel'); // For testing

// Connect to MongoDB Atlas when the application starts
(async () => {
  try {
    await connectToDatabase();
    console.log('Connected to MongoDB Atlas');

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    // Handle error, maybe exit the app or other actions
  }

  // Add test data to DB
  // try {
  //   await Cinema.insertMany([
  //     // { name: 'PVR Cinemas', location: 'DLF Mall of India', city: 'Noida' },
  //     // { name: 'INOX Insignia', location: 'Infiniti Mall', city: 'Mumbai' },
  //     // { name: 'Cinepolis', location: 'Mantri Square Mall', city: 'Bangalore' },
  //     // { name: 'Regal Cinemas', location: 'Express Avenue Mall', city: 'Chennai' },
  //     // { name: 'SRS Cinemas', location: 'Forum Sujana Mall', city: 'Hyderabad' }
  //     { name: "Carnival Cinemas", location: "Ambience Mall", city: "Gurgaon" },
  //     { name: "Miraj Cinemas", location: "Phoenix Palladium", city: "Mumbai" },
  //     { name: "A2 Cinemas", location: "Forum Vijaya Mall", city: "Chennai" },
  //     { name: "Inox", location: "Pacific Mall", city: "Jaipur" },
  //     { name: "PVR Cinemas", location: "Orion Mall", city: "Bangalore" }
  //   ]);

  //   console.log('Cinemas inserted successfully - Batch 2!');
  // } catch (error) {
  //   console.error('Error inserting cinemas:', error);
  // }

  // try {
  //   await Movie.insertMany([
  //     { title: "Dhaakad", genre: "Action" },
  //     { title: "Ponniyin Selvan: I", genre: "Historical" },
  //     { title: "Laal Singh Chaddha", genre: "Drama" },
  //     { title: "Brahmastra", genre: "Fantasy" },
  //     { title: "Tiger 3", genre: "Action" },
  //     { title: "Pathaan", genre: "Action" },
  //     { title: "The Warriorr", genre: "Action" },
  //     { title: "Adipurush", genre: "Mythology" },
  //     { title: "Ganapath", genre: "Action" },
  //     { title: "Circus", genre: "Comedy" },
  //     { title: "Mili", genre: "Drama" },
  //     { title: "Rocketry: The Nambi Effect", genre: "Biography" },
  //     { title: "Phone Bhoot", genre: "Comedy" },
  //     { title: "Govinda Naam Mera", genre: "Comedy" },
  //     { title: "Shehzada", genre: "Action" },
  //     { title: "Liger", genre: "Sport" },
  //     { title: "Selamiyan", genre: "Drama" },
  //     { title: "Mission Majnu", genre: "Thriller" },
  //     { title: "Vikram Vedha", genre: "Action" },
  //     { title: "Tejas", genre: "Action" }
  //   ]);

  //   console.log('Movies inserted successfully!');
  // } catch (error) {
  //   console.error('Error inserting movies:', error);
  // }

  // const generateShowTimings = function(movieLength, minBufferTime = 60) { // Assumes movie length in minutes
  //   const startTime = new Date(); // Use date logic based on your timezone needs
  //   const timings = [];
  //   let nextTime = startTime;
  //   while (true) {
  //     const endTime = new Date(nextTime.getTime() + movieLength * 60000); // Convert minutes to milliseconds
  //     if (endTime >= new Date(startTime.getTime() + 24 * 60 * 60000)) { // Check if within a day
  //       break;
  //     }
  //     if (timings.length > 0) {
  //       const previousEndTime = new Date(timings[timings.length - 1].split(':')[0], timings[timings.length - 1].split(':')[1]);
  //       if ((endTime - previousEndTime) < minBufferTime * 60000) { // Minimum buffer time between shows
  //         continue;
  //       }
  //     }
  //     timings.push(currentTimeToReadableString(nextTime));
  //     nextTime = new Date(endTime.getTime() + minBufferTime * 60000); // Add buffer time after each show
  //   }
  //   return timings;
  // };
  
  // const currentTimeToReadableString = function(date) {
  //   const hours = date.getHours().toString().padStart(2, '0');
  //   const minutes = date.getMinutes().toString().padStart(2, '0');
  //   return `${hours}:${minutes}`;
  // };
  
  // // Main logic
  // async function generateAndInsertShowData() {
  //   try {
  //     const cinemas = await Cinema.find({});
  //     const movies = await Movie.find({});
  
  //     const showRecords = [];
  //     for (const cinema of cinemas) {
  //       const selectedMovies = movies.filter(() => Math.random() < 0.7); // Randomly select some movies
  
  //       for (const movie of selectedMovies) {
  //         const movieLength = Math.floor(Math.random() * 2) + 3; // Generate random movie length between 3-5 hours (assuming hours)
  //         const timings = generateShowTimings(movieLength * 60); // Convert hours to minutes for calculations
  
  //         showRecords.push({
  //           cinema: cinema._id,
  //           movie: movie._id,
  //           timings: timings,
  //         });
  //       }
  //     }
  
  //     await Show.insertMany(showRecords);
  //     console.log('Shows inserted successfully!');
  //   } catch (error) {
  //     console.error('Error inserting shows:', error);
  //   }
  // }
  
  // generateAndInsertShowData();
})();


// module.exports.hello = async (event) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Go Serverless v1.0! Your function executed successfully!',
//         input: event,
//       },
//       null,
//       2
//     ),
//   };
// };

// module.exports.connectDB = async (event) => {
//   try {
//     const db = await connectToDatabase();
//     const collection = db.collection('users'); // Replace 'users' with your actual collection name

//     // Perform MongoDB operations using the 'collection'

//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         message: 'Connected to MongoDB Atlas!',
//       }),
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({
//         message: 'Error connecting to MongoDB Atlas',
//         error: error.message, // Send only the error message to avoid potential circular reference issues
//       }),
//     };
//   }
// };

// Start the server

// // Hello World route
// app.get('/', (req, res) => {
//   res.json({ message: 'Hello, Serverless world!' });
// });

// module.exports = app;

// Export the Express app wrapped with serverless-http
module.exports.handler = serverless(app);