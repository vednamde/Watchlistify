# Watchlistify

Watchlistify is a modern movie discovery and watchlist application built with React, Node.js, and MongoDB. It allows users to search for movies, apply advanced filters, browse trending titles, and manage their personal watchlist with full authentication.

## Features

### Frontend Features
- Search movies by title
- Advanced filtering options including release year, rating, runtime, language, movie type, country, keywords, and smart filters
- Genre selection with dynamic filtering
- Trending movies section with random trailers
- Responsive and interactive UI with animations
- Movie detail modal with additional information
- Watchlist management (login/signup required)

### Backend Features
- RESTful API with Express.js
- JWT-based authentication system
- User registration and login
- Secure password hashing with bcrypt
- MongoDB database integration
- Watchlist CRUD operations
- Error handling middleware
- CORS protection
- Health check endpoint

## Technologies Used

### Frontend
- React 18
- Vite for fast development and build
- Tailwind CSS for styling
- Framer Motion for animations
- TMDB (The Movie Database) API for movie data
- React Router for navigation

### Backend
- Node.js & Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests
- dotenv for environment configuration

## Project Structure

```
watchlistify/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── watchlistify-backend/    # Node.js backend API
│   ├── config/             # Database configuration
│   ├── middleware/         # Custom middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   └── server.js          # Entry point
├── README.md
└── jwt.txt               # JWT secret example
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas)
- TMDB API key (get from https://www.themoviedb.org/settings/api)

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/vednamde/watchlistify.git
   cd watchlistify
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd watchlistify-backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `watchlistify-backend` directory:
   ```bash
   touch .env
   ```

4. Add the following environment variables to `.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/watchlistify
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=5000
   ```

   For MongoDB Atlas, use:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/watchlistify?retryWrites=true&w=majority
   ```

5. Start MongoDB service (if using local MongoDB):
   ```bash
   # On macOS/Linux
   sudo systemctl start mongod
   
   # On Windows
   # MongoDB should start automatically as a service
   ```

6. Start the backend server:
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Or production mode
   npm start
   ```

   The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` directory:
   ```bash
   touch .env
   ```

4. Add the following environment variables to `.env`:
   ```env
   VITE_TMDB_API_KEY=your-tmdb-api-key-here
   VITE_API_URL=http://localhost:5000/api
   ```

5. Start the frontend development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5173` (or the port shown in the terminal).

## API Documentation

### Authentication Endpoints

#### Register User
- **POST** `/api/auth/register`
- **Body**: `{ name, email, password }`
- **Response**: `{ token, user: { _id, name, email } }`

#### Login User
- **POST** `/api/auth/login`
- **Body**: `{ email, password }`
- **Response**: `{ token, user: { _id, name, email } }`

### Watchlist Endpoints

#### Add Movie to Watchlist
- **POST** `/api/watchlist/add`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ movieId, title, posterPath, releaseDate }`
- **Response**: Updated watchlist array

#### Get User Watchlist
- **GET** `/api/watchlist`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Array of watchlist movies

#### Remove Movie from Watchlist
- **DELETE** `/api/watchlist/remove/:movieId`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Updated watchlist array

### Health Check
- **GET** `/api/health`
- **Response**: `{ status: 'OK', timestamp, uptime }`

## Usage

### Development Workflow

1. **Start Backend**: In one terminal, run the backend server
   ```bash
   cd watchlistify-backend && npm run dev
   ```

2. **Start Frontend**: In another terminal, run the frontend
   ```bash
   cd frontend && npm run dev
   ```

3. **Access Application**: Open `http://localhost:5173` in your browser

### Using the Application

- **Browse Movies**: Use the search bar to find movies by title
- **Apply Filters**: Click "Show Filters" for advanced filtering options
- **Select Genres**: Use the genre dropdown to filter by genre
- **View Details**: Click on any movie card to see detailed information
- **Manage Watchlist**: 
  - Sign up for a new account or log in
  - Add movies to your personal watchlist
  - View and manage your watchlist from the navigation

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  watchlist: [{
    movieId: String,
    title: String,
    posterPath: String,
    releaseDate: String
  }]
}
```

## Environment Variables

### Backend (.env)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `PORT`: Server port (default: 5000)

### Frontend (.env)
- `VITE_TMDB_API_KEY`: TMDB API key for movie data
- `VITE_API_URL`: Backend API URL (default: http://localhost:5000/api)

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Ensure MongoDB is running locally
   - Check if MongoDB URI is correct in `.env`
   - For MongoDB Atlas, ensure IP whitelist includes your IP

2. **JWT Secret Missing**
   - Ensure `JWT_SECRET` is set in backend `.env` file
   - Generate a strong random string for production

3. **CORS Issues**
   - Backend includes CORS middleware for `http://localhost:5173`
   - For production, update CORS configuration in `server.js`

4. **Port Already in Use**
   - Change the port in `.env` file
   - Default ports: Frontend (5173), Backend (5000)

### Additional Help
See `watchlistify-backend/TROUBLESHOOTING.md` for detailed troubleshooting steps.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security Notes

- Never commit `.env` files to version control
- Use strong JWT secrets in production
- Enable HTTPS in production
- Validate all user inputs
- Keep dependencies updated

## License

This project is licensed under the MIT License.

## Acknowledgments

- TMDB for providing the movie data API
- React and Node.js communities for excellent tools and support
- Tailwind CSS and Framer Motion for beautiful UI and animations
- MongoDB for the robust database solution
