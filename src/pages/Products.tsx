
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories } from '@/services/api';
import { Product, Category } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortOption, setSortOption] = useState('featured');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Get category from URL if present
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
          setSelectedCategory(categoryParam);
          console.log(categoryParam)
        }
        
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        // Create placeholder data if API call fails
        // createPlaceholderData();
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  // Create placeholder data if API returns empty
  const createPlaceholderData = () => {
    const placeholderProducts: Product[] = Array.from({ length: 12 }, (_, i) => ({
      product_id: i + 1,
      name: `Product ${i + 1}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 50 + Math.floor(Math.random() * 200),
      stock_quantity: Math.floor(Math.random() * 50),
      category_id: Math.floor(Math.random() * 4) + 1,
      image_url: `https://placehold.co/600x400?text=Product+${i + 1}`
    }));
    
    const placeholderCategories: Category[] = [
      { category_id: 1, name: 'Sneakers' },
      { category_id: 2, name: 'Formal' },
      { category_id: 3, name: 'Sports' },
      { category_id: 4, name: 'Casual' }
    ];
    
    setProducts(placeholderProducts);
    setCategories(placeholderCategories);
  };

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (selectedCategory != "all") {
      result = result.filter(
        product => product.category_id === parseInt(selectedCategory)
      );
    }
    
    // Filter by price range
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter by stock
    if (inStockOnly) {
      result = result.filter(product => product.stock_quantity > 0);
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Default is 'featured' which we'll keep as is
        break;
    }
    
    setFilteredProducts(result);
  }, [
    products, 
    searchQuery, 
    selectedCategory, 
    priceRange, 
    inStockOnly, 
    sortOption
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory("all");
    setPriceRange([0, 1000]);
    setInStockOnly(false);
    setSortOption('featured');
    
    // Clear category from URL
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('category');
    setSearchParams(newSearchParams);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    
    // Update URL with category
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('category', value);
    setSearchParams(newSearchParams);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already applied via the useEffect
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            {/* Mobile Filters */}
            <div className="w-full md:hidden mb-4">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filter Products</SheetTitle>
                      <SheetDescription>
                        Refine your product search with these filters.
                      </SheetDescription>
                    </SheetHeader>
                    
                    {/* Mobile Filters Content */}
                    <div className="py-4 space-y-6">
                      {/* Categories */}
                      <div className="space-y-2">
                        <Label className="text-gray-900">Categories</Label>
                        <Select 
                          value={selectedCategory || undefined} 
                          onValueChange={handleCategoryChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All Categories" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map(category => (
                              <SelectItem 
                                key={category.category_id} 
                                value={category.category_id.toString()}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {/* Price Range */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label className="text-gray-900">Price Range</Label>
                          <span className="text-sm text-gray-700">
                            ${priceRange[0]} - ${priceRange[1]}
                          </span>
                        </div>
                        <Slider
                          defaultValue={[0, 1000]}
                          min={0}
                          max={1000}
                          step={10}
                          value={priceRange}
                          onValueChange={(value) => setPriceRange(value as [number, number])}
                          className="my-4"
                        />
                      </div>
                      
                      {/* Stock Filter */}
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="in-stock-mobile" 
                          checked={inStockOnly}
                          onCheckedChange={(checked) => 
                            setInStockOnly(checked as boolean)
                          }
                        />
                        <Label htmlFor="in-stock-mobile" className="text-gray-900">In Stock Only</Label>
                      </div>
                    </div>
                    
                    <SheetFooter className="sm:justify-between">
                      <Button 
                        variant="outline" 
                        onClick={resetFilters}
                      >
                        Reset Filters
                      </Button>
                      <SheetClose asChild>
                        <Button>Apply Filters</Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
              
              {/* Mobile Search & Sort */}
              <div className="flex flex-col gap-4 mb-6">
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 text-gray-900"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Search className="h-4 w-4" />
                  </div>
                  {searchQuery && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setSearchQuery('')}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </form>
                
                <div>
                  <Label htmlFor="mobile-sort" className="text-gray-900">Sort By</Label>
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger id="mobile-sort">
                      <SelectValue placeholder="Featured" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="name-asc">Name: A to Z</SelectItem>
                      <SelectItem value="name-desc">Name: Z to A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Desktop Sidebar Filters */}
            <div className="hidden md:block w-64 sticky top-24 bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4 text-gray-900">Filters</h2>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={resetFilters}
                    className="w-full"
                  >
                    Reset Filters
                  </Button>
                </div>
                
                {/* Search Filter */}
                <div className="space-y-2">
                  <Label className="text-gray-900">Search</Label>
                  <form onSubmit={handleSearch} className="relative">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 text-gray-900"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Search className="h-4 w-4" />
                    </div>
                    {searchQuery && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setSearchQuery('')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </form>
                </div>
                
                {/* Categories */}
                <div className="space-y-2">
                  <Label className="text-gray-900">Categories</Label>
                  <Select 
                    value={selectedCategory || undefined} 
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem 
                          key={category.category_id} 
                          value={category.category_id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Price Range */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-gray-900">Price Range</Label>
                    <span className="text-sm text-gray-700">
                      ${priceRange[0]} - ${priceRange[1]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0, 1000]}
                    min={0}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="my-4"
                  />
                </div>
                
                {/* Stock Filter */}
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="in-stock" 
                    checked={inStockOnly}
                    onCheckedChange={(checked) => 
                      setInStockOnly(checked as boolean)
                    }
                  />
                  <Label htmlFor="in-stock" className="text-gray-900">In Stock Only</Label>
                </div>
              </div>
            </div>
            
            {/* Product Grid */}
            <div className="flex-1">
              {/* Desktop Header */}
              <div className="hidden md:flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                
                <div className="flex items-center gap-2">
                  <Label htmlFor="sort-by" className="text-sm whitespace-nowrap text-gray-900">
                    Sort by:
                  </Label>
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger id="sort-by" className="w-[180px]">
                      <SelectValue placeholder="Featured" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="name-asc">Name: A to Z</SelectItem>
                      <SelectItem value="name-desc">Name: Z to A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Results Count */}
              <div className="mb-6">
                <p className="text-gray-700">
                  Showing {filteredProducts.length} results
                </p>
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-200 animate-pulse rounded-lg h-80"
                    ></div>
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.product_id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">No products found</h3>
                  <p className="text-gray-700 mb-6">
                    Try adjusting your filters or search criteria
                  </p>
                  <Button onClick={resetFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
