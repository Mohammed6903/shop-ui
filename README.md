# Harmoni - Shopping App

This is a React-based shopping application built with Next.js and Redux for an internship application. It fetches products from the Fake Store API, allows category-based filtering, and manages a cart count using Redux. The app features a responsive design and a clean user interface.

## How to Install and Run the Project

### Prerequisites
- **Node.js**: Version 14.x or higher
- **npm**: Comes with Node.js (or you can use Yarn)

### Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/Mohammed6903/shop-ui.git
   cd shop-ui
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Project**
   ```bash
   npm run dev
   ```
   - The app will launch in development mode at `http://localhost:3000`.
   - Open your browser and navigate to this URL to view the app.

### Notes
- Ensure you have an active internet connection, as the app fetches data from the Fake Store API (`https://fakestoreapi.com`).
- If you encounter issues, check the console for errors and ensure all dependencies are installed correctly.

---

## Design Decisions and Notable Features

### Design Decisions
1. **Next.js with App Router**:
   - Used Next.js for its server-side rendering capabilities and simplified routing. The App Router (`app/` directory) was chosen for modern Next.js features like Server Components, though this app primarily uses Client Components due to Redux integration.

2. **Redux for State Management**:
   - Implemented Redux Toolkit to manage the cart count globally. This ensures the cart quantity persists across components (e.g., `SiteHeader` and `ProductSection`) and provides a scalable foundation for future state management needs.

3. **Component-Based Architecture**:
   - Split the app into reusable components (`SiteHeader`, `ProductSection`, `HeroSection`, etc.) for modularity and maintainability.

4. **Tailwind CSS**:
   - Utilized Tailwind CSS for rapid styling with utility classes, ensuring a consistent and responsive design without writing custom CSS from scratch.

5. **Fake Store API**:
   - Leveraged a free, public API to simulate a real-world e-commerce backend, focusing development effort on the frontend.

### Notable Features
- **Category Filtering**: 
  - Users can filter products by category via a search bar with autocomplete suggestions, fetched dynamically from the API.
- **Responsive Design**: 
  - The layout adapts seamlessly across mobile, tablet, and desktop screens using Tailwind’s responsive utilities (e.g., `lg:hidden`, `md:grid-cols-3`).
- **Product Modal**: 
  - Clicking "Add to Cart" opens a modal with product details and a quantity selector unique to each product.
- **Cart Count**: 
  - Increments correctly when "Buy Now" is clicked, reflected in the header’s cart icon.
- **Error Handling**: 
  - Gracefully handles API failures with a retry button and loading states.

---

### Potential Improvements
1. **Enhanced State Management**:
   - Store the full cart (e.g., `{ productId: quantity }`) in Redux instead of just a total count for a more realistic shopping cart experience.
   - Move the Redux `Provider` to a higher-level client-side wrapper to make it available across multiple pages.

2. **Improved Search Functionality**:
   - Implement debounced search or a custom API wrapper to support broader filtering (e.g., by title across all categories).
   - Add a "clear search" button to reset filters explicitly.

3. **Error Handling**:
   - Add fallback images for failed product image loads (currently uses a placeholder SVG, but could be more polished).
   - Handle edge cases like empty API responses or network timeouts more explicitly.

4. **Performance**:
   - Memoize more components (beyond `StarRating`) to optimize re-renders, especially in `ProductSection`.
   - Use Next.js Image optimization features more effectively (e.g., `sizes` attribute).

5. **UI/UX Polish**:
   - Add animations (e.g., with Framer Motion) for modal transitions and cart updates.
   - Improve accessibility (e.g., ARIA labels, keyboard navigation for the search suggestions).

6. **Testing**:
   - Add unit tests with Jest/React Testing Library to ensure functionality (e.g., cart increment, category filtering).

---

## Project Structure
```
harmoni-shopping-app/
├── app/
│   ├── layout.tsx          # Root layout (HTML structure)
│   ├── page.tsx           # Home page with Redux Provider
│   └── globals.css        # Global styles (Tailwind)
├── components/
│   ├── site-header.tsx    # Header with search and cart
│   ├── product-section.tsx# Product listing and modal
│   ├── hero-section.tsx   # Hero banner
│   ├── discovery-section.tsx # Discovery call-to-action
|   ├── cart-modal.tsx
│   ├── features-section.tsx # Features showcase
│   ├── footer.tsx         # Footer component
│   └── ui/                # Reusable UI components (Button, Card, etc.)
├── store/
│   ├── store.ts           # Redux store configuration
│   └── reducers.ts        # Redux slice for cart
├── public/                # Static assets (e.g., placeholder.svg)
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

---

## Evaluation Criteria Coverage
- **Functionality**:
  - Loads all products by default from `https://fakestoreapi.com/products`.
  - Category search works via the header’s search bar and dropdown.
  - Modal displays correct product details (title, price, image, etc.).
  - Cart count increments when "Buy Now" is clicked.

- **UI/UX & Responsive Design**:
  - Adapts to mobile (hamburger menu), tablet, and desktop (grid layouts).
  - Uses a consistent yellow-black-white theme with Tailwind styling.

- **Error Handling**:
  - Displays error messages and a retry button for API failures.
  - Non-existent category searches fallback to showing all products (could be improved).

- **Best Practices**:
  - Uses `useState` and `useEffect` for local state and side effects.
  - Implements Redux Toolkit for clean state management.
  - Memoizes `StarRating` component for performance.

---

## Additional Notes
This project was completed within approximately 2 days of focused development time, as per the deadline. It’s a functional prototype that meets the core requirements, with room for polish and expansion as outlined above. Thank you for considering my submission!