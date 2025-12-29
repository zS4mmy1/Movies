document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     CONFIG (REEMPLAZA ESTO)
  ========================= */
  const SELLER = {
    whatsappNumber: "51923194497",
    name: "Cajahuaringa Samaniego Geyzon",
    phoneDisplay: "+51 923 194 497",
    qr: {
      Yape: "imgs/Qr Yape.png",
      Plin: "imgs/Qr plin.jpeg",
    }
  };

  /* =========================
     Helpers
  ========================= */
  const toast = document.getElementById("toast");
  let toastTimer = null;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
  }

  function money(n) {
    return `S/ ${Number(n).toFixed(2)}`;
  }

  function keyOf(arr) {
    return arr.slice().sort().join("|");
  }

  function waLink(message) {
    const base = `https://wa.me/${SELLER.whatsappNumber}`;
    return `${base}?text=${encodeURIComponent(message)}`;
  }

  /* =========================
     Smooth scroll with fixed offset (navbar + promo bar)
  ========================= */
  const promoTopbar = document.getElementById("promoTopbar");

  function topOffsetPx() {
    const nav = document.querySelector(".navbar");
    const navH = nav ? nav.offsetHeight : 78;
    const promoH = promoTopbar ? promoTopbar.offsetHeight : 0;
    return navH + promoH + 14;
  }

  function scrollToSection(selector) {
    const target = document.querySelector(selector);
    if (!target) return;

    const y = target.getBoundingClientRect().top + window.pageYOffset - topOffsetPx();
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      if (!document.querySelector(href)) return;
      e.preventDefault();
      scrollToSection(href);
    });
  });

  /* =========================
     Countdown robusto (UTC fijo, no falla)
     Termina: JUE 01/01/2026 23:59 Lima (-05)
     => UTC: 2026-01-02 04:59:00Z
  ========================= */
  const promoCountdown = document.getElementById("promoCountdown");

  function startCountdown() {
    if (!promoCountdown) return;

    const endUTC = Date.UTC(2026, 0, 2, 4, 59, 0); // 2026-01-02 04:59:00Z

    const pad = (x) => String(x).padStart(2, "0");

    const tick = () => {
      const now = Date.now();
      let diff = endUTC - now;

      if (diff <= 0) {
        promoCountdown.textContent = "Promos finalizadas";
        return;
      }

      diff = Math.floor(diff / 1000);
      const d = Math.floor(diff / 86400);
      const h = Math.floor((diff % 86400) / 3600);
      const m = Math.floor((diff % 3600) / 60);
      const s = diff % 60;

      promoCountdown.textContent = `${pad(d)}d ${pad(h)}h ${pad(m)}m ${pad(s)}s`;
    };

    tick();
    setInterval(tick, 1000);
  }

  startCountdown();

  /* =========================
     WhatsApp floating (mensaje base)
  ========================= */
  const wspFloat = document.getElementById("wspFloat");
  if (wspFloat) {
    const chatMsg = "Hola, estoy interesado en comprar una plataforma Streming.";
    wspFloat.href = waLink(chatMsg);
  }

  /* =========================
     Data base
  ========================= */
  const indiv = {
    netflix: 12.9,
    disney: 6.5,
    disney_espn: 7.9,
    max: 5.5,
    prime: 6.5,
    vix: 4.9,
    crunch: 5.5,
    paramount: 5.5,
    iptv: 7.5,
  };

  const names = {
    netflix: "Netflix",
    disney: "Disney+",
    disney_espn: "Disney+ + ESPN",
    max: "HBO Max",
    prime: "Prime Video",
    vix: "Vix",
    crunch: "Crunchyroll",
    paramount: "Paramount+",
    iptv: "IPTV",
  };

  /* =========================
     DUOS (exact)
  ========================= */
  const duoPrice = new Map([
    [keyOf(["netflix", "disney"]), 17.50],
    [keyOf(["netflix", "disney_espn"]), 18.80],
    [keyOf(["netflix", "max"]), 16.50],

    [keyOf(["disney", "max"]), 9.50],
    [keyOf(["disney", "prime"]), 11.50],
    [keyOf(["disney", "vix"]), 9.90],
    [keyOf(["disney", "crunch"]), 10.50],
    [keyOf(["disney", "paramount"]), 10.50],
    [keyOf(["disney", "iptv"]), 12.50],

    [keyOf(["disney_espn", "max"]), 11.90],
    [keyOf(["disney_espn", "prime"]), 12.90],
    [keyOf(["disney_espn", "vix"]), 11.50],
    [keyOf(["disney_espn", "crunch"]), 11.90],
    [keyOf(["disney_espn", "paramount"]), 11.90],

    [keyOf(["netflix", "prime"]), 17.40],
    [keyOf(["netflix", "vix"]), 15.80],
    [keyOf(["netflix", "crunch"]), 16.40],
    [keyOf(["netflix", "paramount"]), 16.40],
    [keyOf(["netflix", "iptv"]), 18.40],
    [keyOf(["disney_espn", "iptv"]), 13.40],

    [keyOf(["max", "prime"]), 9.90],
    [keyOf(["max", "vix"]), 9.50],
    [keyOf(["max", "crunch"]), 9.50],
    [keyOf(["max", "paramount"]), 9.50],
    [keyOf(["max", "iptv"]), 11.00],

    [keyOf(["prime", "vix"]), 9.90],
    [keyOf(["prime", "crunch"]), 10.00],
    [keyOf(["prime", "paramount"]), 10.00],
    [keyOf(["prime", "iptv"]), 12.00],

    [keyOf(["vix", "crunch"]), 9.40],
    [keyOf(["vix", "paramount"]), 9.40],
    [keyOf(["vix", "iptv"]), 10.90],

    [keyOf(["crunch", "paramount"]), 9.50],
    [keyOf(["crunch", "iptv"]), 11.00],
  ]);

  const duoOjoExact = new Set([
    keyOf(["max", "prime"]),
    keyOf(["max", "vix"]),
    keyOf(["max", "crunch"]),
    keyOf(["max", "paramount"]),
    keyOf(["max", "iptv"]),
    keyOf(["prime", "crunch"]),
    keyOf(["prime", "paramount"]),
    keyOf(["prime", "iptv"]),
    keyOf(["vix", "crunch"]),
    keyOf(["vix", "paramount"]),
    keyOf(["vix", "iptv"]),
    keyOf(["crunch", "paramount"]),
    keyOf(["crunch", "iptv"]),
  ]);

  /* =========================
     TRIOS (exact)
  ========================= */
  const trioPrice = new Map([
    [keyOf(["netflix", "disney", "max"]), 20.90],
    [keyOf(["netflix", "disney", "prime"]), 21.90],
    [keyOf(["netflix", "disney", "vix"]), 20.50],
    [keyOf(["netflix", "disney", "crunch"]), 21.50],
    [keyOf(["netflix", "disney", "paramount"]), 21.50],
    [keyOf(["netflix", "disney", "iptv"]), 23.00],

    [keyOf(["netflix", "max", "prime"]), 21.40],
    [keyOf(["netflix", "max", "vix"]), 19.90],
    [keyOf(["netflix", "max", "crunch"]), 20.50],
    [keyOf(["netflix", "max", "paramount"]), 20.50],
    [keyOf(["netflix", "max", "iptv"]), 22.50],

    [keyOf(["disney", "max", "prime"]), 14.50],
    [keyOf(["disney", "max", "vix"]), 15.00],
    [keyOf(["disney", "max", "crunch"]), 15.50],
    [keyOf(["disney", "max", "paramount"]), 15.50],
    [keyOf(["disney", "max", "iptv"]), 17.50],

    [keyOf(["netflix", "prime", "vix"]), 20.50],
    [keyOf(["netflix", "prime", "crunch"]), 21.00],
    [keyOf(["netflix", "prime", "paramount"]), 21.00],
    [keyOf(["netflix", "prime", "iptv"]), 23.00],

    [keyOf(["prime", "vix", "disney"]), 16.90],
    [keyOf(["prime", "vix", "disney_espn"]), 17.50],

    [keyOf(["prime", "vix", "max"]), 15.40],
    [keyOf(["prime", "vix", "crunch"]), 15.50],
    [keyOf(["prime", "vix", "paramount"]), 15.00],
    [keyOf(["prime", "vix", "iptv"]), 17.40],

    [keyOf(["vix", "crunch", "netflix"]), 19.50],
    [keyOf(["vix", "crunch", "disney"]), 15.00],
    [keyOf(["vix", "crunch", "disney_espn"]), 16.50],
    [keyOf(["vix", "crunch", "max"]), 14.00],
    [keyOf(["vix", "crunch", "prime"]), 15.00],
    [keyOf(["vix", "crunch", "paramount"]), 14.50],
    [keyOf(["vix", "crunch", "iptv"]), 16.00],

    [keyOf(["disney_espn", "max", "prime"]), 18.50],
    [keyOf(["disney_espn", "max", "vix"]), 16.50],
    [keyOf(["disney_espn", "max", "crunch"]), 17.50],
    [keyOf(["disney_espn", "max", "iptv"]), 17.50],

    [keyOf(["disney_espn", "prime", "crunch"]), 18.50],
    [keyOf(["disney_espn", "prime", "iptv"]), 18.50],
    [keyOf(["disney_espn", "prime", "paramount"]), 18.50],

    [keyOf(["disney_espn", "vix", "paramount"]), 17.30],
    [keyOf(["disney_espn", "vix", "iptv"]), 16.90],

    [keyOf(["disney_espn", "crunch", "paramount"]), 17.50],
    [keyOf(["disney_espn", "crunch", "iptv"]), 17.50],
    [keyOf(["disney_espn", "paramount", "iptv"]), 17.50],

    [keyOf(["disney", "prime", "crunch"]), 17.50],
    [keyOf(["disney", "prime", "paramount"]), 17.50],
    [keyOf(["disney", "prime", "iptv"]), 17.50],

    [keyOf(["disney", "vix", "paramount"]), 15.90],
    [keyOf(["disney", "vix", "iptv"]), 17.50],

    [keyOf(["disney", "crunch", "paramount"]), 16.50],
    [keyOf(["disney", "crunch", "iptv"]), 18.00],
    [keyOf(["disney", "paramount", "iptv"]), 18.00],

    [keyOf(["max", "prime", "vix"]), 14.90],
    [keyOf(["max", "prime", "crunch"]), 15.50],
    [keyOf(["max", "prime", "paramount"]), 15.50],
    [keyOf(["max", "prime", "iptv"]), 17.50],
  ]);

  const trioOjoExact = new Set([
    keyOf(["max", "prime", "vix"]),
    keyOf(["max", "prime", "crunch"]),
    keyOf(["max", "prime", "paramount"]),
    keyOf(["max", "prime", "iptv"]),
    keyOf(["prime", "vix", "disney"]),
    keyOf(["prime", "vix", "max"]),
    keyOf(["prime", "vix", "crunch"]),
    keyOf(["prime", "vix", "paramount"]),
    keyOf(["prime", "vix", "iptv"]),
    keyOf(["vix", "crunch", "max"]),
    keyOf(["vix", "crunch", "prime"]),
    keyOf(["vix", "crunch", "paramount"]),
    keyOf(["vix", "crunch", "iptv"]),
  ]);

  /* =========================
     QUADS + OJO
  ========================= */
  const quadPrice = new Map([
    [keyOf(["netflix", "disney_espn", "max", "prime"]), 28.90],
    [keyOf(["netflix", "disney_espn", "max", "vix"]), 26.90],
    [keyOf(["netflix", "disney_espn", "max", "crunch"]), 30.90],
    [keyOf(["netflix", "disney_espn", "max", "paramount"]), 30.90],
    [keyOf(["netflix", "disney_espn", "max", "iptv"]), 31.90],

    [keyOf(["disney_espn", "max", "prime", "vix"]), 21.90],
    [keyOf(["disney_espn", "max", "prime", "crunch"]), 21.90],
    [keyOf(["disney_espn", "max", "prime", "paramount"]), 21.90],
    [keyOf(["disney_espn", "max", "prime", "iptv"]), 23.90],

    [keyOf(["netflix", "disney", "max", "prime"]), 26.90],
    [keyOf(["netflix", "disney", "max", "vix"]), 26.90],
    [keyOf(["netflix", "disney", "max", "crunch"]), 25.90],
    [keyOf(["netflix", "disney", "max", "paramount"]), 25.90],
    [keyOf(["netflix", "disney", "max", "iptv"]), 26.90],

    [keyOf(["max", "prime", "vix", "netflix"]), 26.90],
    [keyOf(["max", "prime", "vix", "crunch"]), 19.90],
    [keyOf(["max", "prime", "vix", "paramount"]), 19.90],
    [keyOf(["max", "prime", "vix", "iptv"]), 20.90],

    [keyOf(["prime", "vix", "crunch", "netflix"]), 26.90],
    [keyOf(["prime", "vix", "crunch", "disney"]), 20.50],
    [keyOf(["prime", "vix", "crunch", "disney_espn"]), 21.90],
    [keyOf(["prime", "vix", "crunch", "paramount"]), 19.90],
    [keyOf(["prime", "vix", "crunch", "iptv"]), 21.90],

    [keyOf(["vix", "crunch", "paramount", "netflix"]), 21.90],
    [keyOf(["vix", "crunch", "paramount", "disney"]), 19.90],
    [keyOf(["vix", "crunch", "paramount", "disney_espn"]), 20.90],
    [keyOf(["vix", "crunch", "paramount", "max"]), 18.90],
    [keyOf(["vix", "crunch", "paramount", "prime"]), 19.50],
    [keyOf(["vix", "crunch", "paramount", "iptv"]), 20.50],

    [keyOf(["vix", "crunch", "paramount", "iptv"]), 20.50],
  ]);

  const quadOjoExact = new Set([
    keyOf(["max", "prime", "vix", "crunch"]),
    keyOf(["prime", "vix", "crunch", "paramount"]),
    keyOf(["prime", "vix", "crunch", "iptv"]),
    keyOf(["vix", "crunch", "paramount", "max"]),
    keyOf(["vix", "crunch", "paramount", "prime"]),
  ]);

  /* 5 / 6 overrides */
  const quintPrice = new Map([
    [keyOf(["netflix", "max", "vix", "crunch", "paramount"]), 30.50],
  ]);

  const sextPrice = new Map([
    [keyOf(["netflix", "prime", "max", "vix", "paramount", "iptv"]), 35.90],
    [keyOf(["netflix", "disney", "max", "prime", "paramount", "iptv"]), 32.50],
    [keyOf(["netflix", "disney_espn", "max", "prime", "paramount", "iptv"]), 37.90],
  ]);

  function getGroupPrice(keys) {
    const k = keyOf(keys);
    if (keys.length === 6 && sextPrice.has(k)) return sextPrice.get(k);
    if (keys.length === 5 && quintPrice.has(k)) return quintPrice.get(k);
    if (keys.length === 4 && quadPrice.has(k)) return quadPrice.get(k);
    if (keys.length === 3 && trioPrice.has(k)) return trioPrice.get(k);
    if (keys.length === 2 && duoPrice.has(k)) return duoPrice.get(k);
    if (keys.length === 1) return indiv[keys[0]];
    return keys.reduce((acc, x) => acc + (indiv[x] || 0), 0);
  }

  function isOjoExact(selKeys) {
    const k = keyOf(selKeys);
    if (selKeys.length === 2) return duoOjoExact.has(k);
    if (selKeys.length === 3) return trioOjoExact.has(k);
    if (selKeys.length === 4) return quadOjoExact.has(k);
    return false;
  }

  function bestCostDP(selKeys) {
    const n = selKeys.length;
    if (n === 0) return { cost: 0, usedVolumeOffer: false };

    const kAll = keyOf(selKeys);
    if (n === 6 && sextPrice.has(kAll)) return { cost: sextPrice.get(kAll), usedVolumeOffer: false };
    if (n === 5 && quintPrice.has(kAll)) return { cost: quintPrice.get(kAll), usedVolumeOffer: false };
    if (n === 4 && quadPrice.has(kAll)) return { cost: quadPrice.get(kAll), usedVolumeOffer: false };

    const keys = selKeys.slice();
    const subsetCost = new Map();
    const full = (1 << n) - 1;

    // build subset costs up to 4
    for (let i = 0; i < n; i++) subsetCost.set(1 << i, getGroupPrice([keys[i]]));

    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
      subsetCost.set((1 << i) | (1 << j), getGroupPrice([keys[i], keys[j]]));
    }

    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) for (let k = j + 1; k < n; k++) {
      subsetCost.set((1 << i) | (1 << j) | (1 << k), getGroupPrice([keys[i], keys[j], keys[k]]));
    }

    if (n >= 4) {
      for (let a = 0; a < n; a++)
        for (let b = a + 1; b < n; b++)
          for (let c = b + 1; c < n; c++)
            for (let d = c + 1; d < n; d++) {
              const group = [keys[a], keys[b], keys[c], keys[d]];
              subsetCost.set((1 << a) | (1 << b) | (1 << c) | (1 << d), getGroupPrice(group));
            }
    }

    const dp = new Array(1 << n).fill(Infinity);
    dp[0] = 0;

    for (let mask = 0; mask <= full; mask++) {
      if (!isFinite(dp[mask])) continue;
      const remaining = full ^ mask;

      for (const [subMask, c] of subsetCost.entries()) {
        if ((subMask & remaining) === subMask) {
          const next = mask | subMask;
          dp[next] = Math.min(dp[next], dp[mask] + c);
        }
      }
    }

    let cost = dp[full];
    let usedVolumeOffer = false;

    if (n >= 4) {
      const originalSum = keys.reduce((acc, x) => acc + (indiv[x] || 0), 0);
      const surcharge = (n - 3) * 1.30;
      cost = Math.min(originalSum, cost + surcharge);
      usedVolumeOffer = true;
    }

    return { cost, usedVolumeOffer };
  }

  /* =========================
     UI state
  ========================= */
  const comboCards = document.querySelectorAll(".combo-card");
  const summaryLogos = document.querySelector(".summary-logos");
  const lineOriginal = document.getElementById("lineOriginal");
  const lineDiscount = document.getElementById("lineDiscount");
  const lineSavings = document.getElementById("lineSavings");
  const lineFinal = document.getElementById("lineFinal");
  const lineNote = document.getElementById("lineNote");
  const badgeOffer = document.getElementById("badgeOffer");
  const badgePromo = document.getElementById("badgePromo");
  const promoLabel = document.getElementById("promoLabel");
  const buyComboBtn = document.getElementById("buyComboBtn");

  const payDetails = document.getElementById("payDetails");
  const payTitle = document.getElementById("payTitle");
  const qrImg = document.getElementById("qrImg");
  const payName = document.getElementById("payName");
  const payPhone = document.getElementById("payPhone");
  const payAmount = document.getElementById("payAmount");
  const payOrder = document.getElementById("payOrder");
  const sendReceiptBtn = document.getElementById("sendReceiptBtn");

  if (payName) payName.textContent = SELLER.name;
  if (payPhone) payPhone.textContent = SELLER.phoneDisplay;

  let selectedPayMethod = null;
  let selectedPromoName = null;
  let selectedPromoKeys = null;

  let currentOrder = { keys: [], names: [], cost: 0, original: 0 };

  function getSelectedCards() {
    return [...comboCards].filter(c => c.classList.contains("active"));
  }

  function enforceExclusive(clickedKey) {
    const disneyCard = document.querySelector('.combo-card[data-key="disney"]');
    const espnCard = document.querySelector('.combo-card[data-key="disney_espn"]');
    if (!disneyCard || !espnCard) return;

    if (clickedKey === "disney" && disneyCard.classList.contains("active") && espnCard.classList.contains("active")) {
      espnCard.classList.remove("active");
      showToast("No puedes elegir Disney y Disney+ESPN juntos. Se desmarcó Disney+ESPN.");
    }
    if (clickedKey === "disney_espn" && espnCard.classList.contains("active") && disneyCard.classList.contains("active")) {
      disneyCard.classList.remove("active");
      showToast("No puedes elegir Disney y Disney+ESPN juntos. Se desmarcó Disney.");
    }
  }

  function selectionMatchesPromo(keys) {
    if (!selectedPromoKeys) return false;
    return keyOf(keys) === keyOf(selectedPromoKeys);
  }

  function updateComboSummary() {
    const selectedCards = getSelectedCards();
    const selectedKeys = selectedCards.map(c => c.dataset.key);

    if (summaryLogos) summaryLogos.innerHTML = "";

    if (selectedKeys.length === 0) {
      currentOrder = { keys: [], names: [], cost: 0, original: 0 };
      if (lineOriginal) lineOriginal.textContent = "";
      if (lineDiscount) lineDiscount.textContent = "";
      if (lineSavings) lineSavings.textContent = "";
      if (lineFinal) lineFinal.textContent = "Selecciona plataformas para ver el precio";
      if (lineNote) lineNote.style.display = "none";
      if (badgeOffer) badgeOffer.style.display = "none";
      if (badgePromo) badgePromo.style.display = "none";
      if (promoLabel) promoLabel.style.display = "none";
      return;
    }

    // logos
    selectedCards.forEach(card => {
      card.querySelectorAll("img").forEach(img => {
        if (summaryLogos) summaryLogos.appendChild(img.cloneNode(true));
      });
    });

    const originalSum = selectedKeys.reduce((acc, k) => acc + (indiv[k] || 0), 0);
    const { cost, usedVolumeOffer } = bestCostDP(selectedKeys);

    const savings = Math.max(0, originalSum - cost);
    const pct = originalSum > 0 ? (savings / originalSum) * 100 : 0;

    if (lineOriginal) lineOriginal.textContent = `Precio normal: ${money(originalSum)}`;
    if (lineDiscount) lineDiscount.textContent = selectedKeys.length >= 2 ? `Combo aplicado: ${money(cost)}` : "";
    if (lineSavings) lineSavings.textContent = savings > 0.01 ? `Ahorras ${money(savings)} (${pct.toFixed(0)}% OFF)` : "";
    if (lineFinal) lineFinal.textContent = `Precio final: ${money(cost)} / mes`;

    if (badgeOffer) badgeOffer.style.display = usedVolumeOffer ? "inline-flex" : "none";

    if (lineNote) {
      if (isOjoExact(selectedKeys)) {
        lineNote.style.display = "block";
        lineNote.textContent = "⚠️ Alta demanda / poco stock: la entrega puede demorar. Gracias por tu paciencia.";
      } else {
        lineNote.style.display = "none";
      }
    }

    const promoActive = selectionMatchesPromo(selectedKeys);
    if (badgePromo) badgePromo.style.display = promoActive ? "inline-flex" : "none";
    if (promoLabel) {
      if (promoActive && selectedPromoName) {
        promoLabel.style.display = "block";
        promoLabel.textContent = `✅ Elegiste la SUPER PROMO: ${selectedPromoName}`;
      } else {
        promoLabel.style.display = "none";
      }
    }

    currentOrder = {
      keys: selectedKeys,
      names: selectedKeys.map(k => names[k]),
      cost,
      original: originalSum,
    };
  }

  comboCards.forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("active");
      enforceExclusive(card.dataset.key);
      updateComboSummary();
    });
  });

  /* =========================
     PROMOS: click -> auto select + scroll a combos
  ========================= */
  const promoGrid = document.getElementById("promoGrid");
  if (promoGrid) {
    promoGrid.addEventListener("click", (e) => {
      const btn = e.target.closest(".promo-card");
      if (!btn) return;
      e.preventDefault();

      const promoName = btn.dataset.promo || "Super Promo";
      const keys = (btn.dataset.keys || "")
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);

      // limpia selección
      comboCards.forEach(c => c.classList.remove("active"));

      // aplica selección
      keys.forEach(k => {
        const card = document.querySelector(`.combo-card[data-key="${k}"]`);
        if (card) card.classList.add("active");
      });

      // seguridad exclusividad
      if (keys.includes("disney") && keys.includes("disney_espn")) {
        const espnCard = document.querySelector('.combo-card[data-key="disney_espn"]');
        if (espnCard) espnCard.classList.remove("active");
      }

      selectedPromoName = promoName;
      selectedPromoKeys = keys;

      updateComboSummary();
      showToast(`✅ Promo aplicada: ${promoName}`);

      // scroll con retardo pequeño para que el DOM pinte bien
      setTimeout(() => scrollToSection("#combos"), 120);
    });
  }

  /* =========================
     Services buy -> go to payment
  ========================= */
  const serviceButtons = document.querySelectorAll(".buy-service");
  serviceButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.key;
      const product = btn.dataset.product;
      const price = Number(btn.dataset.price || 0);

      selectedPromoName = null;
      selectedPromoKeys = null;

      currentOrder = { keys: [key], names: [product], cost: price, original: price };

      openModal(product, price);
      setTimeout(() => scrollToSection("#pagos"), 160);
      showToast("Elige Yape o Plin para pagar");
    });
  });

  /* =========================
     Buy from combos -> go to payment
  ========================= */
  buyComboBtn?.addEventListener("click", () => {
    if (!currentOrder.keys.length) {
      showToast("Selecciona al menos una plataforma");
      return;
    }
    openModal("Paquete Personalizado", currentOrder.cost);
    setTimeout(() => scrollToSection("#pagos"), 160);
  });

  /* =========================
     Payments: show QR + details + WhatsApp receipt
  ========================= */
  const paymentCards = document.querySelectorAll(".payment-card");
  function formatOrderLine(order) {
    if (!order.keys.length) return "-";
    if (order.keys.length === 1) return `${order.names[0]} (${money(order.cost)})`;
    return `${order.names.join(" + ")} (${money(order.cost)})`;
  }

  function buildReceiptMessage(method) {
    if (!currentOrder.keys.length) {
      return `Hola, estoy interesado en comprar una plataforma Streming. Pagaré con ${method}.`;
    }
    const title = currentOrder.names.join(" + ");
    const promoTxt = (selectedPromoName && selectionMatchesPromo(currentOrder.keys))
      ? `\n✅ Elegí la SUPER PROMO: *${selectedPromoName}*`
      : "";
    return `Hola, estoy interesado en comprar *${title}* (${money(currentOrder.cost)}) y pagaré con ${method}.${promoTxt}`;
  }

  paymentCards.forEach(btn => {
    btn.addEventListener("click", () => {
      selectedPayMethod = btn.dataset.method;

      if (payDetails) payDetails.style.display = "block";
      if (payTitle) payTitle.textContent = `Pagar con ${selectedPayMethod}`;
      if (qrImg) qrImg.src = SELLER.qr[selectedPayMethod] || SELLER.qr.Yape;

      if (payAmount) payAmount.textContent = money(currentOrder.cost || 0);
      if (payOrder) payOrder.textContent = formatOrderLine(currentOrder);

      if (sendReceiptBtn) sendReceiptBtn.disabled = !(currentOrder.keys.length > 0);

      showToast(`Seleccionaste ${selectedPayMethod}`);

      setTimeout(() => {
        const y = payDetails.getBoundingClientRect().top + window.pageYOffset - topOffsetPx();
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 120);
    });
  });

  sendReceiptBtn?.addEventListener("click", () => {
    if (!selectedPayMethod) return showToast("Elige Yape o Plin primero");
    if (!currentOrder.keys.length) return showToast("Primero selecciona un producto");
    window.open(waLink(buildReceiptMessage(selectedPayMethod)), "_blank", "noopener");
  });

  /* =========================
     FAQ accordion (+ / ×) FIX
  ========================= */
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const button = item.querySelector(".faq-question");
    const icon = item.querySelector(".faq-icon");

    button.addEventListener("click", () => {
      const open = item.classList.contains("active");

      // cerrar todos
      faqItems.forEach(i => {
        i.classList.remove("active");
        i.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
        const ic = i.querySelector(".faq-icon");
        if (ic) ic.textContent = "+";
      });

      // abrir el actual si estaba cerrado
      if (!open) {
        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
        icon.textContent = "×";
      }
    });
  });

  /* =========================
     Modal
  ========================= */
  const modal = document.getElementById("modal");
  const modalClose = document.getElementById("modalClose");
  const modalProduct = document.getElementById("modalProduct");
  const modalTotal = document.getElementById("modalTotal");

  function openModal(productName, price) {
    if (modalProduct) modalProduct.textContent = `Producto: ${productName}`;
    if (modalTotal) modalTotal.textContent = `Total a Pagar: ${money(price)}`;
    modal?.classList.add("show");
  }

  function closeModal() {
    modal?.classList.remove("show");
  }

  modalClose?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // init
  updateComboSummary();
});
