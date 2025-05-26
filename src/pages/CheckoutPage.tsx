import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, Truck, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { formatPrice } from '../utils/formatters';

type CheckoutStep = 'shipping' | 'payment' | 'review';

const CheckoutPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Form state
  const [shippingDetails, setShippingDetails] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    address: user?.address || '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    phone: user?.phone || ''
  });
  
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  
  useEffect(() => {
    // Update document title
    document.title = 'Checkout - JewelAR';
    
    // Redirect to cart if cart is empty
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);
  
  // Calculate order summary
  const shipping = 2000; // ₹2,000 shipping
  const tax = Math.round(totalPrice * 0.18); // 18% tax
  const orderTotal = totalPrice + shipping + tax;
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
    window.scrollTo(0, 0);
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('review');
    window.scrollTo(0, 0);
  };
  
  const handlePlaceOrder = async () => {
    try {
      setIsProcessing(true);
      
      // Simulate API call to create order
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and redirect to success page
      clearCart();
      navigate('/order-success');
    } catch (error) {
      console.error('Error placing order:', error);
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        {/* Checkout Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className={`flex flex-col items-center ${currentStep === 'shipping' ? 'text-amber-600' : 'text-gray-900'}`}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full mb-2 ${
                currentStep === 'shipping' ? 'bg-amber-600 text-white' : 
                currentStep === 'payment' || currentStep === 'review' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {currentStep === 'payment' || currentStep === 'review' ? <Check size={20} /> : <Truck size={20} />}
              </div>
              <span className="text-sm font-medium">Shipping</span>
            </div>
            
            <div className={`w-24 h-1 mx-2 ${
              currentStep === 'payment' || currentStep === 'review' ? 'bg-green-500' : 'bg-gray-200'
            }`}></div>
            
            <div className={`flex flex-col items-center ${currentStep === 'payment' ? 'text-amber-600' : 'text-gray-900'}`}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full mb-2 ${
                currentStep === 'payment' ? 'bg-amber-600 text-white' : 
                currentStep === 'review' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {currentStep === 'review' ? <Check size={20} /> : <CreditCard size={20} />}
              </div>
              <span className="text-sm font-medium">Payment</span>
            </div>
            
            <div className={`w-24 h-1 mx-2 ${
              currentStep === 'review' ? 'bg-green-500' : 'bg-gray-200'
            }`}></div>
            
            <div className={`flex flex-col items-center ${currentStep === 'review' ? 'text-amber-600' : 'text-gray-900'}`}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full mb-2 ${
                currentStep === 'review' ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                <ShoppingBag size={20} />
              </div>
              <span className="text-sm font-medium">Review</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Checkout Forms */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Shipping Information */}
              {currentStep === 'shipping' && (
                <form onSubmit={handleShippingSubmit}>
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          value={shippingDetails.fullName}
                          onChange={(e) => setShippingDetails({...shippingDetails, fullName: e.target.value})}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={shippingDetails.email}
                          onChange={(e) => setShippingDetails({...shippingDetails, email: e.target.value})}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address *
                        </label>
                        <input
                          type="text"
                          id="address"
                          value={shippingDetails.address}
                          onChange={(e) => setShippingDetails({...shippingDetails, address: e.target.value})}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          value={shippingDetails.city}
                          onChange={(e) => setShippingDetails({...shippingDetails, city: e.target.value})}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State/Province *
                        </label>
                        <input
                          type="text"
                          id="state"
                          value={shippingDetails.state}
                          onChange={(e) => setShippingDetails({...shippingDetails, state: e.target.value})}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                          Postal Code *
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          value={shippingDetails.postalCode}
                          onChange={(e) => setShippingDetails({...shippingDetails, postalCode: e.target.value})}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                          Country *
                        </label>
                        <select
                          id="country"
                          value={shippingDetails.country}
                          onChange={(e) => setShippingDetails({...shippingDetails, country: e.target.value})}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                          <option value="India">India</option>
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Canada">Canada</option>
                          <option value="Australia">Australia</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={shippingDetails.phone}
                          onChange={(e) => setShippingDetails({...shippingDetails, phone: e.target.value})}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gray-50">
                    <button
                      type="submit"
                      className="w-full bg-amber-600 text-white py-3 px-6 rounded-md font-medium hover:bg-amber-700 transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </form>
              )}
              
              {/* Payment Information */}
              {currentStep === 'payment' && (
                <form onSubmit={handlePaymentSubmit}>
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Information</h2>
                    
                    <div className="mb-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-8 bg-blue-100 rounded flex items-center justify-center text-blue-600 font-bold">
                          Visa
                        </div>
                        <div className="w-12 h-8 bg-red-100 rounded flex items-center justify-center text-red-600 font-bold">
                          MC
                        </div>
                        <div className="w-12 h-8 bg-green-100 rounded flex items-center justify-center text-green-600 font-bold">
                          Amex
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                            Name on Card *
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            value={paymentDetails.cardName}
                            onChange={(e) => setPaymentDetails({...paymentDetails, cardName: e.target.value})}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number *
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            value={paymentDetails.cardNumber}
                            onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                            placeholder="XXXX XXXX XXXX XXXX"
                            required
                            maxLength={19}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date (MM/YY) *
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            value={paymentDetails.expiryDate}
                            onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                            placeholder="MM/YY"
                            required
                            maxLength={5}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV *
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            value={paymentDetails.cvv}
                            onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                            placeholder="XXX"
                            required
                            maxLength={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Billing Address</h3>
                      <div className="flex items-center mb-4">
                        <input
                          type="checkbox"
                          id="sameAsShipping"
                          className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                          defaultChecked
                        />
                        <label htmlFor="sameAsShipping" className="ml-2 text-sm text-gray-700">
                          Same as shipping address
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gray-50 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep('shipping')}
                      className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-amber-600 text-white rounded-md font-medium hover:bg-amber-700 transition-colors"
                    >
                      Review Order
                    </button>
                  </div>
                </form>
              )}
              
              {/* Order Review */}
              {currentStep === 'review' && (
                <div>
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Review Your Order</h2>
                    
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-900 mb-2">Shipping Information</h3>
                      <div className="bg-gray-50 p-4 rounded">
                        <p className="font-medium">{shippingDetails.fullName}</p>
                        <p>{shippingDetails.address}</p>
                        <p>{shippingDetails.city}, {shippingDetails.state} {shippingDetails.postalCode}</p>
                        <p>{shippingDetails.country}</p>
                        <p>{shippingDetails.phone}</p>
                        <p>{shippingDetails.email}</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
                      <div className="bg-gray-50 p-4 rounded">
                        <p className="font-medium">Credit Card</p>
                        <p>Card ending in {paymentDetails.cardNumber.slice(-4)}</p>
                        <p>Expires {paymentDetails.expiryDate}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Order Items</h3>
                      <div className="border rounded divide-y">
                        {cartItems.map(item => (
                          <div key={item.productId} className="flex items-center p-4">
                            <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                              <img 
                                src={item.imageUrl} 
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="ml-4 flex-grow">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                            <div className="font-medium">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gray-50 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep('payment')}
                      className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                      disabled={isProcessing}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handlePlaceOrder}
                      className={`px-6 py-2 bg-amber-600 text-white rounded-md font-medium hover:bg-amber-700 transition-colors flex items-center ${
                        isProcessing ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                          Processing...
                        </>
                      ) : (
                        'Place Order'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
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
                    <span className="text-amber-600">{formatPrice(orderTotal)}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-500">
                <p className="mb-2">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
                <p>
                  All transactions are secure and encrypted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;