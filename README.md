# ⛵ Sail & Stitch — Crafting Life & Style

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-8.2.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4.3.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

> **Live Demo**: 🔗 [https://sail-stitch.vercel.app](https://sail-stitch.vercel.app)

**Sail & Stitch** is a modern, high-performance, and premium lifestyle fashion e-commerce web application inspired by Bangladesh's top fashion retail brands. It offers a luxurious shopping experience for traditional ethnic wear (Panjabi, Kabli, Kurti, Saree) and contemporary casual menswear, womenswear, kidswear, and lifestyle accessories.

---

## ✨ Features Highlight

### 🎨 1. Luxury Design & Aesthetics
- **Dark Mode Elegance**: Designed with custom deep navy (`#0b1b3d`), rich slate tones, and warm gold (`#d97706`) accents.
- **Glassmorphism & Micro-animations**: Backdrop blur filters, hover elevation, smooth transitions, and animated banner indicators.
- **Mobile-First App Experience**: Sticky header, slide-over navigation, and a dedicated mobile bottom navigation bar.

### 🛍️ 2. Dynamic Banner Slider & Showcase
- Interactive promotional hero slider with automated rotation.
- Category grid showcasing featured collections: Festive Panjabi & Kabli, Women Kurtis & Sarees, Menswear, Junior Fashion, and Leather Accessories.

### 🔍 3. Product Catalog & Advanced Filtering
- Search products dynamically by title, description, or category.
- Filter by maximum price slider (`৳ 1,000` to `৳ 15,000`) and category tabs.
- Multi-option sorting: *Featured & Newest*, *Price: Low to High*, *Price: High to Low*, and *Highest Rated*.

### 👁️ 4. Product Quick View Modal
- Modal preview with high-res multi-image thumbnail gallery.
- Interactive size chips, color selection swatches, and quantity selector.
- Fabric composition details and delivery guarantee badges.

### 🛒 5. Interactive Slide-Over Shopping Cart
- Dynamic cart state persisted via `localStorage`.
- Real-time subtotal calculation and free shipping progress bar (`৳ 3,000` threshold).
- Coupon discount application (Try coupon `SAIL10` for 10% off).

### 💳 6. Complete Checkout Flow & Confetti Celebration
- Delivery form supporting all major districts across Bangladesh.
- Integrated payment options: **bKash**, **Nagad**, and **Cash on Delivery (COD)**.
- Automated order ID generation and celebratory particle confetti upon order completion.

### 📍 7. Outlet & Store Locator
- Searchable store locator modal for flagship outlets in Gulshan, Dhanmondi, Jamuna Future Park, and Chittagong with store hours and contact details.

---

## 🛠️ Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) |
| **Build Tool** | [Vite 8](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & Custom CSS Animations |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Effects** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) |
| **Linting** | [Oxlint](https://oxc.rs/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📁 Repository Structure

```
Sail & Stitch/
├── public/
│   ├── favicon.svg
│   └── images/              # Local fashion product image assets
├── src/
│   ├── assets/              # Static styling assets
│   ├── components/          # Reusable React components
│   │   ├── CartDrawer.jsx          # Slide-over shopping cart
│   │   ├── CategoryGrid.jsx        # Curated categories showcase
│   │   ├── CheckoutModal.jsx       # Shipping & payment checkout
│   │   ├── Footer.jsx              # Footer & newsletter
│   │   ├── Header.jsx              # Sticky navigation & search
│   │   ├── HeroSlider.jsx          # Promotional banner slider
│   │   ├── ProductCard.jsx         # Individual product card
│   │   ├── ProductQuickView.jsx    # Detailed product modal
│   │   └── StoreLocatorModal.jsx   # Outlets & store locator
│   ├── data/
│   │   └── products.js      # Catalog database & outlet specs
│   ├── App.jsx              # Main App layout & catalog state
│   ├── App.css              # Custom utility styles
│   ├── index.css            # Tailwind CSS v4 entry point
│   └── main.jsx             # React DOM entry point
├── vercel.json              # Vercel SPA routing configuration
├── vite.config.js           # Vite configuration
└── package.json             # Project dependencies & scripts
```

---

## 🏃 Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/nazmul-d3v/Sail-Stitch.git
   cd Sail-Stitch
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173/`.

4. **Build for Production**
   ```bash
   npm run build
   ```

5. **Linting Check**
   ```bash
   npm run lint
   ```

---

## 🚀 Deployment

This project is configured for seamless deployment on **Vercel**.

1. Connect your GitHub repository `nazmul-d3v/Sail-Stitch` to [Vercel](https://vercel.com).
2. Set Framework Preset to **Vite**.
3. Deploy! The included `vercel.json` ensures smooth single-page application (SPA) routing.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="center">
  Crafted with ❤️ for <strong>Sail & Stitch</strong>
</p>
