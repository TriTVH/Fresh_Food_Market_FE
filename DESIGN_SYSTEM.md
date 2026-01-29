# Fresh Market - Design System

## Color Palette

### Primary Colors (Green)
Represents freshness, health, and organic products.

```css
primary-50:  #f0f9f4
primary-100: #dbf0e3
primary-200: #b9e1cb
primary-300: #8ccbab
primary-400: #5daf87
primary-500: #3d9468  /* Main brand color */
primary-600: #2d7753
primary-700: #255f44
primary-800: #1f4c37
primary-900: #1a3f2e
```

**Usage:**
- Primary buttons
- Links
- Active states
- Brand elements

### Secondary Colors (Red)
Used for accents, CTAs, and promotional elements.

```css
secondary-50:  #fef2f2
secondary-100: #fee2e2
secondary-200: #fecaca
secondary-300: #fca5a5
secondary-400: #f87171
secondary-500: #ef4444  /* Main accent color */
secondary-600: #dc2626
secondary-700: #b91c1c
secondary-800: #991b1b
secondary-900: #7f1d1d
```

**Usage:**
- Discount badges
- Sale prices
- Important CTAs
- Error states

### Neutral Colors
Using Tailwind's default gray scale for text and backgrounds.

## Typography

### Font Families

**Primary Font (Body):** Inter
```css
font-family: 'Inter', system-ui, sans-serif;
```
- Clean, modern sans-serif
- Excellent readability
- Used for body text, descriptions, labels

**Display Font (Headings):** Outfit
```css
font-family: 'Outfit', system-ui, sans-serif;
```
- Bold, attention-grabbing
- Used for headings, hero text, CTAs

### Font Sizes

```css
text-xs:   0.75rem   (12px)
text-sm:   0.875rem  (14px)
text-base: 1rem      (16px)
text-lg:   1.125rem  (18px)
text-xl:   1.25rem   (20px)
text-2xl:  1.5rem    (24px)
text-3xl:  1.875rem  (30px)
text-4xl:  2.25rem   (36px)
text-5xl:  3rem      (48px)
```

### Font Weights

```css
font-light:     300
font-normal:    400
font-medium:    500
font-semibold:  600
font-bold:      700
font-extrabold: 800
```

## Spacing

Using Tailwind's default spacing scale (4px base unit):
- `1` = 0.25rem (4px)
- `2` = 0.5rem (8px)
- `4` = 1rem (16px)
- `6` = 1.5rem (24px)
- `8` = 2rem (32px)
- `12` = 3rem (48px)

## Components

### Buttons

#### Primary Button
```jsx
<button className="btn-primary">
  Khám Phá Ngay
</button>
```
- Background: `primary-600`
- Hover: `primary-700`
- Text: White
- Padding: `px-6 py-3`
- Border radius: `rounded-lg`

#### Secondary Button
```jsx
<button className="btn-secondary">
  Ưu Đãi
</button>
```
- Background: `secondary-500`
- Hover: `secondary-600`
- Text: White

#### Outline Button
```jsx
<button className="btn-outline">
  Xem Thêm
</button>
```
- Border: `primary-600`
- Text: `primary-600`
- Hover background: `primary-50`

### Input Fields

```jsx
<input className="input-field" placeholder="Tìm sản phẩm..." />
```
- Border: `gray-300`
- Focus ring: `primary-500`
- Padding: `px-4 py-2`
- Border radius: `rounded-lg`

### Cards

```jsx
<div className="card">
  {/* Product content */}
</div>
```
- Background: White
- Shadow: `shadow-card`
- Hover shadow: `shadow-card-hover`
- Border radius: `rounded-xl`
- Transition: `duration-300`

### Badges

#### Discount Badge
```jsx
<span className="badge-discount">-19%</span>
```
- Background: Red (`red-500`)
- Text: White
- Position: Absolute top-left on product cards

#### Organic Badge
```jsx
<span className="badge-organic">100% Organic</span>
```
- Background: Light green (`green-100`)
- Text: Dark green (`green-800`)

## Layout

### Container
```jsx
<div className="container mx-auto px-4 max-w-7xl">
  {/* Content */}
</div>
```

### Grid Layouts

**Product Grid:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {/* Product cards */}
</div>
```

## Shadows

```css
shadow-card:       0 2px 8px rgba(0, 0, 0, 0.08)
shadow-card-hover: 0 4px 16px rgba(0, 0, 0, 0.12)
```

## Border Radius

```css
rounded-lg:  0.5rem  (8px)  - Buttons, inputs
rounded-xl:  0.75rem (12px) - Cards
rounded-full: 9999px        - Badges, pills
```

## Transitions

Default transition for interactive elements:
```css
transition-colors duration-200  /* Buttons */
transition-shadow duration-300  /* Cards */
```

## Responsive Breakpoints

```css
sm:  640px   /* Small tablets */
md:  768px   /* Tablets */
lg:  1024px  /* Laptops */
xl:  1280px  /* Desktops */
2xl: 1536px  /* Large screens */
```

## Icons

Using **React Icons** library:
- Shopping cart: `FiShoppingCart`
- User: `FiUser`
- Search: `FiSearch`
- Star (rating): `FiStar`, `FiStarFilled`
- Menu: `FiMenu`

## Accessibility

- Minimum contrast ratio: 4.5:1 for normal text
- Focus states: Visible ring on all interactive elements
- Semantic HTML: Use proper heading hierarchy
- Alt text: All images must have descriptive alt text
- Keyboard navigation: All interactive elements accessible via keyboard

---

**Design Reference:** Based on Figma design "Cải thiện giao diện trang chủ"
