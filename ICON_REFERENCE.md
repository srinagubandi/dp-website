# DocPropel Website - Icon Reference Guide

This document lists all icons used on the website and explains how to swap them out.

---

## Quick Reference: Icon Locations

| Icon Name | File Path | Used On |
|-----------|-----------|---------|
| Doctor Icon | `/images/icon-doctor-v2.png` | Home, Services, Footer |
| Dentist Icon | `/images/icon-dentist-v2.png` | Home, Services, Footer |
| Pharmacy Icon | `/images/icon-pharmacy-v2.png` | Home, Services, Footer |
| PT/OT Icon | `/images/icon-pt-v2.png` | Home, Services, Footer |
| AI Icon | `/images/icon-ai-v2.png` | Home, Services |
| Performance Icon | `/images/icon-performance-v2.png` | Home, Services |
| Target Icon | `/images/icon-target-v2.png` | Home, Services |
| Handshake Icon | `/images/icon-handshake-v2.png` | Home, Services |
| Shield/Trust Icon | `/images/icon-shield-trust.png` | Home, Services |
| Growth Chart Icon | `/images/icon-growth-chart.png` | Home, Services |
| ROI Calculator Icon | `/images/icon-roi-calculator.png` | Home |
| Main Logo | `/images/logo.png` | Header, Footer |

---

## How to Swap an Icon

### Step 1: Prepare Your New Icon
- **Recommended size:** 512x512 pixels (will be scaled down)
- **Format:** PNG with transparent background
- **Colors:** Use brand colors (Blue #0066B3, Orange #F7941D)

### Step 2: Upload the New Icon
1. Navigate to: `client/public/images/`
2. Replace the existing file OR upload with a new name

### Step 3: Update the Code (if using a new filename)
If you used a new filename, update the path in these files:

**For Specialty Icons (Doctor, Dentist, Pharmacy, PT/OT):**
- `client/src/pages/Home.tsx` - Lines 21-26 (specialties array)
- `client/src/pages/Home.tsx` - Lines 108-132 (specialty cards)
- `client/src/pages/Services.tsx`
- `client/src/pages/Results.tsx`

**For Feature Icons (AI, Performance, Target, etc.):**
- `client/src/pages/Home.tsx` - Lines 176-200 (AI Advantage section)
- `client/src/pages/Home.tsx` - Lines 351-382 (Services section)

---

## Detailed Icon Usage by Page

### HOME PAGE (Home.tsx)

#### Hero Section (Lines 21-26)
```javascript
const specialties = [
  { icon: "/images/icon-doctor-v2.png", name: "Doctors", desc: "Primary Care & Specialists" },
  { icon: "/images/icon-dentist-v2.png", name: "Dentists", desc: "General & Cosmetic" },
  { icon: "/images/icon-pharmacy-v2.png", name: "Pharmacies", desc: "Independent & Retail" },
  { icon: "/images/icon-pt-v2.png", name: "Physical Therapy / Occupational Therapy", desc: "Rehab & Therapy Clinics" },
];
```
**TO CHANGE:** Edit the `icon:` path for each specialty

#### Specialties Section (Lines 108-132)
Same icons as hero, displayed in larger cards with sub-items.
**TO CHANGE:** Edit the `icon:` path in each object

#### AI Advantage Section (Lines 176-200)
```javascript
{
  icon: "/images/icon-target-v2.png",      // Zero Wasted Ad Spend
  icon: "/images/icon-ai-v2.png",          // 24/7 Patient Capture
  icon: "/images/icon-performance-v2.png", // Automated Reactivation
}
```

#### How It Works Section (Lines 224-242)
```javascript
{
  icon: "/images/icon-shield-trust.png",   // Step 01: Deploy & Optimize
  icon: "/images/icon-growth-chart.png",   // Step 02: Deliver Patients
  icon: "/images/icon-roi-calculator.png", // Step 03: Pay for Performance
}
```

#### Services Section (Lines 351-382)
```javascript
{
  icon: "/images/icon-target-v2.png",      // Healthcare SEO
  icon: "/images/icon-performance-v2.png", // Paid Search
  icon: "/images/icon-ai-v2.png",          // Website Design
  icon: "/images/icon-shield-trust.png",   // Reputation Management
  icon: "/images/icon-handshake-v2.png",   // Social Media & Content
  icon: "/images/icon-growth-chart.png",   // Digital Brief
}
```

#### About Section (Lines 439-459)
```javascript
{
  icon: "/images/icon-handshake-v2.png",   // True Partnership
  icon: "/images/icon-shield-trust.png",   // HIPAA Compliant
  icon: "/images/icon-ai-v2.png",          // AI-Powered
  icon: "/images/icon-performance-v2.png", // Results-Driven
}
```

---

### LAYOUT (Layout.tsx)

#### Header Logo (Line ~80)
```javascript
<img src="/images/logo.png" alt="DocPropel" className="h-10 w-auto" />
```
**TO CHANGE:** Replace `/images/logo.png` with your new logo path

#### Footer Logo (Line ~130)
```javascript
<img src="/images/logo.png" alt="DocPropel" className="h-8 w-auto" />
```

#### Footer Specialty Icons (Lines ~230-240)
Uses SVG icons from `BrandIcons.tsx` component (not PNG files)

---

### SVG ICONS (BrandIcons.tsx)

The footer uses inline SVG icons defined in `client/src/components/BrandIcons.tsx`.

These are the original brand-colored SVG icons:
- `DoctorIcon` - Blue/Orange stethoscope design
- `DentistIcon` - Blue/Orange tooth design
- `PharmacyIcon` - Blue/Orange mortar & pestle design
- `PTOTIcon` - Blue/Orange therapy design

**TO MODIFY SVG ICONS:**
1. Open `client/src/components/BrandIcons.tsx`
2. Find the icon component you want to change
3. Edit the SVG paths or colors

**SVG Color Values:**
- Primary Blue: `#0066B3`
- Secondary Orange: `#F7941D`
- Light Blue: `#4A90D9`
- Light Orange: `#F9A94B`

---

## Icon Size Reference

| Context | Recommended Size | CSS Class |
|---------|------------------|-----------|
| Hero specialty cards | 56px | `size={56}` |
| Feature cards | 64px | `size={64}` |
| Small inline icons | 20px | `size={20}` |
| Footer icons | 14-20px | `size={14}` or `size={20}` |
| Badge icons | 20px (w-5 h-5) | `className="w-5 h-5"` |

---

## Adding a New Icon

1. **Create/obtain the icon** (512x512 PNG recommended)
2. **Save to:** `client/public/images/your-icon-name.png`
3. **Use in code:**
```javascript
<IconImage src="/images/your-icon-name.png" alt="Description" size={56} />
```

Or for simple img tag:
```javascript
<img src="/images/your-icon-name.png" alt="Description" className="w-14 h-14 object-contain" />
```

---

## Troubleshooting

**Icon not showing?**
- Check the file path starts with `/images/`
- Verify the file exists in `client/public/images/`
- Clear browser cache (Ctrl+Shift+R)

**Icon looks blurry?**
- Use a larger source image (512x512 minimum)
- Ensure PNG format with transparency

**Colors don't match brand?**
- Edit the icon in an image editor
- Use brand colors: Blue #0066B3, Orange #F7941D
