
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Frequently Asked Questions</h1>
          <p className="text-muted-foreground mb-8">Find answers to the most common questions about SoleStride.</p>
          
          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-medium">How do I find the right shoe size?</AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <p className="mb-2">
                      SoleStride shoes generally fit true to size. We recommend measuring your feet using our size guide found on 
                      each product page. If you're between sizes, we suggest going up to the next size.
                    </p>
                    <p>
                      Our customer reviews also often include feedback on sizing that can be helpful. If you're still unsure, feel 
                      free to contact our customer service team for assistance.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-medium">What payment methods do you accept?</AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <p>
                      We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, 
                      and Google Pay. We also offer buy-now-pay-later options through Klarna and Afterpay on eligible purchases.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-medium">How long will shipping take?</AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <p className="mb-2">
                      Standard shipping typically takes 5-7 business days within the continental United States. Expedited 
                      shipping (2-3 business days) and Next Day shipping options are also available at checkout for an 
                      additional fee.
                    </p>
                    <p>
                      International shipping times vary by destination, typically ranging from 7-21 business days. Please 
                      see our <a href="/shipping-policy" className="text-primary hover:underline">Shipping Policy</a> for 
                      more details.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg font-medium">What is your return policy?</AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <p className="mb-2">
                      We offer a 30-day return policy for unworn items in their original packaging with tags attached. 
                      Returns are easy to initiate through your account dashboard.
                    </p>
                    <p>
                      For full details, please visit our <a href="/return-policy" className="text-primary hover:underline">Return Policy</a> page.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-lg font-medium">Are your shoes true to size?</AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <p>
                      Most of our shoes fit true to size, but this can vary slightly by style. Each product page includes 
                      specific sizing information for that model. We recommend reading customer reviews for additional 
                      insights on how a particular style fits.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-lg font-medium">How do I track my order?</AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <p>
                      Once your order ships, you'll receive a confirmation email with tracking information. You can also 
                      track your order by logging into your account and viewing your order history. If you have any questions 
                      about your shipment, please contact our customer service team.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-lg font-medium">Do you ship internationally?</AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <p>
                      Yes, we ship to select international destinations. International customers are responsible for any 
                      customs fees, taxes, or duties that may apply. Please note that international shipping times can 
                      vary significantly depending on customs processing and local delivery services.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-lg font-medium">How do I care for my shoes?</AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <p>
                      Each shoe type requires different care. We include specific care instructions with each purchase, 
                      and you can find detailed care guides on our blog. In general, we recommend using appropriate 
                      cleaners for the material of your shoes, allowing them to air dry, and using shoe trees to maintain shape.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-9">
                  <AccordionTrigger className="text-lg font-medium">Do you offer gift wrapping?</AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <p>
                      Yes, we offer gift wrapping services for an additional $5.99 per item. You can select this option 
                      during checkout and include a personalized gift message that will be printed on a card and included 
                      with your gift.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-10">
                  <AccordionTrigger className="text-lg font-medium">How can I contact customer support?</AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <p className="mb-2">
                      Our customer support team is available in several ways:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Email: support@solestride.com</li>
                      <li>Phone: +1 (888) 555-1234 (Monday-Friday, 9am-6pm EST)</li>
                      <li>Live Chat: Available on our website during business hours</li>
                      <li>Contact Form: Available on our <a href="/contact" className="text-primary hover:underline">Contact Page</a></li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
