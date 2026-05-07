{{-- Redesigned Footer Partial --}}
<style>
  /* ===== MOBILE MENU FIX =====
     The header has a scroll-handler that modifies classes/opacity.
     We force the drawer to have solid bg, stay on top, and full height. */
  
  /* If the header contains an open drawer (translate-x-0), force it to be opaque */
  header:has(div[class*="translate-x-0"]),
  header:has(.lg\:hidden.fixed:not([class*="translate-x-full"])) {
    opacity: 1 !important;
    backdrop-filter: none !important;
    background-color: #ffffff !important;
  }

  .lg\:hidden.fixed,
  div[class*="max-w-xs"],
  #elbildad-mobile-drawer {
    background-color: #ffffff !important;
    z-index: 10000 !important;
    opacity: 1 !important;
    height: 100vh !important;
    max-height: 100vh !important;
  }

  /* ===== FOOTER REDESIGN ===== */
  #elbildad-footer {
    font-family: 'DM Sans', 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #0c1a2e 0%, #102D47 60%, #0e2040 100%);
    color: #e2e8f0;
    position: relative;
    overflow: hidden;
    margin-top: 0;
  }

  #elbildad-footer::before {
    content: '';
    position: absolute;
    top: -80px; left: -80px;
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(47,115,242,0.15) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  #elbildad-footer::after {
    content: '';
    position: absolute;
    bottom: 60px; right: -60px;
    width: 240px; height: 240px;
    background: radial-gradient(circle, rgba(53,180,246,0.1) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  .footer-top {
    padding: 64px 0 40px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    position: relative;
    z-index: 2;
  }

  .footer-inner {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 32px;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
    gap: 40px;
  }

  @media (max-width: 900px) {
    .footer-inner {
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }
  }
  @media (max-width: 560px) {
    .footer-inner {
      grid-template-columns: 1fr;
      gap: 28px;
    }
  }

  .footer-brand-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
    text-decoration: none;
  }
  .footer-brand-logo img {
    height: 40px;
    width: auto;
    filter: brightness(0) invert(1);
  }
  .footer-brand-name {
    font-size: 25px;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.3px;
  }
  .footer-brand-name span { color: #2F73F2; }

  .footer-tagline {
    font-size: 17px;
    color: #94a3b8;
    line-height: 1.7;
    margin-bottom: 24px;
    max-width: 300px;
  }

  .footer-contact-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .footer-contact-item {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 17px;
    color: #cbd5e1;
    text-decoration: none;
    transition: color 0.2s;
  }
  .footer-contact-item:hover { color: #fff; }

  .footer-contact-icon {
    width: 36px; height: 36px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    font-size: 20px;
  }
  .footer-contact-icon.whatsapp { background: rgba(37,211,102,0.15); color: #25D366; }
  .footer-contact-icon.email { background: rgba(47,115,242,0.15); color: #2F73F2; }

  .footer-col-title {
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: #64748b;
    margin-bottom: 20px;
  }

  .footer-links {
    list-style: none;
    padding: 0; margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .footer-links a {
    font-size: 17px;
    color: #94a3b8;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: color 0.2s, gap 0.2s;
  }
  .footer-links a:hover { color: #fff; gap: 10px; }
  .footer-links a::before {
    content: '•';
    font-size: 25px;
    color: #fff;
    opacity: 0.9;
    line-height: 1;
  }

  /* ====== NEWSLETTER ====== */
  .footer-newsletter-box {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 28px 24px;
  }

  .footer-newsletter-title {
    font-size: 19px;
    font-weight: 700;
    color: #fff;
    margin: 0 0 6px;
  }

  .footer-newsletter-desc {
    font-size: 16px;
    color: #94a3b8;
    margin: 0 0 20px;
    line-height: 1.6;
  }

  .footer-newsletter-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .footer-newsletter-input-wrap {
    position: relative;
  }

  .footer-newsletter-input-wrap svg {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
    pointer-events: none;
    width: 16px; height: 16px;
  }

  .footer-newsletter-input {
    width: 100%;
    padding: 12px 14px 12px 40px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    color: #fff;
    font-size: 17px;
    font-family: inherit;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
    box-sizing: border-box;
  }
  .footer-newsletter-input::placeholder { color: #64748b; }
  .footer-newsletter-input:focus {
    border-color: #2F73F2;
    background: rgba(47,115,242,0.08);
  }

  .footer-newsletter-btn {
    width: 100%;
    padding: 12px 20px;
    background: linear-gradient(135deg, #2F73F2 0%, #35B4F6 100%);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 17px;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(47,115,242,0.3);
  }
  .footer-newsletter-btn:hover {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 6px 28px rgba(47,115,242,0.45);
  }

  /* Social icons */
  .footer-socials {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  .footer-social-link {
    width: 38px; height: 38px;
    border-radius: 10px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.08);
    display: flex; align-items: center; justify-content: center;
    color: #94a3b8;
    text-decoration: none;
    font-size: 19px;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
  }
  .footer-social-link:hover {
    background: #2F73F2;
    color: #fff;
    border-color: #2F73F2;
  }

  /* Bottom bar */
  .footer-bottom {
    position: relative;
    z-index: 2;
    padding: 20px 32px;
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }

  .footer-copyright {
    font-size: 16px;
    color: #fff;
  }
  .footer-copyright a { color: #2F73F2; text-decoration: none; }
  .footer-copyright a:hover { text-decoration: underline; }

  .footer-bottom-links {
    display: flex;
    gap: 20px;
  }
  .footer-bottom-links a {
    font-size: 16px;
    color: #fff;
    text-decoration: none;
    transition: color 0.2s;
  }
  .footer-bottom-links a:hover { color: #2F73F2; }

  /* Newsletter success state */
  .footer-newsletter-success {
    display: none;
    align-items: center;
    gap: 10px;
    color: #4ade80;
    font-size: 17px;
    font-weight: 600;
    margin-top: 8px;
  }
</style>

<footer id="elbildad-footer">
  <div class="footer-top">
    <div class="footer-inner">

      <!-- Brand Column -->
      <div>
        <a href="/" class="footer-brand-logo">
          <img src="/images/logo/logo.svg" alt="Elbildad Logo" onerror="this.style.display='none'">
          <span class="footer-brand-name">El<span>bildad</span></span>
        </a>
        <p class="footer-tagline">
          Your trusted bridge between China's manufacturers and Nigeria's growing market. Factory prices, secure payments, and reliable delivery.
        </p>
        <ul class="footer-contact-list">
          <li>
            <a href="https://wa.me/2348032775756" class="footer-contact-item" target="_blank" rel="noopener">
              <span class="footer-contact-icon whatsapp">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </span>
              +234 803 277 5756
            </a>
          </li>
          <li>
            <a href="mailto:info@elbildad.com" class="footer-contact-item">
              <span class="footer-contact-icon email">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </span>
              info@elbildad.com
            </a>
          </li>
        </ul>
        <!-- Social links -->
        <div class="footer-socials">
          <a href="https://wa.me/2348032775756" class="footer-social-link" target="_blank" aria-label="WhatsApp">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
          <a href="mailto:info@elbildad.com" class="footer-social-link" aria-label="Email">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          </a>
          <a href="https://www.linkedin.com/company/elbildad" class="footer-social-link" target="_blank" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
          </a>
          <a href="https://www.facebook.com/elbildad" class="footer-social-link" target="_blank" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
        </div>
      </div>

      <!-- Quick Links -->
      <div>
        <p class="footer-col-title">Quick Links</p>
        <ul class="footer-links">
          <li><a href="/">Home</a></li>
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="/rfq">Request Quote</a></li>
          <li><a href="/signin">Sign In</a></li>
          <li><a href="/signup">Create Account</a></li>
        </ul>
      </div>

      <!-- Services -->
      <div>
        <p class="footer-col-title">Our Services</p>
        <ul class="footer-links">
          <li><a href="/rfq">Product Sourcing</a></li>
          <li><a href="/rfq">Factory Inspection</a></li>
          <li><a href="/rfq">Freight & Logistics</a></li>
          <li><a href="/rfq">Quality Control</a></li>
          <li><a href="/rfq">Trade Financing</a></li>
        </ul>
      </div>

      <!-- Newsletter -->
      <div>
        <div class="footer-newsletter-box">
          <p class="footer-newsletter-title">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18" style="display:inline;vertical-align:middle;margin-right:6px;color:#2F73F2"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            Stay Updated
          </p>
          <p class="footer-newsletter-desc">Get the latest sourcing tips, trade news, and exclusive deals from China delivered to your inbox.</p>

          <form class="footer-newsletter-form" id="footer-newsletter-form" onsubmit="handleNewsletterSubmit(event)">
            <div class="footer-newsletter-input-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              <input
                type="email"
                class="footer-newsletter-input"
                id="footer-newsletter-email"
                placeholder="Enter your email address"
                required
              />
            </div>
            <button type="submit" class="footer-newsletter-btn" id="footer-newsletter-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              Subscribe Now
            </button>
            <div class="footer-newsletter-success" id="footer-newsletter-success">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              You're subscribed! Thank you.
            </div>
          </form>
        </div>
      </div>

    </div>
  </div>

  <!-- Bottom bar -->
  <div style="border-top: 1px solid rgba(255,255,255,0.05); position:relative; z-index:2;">
    <div class="footer-bottom">
      <p class="footer-copyright">
        &copy; <span id="footer-year"></span> <a href="/">Elbildad Services Ltd</a>. All rights reserved.
      </p>
      <div class="footer-bottom-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="/contact">Support</a>
      </div>
    </div>
  </div>
</footer>

<script>
  // Set current year
  document.getElementById('footer-year').textContent = new Date().getFullYear();

  // Newsletter submit
  function handleNewsletterSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('footer-newsletter-btn');
    const success = document.getElementById('footer-newsletter-success');

    btn.disabled = true;
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg> Subscribing...';

    setTimeout(() => {
      document.querySelector('.footer-newsletter-input-wrap').style.display = 'none';
      btn.style.display = 'none';
      success.style.display = 'flex';
    }, 1000);
  }

  // ---- MutationObserver-based footer replacement ----
  // Hide React's footer immediately via CSS
  var style = document.createElement('style');
  style.textContent = 'footer:not(#elbildad-footer) { display: none !important; }';
  document.head.appendChild(style);

  var ourFooter = document.getElementById('elbildad-footer');
  ourFooter.style.display = 'block'; // ensure ours is always visible

  function ensureFooterPlaced() {
    // Make sure our footer is the last element in the main content
    var existing = document.getElementById('elbildad-footer');
    if (!existing) return;
    // If it's hidden inside a React wrapper that React removed, re-append it to body
    if (!document.body.contains(existing)) {
      document.body.appendChild(existing);
    }
    existing.style.display = 'block';
  }

  // Run on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', ensureFooterPlaced);

  // Use MutationObserver to catch when React finishes hydrating
  var observer = new MutationObserver(function() {
    ensureFooterPlaced();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Stop observing after 10 seconds
  setTimeout(function() { observer.disconnect(); }, 10000);

  // ---- Mobile Menu Fix ----
  // React's scroll handler changes header opacity, making the drawer transparent.
  // We continuously enforce styles and ensure the drawer is visible and opaque.
  (function() {
    var menuOpen = false;
    var enforceInt = null;

    function getDrawer() {
      return document.querySelector('header div[class*="max-w-xs"]')
          || document.querySelector('header .lg\\:hidden.fixed')
          || document.getElementById('elbildad-mobile-drawer');
    }

    var COMMON_STYLES = {
      position: 'fixed', top: '0', right: '0',
      height: '100vh', width: '100%', maxWidth: '320px',
      backgroundColor: '#ffffff', opacity: '1', zIndex: '10000',
      display: 'flex', flexDirection: 'column',
    };

    function enforceDrawerStyles() {
      var drawer = getDrawer();
      if (!drawer) return;

      // Check if it's open based on transform or React classes
      var style = window.getComputedStyle(drawer);
      var transform = style.transform || style.webkitTransform;
      var isOpen = (transform === 'none' || transform.indexOf('matrix(1, 0, 0, 1, 0, 0)') !== -1);
      
      // If we can't tell from transform, check if it doesn't have translate-x-full
      if (drawer.classList.contains('translate-x-0')) isOpen = true;
      if (drawer.classList.contains('translate-x-full')) isOpen = false;

      Object.keys(COMMON_STYLES).forEach(function(k) {
        drawer.style[k] = COMMON_STYLES[k];
      });

      if (isOpen) {
        drawer.style.transform = 'translateX(0)';
        drawer.style.boxShadow = '-4px 0 32px rgba(0,0,0,0.25)';
        // Also force parent header to be opaque
        var header = drawer.closest('header');
        if (header) {
          header.style.opacity = '1';
          header.style.backdropFilter = 'none';
          header.style.backgroundColor = '#ffffff';
        }
      } else {
        drawer.style.transform = 'translateX(100%)';
        drawer.style.boxShadow = 'none';
      }
    }

    function bindButtons() {
      var openBtn  = document.querySelector('header button[aria-label="Toggle mobile menu"]');
      var closeBtn = document.querySelector('header button[aria-label="Close mobile menu"]') || 
                     (getDrawer() ? getDrawer().querySelector('button[aria-label="Close mobile menu"]') : null);

      if (openBtn && !openBtn._elbildadBound) {
        openBtn._elbildadBound = true;
        openBtn.addEventListener('click', function() {
          setTimeout(enforceDrawerStyles, 50);
          if (!enforceInt) enforceInt = setInterval(enforceDrawerStyles, 100);
        });
      }

      if (closeBtn && !closeBtn._elbildadBound) {
        closeBtn._elbildadBound = true;
        closeBtn.addEventListener('click', function() {
          setTimeout(enforceDrawerStyles, 50);
        });
      }
    }

    function init() {
      enforceDrawerStyles();
      bindButtons();
    }

    document.addEventListener('DOMContentLoaded', init);
    if (document.readyState !== 'loading') init();

    // Run periodically to catch React changes
    setInterval(init, 1000);
    // Also run on scroll
    window.addEventListener('scroll', enforceDrawerStyles, { passive: true });
  })();
</script>
