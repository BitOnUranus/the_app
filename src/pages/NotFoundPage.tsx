import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    // Update document title
    document.title = 'Page Not Found - JewelAR';
  }, []);
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-9xl font-bold text-amber-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/" 
              className="flex items-center justify-center px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
            >
              <Home size={20} className="mr-2" />
              Back to Home
            </Link>
            <Link 
              to="/products" 
              className="flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              <ShoppingBag size={20} className="mr-2" />
              Shop Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;