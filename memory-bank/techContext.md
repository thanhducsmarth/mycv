# Technical Context: Thanh Duc Photo

## Technology Stack

### Frontend Framework
- **Next.js 15**: App Router, Server Components, and Image optimization
- **React 19**: Latest React features, including concurrent features and improved performance
- **TypeScript 5**: Type-safe development with strict configuration

### Styling & UI
- **TailwindCSS 4**: Utility-first CSS framework for rapid UI development
- **PostCSS**: CSS processing with Tailwind plugin

### Development Tools
- **Turbopack**: Next.js built-in bundler for faster development builds
- **ESLint**: Code quality and consistency (implied in Next.js setup)
- **TypeScript Compiler**: Type checking and compilation

### Package Manager
- **npm**: Node package manager with package-lock.json for dependency locking

## Development Setup

### Prerequisites
- Node.js 18.0 or later (required for React 19 and Next.js 15 features)
- npm or yarn or pnpm

### Development Commands
- `npm run dev`: Starts development server with Turbopack
- `npm run build`: Production build with Turbopack
- `npm run start`: Starts production server

### Environment
- OS: Windows 11
- Code Editor: Visual Studio Code
- Git: For version control

## Technical Constraints

### Version Compatibility
- Next.js 15 requires Node.js 18+ and React 18.3+
- Using React 19 (canary version, may have breaking changes)
- TailwindCSS 4 (v4) - new architecture, potential configuration differences

### Performance Requirements
- Image optimization is critical for photography portfolio
- Responsive images for different viewport sizes
- Fast initial load times for visual content

### Deployment Target
- Vercel platform (optimized for Next.js deployments)
- Static generation where possible, server-side rendering when needed

## Tool Usage Patterns

### File Structure
```
app/           # Next.js App Router pages
├── page.tsx   # Home gallery page
├── layout.tsx # Root layout
└── globals.css # Global styles

public/        # Static assets (images, icons)
memory-bank/   # Project documentation
```

### Development Workflow
1. Use `npm run dev` for local development
2. Edit components in `app/` directory
3. Use Tailwind classes for styling
4. Add images to `public/` directory
5. Deploy via Vercel for production

### Image Handling
- Place photos in `public/images/` subdirectory
- Use Next.js `Image` component for optimization
- Configure srcSet for responsive images
- Consider lazy loading for gallery performance

## Dependencies & Rationale

- **next/font**: Automatic font optimization (Geist font included)
- **@types/**: TypeScript definitions for React ecosystem
- **postcss & tailwindcss**: CSS processing pipeline

This setup provides a modern, performant foundation for a photography portfolio with optimal developer experience and end-user performance.
