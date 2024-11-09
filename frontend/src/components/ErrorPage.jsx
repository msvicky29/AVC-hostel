import React from 'react';
import {Link} from 'react-router-dom'
const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      <div className="flex flex-col items-center space-y-8 z-10">
        <div className="flex items-center space-x-6">
          <div className="text-blue-400 animate-float text-8xl">🌌</div>
          <div>
            <h1 className="text-8xl font-bold">404</h1>
            <p className="text-3xl font-medium">Oops! Page not found.</p>
          </div>
          <div className="text-pink-400 animate-bounce text-8xl">🛸</div>
        </div>
        <p className="text-xl">
          The page you're looking for doesn't exist or has been moved to another galaxy.
        </p>
        <Link to="/" className="px-8 py-4 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors text-lg font-medium">
          Take me back home
        </Link>
      </div>
      <div className="absolute inset-0 bg-stars-bg animate-stars-bg"></div>
    </div>
  );
};

export default ErrorPage;