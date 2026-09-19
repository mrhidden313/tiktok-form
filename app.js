/**
 * TikTok Order Portal - Dynamic Core Engine
 * Integrations: Telegram Bot Notification API + WhatsApp Deep-Link Redirect
 */

// ==========================================
// ⚙️ CONFIGURATION & CREDENTIALS
// ==========================================
const CONFIG = {
  // WhatsApp Number (Country code 92 for Pakistan)
  WHATSAPP_PHONE: '923184780005',

  // Cloudflare Worker Proxy (Bypasses Pakistan PTA firewall, 100% delivery)
  WORKER_URL: 'https://gentle-tooth-3572.farmantechnique.workers.dev',

  // Active Telegram Bot Credentials (Fallback)
  TELEGRAM_BOT_TOKEN: '8728623263:AAE6N7GpAVC5Eq0dFgDrmtQpMXd7v5L3uMw',
  TELEGRAM_CHAT_ID: '6977346652',
};

// ==========================================
// 📦 DYNAMIC SERVICE SUB-OPTIONS DEFINITIONS
// ==========================================
const SUB_OPTIONS_MAP = {
  monetized_acc: {
    label: 'Select Country (Monetized Account):',
    isQuantity: false,
    options: [
      { value: 'UK Monetized Account', text: '🇬🇧 UK (United Kingdom) Account' },
      { value: 'USA Monetized Account', text: '🇺🇸 USA (United States) Account' },
      { value: 'Germany Monetized Account', text: '🇩🇪 Germany Account' },
      { value: 'France Monetized Account', text: '🇫🇷 France Account' },
      { value: 'Canada Monetized Account', text: '🇨🇦 Canada Account' },
    ]
  },
  fresh_acc: {
    label: 'Select Region (Fresh Account):',
    isQuantity: false,
    options: [
      { value: 'UK Fresh Account', text: '🇬🇧 UK Fresh Account' },
      { value: 'USA Fresh Account', text: '🇺🇸 USA Fresh Account' },
      { value: 'Germany Fresh Account', text: '🇩🇪 Germany Fresh Account' },
    ]
  },
  followers: {
    label: 'Kitne Followers Chahiye? (Quantity):',
    isQuantity: true,
    placeholder: 'e.g. 5,000 Followers',
    options: [
      { value: '1,000 Followers', text: '⚡ 1,000 Followers' },
      { value: '2,500 Followers', text: '⚡ 2,500 Followers' },
      { value: '5,000 Followers', text: '🔥 5,000 Followers' },
      { value: '10,000 Followers', text: '🚀 10,000 Followers' },
      { value: '25,000 Followers', text: '💎 25,000 Followers' },
      { value: '50,000+ Followers', text: '👑 50,000+ Followers (Celebrity Tier)' },
      { value: 'CUSTOM', text: '✏️ Custom Quantity (Apni marzi se number likhein)' },
    ]
  },
  likes: {
    label: 'Kitne Likes Chahiye? (Quantity):',
    isQuantity: true,
    placeholder: 'e.g. 10,000 Likes',
    options: [
      { value: '1,000 Likes', text: '❤️ 1,000 Video Likes' },
      { value: '2,500 Likes', text: '❤️ 2,500 Video Likes' },
      { value: '5,000 Likes', text: '🔥 5,000 Video Likes' },
      { value: '10,000 Likes', text: '🚀 10,000 Video Likes' },
      { value: '25,000 Likes', text: '💎 25,000 Video Likes' },
      { value: '50,000+ Likes', text: '👑 50,000+ Video Likes' },
      { value: 'CUSTOM', text: '✏️ Custom Quantity (Apni marzi se number likhein)' },
    ]
  },
  views: {
    label: 'Kitne Views Chahiye? (Quantity):',
    isQuantity: true,
    placeholder: 'e.g. 100,000 Views',
    options: [
      { value: '10,000 Views', text: '👁️ 10,000 Video Views' },
      { value: '50,000 Views', text: '👁️ 50,000 Video Views' },
      { value: '100,000 Views', text: '🔥 100,000 Video Views' },
      { value: '500,000 Views', text: '🚀 500,000 Video Views' },
      { value: '1,000,000+ Views', text: '👑 1,000,000+ (1 Million) Views' },
      { value: 'CUSTOM', text: '✏️ Custom Quantity (Apni marzi se number likhein)' },
    ]
  }
};

// ==========================================
// 🎯 DOM ELEMENTS
// ==========================================
const form = document.getElementById('orderForm');
const primaryServiceSelect = document.getElementById('primaryService');
const subServiceGroup = document.getElementById('subServiceGroup');
const subServiceLabel = document.getElementById('subServiceLabel');
const subServiceOption = document.getElementById('subServiceOption');
const customQtyWrapper = document.getElementById('customQtyWrapper');
const customQuantityInput = document.getElementById('customQuantityInput');
const submitBtn = document.getElementById('submitBtn');

// ==========================================
// 🔄 DYNAMIC SUB-DROPDOWN LOGIC
// ==========================================
primaryServiceSelect.addEventListener('change', (e) => {
  const selectedService = e.target.value;
  clearError(primaryServiceSelect);

  // Reset custom qty wrapper
  customQtyWrapper.style.display = 'none';
  customQuantityInput.value = '';

  if (SUB_OPTIONS_MAP[selectedService]) {
    const config = SUB_OPTIONS_MAP[selectedService];
    
    // Set Dynamic Label
    subServiceLabel.innerHTML = `
      <svg class="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
      ${config.label}
    `;

    // Populate Sub-Dropdown
    subServiceOption.innerHTML = `<option value="" disabled selected>Select Specific Option</option>`;
    config.options.forEach(opt => {
      const optionEl = document.createElement('option');
      optionEl.value = opt.value;
      optionEl.textContent = opt.text;
      subServiceOption.appendChild(optionEl);
    });

    if (config.placeholder) {
      customQuantityInput.placeholder = config.placeholder;
    }

    // Reveal Sub Dropdown
    subServiceGroup.style.display = 'flex';
    subServiceOption.setAttribute('required', 'required');
  } else {
    // Hide and reset if no sub-options exist (e.g. ForYou Boost / TikTok Ads)
    subServiceGroup.style.display = 'none';
    subServiceOption.removeAttribute('required');
    subServiceOption.innerHTML = '';
    clearError(subServiceOption);
  }
});

// Watch Sub-Dropdown for "CUSTOM" selection
subServiceOption.addEventListener('change', (e) => {
  clearError(subServiceOption);
  if (e.target.value === 'CUSTOM') {
    customQtyWrapper.style.display = 'block';
    customQuantityInput.focus();
  } else {
    customQtyWrapper.style.display = 'none';
    customQuantityInput.value = '';
  }
});

// ==========================================
// 🛡️ VALIDATION HELPERS
// ==========================================
function setError(inputElement, hasError) {
  const parent = inputElement.closest('.field-group');
  if (!parent) return;
  if (hasError) {
    parent.classList.add('has-error');
  } else {
    parent.classList.remove('has-error');
  }
}

function clearError(inputElement) {
  setError(inputElement, false);
}

// Clear errors on input/change
['fullName', 'whatsappNumber', 'city', 'primaryService', 'subServiceOption', 'customQuantityInput', 'budget'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', () => clearError(el));
    el.addEventListener('change', () => clearError(el));
  }
});

function validateForm(data) {
  let isValid = true;

  if (!data.fullName || data.fullName.trim().length < 2) {
    setError(document.getElementById('fullName'), true);
    isValid = false;
  }

  // Clean phone string
  const cleanPhone = (data.whatsappNumber || '').replace(/\D/g, '');
  if (cleanPhone.length < 10) {
    setError(document.getElementById('whatsappNumber'), true);
    isValid = false;
  }

  if (!data.city) {
    setError(document.getElementById('city'), true);
    isValid = false;
  }

  if (!data.primaryService) {
    setError(document.getElementById('primaryService'), true);
    isValid = false;
  }

  // If sub-service is visible, validate it
  if (subServiceGroup.style.display !== 'none') {
    if (!data.subServiceOptionRaw) {
      setError(document.getElementById('subServiceOption'), true);
      isValid = false;
    } else if (data.subServiceOptionRaw === 'CUSTOM' && (!data.customQuantity || data.customQuantity.trim().length === 0)) {
      setError(document.getElementById('subServiceOption'), true);
      isValid = false;
    }
  }

  if (!data.budget) {
    setError(document.getElementById('budget'), true);
    isValid = false;
  }

  return isValid;
}

// ==========================================
// 🚀 TELEGRAM DISPATCHER (NON-BLOCKING WITH KEEPALIVE)
// ==========================================
function sendToTelegram(data) {
  // Save local backup immediately (Zero lead loss)
  try {
    const existing = JSON.parse(localStorage.getItem('instant_leads') || '[]');
    existing.push({ ...data, timestamp: new Date().toISOString() });
    localStorage.setItem('instant_leads', JSON.stringify(existing));
  } catch (e) {
    // Ignore storage errors
  }

  // 1. Primary Route: Send to Cloudflare Worker Proxy with keepalive
  if (CONFIG.WORKER_URL) {
    fetch(CONFIG.WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: data.fullName,
        whatsappNumber: data.whatsappNumber,
        city: data.city,
        service: data.serviceDisplayName,
        requirement: data.finalRequirement,
        budget: data.budget,
      }),
      keepalive: true, // <--- CRITICAL: Prevents browser from killing request on redirect!
    }).catch(err => {
      console.warn('Worker fetch error:', err);
    });
  }

  // 2. Parallel Direct Telegram Fallback (Only if token is provided)
  if (CONFIG.TELEGRAM_BOT_TOKEN && CONFIG.TELEGRAM_CHAT_ID) {
    const telegramMsg = 
`🔥 <b>NEW TIKTOK ORDER RECEIVED!</b>
━━━━━━━━━━━━━━━━━━━━
👤 <b>Client Name:</b> ${escapeHtml(data.fullName)}
📱 <b>WhatsApp:</b> ${escapeHtml(data.whatsappNumber)}
📍 <b>City:</b> ${escapeHtml(data.city)}
🎯 <b>Service:</b> ${escapeHtml(data.serviceDisplayName)}
${data.finalRequirement ? `📌 <b>Requirement / Qty:</b> ${escapeHtml(data.finalRequirement)}\n` : ''}💰 <b>Budget:</b> ${escapeHtml(data.budget)}
🕒 <b>Time:</b> ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' })} (PKT)
━━━━━━━━━━━━━━━━━━━━`;

    const url = `https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`;

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CONFIG.TELEGRAM_CHAT_ID,
        text: telegramMsg,
        parse_mode: 'HTML',
      }),
      keepalive: true,
    }).catch(err => {
      console.warn('Direct telegram fallback error:', err);
    });
  }
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ==========================================
// 📲 WHATSAPP REDIRECT BUILDER (UNIVERSAL)
// Supports BOTH Standard WhatsApp & WhatsApp Business
// ==========================================
function buildWhatsAppUrl(data) {
  const serviceDetail = data.finalRequirement 
    ? `${data.serviceDisplayName} (${data.finalRequirement})`
    : data.serviceDisplayName;

  // Ultra-clean, well-spaced CTA message ready to send
  const message = 
`🔥 *TIKTOK SERVICE ORDER INQUIRY* 🔥
━━━━━━━━━━━━━━━━━━━━

👤 *Client Name:* ${data.fullName.trim()}
📱 *Contact Number:* ${data.whatsappNumber.trim()}
📍 *City:* ${data.city}

🎯 *Selected Service:* ${serviceDetail}
💰 *Estimated Budget:* ${data.budget}

━━━━━━━━━━━━━━━━━━━━
🚀 *Assalam-o-Alaikum Instant Growth Team!*
*Maine form submit kiya hai. Kindly order confirmation aur details share karein.*`;

  // Standard API format triggers OS intent for both WhatsApp & WhatsApp Business
  return `https://api.whatsapp.com/send?phone=${CONFIG.WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;
}

// ==========================================
// 📋 HIGH-IQ CLIPBOARD COPY HANDLER
// ==========================================
const copyPhoneBtn = document.getElementById('copyPhoneBtn');
const copyBtnLabel = document.getElementById('copyBtnLabel');
const fallbackCard = document.getElementById('fallbackCard');

if (copyPhoneBtn) {
  copyPhoneBtn.addEventListener('click', async () => {
    const rawNumber = '03184780005';
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(rawNumber);
      } else {
        // Fallback for older mobile webviews
        const tempInput = document.createElement('input');
        tempInput.value = rawNumber;
        tempInput.style.position = 'fixed';
        tempInput.style.opacity = '0';
        document.body.appendChild(tempInput);
        tempInput.focus();
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }

      copyBtnLabel.textContent = 'Copied! ✅';
      copyPhoneBtn.classList.add('copied');
      setTimeout(() => {
        copyBtnLabel.textContent = 'Copy Number';
        copyPhoneBtn.classList.remove('copied');
      }, 2500);
    } catch (err) {
      console.warn('Clipboard write failed:', err);
      copyBtnLabel.textContent = '0318 4780005';
    }
  });
}

// ==========================================
// 🎯 SUBMISSION HANDLER (INSTANT 700MS FAST-REDIRECT)
// ==========================================
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const subOptionRaw = formData.get('subServiceOption') || '';
  const customQty = formData.get('customQuantityInput') || '';

  // Determine final requirement text (preset or custom quantity)
  let finalRequirement = subOptionRaw;
  if (subOptionRaw === 'CUSTOM' && customQty.trim()) {
    finalRequirement = `Custom Qty: ${customQty.trim()}`;
  }

  const data = {
    fullName: formData.get('fullName') || '',
    whatsappNumber: formData.get('whatsappNumber') || '',
    city: formData.get('city') || '',
    primaryService: formData.get('primaryService') || '',
    subServiceOptionRaw: subOptionRaw,
    customQuantity: customQty,
    finalRequirement: finalRequirement,
    budget: formData.get('budget') || '',
    serviceDisplayName: primaryServiceSelect.options[primaryServiceSelect.selectedIndex]?.text || ''
  };

  if (!validateForm(data)) {
    // Scroll to first error on mobile
    const firstError = document.querySelector('.has-error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  // 1. Trigger Tactile Loading State & Reveal Fallback Card
  submitBtn.classList.add('is-submitting');
  if (fallbackCard) {
    fallbackCard.classList.add('show-fallback');
  }

  // 2. Meta / TikTok Pixel Track Event (If installed)
  try {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', { content_name: data.serviceDisplayName, value: data.budget });
    }
    if (typeof window.ttq === 'object' && typeof window.ttq.track === 'function') {
      window.ttq.track('SubmitForm', { content_name: data.serviceDisplayName });
    }
  } catch (pixelErr) {
    console.warn('Pixel tracking error (non-fatal):', pixelErr);
  }

  // 3. Dispatch to Telegram (Fire-and-forget with keepalive - NEVER blocks the user!)
  sendToTelegram(data);

  // 4. Prepare Universal WhatsApp Deep Link
  const whatsappUrl = buildWhatsAppUrl(data);

  // 5. Crisp, Snappy 700ms UI animation (Zero 20-second lag!)
  await new Promise((resolve) => setTimeout(resolve, 700));

  // 6. Instant Redirect to WhatsApp (Regular or Business)
  window.location.href = whatsappUrl;

  // 7. Safety timeout: If user remains on page after 2.5s (meaning WhatsApp app failed to launch)
  setTimeout(() => {
    submitBtn.classList.remove('is-submitting');
    if (fallbackCard) {
      fallbackCard.classList.add('highlight-fallback');
    }
  }, 2500);
});
