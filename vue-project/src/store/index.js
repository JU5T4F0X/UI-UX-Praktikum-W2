import { reactive, computed } from 'vue'

const state = reactive({
  cart: [],
  wishlist: [],
  notification: null,
})

export const products = [
  {
    id: 1,
    name: 'Kemeja Linen Premium',
    price: 349000,
    originalPrice: 499000,
    category: 'Pakaian',
    rating: 4.8,
    reviews: 234,
    sold: 1820,
    badge: 'Terlaris',
    description: 'Kemeja linen premium dengan bahan breathable yang nyaman dipakai sepanjang hari. Tersedia dalam berbagai pilihan warna.',
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80', 'https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=600&q=80'],
    colors: ['Putih', 'Biru Muda', 'Cream', 'Sage'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 45,
    tags: ['premium', 'linen', 'casual'],
  },
  {
    id: 2,
    name: 'Sneakers Urban Street',
    price: 599000,
    originalPrice: 799000,
    category: 'Sepatu',
    rating: 4.9,
    reviews: 512,
    sold: 3200,
    badge: 'Hot',
    description: 'Sneakers dengan desain urban modern, sol EVA yang ringan dan nyaman untuk aktivitas harian maupun gaya kasual.',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80'],
    colors: ['Putih/Hitam', 'All Black', 'Navy'],
    sizes: ['39', '40', '41', '42', '43', '44'],
    stock: 28,
    tags: ['sneakers', 'urban', 'casual'],
  },
  {
    id: 3,
    name: 'Tas Kulit Wanita Elegance',
    price: 899000,
    originalPrice: 1200000,
    category: 'Tas',
    rating: 4.7,
    reviews: 189,
    sold: 940,
    badge: 'Diskon 25%',
    description: 'Tas kulit sintetis berkualitas tinggi dengan jahitan rapi dan ruang yang luas. Cocok untuk kerja maupun acara formal.',
    images: ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80'],
    colors: ['Hitam', 'Coklat', 'Nude'],
    sizes: ['One Size'],
    stock: 15,
    tags: ['tas', 'kulit', 'formal'],
  },
  {
    id: 4,
    name: 'Jam Tangan Analog Classic',
    price: 1250000,
    originalPrice: 1500000,
    category: 'Aksesori',
    rating: 4.6,
    reviews: 78,
    sold: 425,
    badge: 'New',
    description: 'Jam tangan analog dengan desain klasik dan elegan. Tali kulit asli, kaca mineral anti-gores, dan water resistant 30m.',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80', 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=600&q=80'],
    colors: ['Silver/Hitam', 'Gold/Coklat', 'Rosegold'],
    sizes: ['One Size'],
    stock: 20,
    tags: ['jam', 'analog', 'klasik'],
  },
  {
    id: 5,
    name: 'Celana Chino Slim Fit',
    price: 279000,
    originalPrice: 379000,
    category: 'Pakaian',
    rating: 4.5,
    reviews: 367,
    sold: 2100,
    badge: 'Terlaris',
    description: 'Celana chino slim fit dengan bahan stretch yang nyaman. Cocok untuk tampilan casual maupun smart casual.',
    images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80', 'https://images.unsplash.com/photo-1594938298603-c8148c4b5f05?w=600&q=80'],
    colors: ['Khaki', 'Navy', 'Olive', 'Abu-abu'],
    sizes: ['28', '30', '32', '34', '36'],
    stock: 60,
    tags: ['chino', 'slim', 'casual'],
  },
  {
    id: 6,
    name: 'Kacamata Sunglasses Retro',
    price: 199000,
    originalPrice: 299000,
    category: 'Aksesori',
    rating: 4.4,
    reviews: 145,
    sold: 780,
    badge: 'Flash Sale',
    description: 'Kacamata hitam dengan frame retro vintage, lensa UV400 yang melindungi mata dari sinar ultraviolet.',
    images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80', 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80'],
    colors: ['Hitam', 'Tortoise', 'Transparan'],
    sizes: ['One Size'],
    stock: 35,
    tags: ['kacamata', 'retro', 'sunglasses'],
  },
  {
    id: 7,
    name: 'Sepatu Boots Pria Leather',
    price: 1150000,
    originalPrice: 1500000,
    category: 'Sepatu',
    rating: 4.8,
    reviews: 93,
    sold: 520,
    badge: 'Premium',
    description: 'Sepatu boots kulit asli dengan konstruksi Goodyear welt yang tahan lama. Cocok untuk formal dan semi-formal.',
    images: ['https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=80', 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=80'],
    colors: ['Coklat Tua', 'Hitam'],
    sizes: ['40', '41', '42', '43', '44', '45'],
    stock: 12,
    tags: ['boots', 'leather', 'formal'],
  },
  {
    id: 8,
    name: 'Hoodie Oversized Premium',
    price: 429000,
    originalPrice: 549000,
    category: 'Pakaian',
    rating: 4.7,
    reviews: 421,
    sold: 3890,
    badge: 'Viral',
    description: 'Hoodie oversized dengan bahan fleece premium yang hangat dan lembut. Desain minimalis yang cocok dipakai sehari-hari.',
    images: ['https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80', 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&q=80'],
    colors: ['Hitam', 'Abu-abu', 'Cream', 'Dusty Rose', 'Forest Green'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 80,
    tags: ['hoodie', 'oversized', 'casual'],
  },
]

export const categories = ['Semua', 'Pakaian', 'Sepatu', 'Tas', 'Aksesori']

export const useStore = () => {
  const cartCount = computed(() => state.cart.reduce((sum, i) => sum + i.qty, 0))
  const cartTotal = computed(() => state.cart.reduce((sum, i) => sum + i.price * i.qty, 0))

  const addToCart = (product, qty = 1, color = null, size = null) => {
    const key = `${product.id}-${color}-${size}`
    const existing = state.cart.find(i => i.key === key)
    if (existing) {
      existing.qty += qty
    } else {
      state.cart.push({ ...product, qty, color, size, key })
    }
    showNotification(`${product.name} ditambahkan ke keranjang!`)
  }

  const removeFromCart = (key) => {
    const idx = state.cart.findIndex(i => i.key === key)
    if (idx > -1) state.cart.splice(idx, 1)
  }

  const updateQty = (key, qty) => {
    const item = state.cart.find(i => i.key === key)
    if (item) {
      if (qty <= 0) removeFromCart(key)
      else item.qty = qty
    }
  }

  const toggleWishlist = (id) => {
    const idx = state.wishlist.indexOf(id)
    if (idx > -1) state.wishlist.splice(idx, 1)
    else state.wishlist.push(id)
  }

  const isWishlisted = (id) => state.wishlist.includes(id)

  const showNotification = (msg) => {
    state.notification = msg
    setTimeout(() => { state.notification = null }, 3000)
  }

  return {
    cart: state.cart,
    wishlist: state.wishlist,
    notification: state.notification,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQty,
    toggleWishlist,
    isWishlisted,
  }
}

export { state }
