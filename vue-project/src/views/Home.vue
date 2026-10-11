<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { products, categories, useStore } from '../store/index.js'

const { addToCart, toggleWishlist, isWishlisted } = useStore()

const formatPrice = (p) => 'Rp ' + p.toLocaleString('id-ID')
const discount = (orig, price) => Math.round((1 - price / orig) * 100)
const stars = (r) => '★'.repeat(Math.floor(r)) + (r % 1 >= 0.5 ? '½' : '')

const heroSlides = [
  {
    tag: 'Koleksi Baru 2026',
    title: 'Fashion yang\nBerbicara Sendiri',
    sub: 'Temukan koleksi eksklusif kami — dari kasual premium hingga formal elegan.',
    cta: 'Jelajahi Koleksi',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    accent: '#7c3aed',
  },
  {
    tag: 'Flash Sale Hari Ini',
    title: 'Diskon hingga\n40% Off',
    sub: 'Dapatkan item pilihan dengan harga terbaik. Stok terbatas, jangan sampai ketinggalan!',
    cta: 'Lihat Penawaran',
    img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
    accent: '#f59e0b',
  },
]
const activeSlide = ref(0)
const nextSlide = () => { activeSlide.value = (activeSlide.value + 1) % heroSlides.length }
const prevSlide = () => { activeSlide.value = (activeSlide.value - 1 + heroSlides.length) % heroSlides.length }

const featuredCat = ref('Semua')
const filteredFeatured = computed(() => {
  const list = featuredCat.value === 'Semua' ? products : products.filter(p => p.category === featuredCat.value)
  return list.slice(0, 4)
})

const perks = [
  { icon: '🚚', title: 'Gratis Ongkir', desc: 'Untuk pembelian di atas Rp 200.000' },
  { icon: '↩️', title: 'Retur 30 Hari', desc: 'Tidak puas? Kembalikan dengan mudah' },
  { icon: '🔒', title: 'Pembayaran Aman', desc: 'Enkripsi SSL 256-bit' },
  { icon: '🎁', title: 'Kemasan Premium', desc: 'Setiap pesanan dikemas indah' },
]

const handleAddToCart = (product) => {
  addToCart(product, 1, product.colors[0], product.sizes[0])
}
</script>

<template>
  <!-- Hero Slider -->
  <section class="hero">
    <div class="hero-slide" :style="{ '--accent': heroSlides[activeSlide].accent }">
      <div class="container hero-inner">
        <div class="hero-content">
          <span class="hero-tag badge badge-purple">{{ heroSlides[activeSlide].tag }}</span>
          <h1 class="hero-title serif">{{ heroSlides[activeSlide].title }}</h1>
          <p class="hero-sub">{{ heroSlides[activeSlide].sub }}</p>
          <div class="hero-actions">
            <RouterLink to="/products" class="btn btn-primary">
              {{ heroSlides[activeSlide].cta }}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </RouterLink>
            <RouterLink to="/products" class="btn btn-outline">Lihat Semua</RouterLink>
          </div>
          <!-- Slide indicators -->
          <div class="slide-dots">
            <button
              v-for="(_, i) in heroSlides"
              :key="i"
              class="dot"
              :class="{ active: i === activeSlide }"
              @click="activeSlide = i"
            />
          </div>
        </div>
        <div class="hero-image-wrap">
          <div class="hero-img-glow"></div>
          <img :src="heroSlides[activeSlide].img" :alt="heroSlides[activeSlide].title" class="hero-img" />
        </div>
      </div>
      <!-- Slide controls -->
      <button class="slide-btn slide-prev" @click="prevSlide">‹</button>
      <button class="slide-btn slide-next" @click="nextSlide">›</button>
    </div>
  </section>

  <!-- Perks Bar -->
  <section class="perks-bar">
    <div class="container perks-grid">
      <div v-for="perk in perks" :key="perk.title" class="perk">
        <span class="perk-icon">{{ perk.icon }}</span>
        <div>
          <p class="perk-title">{{ perk.title }}</p>
          <p class="perk-desc">{{ perk.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Featured Products -->
  <section class="section">
    <div class="container">
      <div class="section-header">
        <div>
          <p class="section-label">Pilihan Kami</p>
          <h2 class="section-title serif">Produk Unggulan</h2>
        </div>
        <div class="category-tabs">
          <button
            v-for="cat in categories"
            :key="cat"
            class="cat-tab"
            :class="{ active: cat === featuredCat }"
            @click="featuredCat = cat"
          >{{ cat }}</button>
        </div>
      </div>

      <div class="products-grid">
        <RouterLink
          v-for="product in filteredFeatured"
          :key="product.id"
          :to="`/products/${product.id}`"
          class="product-card card"
        >
          <div class="product-img-wrap">
            <img :src="product.images[0]" :alt="product.name" class="product-img" loading="lazy" />
            <div class="product-overlay">
              <button
                class="wishlist-btn"
                :class="{ active: isWishlisted(product.id) }"
                @click.prevent="toggleWishlist(product.id)"
              >{{ isWishlisted(product.id) ? '♥' : '♡' }}</button>
              <button class="quick-add btn btn-primary" @click.prevent="handleAddToCart(product)">
                + Keranjang
              </button>
            </div>
            <span class="product-badge badge" :class="product.badge === 'Flash Sale' ? 'badge-red' : 'badge-purple'">
              {{ product.badge }}
            </span>
          </div>
          <div class="product-info">
            <p class="product-category">{{ product.category }}</p>
            <h3 class="product-name">{{ product.name }}</h3>
            <div class="product-rating">
              <span class="stars">{{ stars(product.rating) }}</span>
              <span class="rating-text">{{ product.rating }} ({{ product.reviews }})</span>
            </div>
            <div class="product-pricing">
              <span class="price">{{ formatPrice(product.price) }}</span>
              <span class="price-orig">{{ formatPrice(product.originalPrice) }}</span>
              <span class="discount-tag">-{{ discount(product.originalPrice, product.price) }}%</span>
            </div>
          </div>
        </RouterLink>
      </div>

      <div class="section-cta">
        <RouterLink to="/products" class="btn btn-outline">
          Lihat Semua Produk
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- Banner CTA -->
  <section class="promo-banner">
    <div class="container promo-inner">
      <div class="promo-content">
        <span class="badge badge-gold" style="margin-bottom: 16px;">Limited Time Offer</span>
        <h2 class="promo-title serif">Belanja Lebih Hemat<br>dengan Member Card</h2>
        <p class="promo-sub">Daftar gratis dan dapatkan diskon 10% untuk pembelian pertama. Akumulasi poin untuk reward eksklusif.</p>
        <button class="btn btn-primary" style="margin-top: 8px;">Daftar Sekarang</button>
      </div>
      <div class="promo-visual">
        <div class="promo-card">
          <div class="promo-card-top">
            <span class="serif" style="font-size: 22px; letter-spacing: 2px;">STYLO</span>
            <span style="font-size: 28px;">◆</span>
          </div>
          <div class="promo-card-num">•••• •••• •••• 8421</div>
          <div class="promo-card-bottom">
            <div>
              <p style="font-size: 10px; opacity: 0.6; text-transform: uppercase; letter-spacing: 1px;">Member Name</p>
              <p style="font-weight: 600;">Nama Kamu</p>
            </div>
            <div style="text-align: right;">
              <p style="font-size: 10px; opacity: 0.6; text-transform: uppercase; letter-spacing: 1px;">Points</p>
              <p style="font-weight: 700; color: var(--gold);">2,450 pts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Top Sellers Strip -->
  <section class="section-sm">
    <div class="container">
      <div class="section-header" style="margin-bottom: 32px;">
        <div>
          <p class="section-label">Paling Diminati</p>
          <h2 class="section-title serif">Terlaris Minggu Ini</h2>
        </div>
        <RouterLink to="/products" class="btn btn-ghost">Lihat semua →</RouterLink>
      </div>
      <div class="sellers-list">
        <RouterLink
          v-for="(product, idx) in products.slice(0,5)"
          :key="product.id"
          :to="`/products/${product.id}`"
          class="seller-item"
        >
          <span class="seller-rank">{{ String(idx + 1).padStart(2, '0') }}</span>
          <img :src="product.images[0]" :alt="product.name" class="seller-img" />
          <div class="seller-info">
            <p class="seller-name">{{ product.name }}</p>
            <p class="seller-price">{{ formatPrice(product.price) }}</p>
          </div>
          <div class="seller-sold">
            <p class="seller-sold-num">{{ product.sold.toLocaleString('id-ID') }}</p>
            <p class="seller-sold-label">terjual</p>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Hero */
.hero { overflow: hidden; }
.hero-slide {
  position: relative;
  background: radial-gradient(ellipse at 70% 50%, rgba(124,58,237,0.12) 0%, transparent 60%), var(--bg-1);
  border-bottom: 1px solid var(--border);
}
.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  min-height: 560px;
  padding: 80px 24px;
}
.hero-content { display: flex; flex-direction: column; gap: 20px; }
.hero-tag { width: fit-content; }
.hero-title {
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  line-height: 1.15;
  white-space: pre-line;
  background: linear-gradient(135deg, #fff 40%, var(--accent-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-sub { color: var(--text-2); font-size: 16px; max-width: 420px; line-height: 1.7; }
.hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
.slide-dots { display: flex; gap: 8px; }
.dot {
  width: 8px;
  height: 8px;
  border-radius: 100px;
  background: var(--bg-3);
  border: 1px solid var(--border);
  transition: all var(--transition);
}
.dot.active { width: 24px; background: var(--accent-2); border-color: var(--accent); }

.hero-image-wrap { position: relative; display: flex; align-items: center; justify-content: center; }
.hero-img-glow {
  position: absolute;
  width: 80%;
  height: 80%;
  background: radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(40px);
}
.hero-img {
  width: 100%;
  max-height: 440px;
  object-fit: cover;
  border-radius: var(--radius-xl);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-lg);
  position: relative;
  z-index: 1;
}

.slide-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text-1);
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  transition: all var(--transition-fast);
  z-index: 2;
}
.slide-btn:hover { background: var(--accent); border-color: var(--accent); }
.slide-prev { left: 16px; }
.slide-next { right: 16px; }

/* Perks */
.perks-bar {
  background: var(--bg-1);
  border-bottom: 1px solid var(--border);
  padding: 24px 0;
}
.perks-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.perk {
  display: flex;
  align-items: center;
  gap: 12px;
}
.perk-icon { font-size: 28px; }
.perk-title { font-weight: 600; font-size: 14px; }
.perk-desc { color: var(--text-3); font-size: 12px; }

/* Section header */
.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
}
.section-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--accent-2);
  margin-bottom: 8px;
}
.section-title { font-size: clamp(1.6rem, 2.5vw, 2.2rem); }

/* Category tabs */
.category-tabs { display: flex; gap: 8px; flex-wrap: wrap; }
.cat-tab {
  padding: 8px 18px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-2);
  background: var(--surface);
  border: 1px solid var(--border);
  transition: all var(--transition-fast);
}
.cat-tab:hover, .cat-tab.active {
  color: var(--text-1);
  background: rgba(124,58,237,0.15);
  border-color: var(--accent);
  color: var(--accent-2);
}

/* Products grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.product-card { cursor: pointer; }
.product-img-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 3/4;
}
.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.product-card:hover .product-img { transform: scale(1.06); }
.product-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 16px;
  opacity: 0;
  transition: opacity var(--transition);
}
.product-card:hover .product-overlay { opacity: 1; }
.wishlist-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text-2);
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  transition: all var(--transition-fast);
  flex-shrink: 0;
}
.wishlist-btn:hover, .wishlist-btn.active { color: var(--red); border-color: var(--red); }
.quick-add { font-size: 12px; padding: 8px 14px; }
.product-badge {
  position: absolute;
  top: 12px;
  left: 12px;
}
.product-info { padding: 16px; }
.product-category { font-size: 11px; color: var(--text-3); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
.product-name { font-size: 15px; font-weight: 600; margin-bottom: 8px; line-height: 1.4; }
.product-rating { display: flex; align-items: center; gap: 6px; margin-bottom: 10px; }
.stars { font-size: 12px; }
.rating-text { font-size: 12px; color: var(--text-3); }
.product-pricing { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.price { font-weight: 700; font-size: 15px; color: var(--text-1); }
.price-orig { font-size: 12px; color: var(--text-3); text-decoration: line-through; }

.section-cta { display: flex; justify-content: center; margin-top: 48px; }

/* Promo Banner */
.promo-banner {
  background: linear-gradient(135deg, var(--bg-2) 0%, rgba(124,58,237,0.08) 100%);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 80px 0;
}
.promo-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}
.promo-title { font-size: clamp(1.8rem, 2.5vw, 2.5rem); margin-bottom: 16px; }
.promo-sub { color: var(--text-2); font-size: 15px; line-height: 1.7; }
.promo-visual { display: flex; justify-content: center; }
.promo-card {
  width: 320px;
  padding: 28px;
  background: linear-gradient(135deg, var(--accent) 0%, #5b21b6 50%, #1e1b4b 100%);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(124,58,237,0.4);
  color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.promo-card-top { display: flex; justify-content: space-between; align-items: center; }
.promo-card-num { font-size: 18px; letter-spacing: 3px; font-weight: 300; }
.promo-card-bottom { display: flex; justify-content: space-between; }

/* Top sellers */
.sellers-list { display: flex; flex-direction: column; gap: 2px; }
.seller-item {
  display: grid;
  grid-template-columns: 40px 72px 1fr auto;
  gap: 16px;
  align-items: center;
  padding: 16px;
  border-radius: var(--radius);
  transition: all var(--transition-fast);
}
.seller-item:hover { background: var(--surface); }
.seller-rank { font-size: 20px; font-weight: 800; color: var(--bg-3); font-family: 'Playfair Display', serif; }
.seller-img { width: 72px; height: 72px; object-fit: cover; border-radius: var(--radius-sm); }
.seller-name { font-weight: 600; font-size: 15px; margin-bottom: 4px; }
.seller-price { color: var(--accent-2); font-weight: 600; font-size: 14px; }
.seller-sold { text-align: right; }
.seller-sold-num { font-size: 18px; font-weight: 700; }
.seller-sold-label { font-size: 11px; color: var(--text-3); }

@media (max-width: 768px) {
  .hero-inner { grid-template-columns: 1fr; min-height: auto; padding: 48px 16px; }
  .hero-image-wrap { display: none; }
  .products-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .perks-grid { grid-template-columns: repeat(2, 1fr); }
  .promo-inner { grid-template-columns: 1fr; }
  .promo-visual { display: none; }
  .seller-item { grid-template-columns: 28px 56px 1fr auto; gap: 10px; }
}
</style>
