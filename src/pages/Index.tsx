
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getCategories, getProducts } from '@/services/api';
import { Product, Category } from '@/types';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // In a real app, you might have a separate endpoint for featured products
        const productsData = await getProducts();
        setFeaturedProducts(productsData.slice(0, 4)); // Just take first 4 products as featured
        
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // For demo purposes, let's create placeholder data if API is not available
  useEffect(() => {
    if (!isLoading && featuredProducts.length === 0) {
      // Create placeholder products if API returns empty
      const placeholderProducts: Product[] = [
        {
          product_id: 1,
          name: 'Air Max 90',
          description: 'Classic style sneakers with maximum comfort and durability.',
          price: 120.99,
          stock_quantity: 50,
          category_id: 1,
          image_url: 'https://placehold.co/600x400?text=Air+Max+90'
        },
        {
          product_id: 2,
          name: 'Classic Leather Oxfords',
          description: 'Timeless formal leather shoes for a professional look.',
          price: 89.99,
          stock_quantity: 35,
          category_id: 2,
          image_url: 'https://placehold.co/600x400?text=Leather+Oxfords'
        },
        {
          product_id: 3,
          name: 'Running Boost',
          description: 'High-performance running shoes with responsive cushioning.',
          price: 149.99,
          stock_quantity: 20,
          category_id: 3,
          image_url: 'https://placehold.co/600x400?text=Running+Boost'
        },
        {
          product_id: 4,
          name: 'Casual Canvas Slip-ons',
          description: 'Comfortable everyday canvas shoes for casual outings.',
          price: 49.99,
          stock_quantity: 60,
          category_id: 4,
          image_url: 'https://placehold.co/600x400?text=Canvas+Slipons'
        }
      ];
      setFeaturedProducts(placeholderProducts);
    }

    if (!isLoading && categories.length === 0) {
      // Create placeholder categories if API returns empty
      const placeholderCategories: Category[] = [
        { category_id: 1, name: 'Sneakers' },
        { category_id: 2, name: 'Formal' },
        { category_id: 3, name: 'Sports' },
        { category_id: 4, name: 'Casual' }
      ];
      setCategories(placeholderCategories);
    }
  }, [isLoading, featuredProducts.length, categories.length]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Step Into Comfort & Style</h1>
            <p className="text-xl mb-8 text-blue-100">
              Discover our premium collection of shoes for every occasion, from casual to formal.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/products" >Shop Now</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-blue-900 hover:bg-blue-600 hover:text-white hover:border-blue-600" asChild>
                <Link to="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://placehold.co/600x400?text=Premium+Shoes" 
              alt="Premium Shoes Collection" 
              className="rounded-lg shadow-xl max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Button variant="ghost" asChild>
              <Link to="/products" className="flex items-center">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(category => (
              <Link 
                key={category.category_id} 
                to={`/products?category=${category.category_id}`}
                className="group relative h-64 overflow-hidden rounded-lg"
              >
                <img 
                  src={`https://placehold.co/600x400?text=${category.name}`} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-white text-xl font-bold">{category.name}</h3>
                  <p className="text-white/80 group-hover:underline mt-1">Shop Now</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits/Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Shop With Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
              <p className="text-gray-600">We offer only the highest quality shoes made from premium materials for lasting comfort.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">Enjoy quick shipping and reliable delivery on all your orders with real-time tracking.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">30-Day Returns</h3>
              <p className="text-gray-600">Not satisfied? Return your purchase within 30 days for a full refund, no questions asked.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter/Subscription */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="container mx-auto">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
            <p className="mb-6">Subscribe to our newsletter for exclusive offers, new arrivals, and style tips.</p>
            
            <form className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 rounded-md flex-1 text-gray-900"
              />
              <Button className="whitespace-nowrap bg-white text-primary hover:bg-gray-100">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
