'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';

export default function RFQPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    whatsappNumber: '',
    email: '',
    location: '',
    productName: '',
    specifications: '',
    quantity: '',
    targetPrice: '',
    deliveryMethod: '',
    additionalRequirements: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment and submission
    alert("Thank you! Your sourcing request and ₦5,000 commitment fee have been received. Our team will contact you via WhatsApp within 48 hours.");
  };

  return (
    <main className="pt-40 pb-20 dark:bg-darkmode bg-section min-h-screen">
      <div className="container lg:max-w-screen-md mx-auto px-4">
        <div className="bg-white dark:bg-darklight rounded-3xl shadow-2xl overflow-hidden border border-border/50 dark:border-dark_border/50">
          <div className="bg-primary p-8 text-white text-center">
            <h1 className="text-3xl font-bold mb-2 text-white">Submit Your Sourcing Request</h1>
            <p className="opacity-90">Get Factory Prices from China to Nigeria</p>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="mb-10 p-6 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/20">
              <p className="text-midnight_text dark:text-white font-medium mb-2 flex items-center gap-2">
                <Icon icon="ion:information-circle-outline" className="text-primary text-xl" />
                Commitment Fee: ₦5,000
              </p>
              <p className="text-gray text-sm">
                To ensure we dedicate our team&rsquo;s time to serious requests only, we charge a non-refundable commitment fee of ₦5,000. This is fully refundable if we are unable to provide a quotation within 48 hours, or it will be deducted from your final service charge.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-midnight_text dark:text-white mb-2">Full Name (Required)</label>
                  <input type="text" name="fullName" required onChange={handleChange} className="w-full p-4 rounded-xl border border-border dark:border-dark_border dark:bg-darkmode focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-midnight_text dark:text-white mb-2">Company Name (Optional)</label>
                  <input type="text" name="companyName" onChange={handleChange} className="w-full p-4 rounded-xl border border-border dark:border-dark_border dark:bg-darkmode focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Acme Inc." />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-midnight_text dark:text-white mb-2">WhatsApp Number (Required)</label>
                  <input type="tel" name="whatsappNumber" required onChange={handleChange} className="w-full p-4 rounded-xl border border-border dark:border-dark_border dark:bg-darkmode focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="0803..." />
                </div>
                <div>
                  <label className="block text-sm font-bold text-midnight_text dark:text-white mb-2">Email Address</label>
                  <input type="email" name="email" onChange={handleChange} className="w-full p-4 rounded-xl border border-border dark:border-dark_border dark:bg-darkmode focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="john@example.com" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-midnight_text dark:text-white mb-2">Location in Nigeria</label>
                <input type="text" name="location" onChange={handleChange} className="w-full p-4 rounded-xl border border-border dark:border-dark_border dark:bg-darkmode focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="e.g., Kano, Lagos" />
              </div>

              <div className="border-t border-border dark:border-dark_border pt-6">
                <label className="block text-sm font-bold text-midnight_text dark:text-white mb-2">Product Name / Description (Required)</label>
                <input type="text" name="productName" required onChange={handleChange} className="w-full p-4 rounded-xl border border-border dark:border-dark_border dark:bg-darkmode focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="e.g., MacBook Pro equivalent laptop" />
              </div>

              <div>
                <label className="block text-sm font-bold text-midnight_text dark:text-white mb-2">Detailed Specifications (Required)</label>
                <textarea name="specifications" required rows={4} onChange={handleChange} className="w-full p-4 rounded-xl border border-border dark:border-dark_border dark:bg-darkmode focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Size, color, features, certifications, etc."></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-midnight_text dark:text-white mb-2">Quantity Needed</label>
                  <select name="quantity" required onChange={handleChange} className="w-full p-4 rounded-xl border border-border dark:border-dark_border dark:bg-darkmode focus:ring-2 focus:ring-primary outline-none transition-all appearance-none">
                    <option value="">Select Quantity</option>
                    <option value="1-10">1 – 10</option>
                    <option value="11-50">11 – 50</option>
                    <option value="51-100">51 – 100</option>
                    <option value="100+">100+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-midnight_text dark:text-white mb-2">Preferred Delivery Method</label>
                  <select name="deliveryMethod" required onChange={handleChange} className="w-full p-4 rounded-xl border border-border dark:border-dark_border dark:bg-darkmode focus:ring-2 focus:ring-primary outline-none transition-all appearance-none">
                    <option value="">Select Method</option>
                    <option value="air">Air Freight</option>
                    <option value="sea">Sea Freight</option>
                    <option value="discuss">Discuss with us</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-midnight_text dark:text-white mb-2">Target Price or Budget (Optional)</label>
                <input type="text" name="targetPrice" onChange={handleChange} className="w-full p-4 rounded-xl border border-border dark:border-dark_border dark:bg-darkmode focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="e.g., ₦500,000 or $500 per unit" />
              </div>

              <div>
                <label className="block text-sm font-bold text-midnight_text dark:text-white mb-2">Additional Requirements</label>
                <textarea name="additionalRequirements" rows={3} onChange={handleChange} className="w-full p-4 rounded-xl border border-border dark:border-dark_border dark:bg-darkmode focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Quality standards, samples, customization, etc."></textarea>
              </div>

              <div className="pt-6">
                <button type="submit" className="w-full py-5 bg-primary text-white rounded-2xl font-bold text-xl hover:bg-blue-700 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                  Pay ₦5,000 & Submit Request
                </button>
                <p className="text-center text-gray text-xs mt-4">
                  By submitting, you agree to our terms regarding the commitment fee.
                </p>
              </div>
            </form>

            <div className="mt-12 pt-8 border-t border-border dark:border-dark_border text-center">
              <p className="text-midnight_text dark:text-white font-medium mb-4">Or chat with us directly:</p>
              <a href="https://wa.me/2348032775756" target="_blank" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
                <Icon icon="ion:logo-whatsapp" className="text-2xl" /> Submit via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
