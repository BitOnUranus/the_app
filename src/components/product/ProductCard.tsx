import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { Product } from '../../types/product';
import { formatPrice } from '../../utils/formatters';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrls[0]
    });
  };

  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="relative">
          <div className="aspect-square overflow-hidden">
            <img 
              src={product.imageUrls[0]} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          {product.tryOnEnabled && (
            <div className="absolute top-3 right-3 bg-amber-600 text-white text-xs font-semibold px-2 py-1 rounded">
              Try On
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
          <p className="text-gray-500 text-sm mb-2">{product.material}</p>
          <div className="flex justify-between items-center">
            <p className="text-gray-900 font-bold">{formatPrice(product.price)}</p>
            <div className="flex space-x-2">
              <Link 
                to={`/try-on/${product.id}`} 
                className={`px-3 py-1 rounded text-sm font-medium ${
                  product.tryOnEnabled 
                    ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                onClick={e => !product.tryOnEnabled && e.preventDefault()}
              >
                Try On
              </Link>
              <button 
                onClick={handleAddToCart}
                className="px-3 py-1 bg-gray-900 text-white rounded text-sm font-medium hover:bg-gray-800"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;