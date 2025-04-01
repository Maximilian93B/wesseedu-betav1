# WeSeeUs - Green Apple Design System

This document outlines the green-focused styling approach used throughout the WeSeeUs platform. Use this as a reference when implementing new components or updating existing ones.

## Core Design Principles

1. **Green Gradient Base**: Primary background uses vibrant green apple gradient `linear-gradient(115deg, #70f570, #49c628)`
2. **High Contrast Elements**: Use white/light elements against the green background for readability and visual pop
3. **Subtle Interactions**: Provide feedback through shadow changes and subtle animations
4. **Clean Typography**: High contrast white text on green backgrounds with minimal shadow for readability
5. **Consistent Rounding**: Maintain standardized border radius values throughout the application

## Coding Guidelines

- Keep component files under 300 lines, refactoring as needed
- Avoid code duplication by leveraging shared styles and components
- Consider all environments (dev, test, prod) in styling implementation
- Avoid adding stubbing or fake data patterns that affect production
- Keep styling consistent across the application by using this reference

## Color Palette

### Primary Background
- Base Gradient: `linear-gradient(115deg, #70f570, #49c628)` - Main application background
- Light Green: `#70f570` - Lighter accent elements, highlights
- Deep Green: `#49c628` - Secondary elements, buttons
- Very Dark Green: `#1a5e0a` - High contrast elements, shadows

### Text & UI Elements
- Primary Text: `text-white` - Main text on green backgrounds
- Secondary Text: `text-white/90` or `text-white/80` - Supporting information
- Primary Buttons: `bg-white text-green-700` - For high-visibility actions
- Secondary Buttons: `bg-green-800/80 text-white` - For alternative actions
- Borders/Dividers: `from-white/60 to-transparent` - Subtle separators

### Accent/Status Elements
- Gold/Yellow Accents: `from-[#e9d48e] to-[#c9b26d]` - For financial elements
- Success States: `bg-emerald-500` - Confirmation messages
- Warning States: `bg-amber-500` - Alerts
- Error States: `bg-red-500` - Critical information

## Standard Gradients

### Element Background Gradient
For cards and UI elements to stand out against the green:
```css
background-image: linear-gradient(to right top, rgba(255,255,255,0.95), rgba(255,255,255,0.85))
```

### Highlight Gradient
For elements that need special emphasis:
```css
background-image: linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.7))
```

### Card Component Pattern
Apply this pattern for creating cards with depth against green background:
```tsx
<div 
  className="relative overflow-hidden rounded-2xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
  style={{ 
    backgroundImage: "linear-gradient(to right top, rgba(255,255,255,0.95), rgba(255,255,255,0.85))" 
  }}
>
  {/* Subtle texture pattern for depth */}
  <div className="absolute inset-0 opacity-[0.03]" 
    style={{ 
      backgroundImage: `radial-gradient(circle at 20px 20px, black 1px, transparent 0)`,
      backgroundSize: "40px 40px"
    }} 
  />
  
  {/* Top edge highlight for definition */}
  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/40 via-white/60 to-white/40"></div>
  
  {/* Inner shadow effects for depth */}
  <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-40"></div>
  
  {/* Content goes here (with z-10) */}
  <div className="relative z-10 p-6">
    {/* Content */}
  </div>
</div>
```

## Typography

- Headings: `text-white` with font-medium or font-semibold
- Body Text: `text-white/90` for primary content on green
- Secondary Text: `text-white/80` for supporting information on green
- Text on White: `text-green-800` for text on white backgrounds
- Text Shadow (if needed): `text-shadow: 0 1px 2px rgba(0,0,0,0.1)`

## Shadows and Elevation

### Shadow Scale
1. Subtle: `shadow-[0_2px_10px_rgba(0,0,0,0.05)]` - Cards, subtle elevation
2. Medium: `shadow-[0_4px_20px_rgba(0,0,0,0.08)]` - Floating elements, dropdowns
3. Pronounced: `shadow-[0_8px_30px_rgba(0,0,0,0.15)]` - Modal dialogs, popovers
4. White Glow: `shadow-[0_0_20px_rgba(255,255,255,0.3)]` - Highlighted elements on green

### Hover Transitions
- Shadow Transition: `transition-shadow duration-300`
- Complete Transition: `transition-all duration-300`
- Hover lift effect: `hover:translate-y-[-2px]`

## Common Component Patterns

### Buttons
```tsx
{/* Primary Button (White on Green) */}
<Button 
  className="bg-white hover:bg-slate-50 text-green-700 shadow-[0_4px_10px_rgba(0,0,0,0.1)]
    hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out 
    hover:translate-y-[-2px] rounded-lg"
>
  Primary Action
</Button>

{/* Secondary Button (Green on White) */}
<Button 
  variant="outline"
  className="bg-green-800/60 hover:bg-green-800/80 text-white border-white/20
    shadow-[0_2px_10px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.15)] 
    transition-all duration-300 ease-out hover:translate-y-[-2px] rounded-lg"
>
  Secondary Action
</Button>

{/* Ghost Button */}
<Button 
  variant="ghost" 
  className="text-white hover:text-white hover:bg-white/10"
>
  Tertiary Action
</Button>
```

### Cards
```tsx
<div className="bg-white/90 rounded-xl p-6 border border-white/20 
  shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] 
  transition-shadow duration-500 relative overflow-hidden">
  
  {/* Optional top accent line */}
  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-300/20" />
  
  {/* Card content */}
  <h2 className="text-lg font-medium text-green-800">Card Title</h2>
  <p className="text-green-700/80 text-sm">Card description text</p>
</div>
```

### Badges
```tsx
{/* Status Badge */}
<div className="inline-flex items-center bg-white px-3 py-1 rounded-full text-xs font-medium
  text-green-700 tracking-wider shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
  STATUS TEXT
</div>

{/* Info Badge */}
<div className="inline-flex items-center px-4 py-2 rounded-lg text-sm 
  border border-white/20 text-white bg-white/10
  backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.1)] 
  hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]
  transition-all duration-300 hover:bg-white/20 group">
  <Icon className="h-4 w-4 mr-2.5 text-white/80 group-hover:scale-110 transition-transform duration-200" />
  <span className="font-semibold">Value</span>
  <span className="ml-1.5 text-white/70 text-xs uppercase tracking-wide">label</span>
</div>
```

### Stat Cards
```tsx
<div className="bg-white/90 rounded-lg border border-white/20 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)] 
  hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300 relative overflow-hidden group">
  
  {/* Subtle top accent */}
  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-300/20" />
  
  <div className="flex items-start justify-between mb-2 relative z-10">
    <span className="text-xs text-green-700 uppercase tracking-wide font-medium">Stat Title</span>
    <div className="p-1.5 rounded-lg bg-green-100 shadow-sm 
      group-hover:scale-110 transition-transform duration-200">
      <Icon className="h-3.5 w-3.5 text-green-700" />
    </div>
  </div>
  <div className="text-lg font-bold text-green-800">Stat Value</div>
  <p className="text-xs text-green-700/80 mt-0.5">Stat description text</p>
</div>
```

### Data Lists
```tsx
<motion.div
  variants={itemVariants}
  exit={{ opacity: 0, y: -10 }}
  whileHover={{ scale: 1.01 }}
  className="flex items-center p-3 rounded-lg border border-white/20 bg-white/90 
    shadow-[0_2px_10px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.12)] 
    transition-all duration-200 hover:bg-white"
>
  {/* Item content */}
  <div className="flex-1 min-w-0">
    <h3 className="text-sm font-medium text-green-800 truncate">Item Title</h3>
    <div className="text-xs text-green-700/80">Item description text</div>
  </div>
</motion.div>
```

### Loading States
```tsx
<div className="flex flex-col items-center gap-3">
  <div className="relative h-10 w-10">
    <motion.div 
      className="absolute inset-0"
      animate={{ 
        rotate: 360,
        opacity: [0.5, 1, 0.5]
      }} 
      transition={{ 
        duration: 1.5, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Spinner className="h-10 w-10 text-white" />
    </motion.div>
  </div>
  <p className="text-white text-sm font-medium">Loading content...</p>
</div>
```

## Implementation Notes

- Maintain high contrast between text and background for accessibility
- Use white elements on the green background for maximum visibility
- Apply subtle shadows to help elements stand out against the vibrant background
- For text-heavy sections, consider using white card backgrounds with green text
- Utilize frosted glass effects (backdrop-blur) for semi-transparent elements
- Keep in mind that the vibrant background requires careful element placement to avoid visual overwhelm 