import { productImages } from '@/assets/images';

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
  { id: 'tomatoes-1kg', name: 'Fresh Tomatoes', slug: 'tomatoes-1kg', categoryId: 'fruits-veg', unit: '1 kg', price: 45, mrp: 55, image: productImages['tomatoes.jpg'], rating: 4.2, inStock: true, stockQty: 50, isVegetarian: true, tags: ['fresh', 'local'], discount: 18 },
  { id: 'onions-1kg', name: 'Red Onions', slug: 'onions-1kg', categoryId: 'fruits-veg', unit: '1 kg', price: 35, mrp: 42, image: productImages['onions.jpg'], rating: 4.1, inStock: true, stockQty: 75, isVegetarian: true, tags: ['fresh', 'essential'], discount: 17 },
  { id: 'potatoes-1kg', name: 'Fresh Potatoes', slug: 'potatoes-1kg', categoryId: 'fruits-veg', unit: '1 kg', price: 28, mrp: 35, image: productImages['potatoes.jpg'], rating: 4.3, inStock: true, stockQty: 100, isVegetarian: true, tags: ['fresh', 'staple'], discount: 20 },
  { id: 'green-chilies-250g', name: 'Green Chilies', slug: 'green-chilies-250g', categoryId: 'fruits-veg', unit: '250 g', price: 15, mrp: 20, image: productImages['green-chilies.jpg'], rating: 4.0, inStock: true, stockQty: 30, isVegetarian: true, tags: ['fresh', 'spicy'], discount: 25 },
  { id: 'carrots-500g', name: 'Fresh Carrots', slug: 'carrots-500g', categoryId: 'fruits-veg', unit: '500 g', price: 22, mrp: 28, image: productImages['carrots.jpg'], rating: 4.4, inStock: true, stockQty: 40, isVegetarian: true, tags: ['fresh', 'healthy'], discount: 21 },
  { id: 'cucumbers-500g', name: 'Fresh Cucumbers', slug: 'cucumbers-500g', categoryId: 'fruits-veg', unit: '500 g', price: 18, mrp: 25, image: productImages['cucumbers.jpg'], rating: 4.1, inStock: true, stockQty: 35, isVegetarian: true, tags: ['fresh', 'cooling'], discount: 28 },
  { id: 'spinach-1bunch', name: 'Fresh Spinach', slug: 'spinach-1bunch', categoryId: 'fruits-veg', unit: '1 bunch', price: 12, mrp: 18, image: productImages['spinach.jpg'], rating: 4.2, inStock: true, stockQty: 25, isVegetarian: true, tags: ['fresh', 'leafy'], discount: 33 },
  { id: 'coriander-1bunch', name: 'Fresh Coriander', slug: 'coriander-1bunch', categoryId: 'fruits-veg', unit: '1 bunch', price: 8, mrp: 12, image: productImages['coriander.jpg'], rating: 4.0, inStock: true, stockQty: 20, isVegetarian: true, tags: ['fresh', 'herbs'], discount: 33 },
  { id: 'bananas-6pcs', name: 'Fresh Bananas', slug: 'bananas-6pcs', categoryId: 'fruits-veg', unit: '6 pcs', price: 30, mrp: 36, image: productImages['bananas.jpg'], rating: 4.5, inStock: true, stockQty: 60, isVegetarian: true, tags: ['fresh', 'sweet'], discount: 17 },
  { id: 'apples-1kg', name: 'Royal Gala Apples', slug: 'apples-1kg', categoryId: 'fruits-veg', unit: '1 kg', price: 160, mrp: 180, image: productImages['apples.jpg'], rating: 4.6, inStock: true, stockQty: 45, isVegetarian: true, tags: ['fresh', 'premium'], discount: 11 },
  { id: 'oranges-1kg', name: 'Fresh Oranges', slug: 'oranges-1kg', categoryId: 'fruits-veg', unit: '1 kg', price: 80, mrp: 95, image: productImages['oranges.jpg'], rating: 4.3, inStock: true, stockQty: 50, isVegetarian: true, tags: ['fresh', 'vitamin-c'], discount: 16 },
  { id: 'lemons-6pcs', name: 'Fresh Lemons', slug: 'lemons-6pcs', categoryId: 'fruits-veg', unit: '6 pcs', price: 18, mrp: 24, image: productImages['lemons.jpg'], rating: 4.1, inStock: true, stockQty: 40, isVegetarian: true, tags: ['fresh', 'tangy'], discount: 25 },

  // Dairy & Eggs
  { id: 'amul-milk-1l', name: 'Amul Taaza Milk', slug: 'amul-milk-1l', categoryId: 'dairy-eggs', brand: 'Amul', unit: '1 L', price: 62, mrp: 65, image: productImages['amul-milk.jpg'], rating: 4.7, inStock: true, stockQty: 80, isVegetarian: true, tags: ['fresh', 'daily'], discount: 5 },
  { id: 'amul-butter-100g', name: 'Amul Butter', slug: 'amul-butter-100g', categoryId: 'dairy-eggs', brand: 'Amul', unit: '100 g', price: 58, mrp: 62, image: productImages['amul-butter.jpg'], rating: 4.6, inStock: true, stockQty: 40, isVegetarian: true, tags: ['creamy', 'premium'], discount: 6 },
  { id: 'nestle-curd-400g', name: 'Nestlé a+ Dahi', slug: 'nestle-curd-400g', categoryId: 'dairy-eggs', brand: 'Nestlé', unit: '400 g', price: 45, mrp: 50, image: productImages['nestle-curd.jpg'], rating: 4.4, inStock: true, stockQty: 35, isVegetarian: true, tags: ['fresh', 'healthy'], discount: 10 },
  { id: 'eggs-12pcs', name: 'Farm Fresh Eggs', slug: 'eggs-12pcs', categoryId: 'dairy-eggs', unit: '12 pcs', price: 84, mrp: 90, image: productImages['eggs.jpg'], rating: 4.5, inStock: true, stockQty: 60, tags: ['fresh', 'protein'], discount: 7 },
  { id: 'paneer-200g', name: 'Fresh Paneer', slug: 'paneer-200g', categoryId: 'dairy-eggs', unit: '200 g', price: 95, mrp: 110, image: productImages['paneer.jpg'], rating: 4.3, inStock: true, stockQty: 25, isVegetarian: true, tags: ['fresh', 'protein'], discount: 14 },

  // Staples
  { id: 'aashirvaad-atta-5kg', name: 'Aashirvaad Atta', slug: 'aashirvaad-atta-5kg', categoryId: 'staples', brand: 'Aashirvaad', unit: '5 kg', price: 285, mrp: 300, image: productImages['aashirvaad-atta.jpg'], rating: 4.8, inStock: true, stockQty: 50, isVegetarian: true, tags: ['bestseller', 'quality'], discount: 5 },
  { id: 'sona-masoori-rice-10kg', name: 'Sona Masoori Rice', slug: 'sona-masoori-rice-10kg', categoryId: 'staples', unit: '10 kg', price: 680, mrp: 720, image: productImages['sona-masoori-rice.jpg'], rating: 4.6, inStock: true, stockQty: 30, isVegetarian: true, tags: ['premium', 'aromatic'], discount: 6 },
  { id: 'toor-dal-1kg', name: 'Toor Dal', slug: 'toor-dal-1kg', categoryId: 'staples', unit: '1 kg', price: 140, mrp: 155, image: productImages['toor-dal.jpg'], rating: 4.4, inStock: true, stockQty: 45, isVegetarian: true, tags: ['protein', 'essential'], discount: 10 },
  { id: 'moong-dal-1kg', name: 'Moong Dal', slug: 'moong-dal-1kg', categoryId: 'staples', unit: '1 kg', price: 130, mrp: 145, image: productImages['moong-dal.jpg'], rating: 4.3, inStock: true, stockQty: 40, isVegetarian: true, tags: ['healthy', 'protein'], discount: 10 },
  { id: 'chana-dal-1kg', name: 'Chana Dal', slug: 'chana-dal-1kg', categoryId: 'staples', unit: '1 kg', price: 125, mrp: 140, image: productImages['chana-dal.jpg'], rating: 4.2, inStock: true, stockQty: 35, isVegetarian: true, tags: ['protein', 'tasty'], discount: 11 },
  { id: 'fortune-oil-1l', name: 'Fortune Sunflower Oil', slug: 'fortune-oil-1l', categoryId: 'staples', brand: 'Fortune', unit: '1 L', price: 155, mrp: 165, image: productImages['fortune-oil.jpg'], rating: 4.5, inStock: true, stockQty: 55, isVegetarian: true, tags: ['healthy', 'refined'], discount: 6 },
  { id: 'groundnut-oil-1l', name: 'Groundnut Oil', slug: 'groundnut-oil-1l', categoryId: 'staples', unit: '1 L', price: 180, mrp: 195, image: productImages['groundnut-oil.jpg'], rating: 4.4, inStock: true, stockQty: 40, isVegetarian: true, tags: ['traditional', 'healthy'], discount: 8 },
  { id: 'sugar-1kg', name: 'Sugar', slug: 'sugar-1kg', categoryId: 'staples', unit: '1 kg', price: 42, mrp: 46, image: productImages['sugar.jpg'], rating: 4.1, inStock: true, stockQty: 70, isVegetarian: true, tags: ['essential', 'sweet'], discount: 9 },
  { id: 'tata-salt-1kg', name: 'Tata Salt', slug: 'tata-salt-1kg', categoryId: 'staples', brand: 'Tata', unit: '1 kg', price: 22, mrp: 25, image: productImages['tata-salt.jpg'], rating: 4.6, inStock: true, stockQty: 80, isVegetarian: true, tags: ['essential', 'iodized'], discount: 12 },

  // Snacks
  { id: 'lays-chips-52g', name: 'Lays Classic Salted', slug: 'lays-chips-52g', categoryId: 'snacks', brand: 'Lays', unit: '52 g', price: 20, mrp: 25, image: productImages['lays-chips.jpg'], rating: 4.2, inStock: true, stockQty: 100, isVegetarian: true, tags: ['crispy', 'under99'], discount: 20 },
  { id: 'kurkure-90g', name: 'Kurkure Masala Munch', slug: 'kurkure-90g', categoryId: 'snacks', brand: 'Kurkure', unit: '90 g', price: 25, mrp: 30, image: productImages['kurkure.jpg'], rating: 4.3, inStock: true, stockQty: 85, isVegetarian: true, tags: ['spicy', 'under99'], discount: 17 },
  { id: 'maggi-noodles-4pack', name: 'Maggi Masala Noodles', slug: 'maggi-noodles-4pack', categoryId: 'snacks', brand: 'Maggi', unit: '4 pack (280g)', price: 60, mrp: 68, image: productImages['maggi-noodles.jpg'], rating: 4.7, inStock: true, stockQty: 90, isVegetarian: true, tags: ['instant', 'bestseller'], discount: 12 },
  { id: 'marie-gold-200g', name: 'Marie Gold Biscuits', slug: 'marie-gold-200g', categoryId: 'snacks', brand: 'Britannia', unit: '200 g', price: 25, mrp: 30, image: productImages['marie-gold.jpg'], rating: 4.4, inStock: true, stockQty: 70, isVegetarian: true, tags: ['classic', 'under99'], discount: 17 },
  { id: 'parle-g-250g', name: 'Parle-G Gold', slug: 'parle-g-250g', categoryId: 'snacks', brand: 'Parle', unit: '250 g', price: 35, mrp: 40, image: productImages['parle-g.jpg'], rating: 4.6, inStock: true, stockQty: 95, isVegetarian: true, tags: ['classic', 'under99'], discount: 13 },
  { id: 'good-day-cashew-200g', name: 'Good Day Cashew Cookies', slug: 'good-day-cashew-200g', categoryId: 'snacks', brand: 'Britannia', unit: '200 g', price: 45, mrp: 52, image: productImages['good-day.jpg'], rating: 4.5, inStock: true, stockQty: 60, isVegetarian: true, tags: ['premium', 'under99'], discount: 13 },
  { id: 'haldirams-bhujia-200g', name: 'Haldiram\'s Bhujia', slug: 'haldirams-bhujia-200g', categoryId: 'snacks', brand: 'Haldiram\'s', unit: '200 g', price: 65, mrp: 72, image: productImages['haldirams-bhujia.jpg'], rating: 4.6, inStock: true, stockQty: 50, isVegetarian: true, tags: ['spicy', 'traditional'], discount: 10 },

  // Beverages
  { id: 'thums-up-750ml', name: 'Thums Up', slug: 'thums-up-750ml', categoryId: 'beverages', brand: 'Thums Up', unit: '750 ml', price: 40, mrp: 45, image: productImages['thums-up.jpg'], rating: 4.3, inStock: true, stockQty: 60, isVegetarian: true, tags: ['cola', 'refreshing'], discount: 11 },
  { id: 'coca-cola-750ml', name: 'Coca Cola', slug: 'coca-cola-750ml', categoryId: 'beverages', brand: 'Coca Cola', unit: '750 ml', price: 42, mrp: 48, image: productImages['coca-cola.jpg'], rating: 4.4, inStock: true, stockQty: 55, isVegetarian: true, tags: ['cola', 'classic'], discount: 13 },
  { id: 'frooti-1l', name: 'Frooti Mango Drink', slug: 'frooti-1l', categoryId: 'beverages', brand: 'Frooti', unit: '1 L', price: 55, mrp: 65, image: productImages['frooti.jpg'], rating: 4.5, inStock: true, stockQty: 40, isVegetarian: true, tags: ['mango', 'fruit'], discount: 15 },
  { id: 'tropicana-orange-1l', name: 'Tropicana Orange Juice', slug: 'tropicana-orange-1l', categoryId: 'beverages', brand: 'Tropicana', unit: '1 L', price: 180, mrp: 200, image: productImages['tropicana-orange.jpg'], rating: 4.6, inStock: true, stockQty: 30, isVegetarian: true, tags: ['premium', 'vitamin-c'], discount: 10 },
  { id: 'nescafe-classic-50g', name: 'Nescafé Classic', slug: 'nescafe-classic-50g', categoryId: 'beverages', brand: 'Nescafé', unit: '50 g', price: 285, mrp: 315, image: productImages['nescafe-classic.jpg'], rating: 4.5, inStock: true, stockQty: 45, isVegetarian: true, tags: ['coffee', 'instant'], discount: 10 },
  { id: 'red-label-tea-250g', name: 'Red Label Tea', slug: 'red-label-tea-250g', categoryId: 'beverages', brand: 'Red Label', unit: '250 g', price: 135, mrp: 150, image: productImages['red-label-tea.jpg'], rating: 4.4, inStock: true, stockQty: 50, isVegetarian: true, tags: ['tea', 'traditional'], discount: 10 },

  // Breakfast & Spreads
  { id: 'britannia-bread-400g', name: 'Britannia Bread', slug: 'britannia-bread-400g', categoryId: 'breakfast', brand: 'Britannia', unit: '400 g', price: 35, mrp: 40, image: productImages['britannia-bread.jpg'], rating: 4.2, inStock: true, stockQty: 60, isVegetarian: true, tags: ['fresh', 'daily'], discount: 13 },
  { id: 'peanut-butter-340g', name: 'Peanut Butter', slug: 'peanut-butter-340g', categoryId: 'breakfast', unit: '340 g', price: 185, mrp: 210, image: productImages['peanut-butter.jpg'], rating: 4.3, inStock: true, stockQty: 35, isVegetarian: true, tags: ['protein', 'creamy'], discount: 12 },
  { id: 'kissan-jam-500g', name: 'Kissan Mixed Fruit Jam', slug: 'kissan-jam-500g', categoryId: 'breakfast', brand: 'Kissan', unit: '500 g', price: 155, mrp: 175, image: productImages['kissan-jam.jpg'], rating: 4.4, inStock: true, stockQty: 40, isVegetarian: true, tags: ['sweet', 'fruity'], discount: 11 },
  { id: 'corn-flakes-475g', name: 'Corn Flakes', slug: 'corn-flakes-475g', categoryId: 'breakfast', unit: '475 g', price: 165, mrp: 185, image: productImages['corn-flakes.jpg'], rating: 4.3, inStock: true, stockQty: 45, isVegetarian: true, tags: ['healthy', 'crunchy'], discount: 11 },

  // Personal Care
  { id: 'colgate-toothpaste-200g', name: 'Colgate Toothpaste', slug: 'colgate-toothpaste-200g', categoryId: 'personal-care', brand: 'Colgate', unit: '200 g', price: 115, mrp: 125, image: productImages['colgate-toothpaste.jpg'], rating: 4.5, inStock: true, stockQty: 70, tags: ['dental', 'fresh'], discount: 8 },
  { id: 'dove-soap-3pack', name: 'Dove Soap', slug: 'dove-soap-3pack', categoryId: 'personal-care', brand: 'Dove', unit: '100 g (pack of 3)', price: 195, mrp: 220, image: productImages['dove-soap.jpg'], rating: 4.6, inStock: true, stockQty: 50, tags: ['moisturizing', 'gentle'], discount: 11 },

  // Household
  { id: 'surf-excel-2kg', name: 'Surf Excel Matic', slug: 'surf-excel-2kg', categoryId: 'household', brand: 'Surf Excel', unit: '2 kg', price: 385, mrp: 425, image: productImages['surf-excel.jpg'], rating: 4.4, inStock: true, stockQty: 40, tags: ['detergent', 'washing'], discount: 9 },
  { id: 'vim-dishwash-500ml', name: 'Vim Dishwash Liquid', slug: 'vim-dishwash-500ml', categoryId: 'household', brand: 'Vim', unit: '500 ml', price: 85, mrp: 95, image: productImages['vim-dishwash.jpg'], rating: 4.3, inStock: true, stockQty: 55, tags: ['cleaning', 'kitchen'], discount: 11 },
  { id: 'harpic-1l', name: 'Harpic', slug: 'harpic-1l', categoryId: 'household', brand: 'Harpic', unit: '1 L', price: 165, mrp: 185, image: productImages['harpic.jpg'], rating: 4.2, inStock: true, stockQty: 35, tags: ['disinfectant', 'bathroom'], discount: 11 },
  { id: 'lizol-1l', name: 'Lizol Floor Cleaner', slug: 'lizol-1l', categoryId: 'household', brand: 'Lizol', unit: '1 L', price: 145, mrp: 165, image: productImages['lizol.jpg'], rating: 4.3, inStock: true, stockQty: 45, tags: ['floor', 'disinfectant'], discount: 12 },
  { id: 'whisper-pads', name: 'Sanitary Pads (Whisper)', slug: 'whisper-pads', categoryId: 'personal-care', brand: 'Whisper', unit: 'pack', price: 285, mrp: 315, image: productImages['whisper-pads.jpg'], rating: 4.5, inStock: true, stockQty: 30, tags: ['feminine', 'hygiene'], discount: 10 },

  // Baby Care
  { id: 'pampers-diapers-medium', name: 'Pampers Diapers', slug: 'pampers-diapers-medium', categoryId: 'baby-care', brand: 'Pampers', unit: 'Medium (20 pcs)', price: 485, mrp: 535, image: productImages['pampers-diapers.jpg'], rating: 4.6, inStock: true, stockQty: 25, tags: ['baby', 'comfort'], discount: 9 },
  { id: 'baby-wipes-72pcs', name: 'Baby Wipes', slug: 'baby-wipes-72pcs', categoryId: 'baby-care', unit: '72 pcs', price: 155, mrp: 175, image: productImages['baby-wipes.jpg'], rating: 4.4, inStock: true, stockQty: 40, tags: ['baby', 'gentle'], discount: 11 },

  // Bakery
  { id: 'brown-bread-400g', name: 'Brown Bread', slug: 'brown-bread-400g', categoryId: 'bakery', unit: '400 g', price: 42, mrp: 48, image: productImages['brown-bread.jpg'], rating: 4.3, inStock: true, stockQty: 35, isVegetarian: true, tags: ['healthy', 'wholegrain'], discount: 13 },

  // Additional Fruits & Vegetables
  { id: 'mangoes-1kg', name: 'Fresh Mangoes', slug: 'mangoes-1kg', categoryId: 'fruits-veg', unit: '1 kg', price: 120, mrp: 140, image: productImages['mangoes.jpg'], rating: 4.6, inStock: true, stockQty: 30, isVegetarian: true, tags: ['fresh', 'sweet', 'seasonal'], discount: 14 },
  { id: 'grapes-500g', name: 'Fresh Grapes', slug: 'grapes-500g', categoryId: 'fruits-veg', unit: '500 g', price: 85, mrp: 95, image: productImages['grapes.jpg'], rating: 4.4, inStock: true, stockQty: 40, isVegetarian: true, tags: ['fresh', 'sweet'], discount: 11 },
  { id: 'cauliflower-1pc', name: 'Fresh Cauliflower', slug: 'cauliflower-1pc', categoryId: 'fruits-veg', unit: '1 pc', price: 32, mrp: 40, image: productImages['cauliflower.jpg'], rating: 4.2, inStock: true, stockQty: 25, isVegetarian: true, tags: ['fresh', 'under99'], discount: 20 },
  { id: 'bell-peppers-3pcs', name: 'Bell Peppers (Capsicum)', slug: 'bell-peppers-3pcs', categoryId: 'fruits-veg', unit: '3 pcs', price: 48, mrp: 55, image: productImages['bell-peppers.jpg'], rating: 4.3, inStock: true, stockQty: 35, isVegetarian: true, tags: ['fresh', 'colorful', 'under99'], discount: 13 },
  { id: 'ginger-200g', name: 'Fresh Ginger', slug: 'ginger-200g', categoryId: 'fruits-veg', unit: '200 g', price: 24, mrp: 30, image: productImages['ginger.jpg'], rating: 4.1, inStock: true, stockQty: 45, isVegetarian: true, tags: ['fresh', 'spice', 'under99'], discount: 20 },
  { id: 'garlic-250g', name: 'Fresh Garlic', slug: 'garlic-250g', categoryId: 'fruits-veg', unit: '250 g', price: 35, mrp: 42, image: productImages['garlic.jpg'], rating: 4.2, inStock: true, stockQty: 50, isVegetarian: true, tags: ['fresh', 'essential', 'under99'], discount: 17 },

  // Additional Dairy Products
  { id: 'cheese-slices-200g', name: 'Amul Cheese Slices', slug: 'cheese-slices-200g', categoryId: 'dairy-eggs', brand: 'Amul', unit: '200 g', price: 140, mrp: 155, image: productImages['cheese-slices.jpg'], rating: 4.5, inStock: true, stockQty: 30, isVegetarian: true, tags: ['creamy', 'premium'], discount: 10 },

  // Additional Staples
  { id: 'basmati-rice-5kg', name: 'Basmati Rice', slug: 'basmati-rice-5kg', categoryId: 'staples', unit: '5 kg', price: 485, mrp: 525, image: productImages['basmati-rice.jpg'], rating: 4.7, inStock: true, stockQty: 25, isVegetarian: true, tags: ['premium', 'aromatic', 'bestseller'], discount: 8 },
  { id: 'coconut-oil-500ml', name: 'Coconut Oil', slug: 'coconut-oil-500ml', categoryId: 'staples', unit: '500 ml', price: 185, mrp: 210, image: productImages['coconut-oil.jpg'], rating: 4.4, inStock: true, stockQty: 35, isVegetarian: true, tags: ['healthy', 'traditional'], discount: 12 },
  { id: 'baking-powder-100g', name: 'Baking Powder', slug: 'baking-powder-100g', categoryId: 'staples', unit: '100 g', price: 45, mrp: 52, image: productImages['baking-powder.jpg'], rating: 4.2, inStock: true, stockQty: 40, isVegetarian: true, tags: ['baking', 'under99'], discount: 13 },
  { id: 'turmeric-powder-100g', name: 'Turmeric Powder', slug: 'turmeric-powder-100g', categoryId: 'staples', unit: '100 g', price: 35, mrp: 42, image: productImages['turmeric.jpg'], rating: 4.3, inStock: true, stockQty: 60, isVegetarian: true, tags: ['spice', 'healthy', 'under99'], discount: 17 },
  { id: 'cumin-powder-100g', name: 'Cumin Powder', slug: 'cumin-powder-100g', categoryId: 'staples', unit: '100 g', price: 38, mrp: 45, image: productImages['cumin-powder.jpg'], rating: 4.2, inStock: true, stockQty: 55, isVegetarian: true, tags: ['spice', 'aromatic', 'under99'], discount: 16 },
  { id: 'coriander-powder-100g', name: 'Coriander Powder', slug: 'coriander-powder-100g', categoryId: 'staples', unit: '100 g', price: 32, mrp: 38, image: productImages['coriander-powder.jpg'], rating: 4.1, inStock: true, stockQty: 50, isVegetarian: true, tags: ['spice', 'fresh', 'under99'], discount: 16 },
  { id: 'almonds-250g', name: 'Almonds', slug: 'almonds-250g', categoryId: 'staples', unit: '250 g', price: 285, mrp: 315, image: productImages['almonds.jpg'], rating: 4.6, inStock: true, stockQty: 20, isVegetarian: true, tags: ['premium', 'healthy', 'nuts'], discount: 10 },
  { id: 'cashews-250g', name: 'Cashew Nuts', slug: 'cashews-250g', categoryId: 'staples', unit: '250 g', price: 420, mrp: 465, image: productImages['cashews.jpg'], rating: 4.7, inStock: true, stockQty: 15, isVegetarian: true, tags: ['premium', 'luxury', 'nuts'], discount: 10 },
  { id: 'honey-500g', name: 'Pure Honey', slug: 'honey-500g', categoryId: 'breakfast', unit: '500 g', price: 285, mrp: 325, image: productImages['honey.jpg'], rating: 4.5, inStock: true, stockQty: 25, isVegetarian: true, tags: ['natural', 'healthy', 'sweet'], discount: 12 },

  // Meat & Seafood
  { id: 'chicken-1kg', name: 'Fresh Chicken', slug: 'chicken-1kg', categoryId: 'meat-seafood', unit: '1 kg', price: 285, mrp: 315, image: productImages['chicken.jpg'], rating: 4.4, inStock: true, stockQty: 20, tags: ['fresh', 'protein'], discount: 10 },
  { id: 'prawns-500g', name: 'Fresh Prawns', slug: 'prawns-500g', categoryId: 'meat-seafood', unit: '500 g', price: 485, mrp: 535, image: productImages['prawns.jpg'], rating: 4.3, inStock: true, stockQty: 15, tags: ['fresh', 'seafood', 'premium'], discount: 9 },

  // Frozen & Ready-to-Cook
  { id: 'frozen-peas-1kg', name: 'Frozen Green Peas', slug: 'frozen-peas-1kg', categoryId: 'frozen', unit: '1 kg', price: 85, mrp: 95, image: productImages['frozen-peas.jpg'], rating: 4.2, inStock: true, stockQty: 40, isVegetarian: true, tags: ['frozen', 'vegetable', 'under99'], discount: 11 },
  { id: 'ready-samosas-12pcs', name: 'Ready Samosas', slug: 'ready-samosas-12pcs', categoryId: 'frozen', unit: '12 pcs', price: 120, mrp: 135, image: productImages['samosas.jpg'], rating: 4.4, inStock: true, stockQty: 30, isVegetarian: true, tags: ['ready-to-cook', 'snack'], discount: 11 },
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