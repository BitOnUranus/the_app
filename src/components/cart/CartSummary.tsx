import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { formatPrice } from '../../utils/formatters';

const CartSummary: React.FC = () => {
  const { cartItems, totalPrice } = useCart();
  
  // Calculate shipping and tax
  const shipping = cartItems.length > 0 ? 2000 : 0; // ₹2,000 shipping if cart has items
  const tax = Math.round(totalPrice * 0.18); // 18% tax
  const orderTotal = totalPrice + shipping + tax;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900 font-medium">{formatPrice(totalPrice)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-900 font-medium">{formatPrice(shipping)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (18%)</span>
          <span className="text-gray-900 font-medium">{formatPrice(tax)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between font-semibold">
            <span className="text-gray-900">Order Total</span>
            <span className="text-gray-900">{formatPrice(orderTotal)}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Link
          to="/checkout"
          className={`w-full block text-center py-3 rounded-md font-medium transition-colors ${
            cartItems.length > 0
              ? 'bg-amber-600 text-white hover:bg-amber-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          onClick={(e) => cartItems.length === 0 && e.preventDefault()}
        >
          Proceed to Checkout
        </Link>
        
        <Link
          to="/products"
          className="w-full block text-center py-3 mt-3 text-amber-600 hover:text-amber-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;