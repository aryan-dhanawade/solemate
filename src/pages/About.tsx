
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">About SoleStride</h1>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="mb-4">
                Founded in 2020, SoleStride began with a simple mission: to provide high-quality, stylish footwear at accessible prices. 
                What started as a small passion project has grown into a trusted online destination for shoe enthusiasts around the world.
              </p>
              <p className="mb-4">
                Our founder, Alex Chen, noticed a gap in the market for shoes that perfectly balanced quality, style, and affordability. 
                Drawing from years of experience in the fashion industry, Alex assembled a team of designers and footwear experts to create 
                the SoleStride collection you see today.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="mb-4">
                At SoleStride, we believe that great shoes are the foundation of great style. Our mission is to empower everyone to put their 
                best foot forward with footwear that's designed for comfort, durability, and style.
              </p>
              <p className="mb-4">
                We're committed to ethical manufacturing practices and work closely with our production partners to ensure fair working conditions 
                and sustainable processes wherever possible.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">What Sets Us Apart</h2>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Quality Materials:</strong> We source premium materials to ensure our shoes don't just look good but last long.</li>
                <li><strong>Thoughtful Design:</strong> Our designers focus on creating shoes that blend contemporary style with all-day comfort.</li>
                <li><strong>Customer-First Approach:</strong> From hassle-free returns to responsive customer service, we prioritize your satisfaction.</li>
                <li><strong>Inclusive Sizing:</strong> We offer an extended size range to ensure everyone can find their perfect fit.</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Join Our Journey</h2>
              <p className="mb-4">
                As we continue to grow, we're constantly expanding our collection and improving our services. We invite you to be a part of our journey 
                by sharing your feedback and suggestions with us.
              </p>
              <p>
                Thank you for choosing SoleStride. We look forward to being your trusted footwear partner for years to come.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
