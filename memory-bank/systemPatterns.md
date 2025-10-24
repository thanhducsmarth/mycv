# System Patterns: Thanh Duc Photo Portfolio

## System Architecture

### Application Structure (Next.js App Router)
```
├── app/
│   ├── layout.tsx          # Root layout with global styles
│   ├── page.tsx            # Home/gallery page
│   ├── globals.css         # Tailwind directives and global styles
│   └── favicon.ico         # Site favicon
├── public/
│   └── images/            # Photography assets (future)
├── memory-bank/           # Project documentation
└── Configuration files    # next.config.ts, tsconfig.json, etc.
```

### Component Hierarchy
```
layout.tsx (Root Layout)
├── <html>
├── <body> with global styling
├── <main> wrapper (future)
└── page.tsx content
```

### Data Flow
- **Static Content**: Next.js pre-rendering of gallery HTML
- **Images**: Static imports from `public/` directory
- **Styling**: TailwindCSS utility classes applied inline
- **Responsive**: CSS Grid and Flexbox for adaptive layouts

## Key Technical Decisions

### App Router Usage
- Uses Next.js 14+ App Router for modern, server-first architecture
- `page.tsx` as primary entry point for gallery
- `layout.tsx` for shared UI (header, footer, global styles)

### Image Optimization Strategy
- Next.js `<Image>` component for automatic optimization
- Lazy loading and priority loading for above-the-fold images
- Responsive image sizing with `fill` or `width/height` props
- WebP format with fallbacks where supported

### Styling Approach
- **TailwindCSS**: Utility-first approach for rapid development
- **Mobile-First**: Responsive design with `sm:`, `md:`, `lg:` breakpoints
- **Semantic Class Names**: Descriptive combinations (e.g., `grid grid-cols-1 md:grid-cols-3 gap-4`)
- **Consistent Spacing**: Using Tailwind scale (2, 4, 6, 8...) for harmony

## Design Patterns in Use

### Component Structure
- **Functional Components**: Modern React with hooks (no class components)
- **TypeScript**: Strict typing for props and state
- **Default Props**: Sensible defaults for optional component properties

### Layout Patterns
- **Grid Gallery**: CSS Grid for photo arrangement
- **Responsive Grid**: `grid-cols-1` mobile, `grid-cols-2/3/4` larger screens
- **Container Centering**: `max-w-7xl mx-auto p-4` for readable widths
- **Aspect Ratios**: Consistent rectangular images with `aspect-square` or custom ratios

### Performance Patterns
- **Server-Side Generation**: Static HTML where possible
- **Image Optimization**: Automatic resizing and format conversion
- **Minimal JavaScript**: Mostly static content with minimal interactivity
- **Critical CSS**: Tailwind purging for smaller bundle sizes

## Component Relationships

### PhotoGallery Component (Future)
- Renders grid of images
- Receives array of photo objects
- Handles responsive layout
- Implements lightbox navigation (future enhancement)

### Layout Structure
- `layout.tsx` provides global context
- Page components focus on content
- Shared styling through globals.css
- Consistent header/footer (when added)

## Implementation Path

### Critical Components
1. **Gallery Grid**: Core display logic with responsive grids
2. **Image Display**: Optimized Next.js Image usage
3. **Layout Wrapper**: Consistent spacing and centering
4. **Page Structure**: Single page with expandable sections

### State Management
- No complex state needed initially (static portfolio)
- Potential for photo categorization (filter by type/genome)
- Future: Lightbox modal state for photo viewing

### Styling Patterns
- Dark/light mode support through Tailwind (optional)
- Consistent color palette mirroring photography themes
- Typography scale using Geist font family
- Spacing system preventing layout shifts

This architecture provides a scalable foundation that can evolve from a simple gallery to a comprehensive portfolio with minimal refactoring.
