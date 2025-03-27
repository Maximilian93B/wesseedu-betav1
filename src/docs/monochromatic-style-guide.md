# WeSeeUs - Monochromatic Design System

This document outlines the monochromatic styling approach used throughout the WeSeeUs platform. Use this as a reference when implementing new components or updating existing ones.

## Core Design Principles

1. **Monochromatic Palette**: Focus on shades of slate/gray for a refined, professional look
2. **Depth Through Shadows**: Use layered shadows instead of bright colors to create visual hierarchy
3. **Subtle Interactions**: Provide feedback through subtle shadow changes and slight color shifts
4. **Minimalist Aesthetic**: Keep UI clean and uncluttered with ample white space
5. **Consistent Rounding**: Use standardized border radius values throughout the application

## Coding Guidelines

- Keep component files under 300 lines, refactoring as needed
- Avoid code duplication by leveraging shared styles and components
- Consider all environments (dev, test, prod) in styling implementation
- Avoid adding stubbing or fake data patterns that affect production
- Keep styling consistent across the application by using this reference

## Color Palette

### Primary Palette
- Base White: `bg-white` - Main background color
- Primary Slate Colors:
  - Lightest: `bg-slate-50` - Secondary backgrounds, hover states
  - Light: `bg-slate-100` - Tertiary backgrounds, active states
  - Medium Light: `bg-slate-200` - Borders, dividers
  - Medium: `bg-slate-300` - Stronger borders
  - Medium Dark: `bg-slate-400` - Disabled states, subtle icons
  - Dark: `bg-slate-500` - Secondary text, icons
  - Darker: `bg-slate-600` - Primary text color for labels
  - Darkest: `bg-slate-700`, `bg-slate-800` - Primary text, headings

### Accent/Status Elements (Used sparingly)
- Dark Elements: `bg-slate-900` - High-emphasis buttons, important actions
- Shadows: Custom shadow values with very subtle slate/black tones

## Standard Gradients

### Page Background Gradient
For main container backgrounds and subtle page elements:
```css
background-image: linear-gradient(to right top, #ebebeb, #eeeef0, #f1f2f5, #f4f5fa, #f6f9ff)
```

### Component Highlight Gradient
For cards, hero sections, and components that need to stand out slightly from the page:
```css
background-image: linear-gradient(to right top, #ffffff, #f6f6ff, #eaefff, #dae8ff, #c8e2ff)
```

### Card Component Pattern
Apply this pattern for creating cards with depth:
```tsx
<div 
  className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
  style={{ 
    backgroundImage: "linear-gradient(to right top, #ffffff, #f6f6ff, #eaefff, #dae8ff, #c8e2ff)" 
  }}
>
  {/* Subtle texture pattern for depth */}
  <div className="absolute inset-0 opacity-[0.02]" 
    style={{ 
      backgroundImage: `radial-gradient(circle at 20px 20px, black 1px, transparent 0)`,
      backgroundSize: "40px 40px"
    }} 
  />
  
  {/* Top edge shadow line for definition */}
  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-slate-300/30 via-slate-400/20 to-slate-300/30"></div>
  
  {/* Inner shadow effects for depth */}
  <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-40"></div>
  <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50/50 to-transparent"></div>
  
  {/* Content goes here (with z-10) */}
  <div className="relative z-10 p-6">
    {/* Content */}
  </div>
</div>
```

## Typography

- Headings: `text-slate-800` with font-medium or font-semibold
- Body Text: `text-slate-700` for primary content
- Secondary Text: `text-slate-500` for supporting information
- Labels: `text-slate-600` for form labels
- Disabled Text: `text-slate-400`

## Shadows and Elevation

### Shadow Scale
1. Subtle: `shadow-[0_2px_10px_rgba(0,0,0,0.02)]` - Cards, subtle elevation
2. Medium: `shadow-[0_4px_20px_rgba(0,0,0,0.03)]` - Floating elements, dropdowns
3. Pronounced: `shadow-[0_8px_30px_rgb(0,0,0,0.04)]` - Modal dialogs, popovers
4. Emphasized: `shadow-[0_4px_10px_rgba(0,0,0,0.1)]` - Call to action elements
5. Hover Emphasized: `shadow-[0_6px_15px_rgba(0,0,0,0.15)]` - Hover states for buttons

### Hover Transitions
- Shadow Transition: `transition-shadow duration-300`
- Complete Transition: `transition-all duration-300`
- Hover lift effect: `hover:translate-y-[-2px]`

## Common Component Patterns

### Cards
```tsx
<div className="bg-white/90 rounded-xl p-6 border border-slate-200 
  shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgb(0,0,0,0.06)] 
  transition-shadow duration-500 relative overflow-hidden">
  
  {/* Optional top accent line */}
  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-400 to-slate-200/20" />
  
  {/* Card content */}
  <h2 className="text-lg font-medium text-slate-800">Card Title</h2>
  <p className="text-slate-500 text-sm">Card description text</p>
</div>
```

### Buttons
```tsx
{/* Primary Button */}
<Button 
  className="bg-slate-900 hover:bg-slate-800 text-white shadow-[0_4px_10px_rgba(0,0,0,0.1)]
    hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out 
    hover:translate-y-[-2px] rounded-lg"
>
  Primary Action
</Button>

{/* Secondary Button */}
<Button 
  variant="outline"
  className="bg-white border-slate-200 text-slate-700 
    hover:bg-slate-50 hover:border-slate-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)]
    hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-all duration-300 ease-out
    hover:translate-y-[-2px] rounded-lg"
>
  Secondary Action
</Button>

{/* Ghost Button */}
<Button 
  variant="ghost" 
  className="text-slate-600 hover:text-slate-800 hover:bg-slate-100"
>
  Tertiary Action
</Button>
```

### Badges
```tsx
{/* Status Badge */}
<div className="inline-flex items-center bg-slate-900 px-3 py-1 rounded-full text-xs font-medium
  text-white tracking-wider">
  <span className="w-1.5 h-1.5 rounded-full bg-white mr-1.5"></span>
  STATUS TEXT
</div>

{/* Info Badge */}
<div className="inline-flex items-center px-4 py-2 rounded-lg text-sm 
  border border-slate-200 text-slate-900 bg-white/80
  shadow-[0_4px_20px_rgba(0,0,0,0.03)] 
  hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]
  transition-all duration-300 hover:border-slate-300 group">
  <Icon className="h-4 w-4 mr-2.5 text-slate-600 group-hover:scale-110 transition-transform duration-200" />
  <span className="font-semibold">Value</span>
  <span className="ml-1.5 text-slate-500 text-xs uppercase tracking-wide">label</span>
</div>
```

### Action Items / Cards
```tsx
<motion.div 
  whileHover={{ 
    scale: 1.02,
    boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.08)"
  }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  <Button 
    className="w-full flex items-center justify-center gap-3 h-20 bg-white 
      group hover:bg-slate-50/80 transition-all duration-300 
      shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] rounded-lg"
  >
    <div className="bg-slate-50 p-3 rounded-md shadow-sm group-hover:bg-white 
      transition-all duration-300">
      <Icon className="h-5 w-5 text-slate-600" />
    </div>
    <div className="text-left flex-1">
      <span className="block text-slate-800 font-medium text-lg">Item Title</span>
      <span className="text-sm text-slate-500">Item description</span>
    </div>
    <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600 opacity-0 group-hover:opacity-100 
      transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
  </Button>
</motion.div>
```

### Stat Cards
```tsx
<div className="bg-white rounded-lg border border-slate-200 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] 
  hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all duration-300 relative overflow-hidden group">
  
  {/* Subtle top accent */}
  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-400 to-slate-300/20" />
  
  <div className="flex items-start justify-between mb-2 relative z-10">
    <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Stat Title</span>
    <div className="p-1.5 rounded-lg bg-slate-50 shadow-sm 
      group-hover:scale-110 transition-transform duration-200">
      <Icon className="h-3.5 w-3.5 text-slate-600" />
    </div>
  </div>
  <div className="text-lg font-bold text-slate-800">Stat Value</div>
  <p className="text-xs text-slate-500 mt-0.5">Stat description text</p>
</div>
```

### Data Lists
```tsx
<motion.div
  variants={itemVariants}
  exit={{ opacity: 0, y: -10 }}
  whileHover={{ scale: 1.01 }}
  className="flex items-center p-3 rounded-lg border border-slate-200 bg-white 
    shadow-[0_2px_10px_rgba(0,0,0,0.01)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)] 
    transition-all duration-200 hover:border-slate-300 hover:bg-slate-50/50"
>
  {/* Item content */}
  <div className="flex-1 min-w-0">
    <h3 className="text-sm font-medium text-slate-800 truncate">Item Title</h3>
    <div className="text-xs text-slate-500">Item description text</div>
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
      <Spinner className="h-10 w-10 text-slate-600" />
    </motion.div>
  </div>
  <p className="text-slate-700 text-sm font-medium">Loading content...</p>
</div>
```

## Animation Values

### Staggered Animation Container
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};
```

### Item Animation
```tsx
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};
```

## Implementation Notes

- Reuse consistent class combinations to avoid duplication
- When implementing this styling, check for existing components that might already have similar functionality
- Prefer composition over creating new components for minor style variations
- Keep environmental differences in mind when applying shadows (some environments may need different optimizations)
- Organize CSS classes logically: position → layout → spacing → colors → visual effects 