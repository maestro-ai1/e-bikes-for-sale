export type ProductCategory = 
  | 'emtb'
  | 'folding'
  | 'cruiser'
  | 'fat-tyre' 
  | 'cargo' 
  | 'road'
  | 'commuter' 
  | 'scooters' 
  | 'accessories' 
  | 'helmets' 
  | 'parts';

export interface AddOnItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  badge?: string;
  subtitle: string;
  category: ProductCategory;
  categoryLabel: string;
  subcategory?: string;
  subcategoryId?: string;
  brand: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  hoverImage: string;
  gallery: string[];
  inStock: boolean;
  stockCount: number;
  motor: string;
  motorType: 'Hub' | 'Mid-Drive';
  torqueNm: number;
  batteryWh: number;
  batterySpec: string;
  rangeKm: number;
  topSpeedKmH: number;
  frameType: 'Step-Through' | 'Crossbar' | 'Folding' | 'Dual Suspension' | 'Hardtail' | 'Universal';
  weightKg: number;
  payloadKg: number;
  brakes: string;
  gears: string;
  auCompliance: string;
  description: string;
  shortDescription: string;
  features: string[];
  tags: string[];
  sizeVariants: { id: string; label: string; priceDelta: number }[];
  recommendedAddOns: AddOnItem[];
  faqs?: { question: string; answer: string }[];
}

export interface CartItem {
  cartId: string;
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedAddOns: AddOnItem[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  altText: string;
  tags: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface AustralianStateRule {
  state: string;
  name: string;
  maxContinuousPower: string;
  maxAssistedSpeed: string;
  throttleRules: string;
  helmetRequired: string;
  minAge: string;
  standardsCompliance: string;
  sourceAuthority: string;
}

export interface BrandInfo {
  id: string;
  name: string;
  tagline: string;
  country: string;
  founded: string;
  warranty: string;
  compliance: string;
  logo: string;
  image: string;
  description: string;
  signatureModels: string[];
  keyStrengths: string[];
  rating: number;
  reviewsCount: number;
}

export interface RevolutionarySlide {
  id: string;
  brand: string;
  badge: string;
  headline: string;
  subheadline: string;
  description: string;
  techHighlight: string;
  image: string;
  categoryId: string;
}

