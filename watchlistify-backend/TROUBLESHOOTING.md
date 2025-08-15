# Backend Server Troubleshooting Guide

## Common Crash Issues and Solutions

### 1. Missing Environment Variables
**Problem**: Server crashes on startup due to missing required environment variables.

**Solution**: Create a `.env` file in the watchlistify-backend directory with:

```bash
# Required Environment Variables
MONGO_URI=mongodb://localhost:27017/watchlistify
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
```

### 2. MongoDB Connection Issues
**Problem**: Database connection fails causing server to exit.

**Solution**: 
- Ensure MongoDB is running locally or use MongoDB Atlas
- Check if MONGO_URI is correctly formatted
- The server now has retry logic with 5 attempts

### 3. Port Already in Use
**Problem**: Server crashes with "EADDRINUSE" error.

**Solution**: 
- Change the PORT in .env file or use a different port
- Kill the process using the port: `npx kill-port 5000`

### 4. JWT Secret Missing
**Problem**: Authentication routes crash due to missing JWT_SECRET.

**Solution**: Ensure JWT_SECRET is defined in your .env file.

### 5. CORS Issues
**Problem**: Frontend can't connect to backend.

**Solution**: CORS is already configured, but ensure frontend URL is accessible.

## Testing the Server

### Health Check
After starting the server, test the health endpoint:
```bash
curl http://localhost:5000/api/health
```

### Manual Start Commands
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

## Error Logs
Check the console output for specific error messages. The server now includes:
- Detailed error logging
- Graceful shutdown handling
- Global error catching
- Database connection retry logic

## Quick Fix Checklist
- [ ] Create `.env` file with required variables
- [ ] Ensure MongoDB is running
- [ ] Check if port 5000 is available
- [ ] Run `npm install` to ensure all dependencies
- [ ] Test with `npm run dev`
