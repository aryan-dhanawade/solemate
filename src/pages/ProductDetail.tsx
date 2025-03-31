import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '@/services/api';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { 
  Minus, 
  Plus, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  ChevronRight 
} from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Placeholder images (in a real app, these would come from the product data)
  const productImages = [
    `https://placehold.co/600x400?text=Product+${id}+Image+1`,
    `https://placehold.co/600x400?text=Product+${id}+Image+2`,
    `https://placehold.co/600x400?text=Product+${id}+Image+3`,
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const productData = await getProductById(parseInt(id));
        setProduct(productData);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        
        // Create placeholder product if API fails
        const placeholderProduct: Product = {
          product_id: parseInt(id),
          name: `Product ${id}`,
          description: 'This is a premium quality product designed for comfort and durability. Made from high-quality materials, this product offers excellent value for money and will serve you well for years to come.',
          price: 99.99,
          stock_quantity: 25,
          category_id: 1,
          image_url: `https://placehold.co/600x400?text=Product+${id}`
        };
        
        setProduct(placeholderProduct);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const incrementQuantity = () => {
    if (product && quantity < product.stock_quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1 py-24 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
            <div className="space-y-4">
              <div className="bg-gray-200 animate-pulse rounded h-10 w-3/4"></div>
              <div className="bg-gray-200 animate-pulse rounded h-6 w-1/4"></div>
              <div className="bg-gray-200 animate-pulse rounded h-32 w-full"></div>
              <div className="bg-gray-200 animate-pulse rounded h-12 w-full"></div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1 py-24 container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-8">We couldn't find the product you're looking for.</p>
          <Button asChild>
            <Link to="/products">Return to Products</Link>
          </Button>
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
          {/* Breadcrumbs */}
          <nav className="flex mb-8 text-sm">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-primary">
                  Home
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <li>
                <Link to="/products" className="text-gray-500 hover:text-primary">
                  Products
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <li className="text-gray-900 font-semibold truncate max-w-[200px]">
                {product.name}
              </li>
            </ol>
          </nav>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg overflow-hidden shadow-md aspect-square">
                <img 
                  src={productImages[activeImageIndex]} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex space-x-4">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                      activeImageIndex === index ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-2xl font-semibold text-primary">${product.price.toFixed(2)}</p>
              </div>
              
              <div className="border-t border-b py-4">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
              
              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Quantity</p>
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={decrementQuantity} 
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    
                    <span className="w-12 text-center">{quantity}</span>
                    
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={incrementQuantity}
                      disabled={product.stock_quantity <= quantity}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    
                    <span className="ml-4 text-sm text-gray-500">
                      {product.stock_quantity} available
                    </span>
                  </div>
                </div>
                
                <Button 
                  className="w-full py-6 text-lg" 
                  onClick={handleAddToCart}
                  disabled={product.stock_quantity <= 0}
                >
                  {product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>
              
              {/* Product Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <Card>
                  <CardContent className="pt-6 flex items-center justify-center flex-col text-center">
                    <Truck className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-semibold">Free Shipping</h3>
                    <p className="text-sm text-gray-500">On orders over $50</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6 flex items-center justify-center flex-col text-center">
                    <ShieldCheck className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-semibold">2 Year Warranty</h3>
                    <p className="text-sm text-gray-500">100% guarantee</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6 flex items-center justify-center flex-col text-center">
                    <RefreshCw className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-semibold">30 Day Returns</h3>
                    <p className="text-sm text-gray-500">No questions asked</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
