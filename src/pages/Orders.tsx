
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { getOrders } from '@/services/api';
import { Order } from '@/types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Clock, Package, ShoppingBag, TruckIcon, Eye, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

const OrderStatusBadge = ({ status }: { status: string }) => {
  switch (status.toLowerCase()) {
    case 'processing':
      return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Processing</Badge>;
    case 'shipped':
      return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Shipped</Badge>;
    case 'delivered':
      return <Badge variant="outline" className="bg-green-600">Delivered</Badge>;
    case 'cancelled':
      return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Cancelled</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const OrderStatusIcon = ({ status }: { status: string }) => {
  switch (status.toLowerCase()) {
    case 'processing':
      return <Clock className="h-10 w-10 text-blue-500" />;
    case 'shipped':
      return <TruckIcon className="h-10 w-10 text-yellow-500" />;
    case 'delivered':
      return <Package className="h-10 w-10 text-green-500" />;
    case 'cancelled':
      return <AlertCircle className="h-10 w-10 text-red-500" />;
    default:
      return <ShoppingBag className="h-10 w-10 text-gray-500" />;
  }
};

const Orders = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const data = await getOrders();
        setOrders(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Failed to load your orders. Please try again later.');
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load your orders. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, navigate, toast]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading your orders...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-10">
              <div className="text-center">
                <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-medium mb-2">No Orders Yet</h3>
                <p className="text-muted-foreground mb-6">You haven't placed any orders yet.</p>
                <Button asChild>
                  <Link to="/products">Start Shopping</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.order_id}>
                <CardHeader className="pb-4">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                      <CardTitle className="text-lg">Order #{order.order_id}</CardTitle>
                      <CardDescription>
                        Placed on {format(new Date(order.order_date), 'MMMM d, yyyy')}
                      </CardDescription>
                    </div>
                    <OrderStatusBadge status={order.status} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <OrderStatusIcon status={order.status} />
                      <div>
                        <h3 className="font-medium">Status: {order.status}</h3>
                        <p className="text-sm text-muted-foreground">
                          {order.status.toLowerCase() === 'processing' && 'Your order is being processed.'}
                          {order.status.toLowerCase() === 'shipped' && 'Your order is on the way!'}
                          {order.status.toLowerCase() === 'delivered' && 'Your order has been delivered.'}
                          {order.status.toLowerCase() === 'cancelled' && 'This order was cancelled.'}
                        </p>
                      </div>
                    </div>
                    
                    <Separator orientation="vertical" className="hidden md:block h-auto" />
                    <Separator className="md:hidden" />
                    
                    <div className="flex-1">
                      <h3 className="font-medium mb-2">Order Summary</h3>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Total Amount:</span>
                          <span className="font-medium">${order.total_amount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/orders/${order.order_id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Orders;
