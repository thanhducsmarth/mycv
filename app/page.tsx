"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const galleryImages = [
  // Product Category - Commercial/Product photography
  { id: 1, src: "/images/product/product-01.jpg", alt: "Commercial product photography shot", category: "Product" },
  { id: 2, src: "/images/product/product-02.jpg", alt: "Brand photography campaign", category: "Product" },
  { id: 3, src: "/images/product/product-03.jpg", alt: "Advertising photography", category: "Product" },
  { id: 4, src: "/images/product/product-04.jpg", alt: "E-commerce product images", category: "Product" },
  { id: 5, src: "/images/product/product-05.JPG", alt: "Commercial still life", category: "Product" },
  { id: 6, src: "/images/product/product-06.JPG", alt: "Lifestyle brand photography", category: "Product" },
  { id: 7, src: "/images/product/product-07.JPG", alt: "Food product advertising", category: "Product" },
  { id: 8, src: "/images/product/product-08.png", alt: "Product catalog photography", category: "Product" },

  // Wedding Category - Wedding photography
  { id: 9, src: "/images/wedding/wedding-01.jpg", alt: "Wedding ceremony details", category: "Wedding" },
  { id: 10, src: "/images/wedding/wedding-02.jpg", alt: "Bridal portrait session", category: "Wedding" },
  { id: 11, src: "/images/wedding/wedding-03.jpg", alt: "Wedding reception moments", category: "Wedding" },

  // Studio Category - Portrait/Studio photography
  { id: 14, src: "/images/studio/studio-01.png", alt: "Professional headshot", category: "Studio" },
  { id: 15, src: "/images/studio/studio-02.png", alt: "Portrait session", category: "Studio" },
  { id: 12, src: "/images/studio/studio-03.jpg", alt: "Artistic portrait photography", category: "Studio" },
  { id: 13, src: "/images/studio/studio-04.jpg", alt: "Studio lighting portrait", category: "Studio" },

  // Birthday Category - Birthday photography
  { id: 16, src: "/images/birthday/birthday-01.jpg", alt: "Birthday party celebration", category: "Birthday" },
  { id: 17, src: "/images/birthday/birthday-02.jpg", alt: "Birthday cake cutting moment", category: "Birthday" },
  { id: 18, src: "/images/birthday/birthday-03.jpg", alt: "Family birthday gathering", category: "Birthday" },
  { id: 19, src: "/images/birthday/birthday-04.jpg", alt: "Birthday decorations and setup", category: "Birthday" },

  // Event Category - Event photography
  { id: 20, src: "/images/event/event-01.jpg", alt: "Corporate event crowd gathering", category: "Event" },
  { id: 21, src: "/images/event/event-02.jpg", alt: "Conference presentation moment", category: "Event" },
  { id: 22, src: "/images/event/event-03.jpg", alt: "Party celebration atmosphere", category: "Event" },
  { id: 23, src: "/images/event/event-04.jpg", alt: "Networking reception activities", category: "Event" },
];

const categories = ["All", "Product", "Wedding", "Studio", "Event"];

// Contact Form Component
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage('Thank you! Your message has been sent successfully. I will get back to you soon.');
        setFormData({ name: '', email: '', service: '', message: '' });
      } else {
        setSubmitError(data.error || 'Sorry, there was an error sending your message. Please try again.');
      }
    } catch (error) {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors"
          placeholder="Your full name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors"
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">Service Interested In</label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors"
        >
          <option value="">Select a service</option>
          <option value="Portrait Photography">Portrait Photography</option>
          <option value="Wedding Photography">Wedding Photography</option>
          <option value="Event Photography">Event Photography</option>
          <option value="Commercial Photography">Commercial Photography</option>
          <option value="Birthday Photography">Birthday Photography</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors"
          placeholder="Tell me about your photography needs..."
        />
      </div>

      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {submitError}
        </div>
      )}

      {submitMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {submitMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-300 ${
          isSubmitting
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
            : 'bg-gray-900 text-white hover:bg-gray-800'
        }`}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredImages = selectedCategory === "All"
    ? galleryImages
    : galleryImages.filter(image => image.category === selectedCategory);

  const openLightbox = (imageIndex: number) => {
    // Convert the filtered index back to the full galleryImages index
    const fullIndexedFiltered = selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter(image => image.category === selectedCategory);

    const fullIndex = fullIndexedFiltered[imageIndex] ?
      galleryImages.findIndex(img => img.id === fullIndexedFiltered[imageIndex].id) : 0;

    setLightboxIndex(fullIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-background.jpg"
            alt="Hero photography background"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 font-serif">
              <span className="name-highlight">Thanh Duc Photo</span>
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto mb-6 rounded-full opacity-80"></div>
            <p className="text-2xl md:text-3xl text-neutral-200 mb-4 font-light">
              Award-Winning Photographer
            </p>
            <p className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed font-light">
              Crafting timeless moments through exceptional photography.
              Specializing in weddings, portraits, and corporate events with an artistic eye and technical mastery.
            </p>
          </div>

          {/* Professional Call-to-Actions */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <a
              href="#portfolio"
              className="group bg-luxury text-neutral-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-luxury-hover transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Explore Portfolio
              <span className="ml-2 inline-block transform group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="#contact"
              className="group border-2 border-white/30 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300 backdrop-blur-sm"
            >
              Book Consultation
            </a>
          </div>

          {/* Professional Credentials */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-luxury mb-1">4+</div>
                <div className="text-sm text-neutral-300 uppercase tracking-wide">Years Experience</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-luxury mb-1">200+</div>
                <div className="text-sm text-neutral-300 uppercase tracking-wide">Happy Clients</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-luxury mb-1">10+</div>
                <div className="text-sm text-neutral-300 uppercase tracking-wide">Awards Won</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                With over a decade of experience in professional photography, I specialize in capturing the essence of every moment.
                My approach combines technical expertise with artistic vision, ensuring each image tells a compelling story.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                I work across various genres including portrait, wedding, event, and commercial photography,
                always striving to exceed client expectations and deliver breathtaking results that resonate emotionally.
              </p>
            </div>
            <div className="relative">
              <Image
                src="https://picsum.photos/600/800?random=portrait"
                alt="Thanh Duc - Professional Photographer"
                width={600}
                height={800}
                className="w-full h-96 md:h-[500px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Portfolio
            </h2>
            <p className="text-lg text-gray-600">
              A selection of my recent work across different photography genres
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  selectedCategory === category
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Creative Masonry Grid Layout */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
            {filteredImages.map((image, index) => {
              // Create variety in image sizes for creative layout
              const getImageHeight = () => {
                const patterns = ['h-64', 'h-96', 'h-80', 'h-72'];
                return patterns[index % patterns.length];
              };

              const getOverlayPosition = () => {
                const positions = ['bottom-0', 'top-0', 'bottom-1/2'];
                return positions[index % positions.length];
              };

              return (
                <div
                  key={image.id}
                  className={`
                    relative group overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl
                    transition-all duration-700 ease-out transform hover:-translate-y-3 hover:rotate-1
                    break-inside-avoid cursor-pointer
                  `}
                  onClick={() => openLightbox(index)}
                >
                  {/* Dynamic Image Container */}
                  <div className={`relative overflow-hidden rounded-2xl bg-neutral-100 ${getImageHeight()}`}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-all duration-1000 ease-out group-hover:scale-125 group-hover:rotate-[-2deg]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      priority={index < 4}
                    />

                    {/* Creative Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-gold/20 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-700 delay-100"></div>
                  </div>

                  {/* Creative Information Overlay */}
                  <div className={`absolute ${getOverlayPosition()} left-4 right-4 transition-all duration-500 ${getOverlayPosition() === 'top-0' ? 'transform -translate-y-full group-hover:translate-y-2' : 'transform translate-y-full group-hover:translate-y-[-8px]'}`}>
                    <div className="bg-black/80 backdrop-blur-md rounded-xl px-4 py-3 border border-white/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="inline-block bg-gold/30 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-gold border border-gold/50 uppercase tracking-wide mb-1">
                            {image.category}
                          </span>
                          <p className="text-white/90 text-sm font-medium truncate">
                            {image.alt.split(',')[0]}
                          </p>
                        </div>
                        <div className="flex space-x-1 opacity-70 group-hover:opacity-100 transition-opacity">
                          <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse"></span>
                          <span className="w-1.5 h-1.5 bg-gold/60 rounded-full animate-pulse delay-150"></span>
                          <span className="w-1.5 h-1.5 bg-gold/30 rounded-full animate-pulse delay-300"></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Elements */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                    <div className="bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                      <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                  </div>

                  {/* Featured Badge for Special Images */}
                  {index % 7 === 0 && (
                    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300">
                      <div className="bg-gradient-to-r from-gold to-bronze px-3 py-1 rounded-full">
                        <span className="text-xs font-bold text-white uppercase tracking-wider">⭐ Featured</span>
                      </div>
                    </div>
                  )}

                  {/* Subtle Border Glow */}
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-gold/30 transition-all duration-500 delay-400"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Services</h2>
            <p className="text-lg text-gray-600">
              Professional photography services tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Portrait Photography</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Professional headshots, family portraits, and individual sessions that capture personality and character.
              </p>
              <p className="text-2xl font-bold text-gray-900">Starting at $250</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Wedding Photography</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Complete wedding day coverage from ceremony to reception, capturing every special moment.
              </p>
              <p className="text-2xl font-bold text-gray-900">Starting at $1,500</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Event Photography</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Corporate events, parties, and celebrations documented with professional quality and attention to detail.
              </p>
              <p className="text-2xl font-bold text-gray-900">Starting at $500</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Clients Say</h2>
            <p className="text-lg text-gray-300">
              Don't just take my word for it - hear from happy clients
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="text-gray-300 mb-4 italic">
                "Thanh Duc captured our wedding day perfectly. Every moment was beautiful and the photos tell our story exactly as it happened. Highly recommended!"
              </blockquote>
              <div className="flex items-center">
                <Image
                  src="https://picsum.photos/60/60?random=client1"
                  alt="Sarah & John"
                  width={60}
                  height={60}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <p className="font-semibold">Sarah & John</p>
                  <p className="text-gray-400 text-sm">Wedding Photography</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="text-gray-300 mb-4 italic">
                "Amazing portrait session! Thanh Duc has an incredible eye for detail and made us feel completely comfortable. The results exceeded our expectations."
              </blockquote>
              <div className="flex items-center">
                <Image
                  src="https://picsum.photos/60/60?random=client2"
                  alt="Emma Wilson"
                  width={60}
                  height={60}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <p className="font-semibold">Emma Wilson</p>
                  <p className="text-gray-400 text-sm">Portrait Photography</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="text-gray-300 mb-4 italic">
                "For our corporate event, Thanh Duc delivered outstanding results. Professional, punctual, and the photos perfectly captured the energy of our team."
              </blockquote>
              <div className="flex items-center">
                <Image
                  src="https://picsum.photos/60/60?random=client3"
                  alt="Mike Chen"
                  width={60}
                  height={60}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <p className="font-semibold">Mike Chen</p>
                  <p className="text-gray-400 text-sm">Event Photography</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-600">
              Ready to capture your special moments? Let's discuss your photography needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-gray-600">0983736767</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">thanhduckrb767@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Location</p>
                    <p className="text-gray-600">Ho Chi Minh City, Vietnam</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Me</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.719-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378 0 0-.599 2.282-.744 2.84-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.012.017z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        open={lightboxOpen}
        close={closeLightbox}
        slides={galleryImages.map((image) => ({
          src: image.src,
          alt: image.alt,
          title: image.alt.split(',')[0],
          description: `Category: ${image.category}`,
        }))}
        index={lightboxIndex}
        plugins={[]}
      />
    </div>
  );
}
