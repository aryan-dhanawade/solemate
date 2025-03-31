
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { User, Package, ShoppingBag, MessageSquare, AlertTriangle } from 'lucide-react';
import { getAdminData } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Customer, Order, Product, ContactIssue } from '@/types';

const Admin = () => {
  const { isAuthenticated, isAdmin, isLoading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('customers');

  const { data, isLoading, error } = useQuery({
    queryKey: ['adminData'],
    queryFn: getAdminData,
    enabled: isAuthenticated && isAdmin,
  });

  // If user is not authenticated or not an admin, redirect to homepage
  if (!authLoading && (!isAuthenticated || !isAdmin)) {
    return <Navigate to="/" replace />;
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const renderCustomersTable = (customers: Customer[]) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="hidden md:table-cell">Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.customer_id}>
              <TableCell className="font-medium">{customer.customer_id}</TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell className="hidden md:table-cell">
                {customer.address?.length > 30 
                  ? `${customer.address.substring(0, 30)}...` 
                  : customer.address}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-500';
      case 'shipped':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const renderOrdersTable = (orders: Order[]) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Order ID</TableHead>
            <TableHead>Customer ID</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.order_id}>
              <TableCell className="font-medium">{order.order_id}</TableCell>
              <TableCell>{order.customer_id}</TableCell>
              <TableCell className="hidden md:table-cell">
                {new Date(order.order_date).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge className={`${getStatusColor(order.status)} text-white`}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>{formatCurrency(order.total_amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const renderProductsTable = (products: Product[]) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.product_id}>
              <TableCell className="font-medium">{product.product_id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell className="hidden md:table-cell">
                {product.description?.length > 30 
                  ? `${product.description.substring(0, 30)}...` 
                  : product.description}
              </TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.stock_quantity}</TableCell>
              <TableCell>{product.category_id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const renderIssuesTable = (issues: ContactIssue[]) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead className="hidden md:table-cell">Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.length > 0 ? (
            issues.map((issue) => (
              <TableRow key={issue.contact_id}>
                <TableCell className="font-medium">{issue.contact_id}</TableCell>
                <TableCell>{issue.name}</TableCell>
                <TableCell>{issue.email}</TableCell>
                <TableCell>{issue.subject}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {issue.message?.length > 30 
                    ? `${issue.message.substring(0, 30)}...` 
                    : issue.message}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No issues reported
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  const renderDashboardContent = () => {
    if (isLoading) {
      return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-destructive flex items-center">
              <AlertTriangle className="mr-2" /> Error Loading Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>There was an error loading the admin dashboard. Please try again later.</p>
          </CardContent>
        </Card>
      );
    }

    if (!data) {
      return null;
    }

    return (
      <>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
              <CardDescription className="text-2xl font-bold">
                {data?.customers?.length || 0}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground flex items-center">
                <User className="h-3 w-3 mr-1" /> 
                Registered users
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
              <CardDescription className="text-2xl font-bold">
                {data?.products?.length || 0}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground flex items-center">
                <Package className="h-3 w-3 mr-1" /> 
                In inventory
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
              <CardDescription className="text-2xl font-bold">
                {data?.orders?.length || 0}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground flex items-center">
                <ShoppingBag className="h-3 w-3 mr-1" /> 
                Processed orders
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Support Issues</CardTitle>
              <CardDescription className="text-2xl font-bold">
                {data?.issues?.length || 0}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground flex items-center">
                <MessageSquare className="h-3 w-3 mr-1" /> 
                Customer inquiries
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="customers" className="flex items-center">
              <User className="h-4 w-4 mr-2" /> Customers
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center">
              <ShoppingBag className="h-4 w-4 mr-2" /> Orders
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center">
              <Package className="h-4 w-4 mr-2" /> Products
            </TabsTrigger>
            <TabsTrigger value="issues" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" /> Issues
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Customer Management</CardTitle>
                <CardDescription>
                  View and manage all registered customers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderCustomersTable(data.customers)}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>
                  Track and manage customer orders.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderOrdersTable(data.orders)}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Product Inventory</CardTitle>
                <CardDescription>
                  Manage your product catalog and inventory.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderProductsTable(data.products)}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="issues">
            <Card>
              <CardHeader>
                <CardTitle>Customer Support</CardTitle>
                <CardDescription>
                  Respond to customer inquiries and issues.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderIssuesTable(data.issues)}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-16 flex-1">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your store's products, orders, and customers
          </p>
        </div>
        
        {renderDashboardContent()}
      </div>
    </div>
  );
};

export default Admin;
