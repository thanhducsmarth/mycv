"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowRight, Mail, MapPin } from "lucide-react";

// --- Data ---
const galleryImages = [
  { id: 80, src: "/images/wedding/TTD_13.webp", alt: "Wedding portrait", category: "Wedding" },
  { id: 81, src: "/images/wedding/TTD_14.webp", alt: "Wedding couple", category: "Wedding" },
  { id: 82, src: "/images/wedding/TTD_15.webp", alt: "Wedding ceremony", category: "Wedding" },
  { id: 83, src: "/images/wedding/TTD_16.webp", alt: "Bridal portrait", category: "Wedding" },
  { id: 84, src: "/images/wedding/TTD_18.webp", alt: "Wedding joy", category: "Wedding" },
  { id: 85, src: "/images/wedding/TTD_19.webp", alt: "Wedding moments", category: "Wedding" },
  { id: 86, src: "/images/wedding/TTD_20.webp", alt: "Wedding kiss", category: "Wedding" },
  { id: 87, src: "/images/wedding/TTD_21.webp", alt: "Wedding style", category: "Wedding" },
  { id: 88, src: "/images/wedding/TTD_22.webp", alt: "Wedding day", category: "Wedding" },
  { id: 89, src: "/images/wedding/TTD_23.webp", alt: "Wedding rings", category: "Wedding" },
  { id: 90, src: "/images/wedding/TTD_25.webp", alt: "Wedding celebration", category: "Wedding" },
  { id: 91, src: "/images/wedding/TTD_26.webp", alt: "Wedding details", category: "Wedding" },
  { id: 92, src: "/images/wedding/TTD_27.webp", alt: "Wedding vows", category: "Wedding" },
  { id: 93, src: "/images/wedding/TTD_28.webp", alt: "Wedding emotion", category: "Wedding" },
  { id: 94, src: "/images/wedding/TTD_29.webp", alt: "Wedding candid", category: "Wedding" },
  { id: 95, src: "/images/wedding/TTD_34.webp", alt: "Wedding reception", category: "Wedding" },
  { id: 96, src: "/images/wedding/TTD_35.webp", alt: "Wedding party", category: "Wedding" },
  { id: 97, src: "/images/wedding/TTD_39.webp", alt: "Wedding dance", category: "Wedding" },
  { id: 98, src: "/images/wedding/TTD_40.webp", alt: "Wedding send off", category: "Wedding" },
  { id: 70, src: "/images/concept/DSC06705.webp", alt: "Conceptual fine art photography", category: "Concept" },
  { id: 71, src: "/images/concept/DSC07115.webp", alt: "Creative concept portrait", category: "Concept" },
  { id: 72, src: "/images/concept/DSC07120.webp", alt: "Fine art concept session", category: "Concept" },
  { id: 40, src: "/images/tet/DSC04709-Recovered.webp", alt: "Tet holiday photography", category: "Tet" },
  { id: 41, src: "/images/tet/DSC04711.webp", alt: "Lunar New Year portrait", category: "Tet" },
  { id: 42, src: "/images/tet/DSC04713.webp", alt: "Tet celebration", category: "Tet" },
  { id: 43, src: "/images/tet/DSC04715.webp", alt: "Spring festival portrait", category: "Tet" },
  { id: 44, src: "/images/tet/DSC04717.webp", alt: "Tet traditional dress", category: "Tet" },
  { id: 45, src: "/images/tet/DSC04718.webp", alt: "Lunar New Year moments", category: "Tet" },
  { id: 46, src: "/images/tet/DSC04725.webp", alt: "Tet holiday joy", category: "Tet" },
  { id: 47, src: "/images/tet/DSC04732.webp", alt: "Spring portrait session", category: "Tet" },
  { id: 48, src: "/images/tet/DSC04734.webp", alt: "Tet photography", category: "Tet" },
  { id: 49, src: "/images/tet/DSC04740.webp", alt: "Lunar New Year style", category: "Tet" },
  { id: 50, src: "/images/tet/DSC04747.webp", alt: "Tet outdoor portrait", category: "Tet" },
  { id: 51, src: "/images/tet/DSC04757.webp", alt: "Spring mood", category: "Tet" },
  { id: 52, src: "/images/tet/DSC04768.webp", alt: "Tet celebration portrait", category: "Tet" },
  { id: 53, src: "/images/tet/DSC04770.webp", alt: "Lunar New Year tradition", category: "Tet" },
  { id: 54, src: "/images/tet/DSC04773.webp", alt: "Tet spring vibes", category: "Tet" },
  { id: 55, src: "/images/tet/DSC04775.webp", alt: "Tet lifestyle", category: "Tet" },
  { id: 56, src: "/images/tet/DSC04776.webp", alt: "Tet traditional outfit", category: "Tet" },
  { id: 57, src: "/images/tet/DSC04779.webp", alt: "Lunar New Year beauty", category: "Tet" },
  { id: 58, src: "/images/tet/DSC04792.webp", alt: "Spring photography", category: "Tet" },
  { id: 59, src: "/images/tet/DSC04794.webp", alt: "Tet holiday session", category: "Tet" },
  { id: 60, src: "/images/tet/DSC04799.webp", alt: "Tet festive portrait", category: "Tet" },
  { id: 61, src: "/images/tet/DSC04805.webp", alt: "Lunar New Year celebration", category: "Tet" },
  { id: 62, src: "/images/tet/DSC04808.webp", alt: "Tet moments", category: "Tet" },
  { id: 63, src: "/images/tet/DSC04810.webp", alt: "Tet spring celebration", category: "Tet" },
  { id: 30, src: "/images/graduation/DSC06828.webp", alt: "Graduation celebration moment", category: "Graduation" },
  { id: 31, src: "/images/graduation/DSC06830.webp", alt: "Senior portrait session", category: "Graduation" },
  { id: 32, src: "/images/graduation/DSC06847.webp", alt: "Graduation cap and gown", category: "Graduation" },
  { id: 33, src: "/images/graduation/DSC06859.webp", alt: "Graduation outdoor portrait", category: "Graduation" },
  { id: 34, src: "/images/graduation/DSC06879.webp", alt: "Graduation smile", category: "Graduation" },
  { id: 35, src: "/images/graduation/DSC06880.webp", alt: "Senior portrait styling", category: "Graduation" },
  { id: 36, src: "/images/graduation/DSC06883.webp", alt: "Graduation campus photo", category: "Graduation" },
  { id: 37, src: "/images/graduation/DSC06931.webp", alt: "Senior graduation joy", category: "Graduation" },
  { id: 38, src: "/images/graduation/DSC06933.webp", alt: "Graduation portrait", category: "Graduation" },
  { id: 39, src: "/images/graduation/DSC07007.webp", alt: "Graduation celebration", category: "Graduation" },
  { id: 1, src: "/images/product/product-01.webp", alt: "Commercial product photography", category: "Product" },
  { id: 2, src: "/images/product/product-02.webp", alt: "Brand photography campaign", category: "Product" },
  { id: 9, src: "/images/wedding/wedding-01.webp", alt: "Wedding ceremony details", category: "Wedding" },
  { id: 10, src: "/images/wedding/wedding-02.webp", alt: "Bridal portrait session", category: "Wedding" },
  { id: 11, src: "/images/wedding/wedding-03.webp", alt: "Wedding reception moments", category: "Wedding" },
  { id: 14, src: "/images/studio/studio-01.webp", alt: "Professional headshot", category: "Studio" },
  { id: 15, src: "/images/studio/studio-02.webp", alt: "Studio portrait setup", category: "Studio" },
  { id: 12, src: "/images/studio/studio-03.webp", alt: "Artistic portrait photography", category: "Studio" },
  { id: 13, src: "/images/studio/studio-04.webp", alt: "Studio lighting portrait", category: "Studio" },
  { id: 3, src: "/images/product/product-03.webp", alt: "Advertising photography", category: "Product" },
  { id: 4, src: "/images/product/product-04.webp", alt: "Product detail shot", category: "Product" },
  { id: 5, src: "/images/product/product-05.webp", alt: "Creative product photography", category: "Product" },
  { id: 6, src: "/images/product/product-06.webp", alt: "Studio product shot", category: "Product" },
  { id: 7, src: "/images/product/product-07.webp", alt: "Lifestyle product photography", category: "Product" },
  { id: 8, src: "/images/product/product-08.webp", alt: "High-end product photography", category: "Product" },
  { id: 16, src: "/images/birthday/birthday-01.webp", alt: "Birthday party celebration", category: "Event" },
  { id: 17, src: "/images/birthday/birthday-02.webp", alt: "Birthday moments", category: "Event" },
  { id: 18, src: "/images/birthday/birthday-03.webp", alt: "Birthday joy", category: "Event" },
  { id: 19, src: "/images/birthday/birthday-04.webp", alt: "Birthday event capture", category: "Event" },
  { id: 20, src: "/images/event/event-01.webp", alt: "Corporate event crowd gathering", category: "Event" },
  { id: 21, src: "/images/event/event-02.webp", alt: "Event photography", category: "Event" },
  { id: 22, src: "/images/event/event-03.webp", alt: "Live event moments", category: "Event" },
  { id: 23, src: "/images/event/event-04.webp", alt: "Event highlights", category: "Event" },
  { id: 100, src: "/images/commercial/DSC09690.webp", alt: "Brand commercial photography", category: "Commercial" },
  { id: 101, src: "/images/commercial/TTD_11.webp", alt: "Commercial brand shoot", category: "Commercial" },
  { id: 102, src: "/images/commercial/TTD_12.webp", alt: "Commercial photography", category: "Commercial" },
  { id: 103, src: "/images/commercial/TTD_15.webp", alt: "Brand photography campaign", category: "Commercial" },
  { id: 104, src: "/images/commercial/TTD_21.webp", alt: "Professional commercial shoot", category: "Commercial" },
  { id: 105, src: "/images/commercial/TTD_22.webp", alt: "Brand awareness photography", category: "Commercial" },
];

const categories = ["All", "Commercial", "Wedding", "Graduation", "Tet", "Concept", "Studio", "Product", "Event"];

const heroImages = [
  "/images/hero-background.webp",
  "/images/wedding/wedding-02.webp",
  "/images/product/product-01.webp",
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [currentHero, setCurrentHero] = useState(0);
  
  const { scrollYProgress } = useScroll();
  const yHeroText = useTransform(scrollYProgress, [0, 1], [0, 300]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredImages = selectedCategory === "All"
    ? galleryImages
    : galleryImages.filter(image => image.category === selectedCategory);

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen font-sans selection:bg-white selection:text-black">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference flex justify-between items-center">
        <div className="text-xl font-bold tracking-[0.2em] uppercase">Thanh Duc</div>
        <div className="hidden md:flex gap-8 text-sm tracking-widest uppercase">
          <a href="#portfolio" className="hover:opacity-60 transition-opacity">Portfolio</a>
          <a href="#about" className="hover:opacity-60 transition-opacity">About</a>
          <a href="#contact" className="hover:opacity-60 transition-opacity">Contact</a>
        </div>
      </nav>

      {/* Hero Section - Fullscreen Immersive Slider */}
      <section className="relative h-screen w-full overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentHero}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={heroImages[currentHero]}
              alt="Featured Photography"
              fill
              className="object-cover"
              priority
            />
            {/* Subtle gradient to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </AnimatePresence>

        <motion.div 
          style={{ y: yHeroText }}
          className="absolute bottom-0 left-0 p-8 md:p-16 z-10 w-full flex flex-col md:flex-row justify-between items-end gap-8"
        >
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-4"
            >
              Visual <br/> <span className="font-serif italic text-neutral-400">Storyteller.</span>
            </motion.h1>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-right"
          >
            <p className="text-sm md:text-base uppercase tracking-[0.3em] text-neutral-400 mb-2">Based in Vietnam</p>
            <p className="text-sm md:text-base uppercase tracking-[0.3em] text-white">Available Worldwide</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Intro / Editorial About Section */}
      <section id="about" className="py-32 px-6 md:px-16 max-w-[90rem] mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-900">
              <Image 
                src="/images/about-profile.webp" 
                alt="Thanh Duc - Photographer" 
                fill 
                className="object-cover transition-transform duration-[2s] ease-out scale-105 hover:scale-110"
              />
            </div>
            {/* Minimal accent line */}
            <div className="absolute -left-4 top-12 w-[1px] h-32 bg-white/20 hidden md:block" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-7 lg:pl-12"
          >
            <div className="flex items-center gap-6 mb-10">
              <div className="w-12 h-[1px] bg-neutral-700" />
              <span className="text-xs uppercase tracking-[0.3em] text-neutral-500">The Artist</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.2] text-neutral-200 mb-12">
              "Photography is the art of <span className="font-serif italic text-white">observation</span>. It's about finding something interesting in an ordinary place."
            </h2>
            
            <div className="flex flex-col md:flex-row gap-10 text-neutral-400 font-light leading-relaxed text-sm md:text-base">
              <p className="md:w-1/2">
                With over a decade behind the lens, my approach is rooted in raw authenticity and cinematic lighting. I strive to strip away the unnecessary, leaving only the purest emotion, precise composition, and striking visual impact.
              </p>
              <p className="md:w-1/2">
                Whether shooting high-fashion editorials, commercial product campaigns, or intimate weddings, my ultimate goal is to create timeless imagery that speaks louder than words and stands the test of time.
              </p>
            </div>
            
            <div className="mt-16 flex flex-wrap gap-12 border-t border-neutral-900 pt-12">
              <div>
                <p className="text-4xl font-light text-white mb-2">4+</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">Years Exp.</p>
              </div>
              <div>
                <p className="text-4xl font-light text-white mb-2">200+</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">Commissions</p>
              </div>
              <div>
                <p className="text-4xl font-light text-white mb-2">10+</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">Awards Won</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid - Ultra Clean */}
      <section id="portfolio" className="py-24 px-6 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <h2 className="text-4xl font-light tracking-tight">Selected Works</h2>
          <div className="flex gap-6 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-xs tracking-[0.2em] uppercase pb-2 border-b transition-all duration-300 ${
                  selectedCategory === category
                    ? "border-white text-white"
                    : "border-transparent text-neutral-500 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {filteredImages.map((image, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
              key={image.id}
              className="group cursor-pointer relative break-inside-avoid"
              onClick={() => {
                setLightboxIndex(index);
                setLightboxOpen(true);
              }}
            >
              <div className="w-full h-auto relative overflow-hidden bg-neutral-900 rounded-sm">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto block object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  loading="lazy"
                />
                {/* Clean hover overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/80 block mb-2">{image.category}</span>
                    <h3 className="text-2xl font-light text-white">{image.alt.split(',')[0]}</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services List */}
      <section className="py-32 px-6 md:px-16 max-w-7xl mx-auto border-t border-neutral-900">
        <h2 className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-16">Expertise</h2>
        <div className="space-y-0">
          {[
            { title: "Commercial & Editorial", desc: "High-end imagery for brands, campaigns, and lookbooks." },
            { title: "Wedding & Elopement", desc: "Timeless, cinematic documentation of your most intimate moments." },
            { title: "Lunar New Year (Tet)", desc: "Vibrant, cultural portraits celebrating the spirit of Spring." },
            { title: "Concept & Fine Art", desc: "Creative, highly stylized shoots tailored to unique artistic visions." },
            { title: "Graduation", desc: "Artistic, meaningful portraits celebrating your academic milestones." },
            { title: "Portraiture", desc: "Striking, emotionally resonant portraits in studio or on location." }
          ].map((service, i) => (
            <div key={i} className="group flex flex-col md:flex-row justify-between items-start md:items-center py-10 border-b border-neutral-900 hover:border-neutral-700 transition-colors cursor-pointer">
              <h3 className="text-3xl md:text-5xl font-light text-neutral-400 group-hover:text-white transition-colors mb-4 md:mb-0">
                {service.title}
              </h3>
              <div className="flex items-center gap-8 md:w-1/3">
                <p className="text-sm text-neutral-500 group-hover:text-neutral-300 transition-colors leading-relaxed">
                  {service.desc}
                </p>
                <ArrowRight className="w-6 h-6 text-neutral-700 group-hover:text-white transition-colors flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Minimalist Contact */}
      <section id="contact" className="py-32 px-6 md:px-16 bg-[#111111]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-5xl md:text-7xl font-light leading-tight mb-8">Ready to <br/> collaborate?</h2>
            <p className="text-neutral-400 mb-16 max-w-sm">For bookings, commissions, or just to say hello, please reach out via email or the contact form.</p>
            
            <div className="space-y-6 text-sm uppercase tracking-widest text-neutral-300">
              <a href="mailto:thanhduckrb767@gmail.com" className="flex items-center gap-4 hover:text-white transition-colors">
                <Mail className="w-4 h-4" /> thanhduckrb767@gmail.com
              </a>
              <div className="flex items-center gap-4">
                <MapPin className="w-4 h-4" /> Ho Chi Minh City, Vietnam
              </div>
              <div className="flex gap-6 pt-8">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">Facebook</a>
              </div>
            </div>
          </div>
          
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input type="text" placeholder="Name" className="w-full bg-transparent border-b border-neutral-800 py-4 text-white focus:border-white transition-colors outline-none text-sm uppercase tracking-widest" />
              <input type="email" placeholder="Email" className="w-full bg-transparent border-b border-neutral-800 py-4 text-white focus:border-white transition-colors outline-none text-sm uppercase tracking-widest" />
            </div>
            <select className="w-full bg-transparent border-b border-neutral-800 py-4 text-white focus:border-white transition-colors outline-none appearance-none text-sm uppercase tracking-widest cursor-pointer rounded-none">
              <option value="" className="bg-[#111] text-neutral-500">Subject</option>
              <option value="Booking" className="bg-[#111]">Booking Inquiry</option>
              <option value="Collab" className="bg-[#111]">Collaboration</option>
            </select>
            <textarea placeholder="Tell us about your project" rows={4} className="w-full bg-transparent border-b border-neutral-800 py-4 text-white focus:border-white transition-colors outline-none resize-none text-sm uppercase tracking-widest"></textarea>
            <button type="submit" className="flex items-center gap-4 text-sm uppercase tracking-[0.2em] hover:text-neutral-400 transition-colors pt-4 group">
              Send Inquiry <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-16 border-t border-neutral-900 flex justify-between items-center text-[10px] uppercase tracking-[0.3em] text-neutral-600">
        <p>© {new Date().getFullYear()} Thanh Duc</p>
        <p>All Rights Reserved</p>
      </footer>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={filteredImages.map((img) => ({ src: img.src, alt: img.alt }))}
        index={lightboxIndex}
        on={{ view: ({ index: currentIndex }) => setLightboxIndex(currentIndex) }}
      />
    </div>
  );
}
