import { Product } from "@/types";

export const products: Product[] = [
  {
    id: 1,
    name: "Modern Desk Lamp",
    description: "Sleek, energy-efficient LED desk lamp with adjustable brightness and color temperature.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=2274&auto=format&fit=crop",
    category: "Home",
    featured: true
  },
  {
    id: 2,
    name: "Wireless Bluetooth Headphones",
    description: "Premium noise-cancelling headphones with 30-hour battery life and comfortable fit.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2940&auto=format&fit=crop",
    category: "Electronics",
    featured: true
  },
  {
    id: 3,
    name: "Leather Wallet",
    description: "Handcrafted genuine leather wallet with RFID protection and multiple card slots.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=2787&auto=format&fit=crop",
    category: "Accessories"
  },
  {
    id: 4,
    name: "Smart Watch",
    description: "Fitness tracker with heart rate monitor, sleep tracking, and smartphone notifications.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2972&auto=format&fit=crop",
    category: "Electronics",
    featured: true
  },
  {
    id: 5,
    name: "Coffee Maker",
    description: "Programmable coffee maker with 12-cup capacity and built-in grinder.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1520970519539-8c9eaef9c7b6?q=80&w=2787&auto=format&fit=crop",
    category: "Home",
    featured: true
  },
  {
    id: 6,
    name: "Yoga Mat",
    description: "Eco-friendly, non-slip yoga mat with alignment markings and carrying strap.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?q=80&w=2940&auto=format&fit=crop",
    category: "Fitness"
  },
  {
    id: 7,
    name: "Stainless Steel Water Bottle",
    description: "Vacuum-insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?q=80&w=2787&auto=format&fit=crop",
    category: "Accessories"
  },
  {
    id: 8,
    name: "Portable Bluetooth Speaker",
    description: "Waterproof, rugged speaker with 20-hour battery life and deep bass.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2814&auto=format&fit=crop",
    category: "Electronics"
  },
  {
    id: 9,
    name: "Ceramic Plant Pot",
    description: "Modern minimalist plant pot perfect for indoor succulents and small plants.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2944&auto=format&fit=crop",
    category: "Home"
  },
  {
    id: 10,
    name: "Canvas Backpack",
    description: "Durable cotton canvas backpack with laptop sleeve and multiple compartments.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=2787&auto=format&fit=crop",
    category: "Accessories"
  },
  {
    id: 11,
    name: "Scented Candle Set",
    description: "Set of three premium soy wax candles with essential oil fragrances.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=2787&auto=format&fit=crop",
    category: "Home"
  },
  {
    id: 12,
    name: "Fitness Tracker Band",
    description: "Lightweight activity tracker with heart rate monitoring and sleep analysis.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?q=80&w=2000&auto=format&fit=crop",
    category: "Fitness"
  }
];

export const featuredProducts = products.filter(product => product.featured);