// ---- Small / Medium + Hot / Iced 対応（Hand Drip＝Kenya (Hot/Iced)表記） -----------------
const MENU = {
  coffee: [
    {
      name: "Batch Brew",
      sizes: [
        { size: "Small", type: "Hot", price: 400 },
        { size: "Medium", type: "Hot", price: 600 }
      ]
    },
    {
      name: "Cold Brew",
      sizes: [
        { size: "Medium", type: "Iced", price: 500 }
      ]
    },
    {
      name: "Hand Drip",
      options: [
        { origin: "Kenya (Hot/Iced)", price: 800 },
        { origin: "Burundi (Hot/Iced)", price: 1000 }
      ]
    }
  ],

  Espresso: [
    {
      name: "Latte",
      sizes: [
        { size: "Small", type: "Hot", price: 600 },
        { size: "Medium (Hot/Iced)", price: 750 }
      ]
    },
    {
      name: "Flat White",
      sizes: [
        { size: "Small", type: "Hot", price: 600 },
        { size: "Medium", type: "Hot", price: 750 }
      ]
    },
    {
      name: "Long Black",
      sizes: [
        { size: "Small", type: "Hot", price: 600 },
        { size: "Medium (Hot/Iced)", price: 750 }
      ]
    },
    {
      name: "Cappuccino",
      sizes: [
        { size: "Small", type: "Hot", price: 600 },
        { size: "Medium", type: "Hot", price: 750 }
      ]
    },
    {
      name: "Magic",
      sizes: [
        { size: "Small", type: "Hot", price: 650 },
        { size: "Medium", type: "Hot", price: 800 }
      ]
    },
    {
      name: "Cafe Mocha",
      sizes: [
        { size: "Small", type: "Hot", price: 650 },
        { size: "Medium (Hot/Iced)", price: 800 }
      ]
    },
    { name: "Espresso", price: 400 },
    { name: "Piccolo Latte", price: 500 },
    { name: "Macchiato", price: 450 }
  ],

  "Tea&Others": [
    {
      name: "Chai Latte",
      sizes: [
        { type: "Hot/Iced", price: 700 }
      ]
    },
    {
      name: "Matcha Latte",
      sizes: [
        { type: "Hot/Iced", price: 700 }
      ]
    },
    {
      name: "Dirty Chai",
      sizes: [
        { type: "Hot/Iced", price: 800 }
      ]
    },
    {
      name: "Dirty Matcha",
      sizes: [
        { type: "Hot/Iced", price: 800 }
      ]
    },
    {
      name: "Yuzu Soda",
      sizes: [
        { type: "Iced", price: 500 }
      ]
    },
    {
      name: "Orange Juice",
      sizes: [
        { type: "Iced", price: 500 }
      ]
    },
    {
      name: "Babyccino",
      sizes: [
        { type: "Hot", price: 100 }
      ]
    },
    { name: "Papuccino", price: 200 },
  ],

  food: [
    { name: "Avocado Toast", price: 880 },
    { name: "Salmon Toast", price: 880 },
    { name: "Tuna Melt", price: 850 },
    { name: "HLT Toasty", price: 850 },
    { name: "Meat Pie", price: 850 },
    { name: "Cheese&Cracker", price: 550 }
  ],

  sweets: [
    { name: "Banana Bread", price: 480 },
    { name: "Chocolate Brownie", price: 450 },
    { name: "Coconut cookies", price: 420 },
    { name: "Coffee Ball", price: 400 },
    { name: "Basque Cheesecake", price: 750 }
  ]
};

// ---- レンダリング -----------------
const root = document.getElementById("menu-root");
const tabs = document.getElementById("menu-tabs");

function yen(n) {
  return "¥" + Number(n).toLocaleString("ja-JP");
}

// ✅ undefinedが出ないように安全に書き換えた部分
function formatSizeLabel(s) {
  const hasSize = typeof s.size === "string" && s.size.trim() !== "";
  const hasType = typeof s.type === "string" && s.type.trim() !== "";
  if (hasSize && hasType) return `${s.size} (${s.type})`;
  if (hasSize) return s.size;
  if (hasType) return s.type;
  return "—";
}

function renderCategory(cat) {
  const list = MENU[cat] || [];
  root.innerHTML = list.map(item => {
    let detail = "";

    if (item.sizes && item.sizes.length) {
      // Small / Medium / Hot / Iced
      detail = item.sizes
        .map(s => `${formatSizeLabel(s)} ${yen(s.price)}`)
        .join("<br>");
    } else if (item.options && item.options.length) {
      // Hand Drip の産地別（Hot/Icedまとめ）
      detail = item.options
        .map(o => `${o.origin} ${yen(o.price)}`)
        .join("<br>");
    } else {
      // 単一価格
      detail = yen(item.price);
    }

    return `
      <article class="card">
        <h3>${item.name}</h3>
        <p class="muted">${detail}</p>
      </article>
    `;
  }).join("");
}

function setActive(btn) {
  [...tabs.querySelectorAll(".tab")].forEach(b => b.classList.remove("is-active"));
  btn.classList.add("is-active");
}

tabs.addEventListener("click", e => {
  const btn = e.target.closest("[data-cat]");
  if (!btn) return;
  setActive(btn);
  renderCategory(btn.dataset.cat);
});

// 初期表示
renderCategory("coffee");
