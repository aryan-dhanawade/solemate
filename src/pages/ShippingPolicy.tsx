
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const ShippingPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Shipping Policy</h1>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Shipping Methods & Timeframes</h2>
              <p className="mb-4">
                At SoleStride, we offer the following shipping options:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Standard Shipping:</strong> 5-7 business days (Free on orders over $50)</li>
                <li><strong>Expedited Shipping:</strong> 2-3 business days ($10.99)</li>
                <li><strong>Next Day Shipping:</strong> Next business day if ordered before 1pm EST ($19.99)</li>
              </ul>
              <p>
                Please note that these timeframes are estimates for delivery within the continental United States. Orders to Hawaii, Alaska, 
                or international destinations may take additional time.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Order Processing</h2>
              <p className="mb-4">
                Orders are typically processed within 1-2 business days after payment confirmation. During high-volume periods, 
                such as holidays or special promotions, processing may take up to 3 business days.
              </p>
              <p>
                You will receive a confirmation email once your order has been shipped, which will include tracking information 
                where available.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">International Shipping</h2>
              <p className="mb-4">
                We currently ship to select international destinations. International orders typically take 7-21 business days 
                for delivery, depending on the destination country and customs processing times.
              </p>
              <p className="mb-4">
                Please note that any customs fees, taxes, or duties are the responsibility of the customer and are not included 
                in our shipping charges.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Tracking Your Order</h2>
              <p className="mb-4">
                Once your order ships, you will receive a confirmation email with tracking information. You can also track your 
                order by logging into your account on our website and viewing your order history.
              </p>
              <p>
                If you have any questions about your shipment or experience delays, please contact our customer service team 
                at support@solestride.com.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Shipping Restrictions</h2>
              <p className="mb-4">
                We are unable to ship to P.O. boxes or APO/FPO addresses at this time. For certain high-value orders, a signature 
                may be required upon delivery.
              </p>
              <p>
                This shipping policy was last updated on March 1, 2023, and is subject to change. Any modifications will be posted 
                on this page.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShippingPolicy;
