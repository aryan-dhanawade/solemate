
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const Sitemap = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Sitemap</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Main Pages</h2>
                <ul className="space-y-2">
                  <li>
                    <Link to="/" className="flex items-center text-primary hover:underline">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="flex items-center text-primary hover:underline">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link to="/categories" className="flex items-center text-primary hover:underline">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="flex items-center text-primary hover:underline">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="flex items-center text-primary hover:underline">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Contact
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">User Account</h2>
                <ul className="space-y-2">
                  <li>
                    <Link to="/login" className="flex items-center text-primary hover:underline">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="flex items-center text-primary hover:underline">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile" className="flex items-center text-primary hover:underline">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/orders" className="flex items-center text-primary hover:underline">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      My Orders
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Shopping</h2>
                <ul className="space-y-2">
                  <li>
                    <Link to="/cart" className="flex items-center text-primary hover:underline">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Shopping Cart
                    </Link>
                  </li>
                  <li>
                    <Link to="/checkout" className="flex items-center text-primary hover:underline">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Checkout
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Policies and Information</h2>
                <ul className="space-y-2">
                  <li>
                    <Link to="/shipping-policy" className="flex items-center text-primary hover:underline">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Shipping Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/return-policy" className="flex items-center text-primary hover:underline">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Return Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy" className="flex items-center text-primary hover:underline">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms-of-service" className="flex items-center text-primary hover:underline">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="flex items-center text-primary hover:underline">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      FAQ
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sitemap;
