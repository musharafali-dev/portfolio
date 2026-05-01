# 3D Modern Portfolio Website

A complete, production-ready 3D modern portfolio website built with React, Vite, Three.js, GSAP, and Tailwind CSS.

## Tech Stack
- **Framework:** React 18 + Vite
- **3D Graphics:** Three.js + @react-three/fiber + @react-three/drei
- **Animations:** GSAP + ScrollTrigger
- **Styling:** Tailwind CSS
- **Smooth Scroll:** Lenis
- **Icons:** Lucide React
- **Forms:** React Hook Form + EmailJS

## Setup Instructions

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env` and add your EmailJS keys:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
   You can get these keys by signing up at [EmailJS](https://www.emailjs.com/).

4. Start the development server:
   ```bash
   npm run dev
   ```

## Building for Production

To create a production build:
```bash
npm run build
```

This project is configured for deployment on Vercel out of the box (see `vercel.json`).
