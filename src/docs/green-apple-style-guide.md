# WeSeeUs - Green Apple Design System

This document outlines the green-focused styling approach used throughout the WeSeeUs platform. Use this as a reference when implementing new components or updating existing ones.

## Core Design Principles

1. **Green Gradient Base**: Primary background uses vibrant green apple gradient `linear-gradient(115deg, #70f570, #49c628)`
2. **High Contrast Elements**: Use white/light elements against the green background for readability and visual pop
3. **Subtle Interactions**: Provide feedback through shadow changes, hover states, and subtle animations
4. **Clean Typography**: High contrast text with careful font selection for each section (font-display, font-body, font-helvetica)
5. **Consistent Rounding**: Standardized border radius values (rounded-xl, rounded-2xl) throughout the application
6. **Animation and Motion**: Thoughtful use of animations for enhanced user experience

## Coding Guidelines

- Keep component files under 300 lines, refactoring as needed
- Avoid code duplication by leveraging shared styles and components
- Consider all environments (dev, test, prod) in styling implementation
- Avoid adding stubbing or fake data patterns that affect production
- Use descriptive variable names for animations, styles, and components
- Extract reusable animation variants to improve maintainability
- Use proper tailwind classes and leverage the cn utility for conditional classNames

## Color Palette

### Primary Background
- Base Gradient: `linear-gradient(115deg, #70f570, #49c628)` - Main application background
- Light Green: `#70f570` - Lighter accent elements, highlights
- Deep Green: `#49c628` - Secondary elements, buttons
- Very Dark Green: `#1a5e0a` - High contrast elements, shadows

### Text & UI Elements
- Primary Text on Green: `text-white` - Main text on green backgrounds
- Secondary Text on Green: `text-white/90` or `text-white/80` - Supporting information
- Primary Text on White: `text-black`, `text-green-800` - For text on white/light backgrounds
- Primary Buttons: `bg-white text-black hover:bg-white/90 hover:text-green-900` - High-visibility actions on green
- Green Gradient Buttons: `bg-gradient-to-r from-[#70f570] to-[#49c628]` - For buttons on white backgrounds
- Borders/Dividers: `border-white/20`, `border-white/30` - Subtle separators

### Accent/Status Elements
- Highlight Elements: `bg-white/10`, `bg-white/20` - For subtle highlights on green background
- Success States: `bg-emerald-500` - Confirmation messages
- Warning States: `bg-amber-500` - Alerts
- Error States: `bg-red-500` - Critical information

## Standard Gradients

### Element Background Gradient
For cards and UI elements to stand out against the green:
```css
bg-white /* For solid white backgrounds */
bg-white/90 /* For slightly translucent white backgrounds */
```

### Highlight Gradient
For elements that need special emphasis:
```css
bg-gradient-to-r from-white/40 via-white/60 to-white/40 /* For dividers and highlights */
bg-gradient-to-r from-[#70f570] to-[#49c628] /* For green buttons and highlights */
```

### Button/Badge Gradient
For buttons and special elements on white backgrounds:
```css
bg-gradient-to-r from-[#70f570] to-[#49c628] /* Standard green button */
```

### Card Component Pattern
White card on green background pattern:
```tsx
<div 
  className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
>
  {/* Simple white background */}
  <div className="absolute inset-0 bg-white"></div>
  
  {/* Card content */}
  <div className="relative z-5 h-full p-4 sm:p-5 md:p-7 flex flex-col">
    {/* Content */}
    <h3 className="text-xl sm:text-2xl font-extrabold text-black leading-tight tracking-tight font-display">
      Card Title
    </h3>
    <p className="text-sm sm:text-base text-black mt-2 sm:mt-4 leading-relaxed font-body">
      Description text
    </p>
    
    {/* Button example */}
    <Button 
      className="bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white font-semibold
                shadow-sm hover:shadow transition-all duration-300 
                rounded-lg py-3 sm:py-5 text-sm sm:text-base font-helvetica"
    >
      Button Text
    </Button>
  </div>
</div>
```

## Typography

### Fonts
- Display Font (Headings): `font-display` - For titles and impactful text
- Body Font (Content): `font-body` - For descriptions and body text
- Helvetica Font (Buttons, Stats): `font-helvetica` - For buttons and data points

### Text Styles
- Primary Headings: `text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.2] text-white font-display`
- Secondary Headings: `text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-[1.15] font-display`
- Body Text on Green: `text-white text-sm sm:text-base md:text-xl leading-relaxed font-light font-body`
- Body Text on White: `text-black text-sm sm:text-base leading-relaxed font-body`
- Feature Titles: `text-lg sm:text-xl font-semibold text-white font-display`
- Stats/Numbers: `font-extrabold text-black text-lg sm:text-xl md:text-2xl font-helvetica`
- Button Text: `text-sm sm:text-base font-semibold font-helvetica`

## Shadows and Elevation

### Shadow Scale
1. Subtle: `shadow-sm` - Minimal elevation
2. Medium: `shadow`, `shadow-[0_4px_10px_rgba(0,0,0,0.1)]` - Cards, buttons
3. Pronounced: `shadow-lg`, `shadow-[0_8px_30px_rgba(0,0,0,0.1)]` - Floating elements, cards
4. Special: `shadow-[0_0_20px_rgba(255,255,255,0.3)]` - Highlighted elements, hover states

### Hover Effects
- Shadow Transition: `transition-shadow duration-300`
- Complete Transition: `transition-all duration-300`
- Hover lift effect: `hover:translate-y-[-2px]`
- Brightness: `hover:brightness-105` - For gradient buttons

## Animation Patterns

### Standard Animations
```tsx
// Container stagger animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.08,
      duration: 0.5
    }
  }
}

// Item animation
const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
}

// Floating animation
const floatingVariants = {
  initial: { y: 0 },
  animate: { 
    y: [0, -10, 0],
    rotate: [0, 0.5, 0, -0.5, 0],
    transition: {
      y: {
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse", 
        ease: "easeInOut"
      },
      rotate: {
        duration: 12,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  }
}
```

### Animation Implementation
```tsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={containerVariants}
  className="w-full max-w-7xl mx-auto px-5 sm:px-10 py-4 sm:py-8 lg:py-16" 
>
  <motion.h1 
    variants={itemVariants}
    className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.2] text-white font-display"
  >
    Grow a Sustainable Future
  </motion.h1>
  
  <motion.div 
    initial="initial"
    animate="animate"
    variants={floatingVariants}
    className="relative"
  >
    {/* Content */}
  </motion.div>
</motion.div>
```

## Common Component Patterns

### Buttons
```tsx
{/* Primary Button (White on Green) */}
<Button 
  asChild
  size="lg"
  className="bg-white text-black hover:bg-white/90 hover:text-green-900 border border-white/20 shadow-lg rounded-xl px-8 py-6 font-semibold transition-all duration-300 font-helvetica"
>
  <Link href="/path">
    <span className="relative z-10 flex items-center justify-center">
      Button Text
      <ArrowRight className="h-5 w-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" />
    </span>
  </Link>
</Button>

{/* Green Gradient Button (On White) */}
<Button 
  asChild
  className="w-full bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white font-semibold
           shadow-sm hover:shadow transition-all duration-300 
           rounded-lg py-3 sm:py-5 text-sm sm:text-base font-helvetica"
>
  <Link href="/path">
    <span className="flex items-center justify-center">
      Button Text
      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
    </span>
  </Link>
</Button>
```

### Feature Blocks
```tsx
<div className="flex flex-col group mb-8 sm:mb-0">
  <div className="w-10 h-1 bg-gradient-to-r from-slate-300 to-transparent mb-4 rounded-full transition-all duration-300 group-hover:w-16"></div>
  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 font-display">Feature Title</h3>
  <p className="text-white text-sm leading-relaxed font-body">Feature description text goes here.</p>
</div>
```

### Cards and Sections
```tsx
{/* White card on green background */}
<div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
  <div className="absolute inset-0 bg-white"></div>
  <div className="relative z-5 h-full p-4 sm:p-5 md:p-7 flex flex-col">
    <h3 className="text-xl sm:text-2xl font-extrabold text-black leading-tight tracking-tight font-display">
      Card Title
    </h3>
    <p className="text-sm sm:text-base text-black mt-2 sm:mt-4 leading-relaxed font-body">
      Card description text
    </p>
    
    {/* Stats section */}
    <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-lg overflow-hidden">
      <div className="grid grid-cols-2 divide-x divide-green-500/10">
        <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 py-3 sm:py-6">
          <p className="font-extrabold text-black text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 font-helvetica">
            92%
          </p>
          <p className="text-xs sm:text-sm uppercase tracking-wider font-medium text-black font-body">
            Satisfaction
          </p>
        </div>
        <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 py-3 sm:py-6">
          <p className="font-extrabold text-black text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 font-helvetica">
            $2.4M
          </p>
          <p className="text-xs sm:text-sm uppercase tracking-wider font-medium text-black font-body">
            Invested
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Highlights and Check Lists
```tsx
<ul className="flex flex-col gap-2 sm:gap-4">
  <li className="flex items-start text-sm sm:text-base leading-relaxed text-black font-body">
    <div className="flex-shrink-0 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-gradient-to-br from-[#70f570] to-[#49c628] flex items-center justify-center mt-0.5 mr-2 sm:mr-3">
      <Check size={10} className="text-white" />
    </div>
    <span>Highlight item text</span>
  </li>
</ul>
```

### Trust Indicators
```tsx
<div className="flex flex-wrap justify-center gap-x-6 sm:gap-x-10 md:gap-x-16 gap-y-3 sm:gap-y-5 w-full">
  <span className="flex items-center text-xs sm:text-sm md:text-base text-white font-body">
    <div className="flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-white/20 text-white mr-2 sm:mr-3 border border-white/40 shadow-md">
      <Check size={12} />
    </div>
    <span className="font-medium">Trust indicator text</span>
  </span>
</div>
```

### Status Badges
```tsx
<div className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full text-white border border-white/30 shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
  style={{ background: 'linear-gradient(115deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))' }}
>
  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse mr-1.5 sm:mr-2"></span>
  Badge Text
</div>
```

## Responsive Design
- Mobile-first approach with sm, md, lg, xl breakpoints
- Font sizing: `text-sm sm:text-base md:text-lg lg:text-xl`
- Padding/Margin: `p-4 sm:p-5 md:p-7` or `mb-6 sm:mb-8`
- Width control: `w-full max-w-7xl mx-auto` or `max-w-[90%] sm:max-w-[650px]`
- Hidden/visible control: `hidden sm:flex` or `sm:hidden`
- Adaptive layouts: `flex-col lg:flex-row` or `grid-cols-1 sm:grid-cols-2 md:grid-cols-3`

## Implementation Notes

- Maintain consistent spacing with sm/md/lg pattern across components
- Optimize animations for performance, include reduced motion alternatives
- Use framer-motion for animations where appropriate
- Ensure text is properly sized and spaced for all viewport sizes
- Apply proper image optimization with Next.js Image component
- Employ subtle shadows and borders to create visual hierarchy
- Use backdrop-blur for frosted glass effects where appropriate 