import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Camera, ShoppingBag, ArrowLeft, Heart, Share2 } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';
import { formatPrice } from '../utils/formatters';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById, isLoading } = useProducts();
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const product = getProductById(id || '');
  
  useEffect(() => {
    if (product) {
      document.title = `${product.name} - JewelAR`;
    }
  }, [product]);
  
  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      imageUrl: product.imageUrls[0]
    });
  };
  
  if (isLoading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-6 w-48 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div>
                <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 w-1/4 bg-gray-200 rounded mb-6"></div>
                <div className="h-24 w-full bg-gray-200 rounded mb-6"></div>
                <div className="h-10 w-full bg-gray-200 rounded mb-4"></div>
                <div className="h-12 w-full bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            to="/products" 
            className="inline-flex items-center text-amber-600 hover:text-amber-700"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-amber-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-amber-600">Products</Link>
          <span className="mx-2">/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-amber-600 capitalize">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-lg overflow-hidden mb-4 aspect-square">
              <img 
                src={product.imageUrls[activeImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {product.imageUrls.map((image, index) => (
                <button 
                  key={index}
                  className={`bg-white rounded overflow-hidden aspect-square border-2 ${
                    activeImage === index ? 'border-amber-600' : 'border-transparent'
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-2xl text-amber-600 font-semibold mb-6">{formatPrice(product.price)}</p>
            
            <div className="border-t border-b border-gray-200 py-6 mb-6">
              <p className="text-gray-700 mb-4">{product.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Material</h3>
                  <p className="text-gray-900 capitalize">{product.material.replace('-', ' ')}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Size</h3>
                  <p className="text-gray-900">{product.size}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Category</h3>
                  <p className="text-gray-900 capitalize">{product.category.replace('-', ' ')}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Stock</h3>
                  <p className={`${product.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stockQuantity > 0 
                      ? `${product.stockQuantity} in stock` 
                      : 'Out of stock'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-gray-500 hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-16 px-3 py-2 border-t border-b border-gray-300 text-center focus:outline-none"
                />
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-3 py-2 border border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
              >
                <ShoppingBag size={20} className="mr-2" />
                Add to Cart
              </button>
              
              {product.tryOnEnabled ? (
                <Link
                  to={`/try-on/${product.id}`}
                  className="flex-1 bg-amber-600 text-white py-3 px-6 rounded-md font-medium hover:bg-amber-700 transition-colors flex items-center justify-center"
                >
                  <Camera size={20} className="mr-2" />
                  Try It On
                </Link>
              ) : (
                <button
                  className="flex-1 bg-gray-200 text-gray-400 py-3 px-6 rounded-md font-medium cursor-not-allowed flex items-center justify-center"
                  disabled
                >
                  <Camera size={20} className="mr-2" />
                  Try On Not Available
                </button>
              )}
            </div>
            
            {/* Additional Actions */}
            <div className="flex space-x-4 mt-4">
              <button className="text-gray-500 hover:text-amber-600 flex items-center">
                <Heart size={20} className="mr-1" />
                <span className="text-sm">Save</span>
              </button>
              <button className="text-gray-500 hover:text-amber-600 flex items-center">
                <Share2 size={20} className="mr-1" />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;