
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  // Placeholder image if no image_url is provided
  const imageUrl = product.img_link || 'https://placehold.co/300x300?text=Shoe';

  return (
    <Link to={`/products/${product.product_id}`}>
      <div className="product-card bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg">
        <div className="relative h-60 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {product.stock_quantity <= 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 text-card-foreground">{product.name}</h3>
          <p className="text-card-foreground/80 text-sm mb-2 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-primary font-bold">${product.price.toFixed(2)}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleAddToCart}
              disabled={product.stock_quantity <= 0}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
