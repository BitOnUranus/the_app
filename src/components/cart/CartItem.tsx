import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { formatPrice } from '../../utils/formatters';
import { CartItem as CartItemType } from '../../types/cart';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  
  const handleUpdateQuantity = (amount: number) => {
    const newQuantity = item.quantity + amount;
    updateQuantity(item.productId, newQuantity);
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <Link 
          to={`/products/${item.productId}`} 
          className="text-gray-900 font-medium hover:text-amber-600 transition-colors"
        >
          {item.name}
        </Link>
        <div className="text-gray-500 text-sm mt-1">
          Price: {formatPrice(item.price)}
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="flex items-center border border-gray-300 rounded-md mr-4">
          <button 
            onClick={() => handleUpdateQuantity(-1)}
            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            disabled={item.quantity <= 1}
          >
            <Minus size={16} />
          </button>
          <span className="px-3 py-1 text-gray-900">{item.quantity}</span>
          <button 
            onClick={() => handleUpdateQuantity(1)}
            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
          >
            <Plus size={16} />
          </button>
        </div>
        
        <div className="text-gray-900 font-medium w-24 text-right">
          {formatPrice(item.price * item.quantity)}
        </div>
        
        <button 
          onClick={() => removeFromCart(item.productId)}
          className="ml-4 p-2 text-gray-500 hover:text-red-500 transition-colors"
          aria-label="Remove item"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;