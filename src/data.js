// Default contact data for Irish Tax Agents
export const defaultContactData = {
  companyName: "Irish Tax Agents",
  jobTitle: "Accountants - Taxation",
  bio: "Irish Accountancy & Taxation\nRevenue TAIN: 77706B\nCRO Filing Agent ID 1272",
  phone: "012303001",
  email: "manager@irishtaxagents.com",
  website: "www.irishtaxagents.com",
  address: {
    street: "Officepods Cranford Centre, Stillorgan Rd",
    city: "Dublin",
    state: "Co. Dublin",
    zip: "D04F1P2",
    country: "Ireland",
  },
  mapsUrl: "https://maps.app.goo.gl/vZMNjFFQjXychbdm6",
  social: {
    facebook: "https://www.facebook.com/IrishTaxAgents/",
    x: "https://x.com/IrishTaxAgents",
    linkedin: "https://www.linkedin.com/company/irish-tax-agents",
    instagram: "https://www.instagram.com/irishtaxagents",
  },
  themeColor: "#316097",
  accentColor: "#e91e63",
};

// Storage key
const STORAGE_KEY = "vcard_contact_data";
const AUTH_KEY = "vcard_admin_auth";

// Load contact data from localStorage or use defaults
export function loadContactData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return { ...defaultContactData, ...JSON.parse(stored) };
    } catch (e) {
      console.error("Error parsing stored data:", e);
    }
  }
  return { ...defaultContactData };
}

// Save contact data to localStorage
export function saveContactData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Admin authentication
export function isAdminLoggedIn() {
  return localStorage.getItem(AUTH_KEY) === "true";
}

export function adminLogin(password) {
  // Use environment variable for password, fallback to default if not set
  const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

  if (password === correctPassword) {
    localStorage.setItem(AUTH_KEY, "true");
    return true;
  }
  return false;
}

export function adminLogout() {
  localStorage.removeItem(AUTH_KEY);
}
