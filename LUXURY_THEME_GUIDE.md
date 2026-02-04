# Luxury Dark Gold Theme Guide

## Color Palette

### Primary Colors
- **Deep Black Background**: `#0a0a0a` (primary), `#000000` (pure), `#111111` (card background)
- **Main Gold**: `#D4AF37` - Classic luxurious gold (use for primary CTAs, icons, section titles)
- **Secondary Gold**: `#C9A96E` - Brushed/matte gold (use for accents, borders)
- **Light Gold**: `#E8C670` - Softer gold (use for hover states)
- **Lighter Gold**: `#F5D5A3` - Very soft gold (subtle backgrounds, gradients)
- **Warm Gold**: `#B89778` - Warm undertone (text on black, borders)

### Neutrals
- **Text Primary**: `#ffffff` (95% opacity for warmth = #f2f2f2)
- **Text Secondary**: `#cccccc` (muted foreground)
- **Charcoal**: `#1a1a1a` (muted backgrounds)
- **Dark Gray**: `#0f0f0f` (inputs, cards)

## Design Rules

### Coverage
- 90-95% deep black/charcoal
- 5-10% gold accents (very sparingly)
- High contrast (WCAG AA/AAA compliant)

### Usage by Element

#### Primary Buttons (CTAs)
```css
.luxury-btn-gold {
  background: linear-gradient(135deg, #D4AF37, #C9A96E);
  color: #0a0a0a;
  border: 1px solid #E8C670;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.luxury-btn-gold:hover {
  background: linear-gradient(135deg, #E8C670, #D4AF37);
  box-shadow: 0 0 30px rgba(212, 175, 55, 0.25);
  transform: translateY(-2px);
}
```

#### Secondary Buttons (Outline)
```css
.luxury-btn-outline {
  background: transparent;
  color: #D4AF37;
  border: 1.5px solid #D4AF37;
}

.luxury-btn-outline:hover {
  background: rgba(212, 175, 55, 0.1);
  border-color: #E8C670;
  color: #E8C670;
}
```

#### Cards
```css
.luxury-card {
  background-color: #111111;
  border: 1px solid rgba(212, 175, 55, 0.15);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  border-radius: 0.875rem;
}

.luxury-card:hover {
  border-color: rgba(212, 175, 55, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4), 0 0 20px rgba(212, 175, 55, 0.15);
}
```

#### Input Fields
```css
input, textarea, select {
  background-color: #0f0f0f;
  border: 1px solid rgba(212, 175, 55, 0.15);
  color: #e5e5e5;
}

input:focus {
  border-color: #D4AF37;
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
}
```

#### Gold Text
- **Headings**: `#D4AF37` (70-80px+, bold)
- **Subheadings**: `#C9A96E` (40-70px, semibold)
- **Body Links**: `#D4AF37` with elegant underline on hover
- **Accent Text**: `#E8C670` (softer, for secondary emphasis)

#### Borders & Dividers
- **Primary Gold Border**: `1px solid rgba(212, 175, 55, 0.3)` (visible accent borders)
- **Subtle Gold Border**: `1px solid rgba(212, 175, 55, 0.15)` (card edges, form inputs)
- **Gold Divider**: `border-bottom: 2px solid rgba(212, 175, 55, 0.15)`

#### Progress Bars
```css
.luxury-progress {
  background-color: #1a1a1a;
  height: 8px;
  border-radius: 9999px;
  overflow: hidden;
}

.luxury-progress::after {
  background: linear-gradient(90deg, #C9A96E, #D4AF37, #E8C670);
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.15);
}
```

### Shadows & Depth
- **Elegant Shadow**: `0 4px 12px rgba(0, 0, 0, 0.4)` (cards, buttons)
- **Soft Shadow**: `0 2px 8px rgba(0, 0, 0, 0.3)` (subtle elements)
- **Gold Glow**: `0 0 20px rgba(212, 175, 55, 0.15)` (on hover)
- **Strong Glow**: `0 0 30px rgba(212, 175, 55, 0.25)` (focus, active)

### Transitions
- **Standard**: `transition: all 0.3s ease;`
- **Hover**: Slight scale (scale-105), glow increase, color shift
- **Focus**: Strong glow + subtle scale + darker background

### Font Stack
```css
font-family: 'Inter', 'system-ui', '-apple-system', 'Segoe UI', sans-serif;
/* Headings: Add 'Georgia' or serif as fallback for luxury feel */
```

### No-Go Elements
- ❌ Bright yellow (#FFD700)
- ❌ Orange-gold tones
- ❌ Rainbow gradients
- ❌ Neon effects
- ❌ Heavy neumorphism
- ❌ Excessive sparkles/shines
- ❌ Clutter or busy patterns

## Micro-interactions

### Button Hover
1. Color shift: Gold → Light Gold
2. Slight scale up: `transform: translateY(-2px)`
3. Glow increase: Box-shadow enhancement
4. Text slight bold (optical adjustment)

### Link Hover
1. Color shift: Main Gold → Light Gold
2. Elegant underline animates from left to right
3. Soft glow appears

### Input Focus
1. Border color: Subtle gold → Main gold
2. Glow appears
3. Background slightly lighter
4. Cursor is clearly visible

### Card Hover
1. Border becomes more visible (opacity increase)
2. Shadow increases (subtle depth)
3. Slight glow appears
4. No scale change (professional, not playful)

## Component Examples

### Hero Section
```html
<section class="luxury-section bg-black py-20">
  <div class="text-center">
    <h1 class="luxury-gradient-text text-5xl font-bold mb-4">
      Timeless Elegance
    </h1>
    <p class="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
      Experience luxury refined to its essence. Simple, sophisticated, unforgettable.
    </p>
    <button class="luxury-btn-gold">
      Explore Now
    </button>
  </div>
</section>
```

### Feature Card
```html
<div class="luxury-card max-w-sm">
  <h3 class="gold-text text-2xl font-semibold mb-2">Premium Features</h3>
  <p class="text-gray-400 mb-4">
    Crafted with attention to every detail.
  </p>
  <a href="#" class="luxury-link">Learn more →</a>
</div>
```

### Form
```html
<form class="space-y-6">
  <div>
    <label class="block text-sm font-medium gold-text mb-2">
      Full Name
    </label>
    <input 
      type="text" 
      class="w-full bg-neutral-950 border border-gold-border-subtle rounded-lg px-4 py-3"
      placeholder="Enter your name"
    />
  </div>
  <button type="submit" class="luxury-btn-gold w-full">
    Continue
  </button>
</form>
```

### Navigation Bar
```html
<nav class="bg-black border-b border-gold-divider px-6 py-4">
  <div class="flex justify-between items-center">
    <h1 class="luxury-gradient-text text-2xl font-bold">Brand</h1>
    <ul class="flex gap-8">
      <li><a href="#" class="luxury-link">Home</a></li>
      <li><a href="#" class="luxury-link">Services</a></li>
      <li><a href="#" class="luxury-link">Contact</a></li>
    </ul>
  </div>
</nav>
```

## Tailwind CSS Classes Available

### Quick Classes
- `luxury-btn-gold`, `gold-btn`, `primary-btn` - Primary action buttons
- `luxury-btn-outline`, `outline-btn` - Secondary outline buttons
- `luxury-card`, `gold-card` - Standard cards
- `luxury-card-premium` - Premium cards with gradient
- `gold-text` - Gold text (#D4AF37)
- `gold-text-light` - Light gold (#E8C670)
- `gold-text-warm` - Warm gold (#C9A96E)
- `luxury-gradient-text` - Gradient text effect
- `gold-border`, `gold-border-subtle` - Border classes
- `gold-divider`, `gold-divider-accent` - Dividers
- `luxury-badge`, `luxury-badge-solid` - Badge elements
- `luxury-progress` - Progress bars with gold gradient
- `luxury-glass` - Glass-morphism elements
- `gold-glow`, `gold-glow-strong` - Glow effects
- `animate-gold-pulse`, `animate-gold-shimmer` - Gold animations
- `luxury-section`, `luxury-section-accent` - Section backgrounds
- `luxury-table` - Table styling
- `luxury-modal`, `luxury-modal-content` - Modal styling

## Accessibility Notes

✅ **WCAG Compliance**
- Gold text on black meets AA standard for text size 18px+
- Gold on black meets AAA for text size 24px+
- All interactive elements have clear focus states
- Color is never the only indicator (always supplement with icons/text)

## Implementation Tips

1. **Start with Base Colors**: All elements inherit from CSS variables in `:root`
2. **Use Utility Classes**: Leverage `.luxury-*` classes for consistency
3. **Gradients Over Flat**: Use subtle gradients for buttons and headings
4. **Restraint is Key**: Gold should accent, not dominate
5. **Whitespace**: Generous padding and margins (min 1.5rem sections)
6. **Typography**: Use bold, large gold text for headings; restrained for body
7. **Micro-interactions**: Smooth transitions (300ms) for all hover/focus states
8. **Shadows**: Soft shadows create depth without visual clutter

## Color Reference

| Element | Primary | Hover | Active |
|---------|---------|-------|--------|
| Button | #D4AF37 | #E8C670 | #C9A96E |
| Link | #D4AF37 | #E8C670 | #C9A96E |
| Text | #D4AF37 | #E8C670 | - |
| Border | rgba(212,175,55,0.15) | rgba(212,175,55,0.3) | rgba(212,175,55,0.4) |
| Background | #0a0a0a | #111111 | #1a1a1a |

---

**Theme Created**: 2026-02-04  
**Standard**: WCAG AA/AAA Compliant  
**Aesthetic**: Sophisticated dark luxury, timeless elegance, quiet confidence
