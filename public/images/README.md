# Thanh Duc Photo Portfolio Images

This directory contains all images for Thanh Duc's professional photography portfolio, organized by category to match the website's filtering system.

## 📁 Simple Folder Structure

```
images/
├── hero-background.jpg     (Hero section background image)
├── product/                (Commercial & product photography)
├── wedding/                (Wedding photography)
├── studio/                 (Studio & portrait photography)
├── event/                  (Corporate & event photography)
└── README.md               (This file)
```

## 🎯 Portfolio Categories Mapping

Each folder maps directly to the portfolio filtering buttons:

### 📦 **Product** (`/images/product/`)
- Commercial photography
- Product shots
- Advertising images
- Brand photography
- **Expected:** 6+ high-resolution images

### 💒 **Wedding** (`/images/wedding/`)
- Wedding ceremonies
- Reception moments
- Couple portraits
- Wedding details
- **Expected:** 6+ wedding images

### 📸 **Studio** (`/images/studio/`)
- Studio portraits
- Headshots
- Individual portraits
- Professional portraits
- **Expected:** 6+ studio images

### 🎉 **Event** (`/images/event/`)
- Corporate events
- Conferences
- Parties
- Celebrations
- **Expected:** 3+ event images

## ✨ Hero Background Image

The hero section uses: `hero-background.jpg`
- This should be placed directly in the `images/` folder
- Should be a high-quality professional image
- Recommended size: 1920px width minimum
- Used as subtle background overlay

## 📷 Image Guidelines

### File Naming Convention
- `product-01.jpg`, `product-02.jpg`
- Sequential numbering for easy management
- All categories follow same pattern

### Technical Specifications
- **Format:** JPG, PNG, WebP
- **Quality:** Minimum 2000px on longest side
- **Size:** 200-500KB per image (optimized for web)
- **Resolution:** High quality for professional display

### Professional Standards
- Well-lit, properly exposed images
- Sharp focus where needed
- Consistent post-processing style
- Only your best work should be included

## 🔧 Integration with Website

The images are automatically loaded by the portfolio JavaScript in `app/page.tsx`. Each category folder maps to the filter buttons:

```javascript
const categories = ["All", "Product", "Wedding", "Studio", "Event"];

const galleryImages = [
  // Images from product/ folder show when "Product" is selected
  // Images from wedding/ folder show when "Wedding" is selected
  // etc...
];
```

## 📝 Adding Images

1. Choose appropriate category folder
2. Rename images: `category-01.jpg`, `category-02.jpg`
3. Place files in correct subfolder
4. Images will automatically appear in portfolio filters

## 🎨 Portfolio Balance

For best visual impact, aim for:
- **Product:** 6-12 images
- **Wedding:** 6-12 images
- **Studio:** 6-12 images
- **Event:** 3-6 images
- **Hero:** 1 professional background image

This structure keeps things clean and matches your 5-portfolio navigation exactly!

---

**Total portfolio strength goals:** 20-40 high-quality images showcasing your photography expertise across all services.
