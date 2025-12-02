# FUTURE_FS_02 - E-Commerce Application

A modern e-commerce application built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🛍️ **Product Catalog**: Browse 12 products across 4 categories
- 🔍 **Search & Filter**: Filter by category and price range
- 🛒 **Shopping Cart**: Add, remove, and update cart items
- 💳 **Checkout**: Complete checkout process with form validation
- 📱 **Responsive Design**: Works on all devices

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js) or **yarn**

To check if you have Node.js installed, run:
```bash
node --version
npm --version
```

## Installation & Setup Steps

### Step 1: Navigate to Project Directory

Open your terminal/command prompt and navigate to the project folder:

```bash
cd FUTURE_FS_02-main
```

### Step 2: Install Dependencies

Install all required packages using npm:

```bash
npm install
```

This will install all dependencies listed in `package.json`, including:
- Next.js 14.2.4
- React 18
- TypeScript
- Tailwind CSS
- Lucide React (icons)

### Step 3: Run Development Server

Start the development server:

```bash
npm run dev
```

You should see output similar to:
```
▲ Next.js 14.2.4
- Local:        http://localhost:3000
- ready started server on 0.0.0.0:3000
```

### Step 4: Open in Browser

Open your web browser and navigate to:

```
http://localhost:3000
```

The application should now be running!

## Available Scripts

- `npm run dev` - Start development server (with hot reload)
- `npm run build` - Build the application for production
- `npm run start` - Start production server (requires build first)
- `npm run lint` - Run ESLint to check for code issues

## Project Structure

```
FUTURE_FS_02-main/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── page.tsx      # Home page
│   │   ├── shop/         # Shop page
│   │   ├── cart/         # Shopping cart
│   │   ├── checkout/     # Checkout page
│   │   └── product/      # Product details
│   ├── components/        # React components
│   ├── context/          # React Context (Cart)
│   └── data/             # Product data
├── public/               # Static assets
├── package.json          # Dependencies
└── README.md            # This file
```

## Troubleshooting

### Port 3000 Already in Use

If you get an error that port 3000 is already in use:

```bash
# Windows PowerShell
$env:PORT=3001; npm run dev

# Or use a different port
npm run dev -- -p 3001
```

### Module Not Found Errors

If you encounter module not found errors:

```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Build Errors

If you encounter build errors:

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Context API** - State management for cart
- **Lucide React** - Icon library

## Product Categories

- **Headphones** (3 products)
- **Wearables** (3 products)
- **Cameras** (3 products)
- **Accessories** (3 products)

## Notes

- Product images are loaded from Unsplash (placeholder URLs)
- Cart data is stored in browser localStorage
- No backend/database required for this demo

## License

This project is for educational purposes.
