
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { getOrderById, getPaymentByOrderId, getProductById } from '@/services/api';
import { Order, Product } from '@/types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, ArrowLeft, CreditCard, Loader2, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const orderId = parseInt(id || '0');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [order, setOrder] = useState<Order | null>(null);
  const [payment, setPayment] = useState<any | null>(null);
  const [products, setProducts] = useState<Record<number, Product>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    if (!orderId) {
      navigate('/orders');
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        setIsLoading(true);
        const orderData = await getOrderById(orderId);
        setOrder(orderData);
        
        // Fetch product details for each order item
        const productPromises = orderData.order_items.map(async (item) => {
          try {
            return await getProductById(item.product_id);
          } catch (err) {
            console.error(`Failed to fetch product ${item.product_id}:`, err);
            return null;
          }
        });
        
        const productResults = await Promise.all(productPromises);
        const productMap: Record<number, Product> = {};
        
        productResults.forEach(product => {
          if (product) {
            productMap[product.product_id] = product;
          }
        });
        
        setProducts(productMap);
        
        try {
          const paymentData = await getPaymentByOrderId(orderId);
          setPayment(paymentData);
        } catch (paymentErr) {
          console.error('Payment details not available:', paymentErr);
        }
        
        setError(null);
      } catch (err) {
        console.error('Failed to fetch order details:', err);
        setError('Failed to load order details. Please try again later.');
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load order details. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [isAuthenticated, navigate, orderId, toast]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading order details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-16">
          <Link to="/orders" className="inline-flex items-center text-sm mb-6 hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Link>
          
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Order not found or you don't have permission to view it.</AlertDescription>
          </Alert>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <Link to="/orders" className="inline-flex items-center text-sm mb-6 hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Link>
        
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Order #{order.order_id}</h1>
          <Badge 
            variant="outline" 
            className={`
              ${order.status.toLowerCase() === 'processing' && 'bg-blue-50 text-blue-600 border-blue-200'} 
              ${order.status.toLowerCase() === 'shipped' && 'bg-green-50 text-green-600 border-green-200'}
              ${order.status.toLowerCase() === 'delivered' && 'bg-green-600 text-white'}
              ${order.status.toLowerCase() === 'cancelled' && 'bg-red-50 text-red-600 border-red-200'}
            `}
          >
            {order.status}
          </Badge>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
                <CardDescription>
                  Placed on {format(new Date(order.order_date), 'MMMM d, yyyy')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {order.order_items.map((item, index) => {
                  const product = products[item.product_id];
                  return (
                    <div key={index} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex gap-4">
                        <div className="h-16 w-16 bg-muted rounded flex items-center justify-center">
                          {product?.image_url ? (
                            <img 
                              src={product.image_url} 
                              alt={product?.name || `Product #${item.product_id}`} 
                              className="h-full w-full object-cover rounded"
                            />
                          ) : (
                            <Package className="h-8 w-8 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">
                            {product?.name || `Product #${item.product_id}`}
                          </h3>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              ${item.price?.toFixed(2) || "0.00"} x {item.quantity}
                            </span>
                            <span className="font-medium">
                              ${((item.price || 0) * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                      {index < order.order_items.length - 1 && <Separator className="mt-4" />}
                    </div>
                  );
                })}
                
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${order.total_amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${order.total_amount.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className={`flex items-center gap-3 ${order.status.toLowerCase() === 'processing' || order.status.toLowerCase() === 'shipped' || order.status.toLowerCase() === 'delivered' ? 'text-green-600' : 'text-muted-foreground'}`}>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${order.status.toLowerCase() === 'processing' || order.status.toLowerCase() === 'shipped' || order.status.toLowerCase() === 'delivered' ? 'bg-green-100' : 'bg-muted'}`}>
                      <span className="text-sm font-medium">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Order Placed</p>
                      <p className="text-xs">{format(new Date(order.order_date), 'MMM d, yyyy')}</p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-3 ${order.status.toLowerCase() === 'shipped' || order.status.toLowerCase() === 'delivered' ? 'text-green-600' : 'text-muted-foreground'}`}>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${order.status.toLowerCase() === 'shipped' || order.status.toLowerCase() === 'delivered' ? 'bg-green-100' : 'bg-muted'}`}>
                      <span className="text-sm font-medium">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Shipped</p>
                      {order.status.toLowerCase() === 'shipped' || order.status.toLowerCase() === 'delivered' ? (
                        <p className="text-xs">Your order is on the way</p>
                      ) : (
                        <p className="text-xs">Pending</p>
                      )}
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-3 ${order.status.toLowerCase() === 'delivered' ? 'text-green-600' : 'text-muted-foreground'}`}>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${order.status.toLowerCase() === 'delivered' ? 'bg-green-100' : 'bg-muted'}`}>
                      <span className="text-sm font-medium">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Delivered</p>
                      {order.status.toLowerCase() === 'delivered' ? (
                        <p className="text-xs">Your order has been delivered</p>
                      ) : (
                        <p className="text-xs">Pending</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {payment && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{payment.payment_method}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Payment Amount:</span>
                      <span className="font-medium">${payment.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Status:</span>
                      <span className="font-medium text-green-600">Complete</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderDetail;
