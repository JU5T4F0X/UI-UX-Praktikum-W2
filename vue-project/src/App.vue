<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useStore, state } from './store/index.js'

const { cartCount } = useStore()
const route = useRoute()

const navLinks = [
  { to: '/', label: 'Beranda' },
  { to: '/products', label: 'Produk' },
]
</script>

<template>
  <!-- Notification Toast -->
  <Transition name="toast">
    <div v-if="state.notification" class="toast">
      <span class="toast-icon">✓</span>
      {{ state.notification }}
    </div>
  </Transition>

  <!-- Navbar -->
  <header class="navbar glass">
    <div class="container navbar-inner">
      <!-- Logo -->
      <RouterLink to="/" class="logo">
        <span class="logo-icon">◆</span>
        <span class="logo-text serif">STYLO</span>
      </RouterLink>

      <!-- Nav Links -->
      <nav class="nav-links hide-mobile">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          :class="{ active: route.path === link.to }"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <!-- Actions -->
      <div class="nav-actions">
        <RouterLink to="/cart" class="cart-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </RouterLink>
      </div>
    </div>
  </header>

  <!-- Page Content -->
  <main class="main-content">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="logo" style="margin-bottom: 12px;">
            <span class="logo-icon">◆</span>
            <span class="logo-text serif">STYLO</span>
          </div>
          <p class="footer-desc">Toko fashion premium dengan koleksi terkurasi untuk gaya hidup modern.</p>
        </div>
        <div class="footer-col">
          <h4>Navigasi</h4>
          <RouterLink to="/">Beranda</RouterLink>
          <RouterLink to="/products">Semua Produk</RouterLink>
          <RouterLink to="/cart">Keranjang</RouterLink>
        </div>
        <div class="footer-col">
          <h4>Bantuan</h4>
          <a href="#">FAQ</a>
          <a href="#">Pengiriman</a>
          <a href="#">Pengembalian</a>
          <a href="#">Kontak</a>
        </div>
        <div class="footer-col">
          <h4>Ikuti Kami</h4>
          <a href="#">Instagram</a>
          <a href="#">TikTok</a>
          <a href="#">Twitter/X</a>
        </div>
      </div>
      <div class="divider" style="margin: 40px 0 24px;"></div>
      <p class="footer-copy">© 2026 Stylo. Semua hak dilindungi.</p>
    </div>
  </footer>
</template>

<style scoped>
/* Navbar */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--border);
}
.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}
.logo-icon {
  color: var(--accent-2);
  font-size: 18px;
  filter: drop-shadow(0 0 8px var(--accent));
}
.logo-text {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 3px;
  background: linear-gradient(135deg, #fff 30%, var(--accent-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Nav links */
.nav-links { display: flex; gap: 4px; }
.nav-link {
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-2);
  transition: all var(--transition-fast);
}
.nav-link:hover, .nav-link.active { color: var(--text-1); background: var(--surface); }
.nav-link.active { color: var(--accent-2); }

/* Cart btn */
.nav-actions { display: flex; align-items: center; gap: 12px; }
.cart-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: var(--radius);
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text-2);
  transition: all var(--transition-fast);
}
.cart-btn:hover { color: var(--text-1); background: var(--surface-hover); border-color: var(--border-strong); }
.cart-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-accent);
}

/* Main content */
.main-content { min-height: calc(100vh - 64px - 320px); }

/* Toast */
.toast {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  background: var(--bg-3);
  border: 1px solid var(--green);
  color: var(--text-1);
  padding: 12px 24px;
  border-radius: var(--radius);
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 8px 32px rgba(16,185,129,0.2);
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}
.toast-icon { color: var(--green); font-weight: 700; }

.toast-enter-active, .toast-leave-active { transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(20px); }

/* Footer */
.footer {
  background: var(--bg-1);
  border-top: 1px solid var(--border);
  padding: 64px 0 40px;
  margin-top: auto;
}
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
}
.footer-desc { color: var(--text-3); font-size: 14px; line-height: 1.7; max-width: 260px; }
.footer-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.footer-col h4 {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-3);
  margin-bottom: 4px;
}
.footer-col a { color: var(--text-2); font-size: 14px; transition: color var(--transition-fast); }
.footer-col a:hover { color: var(--accent-2); }
.footer-copy { color: var(--text-3); font-size: 13px; }

@media (max-width: 768px) {
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
  .footer-brand { grid-column: 1 / -1; }
}
</style>
