# 📱 TikTok Services High-Converting Order Portal

Created in: `c:\Users\pc\Documents\services\tiktok\`

## 🌟 Key Features
- **Dynamic Conditional Sub-Dropdowns**:
  - `TikTok Monetized Account` ➔ Automatically shows: UK, USA, Germany, France, Canada.
  - `Fresh TikTok Account` ➔ Automatically shows: UK, USA, Germany.
  - `TikTok Followers, Likes & Views` ➔ Automatically shows: 1k to 10k, 10k to 20k, 50k+ tiers.
  - `TikTok ForYou Boost` & `TikTok Ads` ➔ Clean single selections without extra clutter.
- **Telegram Bot Live Lead Alert**: Lead aate hi tumhare Telegram par notification push hoga with complete order info.
- **Instant WhatsApp Redirection (`03184780005`)**: Pre-filled emoji-formatted WhatsApp message ready to send.
- **In-App Browser Ready**: TikTok aur Facebook ke internal browser crash/drop-off se safe deep linking.
- **Meta / TikTok Pixel Ready**: Automatic `Lead` aur `SubmitForm` event hooks.

---

## 🤖 Telegram Bot Setup (Jab tumhare paas token ho)
`app.js` ki line 12-13 open karein:
```javascript
const CONFIG = {
  WHATSAPP_PHONE: '923184780005',
  TELEGRAM_BOT_TOKEN: 'YOUR_BOT_TOKEN_HERE', // Telegram @BotFather se token lein
  TELEGRAM_CHAT_ID: 'YOUR_CHAT_ID_HERE',     // @userinfobot se apni chat ID lein
};
```
*(Abhi token na bhi dalo toh bhi form safely direct WhatsApp par redirect karega bina ruke!)*

---

## 🚀 How to Preview in Browser
Tum direct `index.html` par double-click karke browser mein check kar sakte ho!
