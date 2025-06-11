import { MoveLeft } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600 dark:text-blue-400">404</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Page Not Found
        </p>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full transition-all"
        >
          <MoveLeft className="w-4 h-4" />
          Go Back Home
        </Link>
      </div>
    </div>
    );
};

export default Error;