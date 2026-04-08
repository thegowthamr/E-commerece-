(() => {
  "use strict";

  const formatPrice = (amount) => `Rs. ${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(amount)}`;

  const el = {
    productList: document.getElementById("product-list"),
    resultsSub: document.getElementById("results-sub"),
    searchInput: document.getElementById("search-input"),
    searchBtn: document.getElementById("search-btn"),
    sortSelect: document.getElementById("sort-select"),
    categoryFilters: document.getElementById("category-filters"),
    priceRange: document.getElementById("price-range"),
    priceValue: document.getElementById("price-value"),
    ratingFilters: document.getElementById("rating-filters"),
    primeOnly: document.getElementById("prime-only"),
    clearFilters: document.getElementById("clear-filters"),
    homeBtn: document.getElementById("home-btn"),
    ordersBtn: document.getElementById("orders-btn"),
    accountBtn: document.getElementById("account-btn"),
    toggleFilters: document.getElementById("toggle-filters"),
    sidebar: document.getElementById("sidebar"),
    overlay: document.getElementById("overlay"),

    cartBtn: document.getElementById("cart-btn"),
    cartCount: document.getElementById("cart-count"),
    cartDrawer: document.getElementById("cart-drawer"),
    cartClose: document.getElementById("cart-close"),
    cartItems: document.getElementById("cart-items"),
    cartSubtotal: document.getElementById("cart-subtotal"),
    cartClear: document.getElementById("cart-clear"),
    checkoutBtn: document.getElementById("checkout-btn"),

    loginModal: document.getElementById("login-modal"),
    loginForm: document.getElementById("login-form"),
    loginEmail: document.getElementById("login-email"),

    productModal: document.getElementById("product-modal"),
    pmTitle: document.getElementById("pm-title"),
    pmImage: document.getElementById("pm-image"),
    pmRating: document.getElementById("pm-rating"),
    pmPrice: document.getElementById("pm-price"),
    pmMrp: document.getElementById("pm-mrp"),
    pmSave: document.getElementById("pm-save"),
    pmDesc: document.getElementById("pm-desc"),
    pmAdd: document.getElementById("pm-add"),
    pmBuy: document.getElementById("pm-buy"),

    checkoutModal: document.getElementById("checkout-modal"),
    checkoutForm: document.getElementById("checkout-form"),
    checkoutClose: document.getElementById("checkout-close"),
    checkoutCancel: document.getElementById("checkout-cancel"),
    orderLines: document.getElementById("order-lines"),
    orderTotal: document.getElementById("order-total"),
    coName: document.getElementById("co-name"),
    coAddress: document.getElementById("co-address"),
    coPhone: document.getElementById("co-phone"),
    coPay: document.getElementById("co-pay"),

    toast: document.getElementById("toast"),
  };

  const img = (filename) => `assets/products/${filename}`;
  const u = (photoId) =>
    `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=1200&q=60`;

  const wireImageFallbacks = (root) => {
    if (!root) return;
    root.querySelectorAll("img[data-fallback]").forEach((imgEl) => {
      if (!(imgEl instanceof HTMLImageElement)) return;
      if (imgEl.dataset.fallbackWired === "1") return;
      imgEl.dataset.fallbackWired = "1";
      imgEl.addEventListener("error", () => {
        const fb = imgEl.dataset.fallback;
        if (!fb) return;
        if (imgEl.src === fb) return;
        imgEl.src = fb;
      });
    });
  };

  const products = [
    {
      id: 101,
      title: "MegaPhone X1 (128GB) 5G Smartphone",
      brand: "MegaTech",
      category: "Electronics",
      price: 16999,
      mrp: 19999,
      rating: 4.5,
      reviews: 2481,
      prime: true,
      desc: "6.6-inch display, 5000mAh battery, fast charging, and 50MP camera for daily use.",
      image: u("1750860133058-4103f02c27c7"),
      fallback: img("megaphone-x1.svg"),
      featuredRank: 1,
    },
    {
      id: 102,
      title: "NoiseShield Pro Wireless Headphones",
      brand: "SoundPulse",
      category: "Electronics",
      price: 2990,
      mrp: 4990,
      rating: 4.3,
      reviews: 10322,
      prime: true,
      desc: "Comfort-fit, strong bass, and up to 40 hours battery with quick charge support.",
      image: u("1749934511277-e90042265d35"),
      fallback: img("noiseshield-pro.svg"),
      featuredRank: 2,
    },
    {
      id: 103,
      title: "SmartWatch S6 AMOLED (Bluetooth Calling)",
      brand: "PulseWear",
      category: "Electronics",
      price: 3499,
      mrp: 6999,
      rating: 4.1,
      reviews: 6120,
      prime: false,
      desc: "Fitness tracking, heart rate monitoring, and calling with crisp AMOLED display.",
      image: u("1529419007171-7ce5d0c85574"),
      fallback: img("smartwatch-s6.svg"),
      featuredRank: 5,
    },
    {
      id: 104,
      title: "Laptop 15.6\" (8GB/512GB SSD) Student Edition",
      brand: "CoreBook",
      category: "Electronics",
      price: 38990,
      mrp: 45990,
      rating: 4.4,
      reviews: 1820,
      prime: true,
      desc: "Fast boot SSD, full-size keyboard, and solid performance for study and office work.",
      image: u("1650919031731-0a1ffb23285a"),
      fallback: img("corebook-15.svg"),
      featuredRank: 3,
    },
    {
      id: 105,
      title: "Men's Casual Sneakers (White)",
      brand: "StreetStep",
      category: "Fashion",
      price: 1499,
      mrp: 2499,
      rating: 4.2,
      reviews: 52110,
      prime: true,
      desc: "Lightweight and comfortable sneakers with a clean everyday look.",
      image:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1200&q=60",
      fallback: img("sneakers-white.svg"),
      featuredRank: 4,
    },
    {
      id: 106,
      title: "Women's Kurti Set (Cotton Blend)",
      brand: "EthniQ",
      category: "Fashion",
      price: 1099,
      mrp: 1999,
      rating: 4.0,
      reviews: 9040,
      prime: false,
      desc: "Soft fabric with elegant print, perfect for daily wear and small occasions.",
      image: u("1769063382706-8156b3b33eac"),
      fallback: img("kurti-set.svg"),
      featuredRank: 9,
    },
    {
      id: 107,
      title: "Non-Stick Cookware Set (5 pcs)",
      brand: "HomeChef",
      category: "Home",
      price: 2299,
      mrp: 3999,
      rating: 4.3,
      reviews: 11244,
      prime: true,
      desc: "Even heat distribution with durable coating; easy to clean and daily-use friendly.",
      image: u("1688399027614-71fb9c6630aa"),
      fallback: img("cookware-set.svg"),
      featuredRank: 6,
    },
    {
      id: 108,
      title: "Cotton Bedsheet (King Size) 220 TC",
      brand: "SleepNest",
      category: "Home",
      price: 899,
      mrp: 1699,
      rating: 4.1,
      reviews: 23490,
      prime: true,
      desc: "Breathable cotton feel with vibrant print and strong stitching.",
      image: u("1642026391740-fa9c57090831"),
      fallback: img("bedsheet-king.svg"),
      featuredRank: 8,
    },
    {
      id: 109,
      title: "LED Desk Lamp with 3 Color Modes",
      brand: "BrightLite",
      category: "Home",
      price: 699,
      mrp: 1299,
      rating: 4.4,
      reviews: 3188,
      prime: false,
      desc: "Adjustable neck, eye-safe lighting, and USB power for your study desk.",
      image: u("1764933173526-958ca4636fe7"),
      fallback: img("desk-lamp.svg"),
      featuredRank: 11,
    },
    {
      id: 110,
      title: "Vitamin C Face Serum (30ml)",
      brand: "GlowLab",
      category: "Beauty",
      price: 549,
      mrp: 999,
      rating: 4.2,
      reviews: 18492,
      prime: true,
      desc: "Brightening serum with lightweight texture—suitable for most skin types.",
      image: u("1764694187667-f28a05a52c0e"),
      fallback: img("vitamin-c-serum.svg"),
      featuredRank: 7,
    },
    {
      id: 111,
      title: "Matte Lipstick Combo (Set of 3)",
      brand: "ColorMuse",
      category: "Beauty",
      price: 799,
      mrp: 1499,
      rating: 4.0,
      reviews: 7622,
      prime: false,
      desc: "Long-lasting matte finish with three everyday shades.",
      image:
        "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=1200&q=60",
      fallback: img("lipstick-set.svg"),
      featuredRank: 12,
    },
    {
      id: 112,
      title: "Shampoo + Conditioner Combo (Hair Repair)",
      brand: "SilkCare",
      category: "Beauty",
      price: 649,
      mrp: 1199,
      rating: 4.3,
      reviews: 9201,
      prime: true,
      desc: "Nourishing combo to reduce frizz and improve smoothness with regular use.",
      image:
        "https://images.unsplash.com/photo-1701992678972-d5a053ad0fb0?auto=format&fit=crop&w=1200&q=60",
      fallback: img("hair-repair-combo.svg"),
      featuredRank: 10,
    },
  ];

  const productById = new Map(products.map((p) => [p.id, p]));

  const state = {
    query: "",
    categories: new Set(),
    maxPrice: Number(el.priceRange?.value ?? 100000),
    minRating: 0,
    primeOnly: false,
    sort: "relevance",
  };

  const CART_KEY = "megastore_cart_v1";
  const cart = new Map();

  const showToast = (message, ms = 1800) => {
    if (!el.toast) return;
    el.toast.textContent = message;
    el.toast.hidden = false;
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => {
      el.toast.hidden = true;
    }, ms);
  };

  const saveCart = () => {
    const obj = Object.fromEntries(cart.entries());
    localStorage.setItem(CART_KEY, JSON.stringify(obj));
  };

  const loadCart = () => {
    cart.clear();
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (!raw) return;
      const obj = JSON.parse(raw);
      for (const [id, qty] of Object.entries(obj)) {
        const pid = Number(id);
        const q = Number(qty);
        if (!productById.has(pid)) continue;
        if (!Number.isFinite(q) || q <= 0) continue;
        cart.set(pid, Math.floor(q));
      }
    } catch {
      // ignore
    }
  };

  const cartQtyTotal = () => {
    let total = 0;
    for (const qty of cart.values()) total += qty;
    return total;
  };

  const cartSubtotal = () => {
    let sum = 0;
    for (const [pid, qty] of cart.entries()) {
      const p = productById.get(pid);
      if (!p) continue;
      sum += p.price * qty;
    }
    return sum;
  };

  const setOverlay = (on) => {
    if (!el.overlay) return;
    el.overlay.hidden = !on;
  };

  const openCart = () => {
    el.cartDrawer?.classList.add("open");
    el.cartDrawer?.setAttribute("aria-hidden", "false");
    setOverlay(true);
    renderCart();
  };

  const closeCart = () => {
    el.cartDrawer?.classList.remove("open");
    el.cartDrawer?.setAttribute("aria-hidden", "true");
    setOverlay(el.sidebar?.classList.contains("open") ?? false);
  };

  const openSidebarMobile = () => {
    el.sidebar?.classList.add("open");
    setOverlay(true);
  };

  const closeSidebarMobile = () => {
    el.sidebar?.classList.remove("open");
    setOverlay(el.cartDrawer?.classList.contains("open") ?? false);
  };

  const starsText = (rating) => {
    const r = Math.max(0, Math.min(5, rating));
    const full = Math.floor(r);
    const empty = 5 - full;
    return "*".repeat(full) + ".".repeat(empty);
  };

  const discountPct = (price, mrp) => {
    if (!mrp || mrp <= 0) return 0;
    return Math.max(0, Math.round(((mrp - price) / mrp) * 100));
  };

  const applyFilters = (list) => {
    const q = state.query.trim().toLowerCase();
    return list.filter((p) => {
      if (p.price > state.maxPrice) return false;
      if (state.minRating && p.rating < state.minRating) return false;
      if (state.primeOnly && !p.prime) return false;
      if (state.categories.size && !state.categories.has(p.category)) return false;
      if (!q) return true;
      const hay = `${p.title} ${p.brand} ${p.category}`.toLowerCase();
      return hay.includes(q);
    });
  };

  const applySort = (list) => {
    const sorted = [...list];
    switch (state.sort) {
      case "price_asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating_desc":
        sorted.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
        break;
      default:
        sorted.sort((a, b) => a.featuredRank - b.featuredRank);
    }
    return sorted;
  };

  const renderProducts = () => {
    if (!el.productList) return;
    const filtered = applySort(applyFilters(products));

    if (el.resultsSub) {
      el.resultsSub.textContent = `${filtered.length} result${filtered.length === 1 ? "" : "s"} | Max ${formatPrice(
        state.maxPrice
      )}${state.primeOnly ? " | Fast" : ""}${state.minRating ? ` | ${state.minRating}*+` : ""}`;
    }

    if (!filtered.length) {
      el.productList.innerHTML = `<div class="muted">No products found. Try clearing filters.</div>`;
      return;
    }

    el.productList.innerHTML = filtered
      .map((p) => {
        const pct = discountPct(p.price, p.mrp);
        const prime = p.prime ? `<span class="badge"><i class="fas fa-bolt" aria-hidden="true"></i> Fast</span>` : "";
        return `
          <article class="product-card" data-pid="${p.id}">
            <div class="product-media" role="button" tabindex="0" data-action="details" aria-label="View details for ${p.title}">
              <img src="${p.image}" data-fallback="${p.fallback || ""}" alt="${p.title}" loading="lazy" />
            </div>
            <div class="product-body">
              <h3 class="product-title" title="${p.title}">${p.title}</h3>
              <div class="rating-row">
                <span class="stars" aria-label="Rating ${p.rating} out of 5">${starsText(p.rating)}</span>
                <span>(${p.reviews.toLocaleString("en-IN")})</span>
              </div>
              <div class="price-row">
                <span class="price">${formatPrice(p.price)}</span>
                <span class="mrp">${p.mrp ? formatPrice(p.mrp) : ""}</span>
              </div>
              <div class="rating-row">
                ${prime}
                ${pct ? `<span class="badge">${pct}% off</span>` : ""}
              </div>
              <div class="actions">
                <button class="btn btn-primary" type="button" data-action="add" data-pid="${p.id}">Add</button>
                <button class="btn" type="button" data-action="buy" data-pid="${p.id}">Buy</button>
              </div>
              <button class="link-btn" type="button" data-action="details" data-pid="${p.id}">View details</button>
            </div>
          </article>
        `;
      })
      .join("");

    wireImageFallbacks(el.productList);
  };

  const updateCartUI = () => {
    if (el.cartCount) el.cartCount.textContent = String(cartQtyTotal());
    if (el.cartSubtotal) el.cartSubtotal.textContent = formatPrice(cartSubtotal());
  };

  const renderCart = () => {
    if (!el.cartItems) return;
    updateCartUI();

    if (!cart.size) {
      el.cartItems.innerHTML = `<div class="muted">Your cart is empty. Add something!</div>`;
      return;
    }

    el.cartItems.innerHTML = [...cart.entries()]
      .map(([pid, qty]) => {
        const p = productById.get(pid);
        if (!p) return "";
        const lineTotal = p.price * qty;
        return `
          <div class="cart-item" data-pid="${pid}">
            <img src="${p.image}" data-fallback="${p.fallback || ""}" alt="${p.title}" loading="lazy" />
            <div>
              <p class="cart-item-title">${p.title}</p>
              <div class="cart-item-meta">
                <span>${formatPrice(lineTotal)}</span>
                <span class="qty" aria-label="Quantity controls">
                  <button type="button" data-action="dec" aria-label="Decrease quantity">-</button>
                  <strong>${qty}</strong>
                  <button type="button" data-action="inc" aria-label="Increase quantity">+</button>
                  <button type="button" data-action="remove" aria-label="Remove item">Remove</button>
                </span>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    wireImageFallbacks(el.cartItems);
  };

  const addToCart = (pid, qty = 1) => {
    if (!productById.has(pid)) return;
    const current = cart.get(pid) ?? 0;
    cart.set(pid, current + qty);
    saveCart();
    updateCartUI();
  };

  const removeFromCart = (pid) => {
    cart.delete(pid);
    saveCart();
    updateCartUI();
  };

  const setCartQty = (pid, qty) => {
    if (!productById.has(pid)) return;
    const q = Math.max(0, Math.floor(qty));
    if (q <= 0) cart.delete(pid);
    else cart.set(pid, q);
    saveCart();
    updateCartUI();
  };

  const openLogin = () => {
    if (typeof el.loginModal?.showModal === "function") el.loginModal.showModal();
    else showToast("Your browser does not support <dialog>.");
  };

  let activeProductId = null;

  const openProduct = (pid) => {
    const p = productById.get(pid);
    if (!p) return;
    activeProductId = pid;

    if (el.pmTitle) el.pmTitle.textContent = p.title;
    if (el.pmImage) {
      el.pmImage.onerror = null;
      el.pmImage.src = p.image;
      el.pmImage.alt = p.title;
      el.pmImage.onerror = () => {
        if (p.fallback) el.pmImage.src = p.fallback;
      };
    }
    if (el.pmRating) el.pmRating.textContent = `${p.rating.toFixed(1)} / 5 | ${p.reviews.toLocaleString("en-IN")} ratings`;
    if (el.pmPrice) el.pmPrice.textContent = formatPrice(p.price);
    if (el.pmMrp) el.pmMrp.textContent = p.mrp ? formatPrice(p.mrp) : "";
    if (el.pmSave) {
      const pct = discountPct(p.price, p.mrp);
      el.pmSave.textContent = pct ? `${pct}% off` : "";
    }
    if (el.pmDesc) el.pmDesc.textContent = p.desc;

    if (typeof el.productModal?.showModal === "function") el.productModal.showModal();
  };

  const openCheckout = () => {
    if (!cart.size) {
      showToast("Cart is empty.");
      return;
    }

    if (el.orderLines) {
      el.orderLines.innerHTML = [...cart.entries()]
        .map(([pid, qty]) => {
          const p = productById.get(pid);
          if (!p) return "";
          return `<div class="order-line"><span>${p.title} x ${qty}</span><strong>${formatPrice(
            p.price * qty
          )}</strong></div>`;
        })
        .join("");
    }
    if (el.orderTotal) el.orderTotal.textContent = formatPrice(cartSubtotal());

    if (typeof el.checkoutModal?.showModal === "function") el.checkoutModal.showModal();
    else showToast("Your browser does not support <dialog>.");
  };

  const closeCheckout = () => {
    if (el.checkoutModal?.open) el.checkoutModal.close();
  };

  const resetFilters = () => {
    state.query = "";
    state.categories.clear();
    state.maxPrice = 100000;
    state.minRating = 0;
    state.primeOnly = false;
    state.sort = "relevance";

    if (el.searchInput) el.searchInput.value = "";
    if (el.sortSelect) el.sortSelect.value = "relevance";
    if (el.priceRange) el.priceRange.value = "100000";
    if (el.priceValue) el.priceValue.textContent = formatPrice(100000);
    if (el.primeOnly) el.primeOnly.checked = false;

    el.categoryFilters?.querySelectorAll("input[type='checkbox']").forEach((cb) => (cb.checked = false));
    el.ratingFilters?.querySelectorAll("input[type='radio']").forEach((r) => {
      r.checked = r.value === "0";
    });

    renderProducts();
  };

  const setQuickCategory = (category) => {
    state.categories.clear();
    if (category) state.categories.add(category);
    el.categoryFilters?.querySelectorAll("input[type='checkbox']").forEach((cb) => {
      cb.checked = state.categories.has(cb.value);
    });
    renderProducts();
  };

  // Events
  el.searchBtn?.addEventListener("click", () => {
    state.query = el.searchInput?.value ?? "";
    renderProducts();
  });

  el.searchInput?.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    state.query = el.searchInput.value;
    renderProducts();
  });

  el.sortSelect?.addEventListener("change", () => {
    state.sort = el.sortSelect.value;
    renderProducts();
  });

  el.categoryFilters?.addEventListener("change", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.type !== "checkbox") return;
    if (target.checked) state.categories.add(target.value);
    else state.categories.delete(target.value);
    renderProducts();
  });

  el.priceRange?.addEventListener("input", () => {
    const v = Number(el.priceRange.value);
    state.maxPrice = Number.isFinite(v) ? v : 100000;
    if (el.priceValue) el.priceValue.textContent = formatPrice(state.maxPrice);
    renderProducts();
  });

  el.ratingFilters?.addEventListener("change", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.type !== "radio") return;
    state.minRating = Number(target.value) || 0;
    renderProducts();
  });

  el.primeOnly?.addEventListener("change", () => {
    state.primeOnly = Boolean(el.primeOnly.checked);
    renderProducts();
  });

  el.clearFilters?.addEventListener("click", () => {
    resetFilters();
    showToast("Filters cleared.");
  });

  el.homeBtn?.addEventListener("click", () => {
    resetFilters();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  el.ordersBtn?.addEventListener("click", () => showToast("Demo: No orders yet."));
  el.accountBtn?.addEventListener("click", openLogin);

  el.loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = (el.loginEmail?.value ?? "").trim();
    if (email) showToast(`Signed in as ${email}`);
    if (el.loginModal?.open) el.loginModal.close();
  });

  document.querySelectorAll("[data-quick-category]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-quick-category");
      setQuickCategory(category);
      showToast(`${category} selected`);
    });
  });

  el.toggleFilters?.addEventListener("click", () => {
    const open = el.sidebar?.classList.contains("open");
    if (open) closeSidebarMobile();
    else openSidebarMobile();
  });

  el.overlay?.addEventListener("click", () => {
    closeCart();
    closeSidebarMobile();
  });

  el.cartBtn?.addEventListener("click", openCart);
  el.cartClose?.addEventListener("click", closeCart);
  el.cartClear?.addEventListener("click", () => {
    cart.clear();
    saveCart();
    renderCart();
    showToast("Cart cleared.");
  });
  el.checkoutBtn?.addEventListener("click", openCheckout);

  el.cartItems?.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const action = target.getAttribute("data-action");
    if (!action) return;
    const item = target.closest(".cart-item");
    if (!item) return;
    const pid = Number(item.getAttribute("data-pid"));
    const qty = cart.get(pid) ?? 0;
    if (!productById.has(pid)) return;

    if (action === "inc") setCartQty(pid, qty + 1);
    if (action === "dec") setCartQty(pid, qty - 1);
    if (action === "remove") removeFromCart(pid);
    renderCart();
  });

  el.productList?.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const action = target.getAttribute("data-action");
    const pid = Number(target.getAttribute("data-pid") || target.closest("[data-pid]")?.getAttribute("data-pid"));
    if (!Number.isFinite(pid) || !productById.has(pid)) return;

    if (action === "add") {
      addToCart(pid, 1);
      showToast("Added to cart.");
      return;
    }

    if (action === "buy") {
      addToCart(pid, 1);
      openCart();
      openCheckout();
      return;
    }

    if (action === "details") {
      openProduct(pid);
      return;
    }
  });

  el.productList?.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.getAttribute("data-action") !== "details") return;
    const card = target.closest(".product-card");
    const pid = Number(card?.getAttribute("data-pid"));
    if (!Number.isFinite(pid)) return;
    openProduct(pid);
  });

  el.pmAdd?.addEventListener("click", () => {
    if (!activeProductId) return;
    addToCart(activeProductId, 1);
    showToast("Added to cart.");
  });

  el.pmBuy?.addEventListener("click", () => {
    if (!activeProductId) return;
    addToCart(activeProductId, 1);
    if (el.productModal?.open) el.productModal.close();
    openCart();
    openCheckout();
  });

  el.checkoutClose?.addEventListener("click", closeCheckout);
  el.checkoutCancel?.addEventListener("click", closeCheckout);

  el.checkoutForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!cart.size) {
      showToast("Cart is empty.");
      closeCheckout();
      return;
    }

    const name = (el.coName?.value ?? "").trim();
    const address = (el.coAddress?.value ?? "").trim();
    const phone = (el.coPhone?.value ?? "").trim().replace(/\s+/g, "");
    const pay = el.coPay?.value ?? "cod";

    const phoneOk = /^[0-9]{10}$/.test(phone);
    if (!name || !address || !phoneOk) {
      showToast("Please fill name, address, and a 10-digit phone.");
      return;
    }

    cart.clear();
    saveCart();
    renderCart();
    closeCheckout();
    closeCart();
    showToast(`Order placed (${pay.toUpperCase()}). Thank you, ${name}!`, 2400);
  });

  // Init
  if (el.priceValue) el.priceValue.textContent = formatPrice(Number(el.priceRange?.value ?? 100000));
  loadCart();
  updateCartUI();
  renderProducts();
})();
