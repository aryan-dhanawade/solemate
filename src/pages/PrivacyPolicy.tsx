
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="mb-4">
                At SoleStride, we respect your privacy and are committed to protecting your personal data. This privacy 
                policy will inform you about how we look after your personal data when you visit our website and tell you 
                about your privacy rights and how the law protects you.
              </p>
              <p>
                This privacy policy was last updated on March 1, 2023.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <p className="mb-4">
                We may collect, use, store, and transfer different kinds of personal data about you, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier</li>
                <li><strong>Contact Data:</strong> includes billing address, delivery address, email address, and telephone numbers</li>
                <li><strong>Financial Data:</strong> includes payment card details (stored securely through our payment processors)</li>
                <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products you have purchased from us</li>
                <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website</li>
                <li><strong>Profile Data:</strong> includes your username and password, purchases or orders made by you, your preferences, feedback, and survey responses</li>
                <li><strong>Usage Data:</strong> includes information about how you use our website and products</li>
                <li><strong>Marketing and Communications Data:</strong> includes your preferences in receiving marketing from us and our third parties and your communication preferences</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <p className="mb-4">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>To process and deliver your order</li>
                <li>To manage your account and provide customer support</li>
                <li>To personalize your experience and offer products that may interest you</li>
                <li>To improve our website, products, and services</li>
                <li>To communicate with you, including responding to your inquiries</li>
                <li>To send promotional emails about new products, special offers, or other information which we think you may find interesting</li>
                <li>To administer contests, promotions, surveys, or other site features</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
              <p className="mb-4">
                Our website uses cookies to distinguish you from other users of our website. This helps us to provide you 
                with a good experience when you browse our website and also allows us to improve our site.
              </p>
              <p>
                You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access 
                cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible 
                or not function properly.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="mb-4">
                We have implemented appropriate security measures to prevent your personal data from being accidentally lost, 
                used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal 
                data to those employees, agents, contractors, and other third parties who have a business need to know.
              </p>
              <p>
                We have procedures in place to deal with any suspected personal data breach and will notify you and any 
                applicable regulator of a breach where we are legally required to do so.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Your Legal Rights</h2>
              <p className="mb-4">
                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Request access to your personal data</li>
                <li>Request correction of your personal data</li>
                <li>Request erasure of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing your personal data</li>
                <li>Request transfer of your personal data</li>
                <li>Right to withdraw consent</li>
              </ul>
              <p>
                If you wish to exercise any of these rights, please contact us at privacy@solestride.com.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
