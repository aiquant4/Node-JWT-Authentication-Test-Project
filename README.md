
# Node-JWT-Authentication-Test-Project

## Overview
This project is a full-stack authentication system built with Node.js, Express, PostgreSQL, and Vue.js for the frontend. It uses JSON Web Tokens (JWT) for secure user authentication and session management.

## Features
- User registration and login
- Password hashing with `bcrypt`
- JWT-based authentication and authorization
- Dashboard with user-specific data display
- Route protection (users can only access certain pages if authenticated)
- Logout functionality

## Technologies Used
- **Backend**: Node.js, Express, PostgreSQL
- **Frontend**: Vue 3, Axios
- **Authentication**: JWT (JSON Web Tokens), bcrypt for password hashing
- **Database**: PostgreSQL

## Prerequisites
Before running the project, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Vue CLI](https://cli.vuejs.org/)

## Setup

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Node-JWT-Authentication-Test-Project.git
   cd Node-JWT-Authentication-Test-Project
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Set up the PostgreSQL database:
   - Create a new database in PostgreSQL and note the credentials (username, password, database name).
   - Create a `.env` file in the `backend/` directory and configure the following environment variables:
     ```bash
     PORT=5000
     DB_USER=your_db_username
     DB_HOST=localhost
     DB_NAME=your_db_name
     DB_PASSWORD=your_db_password
     DB_PORT=5432
     JWT_SECRET=your_jwt_secret
     ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Configure the API endpoint:
   - Open the `frontend/src/api.js` (or wherever you're managing API calls) and set the API base URL:
     ```javascript
     const API_URL = 'http://localhost:5000';  // Backend URL
     ```

4. Start the frontend development server:
   ```bash
   npm run serve
   ```

## Running the Project

1. Make sure both backend and frontend servers are running.
2. Open your browser and go to `http://localhost:8080` to see the application.



## API Endpoints

### Authentication
- `POST /register`: Create a new user account
- `POST /login`: Authenticate and log in the user, return JWT token
- `GET /dashboard`: Protected route, accessible only with a valid JWT token

### JWT Authentication Flow
1. **Register**: Users can create an account by providing their email and password.
2. **Login**: Users log in by providing their credentials, and the server responds with a JWT.
3. **Protected Routes**: The token is sent in the `Authorization` header as a Bearer token when accessing protected routes.

