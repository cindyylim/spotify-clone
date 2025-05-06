# Spotify Clone

A full-stack Spotify clone built with React, TypeScript, Tailwind CSS, and MongoDB. This project replicates core Spotify features including music playback, user authentication, admin dashboard, and real-time chat functionality.

## Features

- 🎵 Music streaming and playback
- 👤 User authentication with Clerk
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design
- 💬 Real-time chat functionality
- 👨‍💼 Admin dashboard for content management
- 🎸 Artist and album management
- 📊 User statistics and analytics

## Tech Stack

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Clerk (Authentication)
- Shadcn UI Components

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Clerk account (for authentication)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/spotify-clone.git
cd spotify-clone
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend/spotify-clone
npm install
```

3. Set up environment variables
Create a `.env` file in the backend directory:
```
PORT=
MONGO_URI=
ADMIN_EMAIL=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_CLOUD_NAME=
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```
Create a `.env.local` file in the frontend directory:
```
VITE_CLERK_PUBLISHABLE_KEY=
```

4. Start the development servers
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd ../frontend/spotify-clone
npm run dev
```

## Features in Detail

### Music Playback
- Stream and play music tracks
- Playlist management
- Volume control
- Playback controls (play, pause, next, previous, repeat, shuffle)

### User Authentication
- Secure login and registration
- Social authentication
- Protected routes
- User profile management

### Admin Dashboard
- Manage songs, albums, and artists
- View user statistics
- Content moderation
- Analytics dashboard

### Chat System
- Real-time messaging
- User-to-user chat
- Message history
- Online status indicators

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
