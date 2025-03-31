
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getCategories } from '@/services/api';
import { Category } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data = await getCategories();
        setCategories(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError('Failed to load categories. Please try again later.');
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load categories. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [toast]);

  const renderSkeletons = () => {
    return Array(6)
      .fill(0)
      .map((_, index) => (
        <Card key={index} className="flex flex-col h-full">
          <CardHeader>
            <Skeleton className="h-5 w-3/4 mb-2" />
          </CardHeader>
          <CardContent className="flex-1">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ));
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Shop By Categories</h1>
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading 
              ? renderSkeletons() 
              : categories.map((category) => (
                  <Card key={category.category_id} className="flex flex-col h-full bg-white border border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-gray-900">{category.name}</CardTitle>
                      <CardDescription className="text-gray-700">Explore our collection of {category.name.toLowerCase()}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-gray-700">Discover the latest in {category.name.toLowerCase()} fashion. From casual to formal, we have everything for your needs.</p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white">
                        <Link to={`/products?category=${category.category_id}`}>View Products</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))
            }
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
