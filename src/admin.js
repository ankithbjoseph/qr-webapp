import { loadContactData, saveContactData, isAdminLoggedIn, adminLogin, adminLogout } from './data.js';
import './style.css';

let contactData = loadContactData();

// Render the admin page
function renderAdmin() {
  const isAdmin = isAdminLoggedIn();
  const app = document.querySelector('#app');
  
  if (!isAdmin) {
    // Show login form
    app.innerHTML = `
      <div class="admin-container">
        <div class="admin-card">
          <a href="/" class="back-link"><i class="fa fa-arrow-left"></i> Back to vCard</a>
          <div class="admin-header">
            <i class="fa fa-lock admin-icon"></i>
            <h1>Admin Login</h1>
            <p>Enter your password to access the admin dashboard</p>
          </div>
          <form id="loginForm">
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" placeholder="Enter admin password" required autofocus>
            </div>
            <button type="submit" class="btn btn-primary" style="background-color: ${contactData.accentColor}">
              <i class="fa fa-sign-in-alt"></i>
              <span>Login</span>
            </button>
            <p id="loginError" class="error-text hidden">Invalid password</p>
          </form>
        </div>
      </div>
    `;
    
    // Login form handler
    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const password = document.getElementById('password').value;
      if (adminLogin(password)) {
        renderAdmin();
      } else {
        document.getElementById('loginError').classList.remove('hidden');
      }
    });
  } else {
    // Show admin dashboard
    app.innerHTML = `
      <div class="admin-container">
        <div class="admin-card admin-card-large">
          <div class="admin-top-bar">
            <a href="/" class="back-link"><i class="fa fa-arrow-left"></i> Back to vCard</a>
            <button id="logoutBtn" class="btn btn-outline btn-small">
              <i class="fa fa-sign-out-alt"></i>
              <span>Logout</span>
            </button>
          </div>
          <div class="admin-header">
            <i class="fa fa-edit admin-icon" style="color: ${contactData.accentColor}"></i>
            <h1>Edit Contact Details</h1>
            <p>Update your vCard information below</p>
          </div>
          
          <form id="editForm">
            <h3>Basic Information</h3>
            <div class="form-row">
              <div class="form-group">
                <label for="companyName">Company Name</label>
                <input type="text" id="companyName" value="${contactData.companyName}" required>
              </div>
              <div class="form-group">
                <label for="jobTitle">Job Title</label>
                <input type="text" id="jobTitle" value="${contactData.jobTitle}" required>
              </div>
            </div>

            <div class="form-group">
              <label for="bio">Bio / Description</label>
              <textarea id="bio" rows="3" required>${contactData.bio}</textarea>
            </div>

            <h3>Contact Information</h3>
            <div class="form-row">
              <div class="form-group">
                <label for="phone">Phone</label>
                <input type="tel" id="phone" value="${contactData.phone}" required>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" value="${contactData.email}" required>
              </div>
            </div>

            <div class="form-group">
              <label for="website">Website</label>
              <input type="text" id="website" value="${contactData.website}" required>
            </div>

            <h3>Address</h3>
            <div class="form-group">
              <label for="street">Street</label>
              <input type="text" id="street" value="${contactData.address.street}" required>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="city">City</label>
                <input type="text" id="city" value="${contactData.address.city}" required>
              </div>
              <div class="form-group">
                <label for="state">State/County</label>
                <input type="text" id="state" value="${contactData.address.state}" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="zip">Postal Code</label>
                <input type="text" id="zip" value="${contactData.address.zip}" required>
              </div>
              <div class="form-group">
                <label for="country">Country</label>
                <input type="text" id="country" value="${contactData.address.country}" required>
              </div>
            </div>

            <div class="form-group">
              <label for="mapsUrl">Google Maps URL</label>
              <input type="url" id="mapsUrl" value="${contactData.mapsUrl}" required>
            </div>

            <h3>Social Media</h3>
            <div class="form-row">
              <div class="form-group">
                <label for="facebook">Facebook</label>
                <input type="url" id="facebook" value="${contactData.social.facebook || ''}" placeholder="https://facebook.com/...">
              </div>
              <div class="form-group">
                <label for="xSocial">X (Twitter)</label>
                <input type="url" id="xSocial" value="${contactData.social.x || ''}" placeholder="https://x.com/...">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="linkedin">LinkedIn</label>
                <input type="url" id="linkedin" value="${contactData.social.linkedin || ''}" placeholder="https://linkedin.com/...">
              </div>
              <div class="form-group">
                <label for="instagram">Instagram</label>
                <input type="url" id="instagram" value="${contactData.social.instagram || ''}" placeholder="https://instagram.com/...">
              </div>
            </div>

            <h3>Theme Colors</h3>
            <div class="form-row">
              <div class="form-group">
                <label for="themeColor">Header Color</label>
                <input type="color" id="themeColor" value="${contactData.themeColor}">
              </div>
              <div class="form-group">
                <label for="accentColor">Accent Color</label>
                <input type="color" id="accentColor" value="${contactData.accentColor}">
              </div>
            </div>

            <div class="form-actions">
              <a href="/" class="btn btn-secondary">Cancel</a>
              <button type="submit" class="btn btn-primary" style="background-color: ${contactData.accentColor}">
                <i class="fa fa-save"></i>
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
        
        <!-- Toast notification -->
        <div id="toast" class="toast hidden"></div>
      </div>
    `;
    
    // Logout handler
    document.getElementById('logoutBtn').addEventListener('click', () => {
      adminLogout();
      renderAdmin();
    });
    
    // Edit form handler
    document.getElementById('editForm').addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Update contact data
      contactData = {
        ...contactData,
        companyName: document.getElementById('companyName').value,
        jobTitle: document.getElementById('jobTitle').value,
        bio: document.getElementById('bio').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        website: document.getElementById('website').value,
        address: {
          street: document.getElementById('street').value,
          city: document.getElementById('city').value,
          state: document.getElementById('state').value,
          zip: document.getElementById('zip').value,
          country: document.getElementById('country').value
        },
        mapsUrl: document.getElementById('mapsUrl').value,
        social: {
          facebook: document.getElementById('facebook').value,
          x: document.getElementById('xSocial').value,
          linkedin: document.getElementById('linkedin').value,
          instagram: document.getElementById('instagram').value
        },
        themeColor: document.getElementById('themeColor').value,
        accentColor: document.getElementById('accentColor').value
      };

      // Save to localStorage
      saveContactData(contactData);
      
      // Show success toast
      showToast('Changes saved successfully!');
      
      // Re-render to update colors
      setTimeout(() => renderAdmin(), 500);
    });
  }
}

// Show toast notification
function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, duration);
  }
}

// Initialize
renderAdmin();
