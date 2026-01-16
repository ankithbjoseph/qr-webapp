import { loadContactData } from './data.js';
import { downloadVCard, sharePage } from './vcard.js';
import './style.css';

const contactData = loadContactData();

// Render the main vCard page
function renderApp() {
  const app = document.querySelector('#app');
  
  app.innerHTML = `
    <div class="vcard-container">
      <!-- Header -->
      <header class="vcard-header" style="background-color: ${contactData.themeColor}">
        <div class="header-content">
          <div class="avatar">
            <img src="/logo.png" alt="${contactData.companyName}" onerror="this.style.display='none'">
          </div>
          <h1 class="company-name">${contactData.companyName}</h1>
          <p class="job-title">${contactData.jobTitle}</p>
        </div>
        <div class="header-actions">
          <a href="tel:${contactData.phone}" class="action-btn">
            <i class="fa fa-phone"></i>
            <span>Call</span>
          </a>
          <a href="mailto:${contactData.email}" class="action-btn">
            <i class="fa fa-envelope"></i>
            <span>Email</span>
          </a>
          <a href="${contactData.mapsUrl}" target="_blank" class="action-btn">
            <i class="fa fa-map-marker-alt"></i>
            <span>Directions</span>
          </a>
        </div>
      </header>

      <!-- Body -->
      <main class="vcard-body">
        <!-- Bio Section -->
        <section class="info-row">
          <i class="fa fa-info-circle icon"></i>
          <div class="info-content">
            <p class="bio">${contactData.bio.replace(/\n/g, '<br>')}</p>
          </div>
        </section>
        <div class="separator"></div>

        <!-- Phone -->
        <section class="info-row">
          <i class="fa fa-phone icon"></i>
          <div class="info-content">
            <a href="tel:${contactData.phone}" class="info-link">${contactData.phone}</a>
            <span class="info-label">Telephone</span>
          </div>
        </section>
        <div class="separator"></div>

        <!-- Email -->
        <section class="info-row">
          <i class="fa fa-envelope icon"></i>
          <div class="info-content">
            <a href="mailto:${contactData.email}" class="info-link">${contactData.email}</a>
            <span class="info-label">Email</span>
          </div>
        </section>
        <div class="separator"></div>

        <!-- Company -->
        <section class="info-row">
          <i class="fa fa-briefcase icon"></i>
          <div class="info-content">
            <p class="info-text">${contactData.companyName}</p>
            <span class="info-label">${contactData.jobTitle}</span>
          </div>
        </section>
        <div class="separator"></div>

        <!-- Address -->
        <section class="info-row">
          <i class="fa fa-map-marker-alt icon"></i>
          <div class="info-content">
            <p class="info-text">${contactData.address.street}</p>
            <p class="info-text">${contactData.address.city}, ${contactData.address.state} ${contactData.address.zip}</p>
            <p class="info-text">${contactData.address.country}</p>
            <a href="${contactData.mapsUrl}" target="_blank" class="map-link" style="color: ${contactData.accentColor}">
              Show on map
            </a>
          </div>
        </section>
        <div class="separator"></div>

        <!-- Website -->
        <section class="info-row">
          <i class="fa fa-globe icon"></i>
          <div class="info-content">
            <a href="${contactData.website.startsWith('http') ? contactData.website : 'https://' + contactData.website}" target="_blank" class="info-link">${contactData.website}</a>
            <span class="info-label">Website</span>
          </div>
        </section>
        <div class="separator"></div>

        <!-- Social Media -->
        <section class="social-section">
          <label class="section-label">Social Media</label>
          <div class="social-icons">
            ${contactData.social.facebook ? `<a href="${contactData.social.facebook}" target="_blank" class="social-icon facebook"><i class="fab fa-facebook-f"></i></a>` : ''}
            ${contactData.social.x ? `<a href="${contactData.social.x}" target="_blank" class="social-icon x"><span>X</span></a>` : ''}
            ${contactData.social.linkedin ? `<a href="${contactData.social.linkedin}" target="_blank" class="social-icon linkedin"><i class="fab fa-linkedin-in"></i></a>` : ''}
            ${contactData.social.instagram ? `<a href="${contactData.social.instagram}" target="_blank" class="social-icon instagram"><i class="fab fa-instagram"></i></a>` : ''}
          </div>
        </section>

        <!-- Action Buttons -->
        <button id="downloadVcard" class="btn btn-primary" style="background-color: ${contactData.accentColor}">
          <i class="fa fa-user-plus"></i>
          <span>Download vCard</span>
        </button>

        <button id="shareBtn" class="btn btn-secondary">
          <i class="fa fa-share-alt"></i>
          <span>Share This Page</span>
        </button>
      </main>

      <!-- Toast notification -->
      <div id="toast" class="toast hidden"></div>
    </div>
  `;

  attachEventListeners();
}

// Show toast notification
function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, duration);
}

// Attach event listeners
function attachEventListeners() {
  // Download vCard
  document.getElementById('downloadVcard').addEventListener('click', () => {
    downloadVCard(contactData);
    showToast('vCard downloaded!');
  });

  // Share page
  document.getElementById('shareBtn').addEventListener('click', async () => {
    const result = await sharePage(contactData);
    if (result.success) {
      if (result.method === 'clipboard') {
        showToast('Link copied to clipboard!');
      } else {
        showToast('Shared successfully!');
      }
    } else {
      showToast('Failed to share. Please try again.');
    }
  });
}

// Initialize app
renderApp();
