# 📁 Image Organization Guide

## Directory Structure

```
public/
├── images/
│   ├── avatar.jpg              # Your professional headshot (400x400px recommended)
│   ├── avatar-placeholder.svg  # Fallback avatar (already created)
│   ├── resume.pdf             # Your resume file
│   ├── about/
│   │   ├── workspace.jpg      # Your workspace/setup photo
│   │   └── team-photo.jpg     # Team collaboration photos
│   ├── projects/
│   │   ├── project1-hero.jpg  # Main project screenshots
│   │   ├── project1-demo.gif  # Demo GIFs (optional)
│   │   ├── project2-hero.jpg
│   │   ├── project3-hero.jpg
│   │   └── project4-hero.jpg
│   └── skills/
│       ├── certifications/    # Certification badges
│       └── tech-stack.png     # Technology stack visualization
```

## Image Specifications

### Profile Photo (avatar.jpg)

- **Size**: 400x400px (square)
- **Format**: JPG or PNG
- **Quality**: Professional headshot
- **Background**: Clean, professional background
- **File size**: < 500KB for fast loading

### Project Screenshots

- **Size**: 1200x800px (3:2 aspect ratio)
- **Format**: JPG or PNG
- **Quality**: High-quality screenshots
- **Content**: Show your project's best features
- **File size**: < 1MB each

### Demo GIFs (optional)

- **Size**: 800x600px maximum
- **Format**: GIF or WebP
- **Duration**: 3-5 seconds
- **File size**: < 2MB for good performance

## How to Add Images

1. **Copy your images** to the appropriate directories above
2. **Update the data files** to reference your images:

### For Profile Photo:

Update `src/data/personal.ts`:

```typescript
avatar: "/images/avatar.jpg",
```

### For Project Images:

Update `src/data/projects.ts`:

```typescript
image: "/images/projects/project1-hero.jpg",
```

## Image Optimization Tips

- Use **WebP format** when possible for better compression
- Compress images before uploading (tools: TinyPNG, ImageOptim)
- Use **descriptive filenames** (e.g., "ecommerce-dashboard.jpg")
- Keep **consistent aspect ratios** for project images

## Access in Code

Images in the `public/` folder are accessible via:

```typescript
// Correct paths:
"/images/avatar.jpg";
"/images/projects/project1-hero.jpg";
"/images/about/workspace.jpg";

// Note: Don't include "public" in the path!
```
