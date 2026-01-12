# Font Usage Guide - Updated with Space Mono

## ✅ Successfully Added: Space Mono Font

Your portfolio now includes the **Space Mono** font alongside your existing fonts while preserving all large title fonts.

## 📋 Current Font Hierarchy

### Large Title Fonts (Preserved)
- **Hero Section**: `font-playfair` (Playfair Display) - For main hero titles
- **Headings**: `font-heading` (Ultra) - For section headings
- **Sub-headings**: `font-orbitron` (Orbitron) - For h2-h6 elements

### Body Text
- **General Text**: `font-poppins` (Poppins) - For body text and paragraphs

### New Addition
- **Code/Technical**: `font-space-mono` (Space Mono) - For code, technical details, small labels

## 🎯 Usage Examples

### HTML Classes
```html
<!-- Large titles (unchanged) -->
<h1 class="font-playfair">Hero Title</h1>
<h2 class="font-heading">Section Heading</h2>
<h3 class="font-orbitron">Subsection Heading</h3>

<!-- Body text (unchanged) -->
<p class="font-poppins">Regular paragraph text</p>

<!-- NEW: Space Mono usage -->
<code class="font-space-mono">console.log('Hello World');</code>
<span class="font-space-mono text-sm">Technical details</span>
<div class="font-space-mono text-xs">Small labels or metadata</div>
```

### Tailwind Classes
```html
<!-- Existing fonts (unchanged) -->
<h1 class="font-playfair text-4xl">Main Title</h1>
<h2 class="font-heading text-3xl">Section Title</h2>
<p class="font-poppins">Body content</p>

<!-- NEW: Space Mono with Tailwind -->
<code class="font-space-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
  const message = "Hello World";
</code>
<span class="font-space-mono text-sm text-gray-600 dark:text-gray-400">
  Last updated: Dec 2024
</span>
<div class="font-space-mono text-xs font-bold">
  Version 2.1.0
</div>
```

### CSS Custom Properties
```css
/* Use directly in your CSS */
.hero-title {
  font-family: var(--font-playfair), serif;
}

.section-heading {
  font-family: var(--font-heading), sans-serif;
}

.technical-info {
  font-family: var(--font-space-mono), monospace;
}

.body-text {
  font-family: var(--font-poppins), sans-serif;
}
```

## 🚀 Recommended Use Cases for Space Mono

1. **Code snippets** - Perfect for displaying code
2. **Technical specifications** - Version numbers, dates, technical details
3. **Small labels** - Tags, metadata, timestamps
4. **UI elements** - Buttons with technical text, form labels
5. **Developer information** - GitHub handles, technical credentials

## ⚡ Key Benefits

- ✅ **Preserved all existing large title fonts**
- ✅ **Added Space Mono for technical content**
- ✅ **Maintained design consistency**
- ✅ **Enhanced typography hierarchy**
- ✅ **Better accessibility for code content**

## 🎨 Font Weights Available in Space Mono

- Regular (400)
- Bold (700)
- Italic Regular (400)
- Italic Bold (700)

You can use these with classes like:
- `font-space-mono` (regular)
- `font-space-mono font-bold`
- `font-space-mono italic`
- `font-space-mono font-bold italic`

Your existing font hierarchy remains unchanged while gaining the powerful Space Mono font for technical and code-related content!