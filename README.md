# StreamHub | Movie & TV Streaming Website

A modern, high-performance streaming discovery platform built with React, Vite, and Tailwind CSS.

## 🚀 Production Readiness Features

This project has been optimized for production with the following features:

- **Code Splitting**: Implemented `React.lazy` and `Suspense` for modular loading of views, reducing initial bundle size.
- **Build Optimization**: Configured Vite to strip `console.log` and `debugger` statements in production.
- **Vendor Chunking**: Separated heavy libraries (React, Framer Motion) into independent chunks for better browser caching.
- **SEO & Socials**: Added Open Graph metadata, Twitter cards, and optimized titles/descriptions for better visibility.
- **API Rate Limiting**: Integrated a client-side request queue to prevent hitting TMDB rate limits (max 5 requests/sec).
- **SPA Routing**: Added Netlify `_redirects` to support single-page application routing and deep linking.

## 🛠️ Deployment Instructions (Netlify)

1. **Connect Repository**: Connect your GitHub repository to Netlify.
2. **Build Settings**:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
3. **Environment Variables**:
   Add the following variables in the Netlify UI (Site settings > Build & deploy > Environment):
   - `VITE_TMDB_API_KEY`: Your TMDB API Key.
   - `VITE_TMDB_BASE_URL`: `https://api.themoviedb.org/3`
   - `VITE_IMG_URL`: `https://image.tmdb.org/t/p`

## 💻 Local Development

1. Clone the repository.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and add your TMDB API Key.
4. Run `npm run dev` to start the development server.
5. Run `npm run build` to test the production build locally.
