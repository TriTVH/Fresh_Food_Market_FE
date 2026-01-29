# Fresh Market - Folder Structure Documentation

## Overview
This document explains the organization and purpose of each folder in the Fresh Market project.

## Root Level

```
fresh-market/
├── public/              # Static files served directly
├── src/                 # Source code
├── .env.example         # Environment variables template
├── .eslintrc.cjs        # ESLint configuration
├── .gitignore           # Git ignore rules
├── .prettierrc          # Prettier configuration
├── index.html           # HTML entry point
├── package.json         # Project dependencies
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── vite.config.js       # Vite build configuration
└── README.md            # Project documentation
```

## Source Directory (`src/`)

### `assets/`
Static assets used in the application.

- **`images/`**
  - `logo/` - Brand logos and variations
  - `products/` - Product images
  - `banners/` - Hero banners and promotional images
  - `icons/` - Custom icon files
- **`fonts/`** - Custom font files (if not using CDN)

### `components/`
Reusable React components organized by feature.

#### `common/`
Generic, reusable components used throughout the app.
- `Button/` - Button component with variants
- `Input/` - Form input components
- `Badge/` - Badge/label components
- `Rating/` - Star rating component
- `Modal/` - Modal/dialog components

#### `layout/`
Layout-related components.
- `Header/` - Site header with navigation
- `Footer/` - Site footer
- `Layout.jsx` - Main layout wrapper

#### `product/`
Product-specific components.
- `ProductCard/` - Product card display
- `ProductGrid/` - Grid layout for products
- `ProductFilter/` - Filter sidebar/controls
- `CategoryTabs/` - Category tab navigation

#### `cart/`
Shopping cart components.
- `CartItem/` - Individual cart item
- `CartSummary/` - Cart total summary
- `CartDrawer/` - Slide-out cart panel

#### `home/`
Homepage-specific components.
- `HeroSection/` - Hero banner section
- `SearchBar/` - Product search bar
- `CategorySection/` - Category showcase

### `pages/`
Page-level components (route components).

- `Home/` - Homepage
- `Products/` - Product listing and detail pages
- `Cart/` - Shopping cart page
- `Auth/` - Login and registration pages
- `About/` - About page
- `NotFound/` - 404 error page

### `context/`
React Context providers for global state.

- `CartContext.jsx` - Shopping cart state
- `AuthContext.jsx` - Authentication state
- `ProductContext.jsx` - Product data state

### `hooks/`
Custom React hooks.

- `useCart.js` - Cart operations hook
- `useAuth.js` - Authentication hook
- `useProducts.js` - Product data hook

### `services/`
API and external service integrations.

- `api.js` - Axios instance configuration
- `productService.js` - Product API calls
- `authService.js` - Authentication API calls
- `cartService.js` - Cart API calls

### `utils/`
Utility functions and helpers.

- `constants.js` - App-wide constants
- `helpers.js` - Helper functions
- `formatters.js` - Data formatting utilities

### `styles/`
Global styles and CSS.

- `index.css` - Main stylesheet with Tailwind imports
- `tailwind.css` - Tailwind-specific styles
- `variables.css` - CSS custom properties

### `routes/`
Routing configuration.

- `AppRoutes.jsx` - Route definitions

## Component Organization Pattern

Each component folder follows this structure:

```
ComponentName/
├── ComponentName.jsx        # Component logic
└── ComponentName.module.css # Component styles (optional)
```

## Naming Conventions

- **Components**: PascalCase (e.g., `ProductCard.jsx`)
- **Utilities**: camelCase (e.g., `formatPrice.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **CSS Modules**: `ComponentName.module.css`

## Import Order

1. React and external libraries
2. Internal components
3. Hooks and contexts
4. Services and utilities
5. Styles
6. Assets

Example:
```javascript
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@components/common/Button'
import { useCart } from '@hooks/useCart'
import { formatPrice } from '@utils/formatters'
import './ProductCard.module.css'
import productImage from '@assets/images/products/sample.jpg'
```

## Best Practices

1. **Keep components small and focused** - Each component should do one thing well
2. **Use composition** - Build complex UIs from simple components
3. **Separate concerns** - Keep business logic in services, UI logic in components
4. **Reuse common components** - Don't duplicate code
5. **Use path aliases** - Import using `@components` instead of relative paths
6. **Co-locate related files** - Keep component files together in their folder

---

This structure is designed to scale as the application grows while maintaining organization and clarity.
