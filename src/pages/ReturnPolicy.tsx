
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const ReturnPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Return Policy</h1>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Return Eligibility</h2>
              <p className="mb-4">
                At SoleStride, we want you to be completely satisfied with your purchase. If you're not entirely happy 
                with your order, we accept returns within 30 days of delivery for a full refund or exchange, subject to 
                the following conditions:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Items must be unworn, unused, and in their original packaging with all tags attached</li>
                <li>Proof of purchase is required (order number, receipt, or order confirmation email)</li>
                <li>Final sale items marked as such are not eligible for return or exchange</li>
                <li>Custom or personalized items cannot be returned unless there is a manufacturing defect</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Return Process</h2>
              <p className="mb-4">
                To initiate a return, please follow these steps:
              </p>
              <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>Log into your SoleStride account and navigate to your order history</li>
                <li>Select the order containing the item(s) you wish to return</li>
                <li>Click on "Return Items" and follow the instructions to generate a return shipping label</li>
                <li>Package the items securely in their original packaging if possible</li>
                <li>Attach the return shipping label to your package</li>
                <li>Drop off the package at the specified carrier location</li>
              </ol>
              <p>
                Alternatively, you can contact our customer service team at returns@solestride.com for assistance with your return.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Refund Information</h2>
              <p className="mb-4">
                Once we receive and inspect your return, we will process your refund or exchange. Please allow for the following 
                timeframes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Processing time: 3-5 business days after we receive your return</li>
                <li>Refund method: Original payment method</li>
                <li>Refund amount: Purchase price of the item(s) plus any applicable taxes</li>
                <li>Shipping charges are non-refundable unless the return is due to our error</li>
              </ul>
              <p>
                For exchanges, we'll ship the new item once your return has been processed. If there is a price difference, we'll 
                either charge or refund the difference accordingly.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Damaged or Defective Items</h2>
              <p className="mb-4">
                If you receive a damaged or defective item, please contact us at support@solestride.com within 48 hours of 
                delivery. Please include your order number and photos of the damaged/defective item. We'll provide instructions 
                for returning the item and will cover the return shipping costs in these cases.
              </p>
              <p>
                This return policy was last updated on March 1, 2023, and is subject to change. Any modifications will be posted 
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

export default ReturnPolicy;
