import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Info } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';
import VirtualTryOn from '../components/ar/VirtualTryOn';
import { Product } from '../types/product';

const VirtualTryOnPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { products, getProductById, getARCompatibleProducts, isLoading } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Get AR-compatible products
  const arProducts = getARCompatibleProducts();
  
  useEffect(() => {
    // Set document title
    document.title = 'Virtual Try-On - JewelAR';
    
    if (!isLoading) {
      if (id) {
        // If ID is provided, try to get that specific product
        const product = getProductById(id);
        
        if (product && product.tryOnEnabled) {
          setSelectedProduct(product);
        } else {
          // If product doesn't exist or is not AR-compatible, redirect to the first AR product
          if (arProducts.length > 0) {
            navigate(`/try-on/${arProducts[0].id}`);
          }
        }
      } else if (arProducts.length > 0) {
        // If no ID provided, select the first AR-compatible product
        setSelectedProduct(arProducts[0]);
      }
    }
  }, [id, isLoading, products, navigate]);
  
  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = e.target.value;
    navigate(`/try-on/${productId}`);
  };
  
  if (isLoading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading try-on experience...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (arProducts.length === 0) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No AR-Compatible Products</h1>
          <p className="text-gray-600 mb-6">
            There are currently no products available for virtual try-on.
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Virtual Try-On Studio</h1>
          <Link 
            to="/products" 
            className="text-amber-600 hover:text-amber-700 flex items-center"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Shopping
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex items-start">
            <Info size={20} className="text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Virtual Try-On Instructions</h3>
              <p className="text-gray-600 text-sm">
                Select a jewelry piece, position yourself in front of the camera, and see how it looks on you. 
                You can take photos to save your favorite looks. For best results, ensure good lighting and keep your face centered in the frame.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Product Selection Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Jewelry</h2>
              
              <div className="mb-4">
                <label htmlFor="product-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Choose a product to try on
                </label>
                <select
                  id="product-select"
                  value={selectedProduct?.id || ''}
                  onChange={handleProductChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {arProducts.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name} - {product.tryOnType}
                    </option>
                  ))}
                </select>
              </div>
              
              {selectedProduct && (
                <>
                  <div className="aspect-square bg-gray-100 rounded-md overflow-hidden mb-4">
                    <img 
                      src={selectedProduct.imageUrls[0]} 
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h3 className="font-medium text-gray-900">{selectedProduct.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {selectedProduct.tryOnType} jewelry
                  </p>
                  
                  <Link
                    to={`/products/${selectedProduct.id}`}
                    className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                  >
                    View Product Details
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* Try-On Component */}
          <div className="lg:col-span-3">
            {selectedProduct ? (
              <VirtualTryOn product={selectedProduct} />
            ) : (
              <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">Select a product to try on</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOnPage;