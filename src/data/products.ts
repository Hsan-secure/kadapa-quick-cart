export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  brand?: string;
  unit: string;
  variants?: { unit: string; price: number; mrp: number; sku: string }[];
  price: number;
  mrp: number;
  image: string;
  rating: number;
  inStock: boolean;
  stockQty: number;
  isVegetarian?: boolean;
  tags?: string[];
  discount: number;
}

export interface Coupon {
  code: string;
  type: 'percent' | 'flat';
  value: number;
  maxDiscount?: number;
  firstOrderOnly?: boolean;
  description: string;
}

export const categories: Category[] = [
  { id: 'fruits-veg', name: 'Fruits & Vegetables', slug: 'fruits-vegetables', icon: '🥕', description: 'Fresh fruits and vegetables' },
  { id: 'dairy-eggs', name: 'Dairy & Eggs', slug: 'dairy-eggs', icon: '🥛', description: 'Milk, eggs, and dairy products' },
  { id: 'staples', name: 'Staples', slug: 'staples', icon: '🌾', description: 'Rice, wheat, oil, and cooking essentials' },
  { id: 'snacks', name: 'Snacks', slug: 'snacks', icon: '🍿', description: 'Chips, biscuits, and packaged snacks' },
  { id: 'beverages', name: 'Beverages', slug: 'beverages', icon: '🥤', description: 'Soft drinks, juices, and beverages' },
  { id: 'breakfast', name: 'Breakfast & Spreads', slug: 'breakfast-spreads', icon: '🍞', description: 'Bread, jams, and breakfast items' },
  { id: 'personal-care', name: 'Personal Care', slug: 'personal-care', icon: '🧴', description: 'Health and personal care products' },
  { id: 'household', name: 'Household', slug: 'household', icon: '🧽', description: 'Cleaning and household essentials' },
  { id: 'baby-care', name: 'Baby Care', slug: 'baby-care', icon: '👶', description: 'Baby products and care items' },
  { id: 'bakery', name: 'Bakery', slug: 'bakery', icon: '🍰', description: 'Fresh bakery items' },
  { id: 'frozen', name: 'Frozen & Ready-to-Cook', slug: 'frozen-ready', icon: '🧊', description: 'Frozen foods and ready meals' },
  { id: 'meat-seafood', name: 'Meat & Seafood', slug: 'meat-seafood', icon: '🐟', description: 'Fresh meat and seafood' }
];

export const products: Product[] = [
  // Fruits & Vegetables
  { id: 'tomatoes-1kg', name: 'Fresh Tomatoes', slug: 'tomatoes-1kg', categoryId: 'fruits-veg', unit: '1 kg', price: 45, mrp: 55, image: '/src/assets/products/tomatoes.jpg', rating: 4.2, inStock: true, stockQty: 50, isVegetarian: true, tags: ['fresh', 'local'], discount: 18 },
  { id: 'onions-1kg', name: 'Red Onions', slug: 'onions-1kg', categoryId: 'fruits-veg', unit: '1 kg', price: 35, mrp: 42, image: '/src/assets/products/onions.jpg', rating: 4.1, inStock: true, stockQty: 75, isVegetarian: true, tags: ['fresh', 'essential'], discount: 17 },
  { id: 'potatoes-1kg', name: 'Fresh Potatoes', slug: 'potatoes-1kg', categoryId: 'fruits-veg', unit: '1 kg', price: 28, mrp: 35, image: '/src/assets/products/potatoes.jpg', rating: 4.3, inStock: true, stockQty: 100, isVegetarian: true, tags: ['fresh', 'staple'], discount: 20 },
  { id: 'green-chilies-250g', name: 'Green Chilies', slug: 'green-chilies-250g', categoryId: 'fruits-veg', unit: '250 g', price: 15, mrp: 20, image: '/src/assets/products/green-chilies.jpg', rating: 4.0, inStock: true, stockQty: 30, isVegetarian: true, tags: ['fresh', 'spicy'], discount: 25 },
  { id: 'carrots-500g', name: 'Fresh Carrots', slug: 'carrots-500g', categoryId: 'fruits-veg', unit: '500 g', price: 22, mrp: 28, image: '/src/assets/products/carrots.jpg', rating: 4.4, inStock: true, stockQty: 40, isVegetarian: true, tags: ['fresh', 'healthy'], discount: 21 },
  { id: 'cucumbers-500g', name: 'Fresh Cucumbers', slug: 'cucumbers-500g', categoryId: 'fruits-veg', unit: '500 g', price: 18, mrp: 25, image: '/src/assets/products/cucumbers.jpg', rating: 4.1, inStock: true, stockQty: 35, isVegetarian: true, tags: ['fresh', 'cooling'], discount: 28 },
  { id: 'spinach-1bunch', name: 'Fresh Spinach', slug: 'spinach-1bunch', categoryId: 'fruits-veg', unit: '1 bunch', price: 12, mrp: 18, image: '/src/assets/products/spinach.jpg', rating: 4.2, inStock: true, stockQty: 25, isVegetarian: true, tags: ['fresh', 'leafy'], discount: 33 },
  { id: 'coriander-1bunch', name: 'Fresh Coriander', slug: 'coriander-1bunch', categoryId: 'fruits-veg', unit: '1 bunch', price: 8, mrp: 12, image: '/src/assets/products/coriander.jpg', rating: 4.0, inStock: true, stockQty: 20, isVegetarian: true, tags: ['fresh', 'herbs'], discount: 33 },
  { id: 'bananas-6pcs', name: 'Fresh Bananas', slug: 'bananas-6pcs', categoryId: 'fruits-veg', unit: '6 pcs', price: 30, mrp: 36, image: '/src/assets/products/bananas.jpg', rating: 4.5, inStock: true, stockQty: 60, isVegetarian: true, tags: ['fresh', 'sweet'], discount: 17 },
  { id: 'apples-1kg', name: 'Royal Gala Apples', slug: 'apples-1kg', categoryId: 'fruits-veg', unit: '1 kg', price: 160, mrp: 180, image: '/src/assets/products/apples.jpg', rating: 4.6, inStock: true, stockQty: 45, isVegetarian: true, tags: ['fresh', 'premium'], discount: 11 },
  { id: 'oranges-1kg', name: 'Fresh Oranges', slug: 'oranges-1kg', categoryId: 'fruits-veg', unit: '1 kg', price: 80, mrp: 95, image: '/src/assets/products/oranges.jpg', rating: 4.3, inStock: true, stockQty: 50, isVegetarian: true, tags: ['fresh', 'vitamin-c'], discount: 16 },
  { id: 'lemons-6pcs', name: 'Fresh Lemons', slug: 'lemons-6pcs', categoryId: 'fruits-veg', unit: '6 pcs', price: 18, mrp: 24, image: '/src/assets/products/lemons.jpg', rating: 4.1, inStock: true, stockQty: 40, isVegetarian: true, tags: ['fresh', 'tangy'], discount: 25 },

  // Dairy & Eggs
  { id: 'amul-milk-1l', name: 'Amul Taaza Milk', slug: 'amul-milk-1l', categoryId: 'dairy-eggs', brand: 'Amul', unit: '1 L', price: 62, mrp: 65, image: '/src/assets/products/amul-milk.jpg', rating: 4.7, inStock: true, stockQty: 80, isVegetarian: true, tags: ['fresh', 'daily'], discount: 5 },
  { id: 'amul-butter-100g', name: 'Amul Butter', slug: 'amul-butter-100g', categoryId: 'dairy-eggs', brand: 'Amul', unit: '100 g', price: 58, mrp: 62, image: '/src/assets/products/amul-butter.jpg', rating: 4.6, inStock: true, stockQty: 40, isVegetarian: true, tags: ['creamy', 'premium'], discount: 6 },
  { id: 'nestle-curd-400g', name: 'Nestlé a+ Dahi', slug: 'nestle-curd-400g', categoryId: 'dairy-eggs', brand: 'Nestlé', unit: '400 g', price: 45, mrp: 50, image: '/src/assets/products/nestle-curd.jpg', rating: 4.4, inStock: true, stockQty: 35, isVegetarian: true, tags: ['fresh', 'healthy'], discount: 10 },
  { id: 'eggs-12pcs', name: 'Farm Fresh Eggs', slug: 'eggs-12pcs', categoryId: 'dairy-eggs', unit: '12 pcs', price: 84, mrp: 90, image: '/src/assets/products/eggs.jpg', rating: 4.5, inStock: true, stockQty: 60, tags: ['fresh', 'protein'], discount: 7 },
  { id: 'paneer-200g', name: 'Fresh Paneer', slug: 'paneer-200g', categoryId: 'dairy-eggs', unit: '200 g', price: 95, mrp: 110, image: '/src/assets/products/paneer.jpg', rating: 4.3, inStock: true, stockQty: 25, isVegetarian: true, tags: ['fresh', 'protein'], discount: 14 },

  // Staples
  { id: 'aashirvaad-atta-5kg', name: 'Aashirvaad Atta', slug: 'aashirvaad-atta-5kg', categoryId: 'staples', brand: 'Aashirvaad', unit: '5 kg', price: 285, mrp: 300, image: '/src/assets/products/aashirvaad-atta.jpg', rating: 4.8, inStock: true, stockQty: 50, isVegetarian: true, tags: ['bestseller', 'quality'], discount: 5 },
  { id: 'sona-masoori-rice-10kg', name: 'Sona Masoori Rice', slug: 'sona-masoori-rice-10kg', categoryId: 'staples', unit: '10 kg', price: 680, mrp: 720, image: '/src/assets/products/sona-masoori-rice.jpg', rating: 4.6, inStock: true, stockQty: 30, isVegetarian: true, tags: ['premium', 'aromatic'], discount: 6 },
  { id: 'toor-dal-1kg', name: 'Toor Dal', slug: 'toor-dal-1kg', categoryId: 'staples', unit: '1 kg', price: 140, mrp: 155, image: '/src/assets/products/toor-dal.jpg', rating: 4.4, inStock: true, stockQty: 45, isVegetarian: true, tags: ['protein', 'essential'], discount: 10 },
  { id: 'moong-dal-1kg', name: 'Moong Dal', slug: 'moong-dal-1kg', categoryId: 'staples', unit: '1 kg', price: 130, mrp: 145, image: '/src/assets/products/moong-dal.jpg', rating: 4.3, inStock: true, stockQty: 40, isVegetarian: true, tags: ['healthy', 'protein'], discount: 10 },
  { id: 'chana-dal-1kg', name: 'Chana Dal', slug: 'chana-dal-1kg', categoryId: 'staples', unit: '1 kg', price: 125, mrp: 140, image: '/src/assets/products/chana-dal.jpg', rating: 4.2, inStock: true, stockQty: 35, isVegetarian: true, tags: ['protein', 'tasty'], discount: 11 },
  { id: 'fortune-oil-1l', name: 'Fortune Sunflower Oil', slug: 'fortune-oil-1l', categoryId: 'staples', brand: 'Fortune', unit: '1 L', price: 155, mrp: 165, image: '/src/assets/products/fortune-oil.jpg', rating: 4.5, inStock: true, stockQty: 55, isVegetarian: true, tags: ['healthy', 'refined'], discount: 6 },
  { id: 'groundnut-oil-1l', name: 'Groundnut Oil', slug: 'groundnut-oil-1l', categoryId: 'staples', unit: '1 L', price: 180, mrp: 195, image: '/src/assets/products/groundnut-oil.jpg', rating: 4.4, inStock: true, stockQty: 40, isVegetarian: true, tags: ['traditional', 'healthy'], discount: 8 },
  { id: 'sugar-1kg', name: 'Sugar', slug: 'sugar-1kg', categoryId: 'staples', unit: '1 kg', price: 42, mrp: 46, image: '/src/assets/products/sugar.jpg', rating: 4.1, inStock: true, stockQty: 70, isVegetarian: true, tags: ['essential', 'sweet'], discount: 9 },
  { id: 'tata-salt-1kg', name: 'Tata Salt', slug: 'tata-salt-1kg', categoryId: 'staples', brand: 'Tata', unit: '1 kg', price: 22, mrp: 25, image: '/src/assets/products/tata-salt.jpg', rating: 4.6, inStock: true, stockQty: 80, isVegetarian: true, tags: ['essential', 'iodized'], discount: 12 },

  // Continue with more products...
  // Snacks
  { id: 'lays-chips-52g', name: 'Lays Classic Salted', slug: 'lays-chips-52g', categoryId: 'snacks', brand: 'Lays', unit: '52 g', price: 20, mrp: 25, image: '/src/assets/products/lays-chips.jpg', rating: 4.2, inStock: true, stockQty: 100, isVegetarian: true, tags: ['crispy', 'under99'], discount: 20 },
  { id: 'kurkure-90g', name: 'Kurkure Masala Munch', slug: 'kurkure-90g', categoryId: 'snacks', brand: 'Kurkure', unit: '90 g', price: 25, mrp: 30, image: '/src/assets/products/kurkure.jpg', rating: 4.3, inStock: true, stockQty: 85, isVegetarian: true, tags: ['spicy', 'under99'], discount: 17 },
  { id: 'maggi-noodles-4pack', name: 'Maggi Masala Noodles', slug: 'maggi-noodles-4pack', categoryId: 'snacks', brand: 'Maggi', unit: '4 pack (280g)', price: 60, mrp: 68, image: '/src/assets/products/maggi-noodles.jpg', rating: 4.7, inStock: true, stockQty: 90, isVegetarian: true, tags: ['instant', 'bestseller'], discount: 12 },
  { id: 'marie-gold-200g', name: 'Marie Gold Biscuits', slug: 'marie-gold-200g', categoryId: 'snacks', brand: 'Britannia', unit: '200 g', price: 25, mrp: 30, image: '/src/assets/products/marie-gold.jpg', rating: 4.4, inStock: true, stockQty: 70, isVegetarian: true, tags: ['classic', 'under99'], discount: 17 },
  { id: 'parle-g-250g', name: 'Parle-G Gold', slug: 'parle-g-250g', categoryId: 'snacks', brand: 'Parle', unit: '250 g', price: 35, mrp: 40, image: '/src/assets/products/parle-g.jpg', rating: 4.6, inStock: true, stockQty: 95, isVegetarian: true, tags: ['classic', 'under99'], discount: 13 },
  { id: 'good-day-cashew-200g', name: 'Good Day Cashew Cookies', slug: 'good-day-cashew-200g', categoryId: 'snacks', brand: 'Britannia', unit: '200 g', price: 45, mrp: 52, image: '/src/assets/products/good-day.jpg', rating: 4.5, inStock: true, stockQty: 60, isVegetarian: true, tags: ['premium', 'under99'], discount: 13 },
  { id: 'haldirams-bhujia-200g', name: 'Haldiram\'s Bhujia', slug: 'haldirams-bhujia-200g', categoryId: 'snacks', brand: 'Haldiram\'s', unit: '200 g', price: 65, mrp: 72, image: '/src/assets/products/haldirams-bhujia.jpg', rating: 4.6, inStock: true, stockQty: 50, isVegetarian: true, tags: ['spicy', 'traditional'], discount: 10 }
];

export const coupons: Coupon[] = [
  {
    code: 'KADAPA10',
    type: 'percent',
    value: 10,
    maxDiscount: 50,
    firstOrderOnly: false,
    description: '10% off up to ₹50 - No minimum order'
  },
  {
    code: 'FIRST30',
    type: 'flat',
    value: 30,
    firstOrderOnly: true,
    description: '₹30 off on your first order'
  }
];

export const allowedPincodes = ['516001', '516002', '516003', '516004'];