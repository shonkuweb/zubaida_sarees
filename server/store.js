import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, 'data');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const productsFile = path.join(dataDir, 'products.json');
const categoriesFile = path.join(dataDir, 'categories.json');
const ordersFile = path.join(dataDir, 'orders.json');
const configFile = path.join(dataDir, 'config.json');
const adminFile = path.join(dataDir, 'admin.json');

const INITIAL_CONFIG = {
  storeName: 'HOUSE OF TAAGA',
  shortName: 'House of Taaga',
  tagline: 'A little tradition, a lot of love',
  subHeading: 'A mother-daughter label born from our shared love for Indian wear, thoughtful details, and handcrafted pieces.',
  announcement: 'A little tradition, a lot of love',
  heroSubtitle: 'Rooted in love. Worn with grace.',
  promoBanner: 'Artisanal Indian Wear • Thoughtful Details',
  whatsappNumber: '+91 63925 31412',
  supportEmail: 'contact@zubaidasarees.com',
  location: 'Zubaida Sarees Looms, Varanasi, Uttar Pradesh, India',
  city: 'Varanasi',
  instagram: 'zubaida_sarees63',
  owner: 'Zubaida Sarees',
  facebook: 'Zubaida Sarees',
  westernWear: 'zubaida_sarees63',
  shipping: {
    standardCharge: 0,
    freeDeliveryMin: 0
  },
  offers: {
    showAnnouncement: true,
    announcementMessage: 'Manufacturing Authentic Banarasi Sarees Since 1965 • Direct From Loom',
    enableDiscount: false,
    discountTitle: 'Loom Direct Special',
    discountType: 'percentage',
    discountPercentage: 10,
    minOrderSubtotal: 999,
    maxCap: 350,
    enableNudgeBanner: true
  },
  heroBanners: {
    mobile: [],
    desktop: [],
    belowTicker: 'Zubaida Sarees · Varanasi Looms, Uttar Pradesh, India | WhatsApp: +91 63925 31412',
    endTicker: 'Each Banarasi saree is hand-woven on our Varanasi looms since 1965. GST verified authentic craftsmanship.'
  }
};

function readJson(file, fallback = []) {
  try {
    if (fs.existsSync(file)) {
      const data = fs.readFileSync(file, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn(`[Store] Error reading ${file}:`, err.message);
  }
  return fallback;
}

function writeJson(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`[Store] Error writing ${file}:`, err.message);
    return false;
  }
}

// Initialize clean data files if they don't exist
if (!fs.existsSync(categoriesFile)) writeJson(categoriesFile, []);
if (!fs.existsSync(productsFile)) writeJson(productsFile, []);
if (!fs.existsSync(ordersFile)) writeJson(ordersFile, []);
if (!fs.existsSync(configFile)) writeJson(configFile, INITIAL_CONFIG);
if (!fs.existsSync(adminFile)) {
  const defaultSalt = crypto.randomBytes(16).toString('hex');
  const defaultHash = crypto.pbkdf2Sync('taagaadmin2026', defaultSalt, 100000, 64, 'sha512').toString('hex');
  writeJson(adminFile, { passwordHash: defaultHash, salt: defaultSalt, tokenSecret: crypto.randomBytes(32).toString('hex') });
}

export const fileStore = {
  // Categories (fully dynamic)
  getCategories: () => readJson(categoriesFile, []),
  saveCategories: (cats) => writeJson(categoriesFile, cats),
  createCategory: (cat) => {
    const list = readJson(categoriesFile, []);
    const item = { ...cat, id: cat.id || `cat_${Date.now()}` };
    list.push(item);
    writeJson(categoriesFile, list);
    return item;
  },
  updateCategory: (id, updates) => {
    const list = readJson(categoriesFile, []);
    const idx = list.findIndex(c => c.id === id || c.slug === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates };
    writeJson(categoriesFile, list);
    return list[idx];
  },
  deleteCategory: (id) => {
    const list = readJson(categoriesFile, []);
    const next = list.filter(c => c.id !== id && c.slug !== id);
    writeJson(categoriesFile, next);
    return true;
  },

  // Products (fully dynamic)
  getProducts: () => readJson(productsFile, []),
  getProductById: (id) => {
    const list = readJson(productsFile, []);
    return list.find(p => p.id === id || p.slug === id) || null;
  },
  createProduct: (prod) => {
    const list = readJson(productsFile, []);
    const item = {
      ...prod,
      id: prod.id || `prod_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString()
    };
    list.unshift(item);
    writeJson(productsFile, list);
    return item;
  },
  updateProduct: (id, updates) => {
    const list = readJson(productsFile, []);
    const idx = list.findIndex(p => p.id === id || p.slug === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates, updatedAt: new Date().toISOString() };
    writeJson(productsFile, list);
    return list[idx];
  },
  deleteProduct: (id) => {
    const list = readJson(productsFile, []);
    const next = list.filter(p => p.id !== id && p.slug !== id);
    writeJson(productsFile, next);
    return true;
  },

  // Orders
  getOrders: () => readJson(ordersFile, []),
  createOrder: (order) => {
    const list = readJson(ordersFile, []);
    const item = {
      ...order,
      id: order.id || `HT-ORD-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString()
    };
    list.unshift(item);
    writeJson(ordersFile, list);
    return item;
  },
  updateOrder: (id, updates) => {
    const list = readJson(ordersFile, []);
    const idx = list.findIndex(o => o.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates, updatedAt: new Date().toISOString() };
    writeJson(ordersFile, list);
    return list[idx];
  },
  deleteOrder: (id) => {
    const list = readJson(ordersFile, []);
    const next = list.filter(o => o.id !== id);
    writeJson(ordersFile, next);
    return true;
  },

  // Config
  getConfig: () => readJson(configFile, INITIAL_CONFIG),
  saveConfig: (updates) => {
    const curr = readJson(configFile, INITIAL_CONFIG);
    const next = { ...curr, ...updates };
    writeJson(configFile, next);
    return next;
  },

  // Admin Auth
  getAdminAuth: () => readJson(adminFile, {}),
  saveAdminAuth: (auth) => writeJson(adminFile, auth)
};
