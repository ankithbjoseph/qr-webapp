# Irish Tax Agents - Digital Business Card

A modern, mobile-first digital business card (vCard) web application built with Vite.

## Features

- 📱 **Responsive Design** - Looks great on mobile and desktop
- 📇 **vCard Download** - Automatically generates and downloads a .vcf contact file
- 🔗 **Share Functionality** - Uses Web Share API with clipboard fallback
- 🔐 **Admin Login** - Password-protected admin area to edit details
- ✏️ **Editable Content** - All contact information can be updated via admin dashboard
- 🎨 **Customizable Theme** - Change header and accent colors
- 💾 **Persistent Storage** - All changes saved to localStorage

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Admin Access

Click the **Admin** button at the bottom of the page to access the admin dashboard.

**Default Password:** `admin123`

> ⚠️ **Important:** Change this password in `src/data.js` before deploying to production!

## Customization

### Changing the Logo

Replace `public/logo.png` with your own logo image.

### Changing Default Data

Edit `src/data.js` to modify the default contact information:

```javascript
export const defaultContactData = {
  companyName: "Your Company",
  jobTitle: "Your Title",
  // ... etc
};
```

### Changing Admin Password

In `src/data.js`, modify the `adminLogin` function:

```javascript
export function adminLogin(password) {
  if (password === 'your-secure-password') {
    // ...
  }
}
```

## Project Structure

```
qr webapp/
├── public/
│   └── logo.png          # Company logo
├── src/
│   ├── main.js           # Main application logic
│   ├── data.js           # Contact data and authentication
│   ├── vcard.js          # vCard generation and sharing
│   └── style.css         # Application styles
├── index.html            # Entry HTML file
└── package.json          # Dependencies and scripts
```

## Technologies Used

- [Vite](https://vitejs.dev/) - Fast build tool
- [Font Awesome](https://fontawesome.com/) - Icons
- Vanilla JavaScript - No framework dependencies
- LocalStorage - Client-side data persistence
