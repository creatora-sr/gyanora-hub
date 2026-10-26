# 🧪 Gyanora Hub — Test Report & Evidence

**Date:** 26 Oct 2026
**Test runner:** Playwright 1.64.1 (headless Chromium) — `tests/e2e-test.mjs`
**Base URL (local):** `http://localhost:8765/index.html`
**Live URL (GitHub Pages):** https://creatora-sr.github.io/gyanora-hub/
**Repository:** https://github.com/creatora-sr/gyanora-hub
**Formspree endpoint:** https://formspree.io/f/xeaaagae

## Test suite ko kaise chalayein

```bash
# 1. Local server chalu karein
python -m http.server 8765

# 2. Dusre terminal mein test suite chalayein
cd tests && npm install        # pehli baar
cd .. && node tests/e2e-test.mjs
```

Results `test-evidence/test-results.json` mein aur screenshots isi folder mein save hote hain.

## ✅ Results: 14/14 PASS

| ID | Test Case | Expected | Result | Evidence |
|----|-----------|----------|--------|----------|
| TC-01 | Page loads with correct title | Title = "Gyanora Hub — ज्ञान से सफलता तक का सफर" | ✅ PASS | `01-hero-background-cursor.png` |
| TC-02 | Favicon (site icon) linked | `<link rel="icon" href="logo.jpeg">` present | ✅ PASS | browser tab icon |
| TC-03 | Animated particle background renders | Canvas painted with gold/blue nodes + lines | ✅ PASS | `01-hero-background-cursor.png` |
| TC-04 | Hero floating glow orbs | 2 blurred floating orbs | ✅ PASS | `01-hero-background-cursor.png` |
| TC-05 | Custom cursor (gold dot + ring) follows mouse | `html.custom-cursor` + dot transform tracks mouse | ✅ PASS | `01-hero-background-cursor.png` (dot+ring visible) |
| TC-06 | Sparkle trail on mouse move | Sparkle particles spawn | ✅ PASS | `01-hero-background-cursor.png` |
| TC-07 | Cursor ring grows on link hover | `.cursor-ring.hovering` on hover | ✅ PASS | — |
| TC-08 | Phone/Email/WhatsApp direct-open links all have icons | tel:4/4, mailto:2/2, wa.me:4/4 with icons | ✅ PASS | `05-contact-direct-icons.png`, `06-footer-icons.png` |
| TC-09 | Services tabs switch content | Web Dev tab shows, AI tab hides | ✅ PASS | `02-services-tab-switch.png` |
| TC-10 | Mobile menu opens & closes (390×844 viewport) | Menu toggles both ways | ✅ PASS | `03-mobile-menu-open.png` |
| TC-11 | Contact form → Formspree live submission | HTTP 200 + "धन्यवाद!" success box + form reset | ✅ PASS | `04-form-success-formspree.png` |
| TC-12 | Footer: every number/email has own direct-open icon | ≥5 icons in footer contact chips | ✅ PASS (5 icons) | `06-footer-icons.png` |
| TC-13 | `logoFallback()` icon replacement defined | function exists; broken logo → graduation-cap icon | ✅ PASS | — |
| TC-14 | No JavaScript console errors | 0 errors | ✅ PASS | `test-results.json` |

## 📸 Evidence files (test-evidence/)

| File | Dikhata hai |
|------|-------------|
| `01-hero-background-cursor.png` | Hero + particle background + glow orbs + custom cursor (gold dot + ring) + sparkles |
| `02-services-tab-switch.png` | Services section — "Web Dev" tab active, content switched |
| `03-mobile-menu-open.png` | Mobile viewport (390×844) mein khula hua menu |
| `04-form-success-formspree.png` | Form submit ke baad Formspree success message ("धन्यवाद!") |
| `05-contact-direct-icons.png` | Contact section — Call / WhatsApp / Email direct-open icon tiles |
| `06-footer-icons.png` | Footer — har number/email ke saath apna direct-open icon chip |
| `test-results.json` | Machine-readable results (timestamp + har TC ka status) |

## 🔗 Direct-open icons ka matrix

> Note: Phone numbers ab **icon-only** hain — click karne par directly dialer/WhatsApp khulta hai, par number UI par nahi dikhta (accessibility ke liye `title`/`aria-label` mein number rakha gaya hai).

| Jagah | Call (tel:) | WhatsApp (wa.me) | Email (mailto:) |
|-------|-------------|------------------|-----------------|
| Contact section tiles | ✅ 2 | ✅ 2 | ✅ 1 |
| Footer chips | ✅ 2 | ✅ 2 | ✅ 1 |
| Floating action buttons (React app) | ✅ 2 | ✅ 1 | ✅ 1 |
| Streamlit app (app.py) | ✅ 2 | ✅ 2 | ✅ 1 |

## 🚀 Deployment

- **Repo:** https://github.com/creatora-sr/gyanora-hub (public, branch `main`)
- **GitHub Pages:** https://creatora-sr.github.io/gyanora-hub/ (source: `main` / root)
- Commit history mein poora code + tests + evidence shamil hai.

## 📬 Formspree

- Form ID: `xeaaagae`
- Submissions: https://formspree.io/forms/xeaaagae/submissions
- Test entries ("Automated Test TC-11" naam se) dashboard mein milengi — delete kar sakte hain.
