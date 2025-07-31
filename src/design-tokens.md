# My Tech Toolkit Design System

This document outlines the design tokens and theme system for "My Tech Toolkit" - a professional dark interface with precise color specification.

## Color Palette

### Primary Colors (Brand Blue System)
Based on the main accent color `#007AFF`:

- `primary-50`: `#e6f2ff` - Lightest blue
- `primary-100`: `#cce5ff` - Very light blue
- `primary-200`: `#99ccff` - Light blue
- `primary-300`: `#66b2ff` - Medium light blue
- `primary-400`: `#3399ff` - Medium blue
- `primary-500`: `#007AFF` - **Main brand blue** (Active/Highlight)
- `primary-600`: `#0066cc` - Medium dark blue
- `primary-700`: `#004d99` - Dark blue
- `primary-800`: `#003366` - Very dark blue
- `primary-900`: `#001a33` - Darkest blue
- `primary-950`: `#000d1a` - Nearly black blue

### Background Colors (Dark Theme System)
Professional dark interface backgrounds:

- `background-primary`: `#1A1A1D` - Main application background
- `background-secondary`: `#2D2D32` - Sidebar/panel background

### Border & Surface Colors
Subtle interface elements:

- `border-primary`: `#55555A` - Medium gray borders
- `border-secondary`: `#3A3A3F` - Subtle borders

### Text Colors
Clear text hierarchy:

- `text-primary`: `#FFFFFF` - Primary white text
- `text-secondary`: `#AAAAAA` - Muted gray text  
- `text-tertiary`: `#55555A` - Very muted text

## CSS Custom Properties

### Background Variables
```css
--color-bg-primary: #1A1A1D;    /* Main background */
--color-bg-secondary: #2D2D32;  /* Sidebar/panel background */
--color-bg-tertiary: #3A3A3F;   /* Elevated surfaces */
```

### Text Variables
```css
--color-text-primary: #FFFFFF;   /* Primary white text */
--color-text-secondary: #AAAAAA; /* Muted gray text */
--color-text-tertiary: #55555A;  /* Very muted text */
```

### Border Variables
```css
--color-border-primary: #55555A;  /* Medium gray borders */
--color-border-secondary: #3A3A3F; /* Subtle borders */
```

### Brand Variables
```css
--color-primary: #007AFF;        /* Bright blue accent */
--color-primary-hover: #0066CC;  /* Darker blue on hover */
--color-primary-light: #E6F2FF;  /* Light blue for badges */
--color-primary-dark: #004D99;   /* Dark blue variant */
```

## Typography

### Font Stack
Professional sans-serif system prioritizing Inter:

```css
font-family: 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'
```

### Font Weights
- **Regular/Medium (400-500)**: Body text, labels, general UI
- **Semi-Bold/Bold (600-700)**: Active elements, titles, buttons

### Font Sizes & Line Heights
- **Small**: `0.75rem` (12px) - Secondary info, sub-labels
- **Medium**: `1rem` (16px) - UI labels, button text
- **Large**: `1.25rem+` - Section titles, headings

### Capitalization
- **Sentence case**: Labels ("Method", "Size")
- **Title Case**: Buttons and main titles ("Save", "My Tech Toolkit")

## Component System

### Buttons
Professional editor-style buttons:

```css
.btn-primary {
  background: var(--color-primary);
  color: white;
  font-weight: 600;
}

.btn-secondary {
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-primary);
}

.btn-ghost {
  background: transparent;
  color: var(--color-text-secondary);
}
```

### Cards & Panels
```css
.card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-primary);
  box-shadow: var(--shadow-panel);
}
```

### Form Elements
```css
.input {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-primary);
  color: var(--color-text-primary);
}

.input:focus {
  box-shadow: 0 0 0 2px var(--color-primary);
}
```

## Layout Guidelines

### Three-Column Editor Layout
Based on professional editing interface patterns:

1. **Left Sidebar (20-25%)**: Tools/Icon Library
   - Background: `background-secondary` (#2D2D32)
   - Search, icon grid, categories

2. **Main Canvas (50-60%)**: Preview Area
   - Background: `background-primary` (#1A1A1D)
   - Real-time visual preview

3. **Right Sidebar (20-25%)**: Export Options
   - Background: `background-secondary` (#2D2D32)
   - Download buttons, selected icons

### Header & Footer Bars
- **Top Bar**: App title, global actions
- **Bottom Bar**: Status, undo/redo, primary actions

## Shadows

### Dark Theme Shadows
Enhanced shadows for dark backgrounds:

```css
--shadow-soft: 0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.15);
--shadow-medium: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.15);
--shadow-large: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15);
--shadow-panel: 0 2px 8px 0 rgba(0, 0, 0, 0.25);
```

## Usage Examples

### Tailwind Classes
```html
<!-- Backgrounds -->
<div class="bg-background-primary">Main content area</div>
<div class="bg-background-secondary">Sidebar panel</div>

<!-- Text -->
<h1 class="text-text-primary">Primary heading</h1>
<p class="text-text-secondary">Secondary text</p>
<span class="text-text-tertiary">Muted text</span>

<!-- Borders -->
<div class="border border-border-primary">Primary border</div>
<div class="border border-border-secondary">Subtle border</div>

<!-- Primary accent -->
<button class="bg-primary-500 text-white">Active button</button>
<span class="text-primary-500">#007AFF accent text</span>
```

### CSS Custom Properties
```html
<div style="background-color: var(--color-bg-secondary)">
  <button style="background-color: var(--color-primary)">
    Save
  </button>
</div>
```

## Accessibility

### Contrast Ratios
- White text (#FFFFFF) on dark backgrounds meets WCAG AA standards
- Blue accent (#007AFF) provides excellent contrast against dark backgrounds
- Muted text (#AAAAAA) maintains readability while establishing hierarchy

### Focus States
All interactive elements include visible focus indicators using the primary blue color.

## Implementation Notes

- **Default Theme**: Always dark (professional editor style)
- **Light Theme**: Available as override but dark is primary
- **Smooth Transitions**: 0.3s ease for theme changes
- **Inter Font**: Primary typeface with system fallbacks
- **CSS Variables**: Enable consistent theming throughout application
