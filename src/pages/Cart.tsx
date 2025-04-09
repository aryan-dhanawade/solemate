
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemove = (productId: number) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Please login first",
        description: "You need to be logged in to checkout",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1 py-24 container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center py-12">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild size="lg">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Shopping Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="hidden md:grid grid-cols-12 gap-4 mb-4 text-sm font-semibold text-gray-700">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-center">Total</div>
                  </div>
                  
                  <Separator className="mb-6" />
                  
                  {items.map((item) => (
                    <div key={item.product.product_id} className="mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        {/* Product */}
                        <div className="col-span-6 flex gap-4">
                          <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                            <img 
                              src={item.product.img_link || `https://placehold.co/300x300?text=${item.product.name}`} 
                              alt={item.product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              <Link to={`/products/${item.product.product_id}`} className="hover:text-primary">
                                {item.product.name}
                              </Link>
                            </h3>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-gray-500 hover:text-destructive p-0 h-auto text-xs"
                              onClick={() => handleRemove(item.product.product_id)}
                            >
                              <X className="h-3 w-3 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                        
                        {/* Price */}
                        <div className="md:col-span-2 md:text-center flex justify-between items-center md:block">
                          <span className="text-sm font-semibold md:hidden text-gray-700">Price:</span>
                          <span className="text-gray-900">${item.product.price.toFixed(2)}</span>
                        </div>
                        
                        {/* Quantity */}
                        <div className="md:col-span-2 md:text-center flex justify-between items-center md:block">
                          <span className="text-sm font-semibold md:hidden text-gray-700">Quantity:</span>
                          <div className="flex items-center justify-center">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-7 w-7" 
                              onClick={() => handleQuantityChange(item.product.product_id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            
                            <span className="w-10 text-center text-gray-900">{item.quantity}</span>
                            
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-7 w-7" 
                              onClick={() => handleQuantityChange(item.product.product_id, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stock_quantity}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Total */}
                        <div className="md:col-span-2 md:text-center flex justify-between items-center md:block">
                          <span className="text-sm font-semibold md:hidden text-gray-700">Total:</span>
                          <span className="font-semibold text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <Separator className="mt-6" />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <Button 
                  variant="outline" 
                  asChild
                >
                  <Link to="/products">
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Subtotal ({totalItems} items)</span>
                    <span className="text-gray-900">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Shipping</span>
                    <span className="text-gray-900">Free</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-semibold text-lg mb-6">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">${totalPrice.toFixed(2)}</span>
                </div>
                
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <div className="mt-6">
                  <h3 className="font-semibold mb-2 text-gray-900">Have a promo code?</h3>
                  <div className="flex gap-2">
                    <Input placeholder="Enter code" className="text-gray-900" />
                    <Button variant="outline">Apply</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
