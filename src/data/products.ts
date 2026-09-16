export interface Product {
  id: number;
  name: string;
  origin: string;
  category: string;
  roast: string;
  price: number;
  weight: string;
  description: string;
  notes: string[];
  image: string;
  rating: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    origin: "Ethiopia",
    category: "Single Origin",
    roast: "Light",
    price: 18.50,
    weight: "250g",
    description: "A bright and complex coffee from the birthplace of coffee. Grown at elevations above 1,900 meters in the Yirgacheffe region, this washed process coffee delivers an extraordinary cup with floral aromatics and citrus brightness.",
    notes: ["Jasmine", "Bergamot", "Lemon Zest", "Honey"],
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=600&fit=crop",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Colombian Supremo",
    origin: "Colombia",
    category: "Single Origin",
    roast: "Medium",
    price: 16.00,
    weight: "250g",
    description: "Sourced from the lush highlands of Huila, Colombia. This Supremo grade bean offers a beautifully balanced cup with rich caramel sweetness and a velvety body that makes it perfect for any brewing method.",
    notes: ["Caramel", "Red Apple", "Milk Chocolate", "Walnut"],
    image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=600&h=600&fit=crop",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Midnight Velvet Blend",
    origin: "Brazil & Guatemala",
    category: "Blend",
    roast: "Dark",
    price: 15.00,
    weight: "250g",
    description: "Our signature dark roast blend combines the chocolatey depth of Brazilian Santos with the smoky complexity of Guatemalan Antigua. Perfect for espresso lovers who crave a bold, full-bodied experience.",
    notes: ["Dark Chocolate", "Smoky Oak", "Brown Sugar", "Dried Fig"],
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=600&h=600&fit=crop",
    rating: 4.8,
  },
  {
    id: 4,
    name: "Kenyan AA Peaberry",
    origin: "Kenya",
    category: "Single Origin",
    roast: "Medium-Light",
    price: 22.00,
    weight: "200g",
    description: "An exceptional peaberry selection from Kenya's central highlands. These rare single-bean cherries produce an intense, wine-like cup with vibrant acidity and layers of fruit complexity that evolve as the cup cools.",
    notes: ["Blackcurrant", "Grapefruit", "Tomato", "Brown Sugar"],
    image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=600&h=600&fit=crop",
    rating: 4.9,
  },
  {
    id: 5,
    name: "Morning Ritual Blend",
    origin: "Ethiopia & Costa Rica",
    category: "Blend",
    roast: "Medium",
    price: 14.50,
    weight: "250g",
    description: "Crafted for your daily ritual, this blend marries the fruity brightness of natural Ethiopian with the clean sweetness of Costa Rican Tarrazú. Smooth, approachable, and endlessly drinkable from first light to last.",
    notes: ["Blueberry", "Toasted Almond", "Vanilla", "Cocoa"],
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&h=600&fit=crop",
    rating: 4.6,
  },
  {
    id: 6,
    name: "Sumatra Mandheling",
    origin: "Indonesia",
    category: "Single Origin",
    roast: "Dark",
    price: 17.50,
    weight: "250g",
    description: "A legendary coffee from the volcanic soils of northern Sumatra. Wet-hulled processing gives this coffee its signature earthy, full-bodied character with low acidity and a lingering herbal finish.",
    notes: ["Cedar", "Dark Cocoa", "Tobacco", "Earthy Spice"],
    image: "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=600&h=600&fit=crop",
    rating: 4.7,
  },
];

export const categories = ["All", "Single Origin", "Blend"];
export const roasts = ["All", "Light", "Medium-Light", "Medium", "Dark"];
