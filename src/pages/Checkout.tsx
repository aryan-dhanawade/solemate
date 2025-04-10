
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { checkout, processPayment } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { User, CreditCard, MapPin, ChevronRight } from 'lucide-react';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.name || '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
  });
  const [billingAddress, setBillingAddress] = useState({
    fullName: user?.name || '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
  });
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));

    if (sameAsShipping) {
      setBillingAddress((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectShippingChange = (name: string, value: string) => {
    setShippingAddress((prev) => ({ ...prev, [name]: value }));

    if (sameAsShipping) {
      setBillingAddress((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectBillingChange = (name: string, value: string) => {
    setBillingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSameAsShippingChange = (checked: boolean) => {
    setSameAsShipping(checked);
    if (checked) {
      setBillingAddress(shippingAddress);
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate shipping info
      const { fullName, addressLine1, city, state, postalCode, country } = shippingAddress;
      if (!fullName || !addressLine1 || !city || !state || !postalCode || !country) {
        toast({
          title: "Missing information",
          description: "Please fill in all required shipping fields",
          variant: "destructive",
        });
        return;
      }
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validatePaymentDetails = () => {
    const { cardNumber, cardName, expiryMonth, expiryYear, cvv } = paymentDetails;
    
    if (paymentMethod === 'credit' && (!cardNumber || !cardName || !expiryMonth || !expiryYear || !cvv)) {
      toast({
        title: "Missing payment information",
        description: "Please fill in all required payment fields",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validatePaymentDetails()) {
      return;
    }

    try {
      setIsProcessing(true);

      // Prepare checkout data
      const checkoutData = {
        items: items.map(item => ({
          product_id: item.product.product_id,
          quantity: item.quantity
        }))
      };

      // Process checkout
      console.log(JSON.stringify(checkoutData));
      const orderResponse = await checkout(checkoutData);
  

      // Process payment
      const paymentData = {
        order_id: orderResponse.order_id,
        payment_method: paymentMethod,
        amount: totalPrice
      };
      console.log(paymentData);
      await processPayment(paymentData);


      // Success
      toast({
        title: "Order placed successfully!",
        description: `Your order #${orderResponse.order_id} has been confirmed.`,
      });

      // Clear cart
      clearCart();

      // Redirect to order confirmation
      navigate(`/orders/${orderResponse.order_id}`);
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            
            {/* Checkout Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between max-w-2xl mx-auto">
                <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${currentStep >= 1 ? 'border-primary bg-primary text-white' : 'border-muted-foreground'}`}>
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="text-sm mt-1">Shipping</span>
                </div>
                
                <div className={`h-1 flex-1 mx-2 ${currentStep >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
                
                <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${currentStep >= 2 ? 'border-primary bg-primary text-white' : 'border-muted-foreground'}`}>
                    <User className="h-5 w-5" />
                  </div>
                  <span className="text-sm mt-1">Billing</span>
                </div>
                
                <div className={`h-1 flex-1 mx-2 ${currentStep >= 3 ? 'bg-primary' : 'bg-muted'}`}></div>
                
                <div className={`flex flex-col items-center ${currentStep >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${currentStep >= 3 ? 'border-primary bg-primary text-white' : 'border-muted-foreground'}`}>
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <span className="text-sm mt-1">Payment</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2">
                {/* Step 1: Shipping Information */}
                {currentStep === 1 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Shipping Information</CardTitle>
                      <CardDescription>
                        Enter your shipping details to receive your order
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            name="fullName"
                            placeholder="John Doe"
                            value={shippingAddress.fullName}
                            onChange={handleShippingChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="addressLine1">Address Line 1</Label>
                          <Input
                            id="addressLine1"
                            name="addressLine1"
                            placeholder="123 Main St"
                            value={shippingAddress.addressLine1}
                            onChange={handleShippingChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                          <Input
                            id="addressLine2"
                            name="addressLine2"
                            placeholder="Apt 4B"
                            value={shippingAddress.addressLine2}
                            onChange={handleShippingChange}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              name="city"
                              placeholder="New York"
                              value={shippingAddress.city}
                              onChange={handleShippingChange}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="state">State/Province</Label>
                            <Input
                              id="state"
                              name="state"
                              placeholder="NY"
                              value={shippingAddress.state}
                              onChange={handleShippingChange}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="postalCode">Postal Code</Label>
                            <Input
                              id="postalCode"
                              name="postalCode"
                              placeholder="10001"
                              value={shippingAddress.postalCode}
                              onChange={handleShippingChange}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Select
                              value={shippingAddress.country}
                              onValueChange={(value) => handleSelectShippingChange('country', value)}
                            >
                              <SelectTrigger id="country">
                                <SelectValue placeholder="Select a country" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="US">United States</SelectItem>
                                <SelectItem value="CA">Canada</SelectItem>
                                <SelectItem value="UK">United Kingdom</SelectItem>
                                <SelectItem value="AU">Australia</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button onClick={handleNextStep}>
                        Continue to Billing
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                )}
                
                {/* Step 2: Billing Information */}
                {currentStep === 2 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Billing Information</CardTitle>
                      <CardDescription>
                        Enter your billing details for payment processing
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <Checkbox
                          id="sameAsShipping"
                          checked={sameAsShipping}
                          onCheckedChange={handleSameAsShippingChange}
                        />
                        <Label htmlFor="sameAsShipping">
                          Billing address is the same as shipping address
                        </Label>
                      </div>
                      
                      {!sameAsShipping && (
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="billingFullName">Full Name</Label>
                            <Input
                              id="billingFullName"
                              name="fullName"
                              placeholder="John Doe"
                              value={billingAddress.fullName}
                              onChange={handleBillingChange}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="billingAddressLine1">Address Line 1</Label>
                            <Input
                              id="billingAddressLine1"
                              name="addressLine1"
                              placeholder="123 Main St"
                              value={billingAddress.addressLine1}
                              onChange={handleBillingChange}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="billingAddressLine2">Address Line 2 (Optional)</Label>
                            <Input
                              id="billingAddressLine2"
                              name="addressLine2"
                              placeholder="Apt 4B"
                              value={billingAddress.addressLine2}
                              onChange={handleBillingChange}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="billingCity">City</Label>
                              <Input
                                id="billingCity"
                                name="city"
                                placeholder="New York"
                                value={billingAddress.city}
                                onChange={handleBillingChange}
                                required
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="billingState">State/Province</Label>
                              <Input
                                id="billingState"
                                name="state"
                                placeholder="NY"
                                value={billingAddress.state}
                                onChange={handleBillingChange}
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="billingPostalCode">Postal Code</Label>
                              <Input
                                id="billingPostalCode"
                                name="postalCode"
                                placeholder="10001"
                                value={billingAddress.postalCode}
                                onChange={handleBillingChange}
                                required
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="billingCountry">Country</Label>
                              <Select
                                value={billingAddress.country}
                                onValueChange={(value) => handleSelectBillingChange('country', value)}
                              >
                                <SelectTrigger id="billingCountry">
                                  <SelectValue placeholder="Select a country" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="US">United States</SelectItem>
                                  <SelectItem value="CA">Canada</SelectItem>
                                  <SelectItem value="UK">United Kingdom</SelectItem>
                                  <SelectItem value="AU">Australia</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={handlePreviousStep}>
                        Back to Shipping
                      </Button>
                      <Button onClick={handleNextStep}>
                        Continue to Payment
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                )}
                
                {/* Step 3: Payment Information */}
                {currentStep === 3 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Method</CardTitle>
                      <CardDescription>
                        Select a payment method and enter your payment details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                        <div className="flex items-center space-x-2 rounded-md border p-4">
                          <RadioGroupItem value="credit" id="credit" />
                          <Label htmlFor="credit" className="flex items-center">
                            <CreditCard className="h-5 w-5 mr-2" />
                            Credit / Debit Card
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 rounded-md border p-4">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal">PayPal</Label>
                        </div>
                      </RadioGroup>
                      
                      {paymentMethod === 'credit' && (
                        <div className="space-y-4 mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardName">Name on Card</Label>
                            <Input
                              id="cardName"
                              name="cardName"
                              placeholder="John Doe"
                              value={paymentDetails.cardName}
                              onChange={handlePaymentDetailsChange}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                              id="cardNumber"
                              name="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={paymentDetails.cardNumber}
                              onChange={handlePaymentDetailsChange}
                              required
                            />
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiryMonth">Month</Label>
                              <Select
                                value={paymentDetails.expiryMonth}
                                onValueChange={(value) => setPaymentDetails(prev => ({ ...prev, expiryMonth: value }))}
                              >
                                <SelectTrigger id="expiryMonth">
                                  <SelectValue placeholder="MM" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 12 }, (_, i) => {
                                    const month = (i + 1).toString().padStart(2, '0');
                                    return (
                                      <SelectItem key={month} value={month}>
                                        {month}
                                      </SelectItem>
                                    );
                                  })}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="expiryYear">Year</Label>
                              <Select
                                value={paymentDetails.expiryYear}
                                onValueChange={(value) => setPaymentDetails(prev => ({ ...prev, expiryYear: value }))}
                              >
                                <SelectTrigger id="expiryYear">
                                  <SelectValue placeholder="YY" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 10 }, (_, i) => {
                                    const year = (new Date().getFullYear() + i).toString().slice(-2);
                                    return (
                                      <SelectItem key={year} value={year}>
                                        {year}
                                      </SelectItem>
                                    );
                                  })}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input
                                id="cvv"
                                name="cvv"
                                placeholder="123"
                                value={paymentDetails.cvv}
                                onChange={handlePaymentDetailsChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={handlePreviousStep}>
                        Back to Billing
                      </Button>
                      <Button 
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processing...' : 'Place Order'}
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Items */}
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div key={item.product.product_id} className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            {item.product.name} × {item.quantity}
                          </span>
                          <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    {/* Totals */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>Free</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax</span>
                        <span>${(totalPrice * 0.1).toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${(totalPrice + (totalPrice * 0.1)).toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
                  <h3 className="font-semibold mb-2">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Have questions about your order? Contact our customer support.
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>Call: </span>
                    <a href="tel:+18005551234" className="text-primary ml-1">
                      1-800-555-1234
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <span>Email: </span>
                    <a href="mailto:support@solestride.com" className="text-primary ml-1">
                      support@solestride.com
                    </a>
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

export default Checkout;
