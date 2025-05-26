import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from '../components/product/ProductCard';

const HomePage: React.FC = () => {
  const { products, isLoading } = useProducts();
  const arCompatibleProducts = products.filter(product => product.tryOnEnabled);
  const featuredProducts = products.slice(0, 4);
  
  useEffect(() => {
    // Update document title
    document.title = 'JewelAR - Luxury Jewelry with Virtual Try-On';
  }, []);
  
  return (
    <div className="pt-16"> {/* Add padding top to account for fixed header */}
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-black flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/12114719/pexels-photo-12114719.jpeg" 
            alt="Luxury jewelry" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Try On Jewelry Virtually Before You Buy
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Experience our revolutionary AR technology that lets you see how jewelry looks on you, right from your device.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/try-on" 
                className="px-8 py-3 bg-amber-600 text-white font-medium rounded-md hover:bg-amber-700 transition-colors text-center"
              >
                Try On Now
              </Link>
              <Link 
                to="/products" 
                className="px-8 py-3 bg-white text-gray-900 font-medium rounded-md hover:bg-gray-100 transition-colors text-center"
              >
                Shop Collection
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* AR Feature Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Virtual Try-On Experience</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our cutting-edge AR technology allows you to virtually try on jewelry before making a purchase, 
              giving you confidence in your selection.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-amber-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Choose Jewelry</h3>
              <p className="text-gray-600">
                Browse our collection and select jewelry pieces with the "Try On" label.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-amber-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Virtual Mirror</h3>
              <p className="text-gray-600">
                Use your camera to create a virtual mirror and see how the jewelry looks on you.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-amber-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Share & Purchase</h3>
              <p className="text-gray-600">
                Save your favorite looks, share with friends, and order with confidence.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              to="/try-on" 
              className="px-6 py-3 bg-amber-600 text-white font-medium rounded-md hover:bg-amber-700 transition-colors inline-block"
            >
              Experience AR Try-On
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Featured Jewelry</h2>
            <Link 
              to="/products" 
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {isLoading ? (
              // Loading skeleton
              [...Array(4)].map((_, index) => (
                <div key={index} className="bg-gray-100 rounded-lg overflow-hidden shadow animate-pulse">
                  <div className="aspect-square bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))
            ) : (
              featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* AR-Compatible Products Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Try Before You Buy</h2>
            <Link 
              to="/products?filter=tryOnEnabled" 
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              View All AR Products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {isLoading ? (
              // Loading skeleton
              [...Array(4)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow animate-pulse">
                  <div className="aspect-square bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))
            ) : (
              arCompatibleProducts.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Experience the Future of Jewelry Shopping
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of customers who have found their perfect jewelry using our virtual try-on technology.
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              to="/register" 
              className="px-8 py-3 bg-white text-amber-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
            >
              Create Account
            </Link>
            <Link 
              to="/products" 
              className="px-8 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-amber-700 transition-colors"
            >
              Browse Collection
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;