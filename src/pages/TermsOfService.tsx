
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const TermsOfService = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="mb-4">
                Welcome to SoleStride. These terms and conditions outline the rules and regulations for the use of our website.
              </p>
              <p className="mb-4">
                By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use 
                SoleStride's website if you do not accept all of the terms and conditions stated on this page.
              </p>
              <p>
                These Terms of Service were last updated on March 1, 2023.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">License to Use Website</h2>
              <p className="mb-4">
                Unless otherwise stated, SoleStride and/or its licensors own the intellectual property rights for all material 
                on the SoleStride website. All intellectual property rights are reserved.
              </p>
              <p className="mb-4">
                You may view, download, and print pages from the website for your own personal use, subject to the restrictions 
                below.
              </p>
              <p className="mb-4">
                You must not:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Republish material from this website</li>
                <li>Sell, rent, or sub-license material from the website</li>
                <li>Reproduce, duplicate, or copy material from the website</li>
                <li>Redistribute content from SoleStride (unless content is specifically made for redistribution)</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
              <p className="mb-4">
                When you create an account with us, you must provide information that is accurate, complete, and current at all 
                times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
              </p>
              <p className="mb-4">
                You are responsible for safeguarding the password that you use to access the Service and for any activities or 
                actions under your password. You agree not to disclose your password to any third party.
              </p>
              <p>
                You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Purchases and Payment</h2>
              <p className="mb-4">
                If you wish to purchase any product made available through the Service ("Purchase"), you may be asked to supply 
                certain information relevant to your Purchase including, without limitation, your credit card number, the expiration 
                date of your credit card, your billing address, and your shipping information.
              </p>
              <p className="mb-4">
                You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment method(s) 
                in connection with any Purchase; and (ii) the information you supply to us is true, correct, and complete.
              </p>
              <p>
                The Service may employ the use of third-party services for the purpose of facilitating payment and the completion 
                of Purchases. By submitting your information, you grant us the right to provide the information to these third parties.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Product Information</h2>
              <p className="mb-4">
                We strive to provide accurate product information and descriptions, but we do not warrant that product descriptions 
                or other content of the website is accurate, complete, reliable, current, or error-free.
              </p>
              <p>
                The inclusion of any products on our website does not imply or warrant that these products will be available at any time. 
                We reserve the right to discontinue any product at any time.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Limitations of Liability</h2>
              <p className="mb-4">
                SoleStride will not be liable for any damages of any kind arising from the use of this website, including, but not 
                limited to direct, indirect, incidental, punitive, and consequential damages.
              </p>
              <p className="mb-4">
                The materials on SoleStride's website are provided on an 'as is' basis. SoleStride makes no warranties, expressed 
                or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties 
                or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or 
                other violation of rights.
              </p>
              <p>
                By using our website, you hereby consent to our Terms of Service and agree to its terms.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
