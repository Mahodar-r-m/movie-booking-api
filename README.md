# Movie Ticket Booking API ️

**A serverless, scalable, and API-driven solution for movie ticket booking, hosted on AWS Lambda and accessible through RESTful APIs.**

## Key Features

- **Public Movie and Cinema Discovery:**
    - Search for movies playing within specific cities.
    - Find cinemas within desired cities.
    - View detailed movie and showtime information for any cinema.
- **Authenticated User Actions:**
    - Secure user signup and login functionalities.
    - Book tickets for desired shows.
    - Manage booked tickets (view, details, future: cancel/modify).

## Technologies Used

- Node.js
- Express
- MongoDB (Atlas)
- AWS Lambda
- Serverless Framework

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/Mahodar-r-m/movie-booking-api.git
2. Install dependencies:
    ```bash
    npm install
## Configuration
- Create a MongoDB Atlas account and database.
- Obtain your MongoDB connection string and replace the placeholder in config/db.js.
- Set up your AWS credentials locally (access token, profile name).
- Configure the credential name in serverless.yml.

1. Running Locally
    ```bash
    serverless offline start
2. Deployment to AWS
    ```bash
    sls deploy
## API Documentation
Postman Collection: https://documenter.getpostman.com/view/26298590/2s9YsMBXd5

## Contributing
### We welcome contributions! Please follow these steps:

1. Fork this repository.
2. Create a new branch for your changes.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request.

## Additional Notes:
User Sign-up Limit: A temporary cap of 25 users is in place for testing purposes.