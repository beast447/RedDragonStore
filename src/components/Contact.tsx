import React, { useState } from 'react';

function Contact(): React.ReactElement {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, integrate email service / backend here
    console.log('Contact message:', formData);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 uppercase tracking-wider">
          Contact Us
        </h2>
        {submitted ? (
          <p className="text-center text-green-400 font-semibold">Thank you! We will be in touch soon.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded bg-gray-800 border border-gray-700 p-3 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded bg-gray-800 border border-gray-700 p-3 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded bg-gray-800 border border-gray-700 p-3 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 transition-colors py-3 rounded font-semibold"
            >
              Send Message
            </button>
          </form>
        )}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            For inquiries, please contact:
          </p>
          <p className="text-lg font-semibold text-red-600">
            <a href="mailto:support@1228labs.com">support@1228labs.com</a>
          </p>
          <p>Or shoot us a call at <a href="tel:540-239-1723">540-239-1723</a></p>
        </div>
      </div>
    </section>
  );
}

export default Contact; 