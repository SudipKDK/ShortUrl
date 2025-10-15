# Short URL Service

A Node.js application for creating and managing short URLs.

## Features

- User authentication and authorization
- URL shortening functionality
- User-specific URL management
- MongoDB database integration

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ShortUrl
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy the `env.template` file to `.env`
   - Update the values in `.env` with your actual configuration:
   ```bash
   cp env.template .env
   ```

4. Update the `.env` file with your configuration:
```env
# Database Configuration
MONGODB_URI=mongodb://127.0.0.1:27017/short-Url

# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Secret (for authentication)
JWT_SECRET=your-super-secret-jwt-key-here

# Session Secret (for cookies)
SESSION_SECRET=your-super-secret-session-key-here

# Base URL for your application
BASE_URL=http://localhost:3000
```

5. Start the application:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/short-Url` |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment (development/production) | `development` |
| `JWT_SECRET` | Secret key for JWT tokens | Required |
| `SESSION_SECRET` | Secret key for sessions | Required |
| `BASE_URL` | Base URL of your application | `http://localhost:3000` |

## Project Structure

```
ShortUrl/
├── controllers/       
├── middleware/      
├── models/       
├── routes/              
├── service/             
├── views/               
├── connection.js        
├── index.js            
└── package.json        
```
