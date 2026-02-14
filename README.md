# Professional Portfolio Website - Sathiyaraj V

## 🎨 Overview

A modern, professional single-page portfolio website designed for a Senior Java Developer & Software Architect with 13 years of experience. The portfolio showcases expertise in Java, Spring Boot, Angular, and cloud-native architectures.

## ✨ Features

### 1. **Hero Section**
- Prominent profile image with animated gradient background
- Professional introduction and career summary
- **Download CV button** - Direct download of resume PDF
- **View Posts button** - Quick navigation to blog section
- Animated floating tech icons (💻, ⚙️, 🚀, 🔧)
- Smooth fade-in animations

### 2. **Tech & Tools Section**
- Grid display of core technologies:
  - Java (13+ years expertise)
  - Spring Boot (Microservices & APIs)
  - Angular (Modern web applications)
  - Microservices Architecture
  - Docker & Kubernetes
  - Git & GitHub
  - GCP (Cloud infrastructure)
  - PostgreSQL (Database design)
- Staggered animation effects
- Hover interactions with 3D transforms

### 3. **Core Expertise Section**
Comprehensive skill showcase organized by categories:
- **Languages**: Java (Expert), SQL, Python, TypeScript
- **Frameworks**: Spring Boot, Spring Cloud, Hibernate/JPA, Angular
- **Architecture**: Microservices, System Design, Event-Driven, Domain-Driven Design
- **Cloud & DevOps**: GCP, Docker & K8s, CI/CD, Infrastructure as Code
- **Databases**: PostgreSQL, MongoDB, Redis, Elasticsearch
- **Leadership**: Team Management, Mentoring, Architecture Review, Agile Methodologies

### 4. **Featured Projects Section**
Three major projects with detailed descriptions:
1. **OneVAL Enterprise Platform**
   - Microservices platform with 99.9% uptime
   - Technologies: Java, Spring Boot, K8s, GCP
   
2. **Real-time Analytics Engine**
   - Processing 1M+ events/minute
   - Technologies: Kafka, Spark, Elasticsearch, Redis
   
3. **Payment Processing System**
   - PCI-DSS compliant, zero downtime
   - Technologies: Spring, Security, PostgreSQL

### 5. **Blog/Posts Section** 📝
Latest insights and articles featuring:
- **Debugging Memory Leaks in Production** (Feb 14, 2026)
  - Tags: #Java, #Performance, #Debugging
  
- **Microservices Design Patterns** (Feb 10, 2026)
  - Tags: #Microservices, #Architecture, #Spring Boot
  
- **Scaling Applications on GCP** (Feb 5, 2026)
  - Tags: #GCP, #Kubernetes, #Cloud

Each blog card includes:
- Publication date
- Title and excerpt
- Relevant tags
- "Read More" link with smooth hover animation

### 6. **Statistics Section**
Key career metrics:
- 13+ Years Experience
- 50+ Projects Delivered
- 100+ Developers Mentored
- 99.9% Uptime Record

### 7. **Call-to-Action Section**
- "Ready to Collaborate?" message
- "Get In Touch" button
- "Read My Posts" button

## 🎭 Design Features

### Animations
- **Fade-in effects**: Smooth entrance animations for all sections
- **Staggered delays**: Sequential animation timing for grid items
- **Hover interactions**: 
  - Cards lift and rotate on hover
  - Buttons have shimmer effects
  - Icons pulse and scale
- **Floating animations**: Continuous floating motion for tech icons
- **Smooth scrolling**: Native smooth scroll behavior

### Visual Design
- **Modern color palette**:
  - Orange (#FF6B35) - Primary accent
  - Yellow (#FFED4E) - Secondary accent
  - Blue (#0066FF) - Action buttons
  - Teal (#00B8A9) - Highlights
  - Pink (#FF1493) - Accents
  - Purple (#8B00FF) - Accents
  - Dark (#0A0E27) - Text and borders

- **Gradient backgrounds**: Subtle gradients throughout
- **Bold borders**: 3-4px solid borders for neo-brutalism style
- **Rounded corners**: Modern 15px border radius
- **Box shadows**: Depth and elevation effects
- **Responsive design**: Mobile-first approach

### Typography
- **Font**: Poppins (Google Fonts)
- **Hierarchy**: Clear size differentiation
- **Weights**: 400 (regular), 600 (semi-bold), 700 (bold), 800 (extra-bold)

## 📁 File Structure

```
jaisathiyamca.github.io/
├── _config.yml                 # Jekyll configuration
├── _layouts/
│   └── neo-default.html       # Main layout template
├── _posts/
│   ├── 2026-02-14-debugging-memory-leak-production.md
│   ├── 2026-02-10-microservices-design-patterns.md
│   └── 2026-02-05-scaling-applications-gcp.md
├── assets/
│   ├── css/
│   │   └── neo-brutalism.css  # Main stylesheet
│   ├── images/
│   │   └── profile.png        # Profile image
│   └── Sathiyaraj_Resume.pdf  # Downloadable CV
├── index.html                  # Main portfolio page (ENHANCED)
├── about.md                    # About page
├── blog.md                     # Blog listing page
└── README.md                   # This file
```

## 🚀 Deployment

This is a GitHub Pages site. To deploy:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Enhanced portfolio with modern design and animations"
   git push origin main
   ```

2. **GitHub Pages will automatically build and deploy** the site to:
   `https://jaisathiyamca.github.io`

## 🛠️ Local Development

To run locally (requires Jekyll):

```bash
# Install Jekyll (if not installed)
gem install jekyll bundler

# Create Gemfile
bundle init
bundle add jekyll

# Serve the site
bundle exec jekyll serve

# Open in browser
open http://localhost:4000
```

## 📱 Responsive Breakpoints

- **Desktop**: > 968px (full grid layout)
- **Tablet**: 640px - 968px (adjusted grid)
- **Mobile**: < 640px (single column layout)

## 🎯 Key Improvements Made

1. ✅ **Enhanced hero section** with larger profile image and animations
2. ✅ **Download CV button** prominently placed
3. ✅ **Dedicated blog section** with sample articles
4. ✅ **Smooth modern animations** throughout
5. ✅ **Professional color scheme** with gradients
6. ✅ **Improved typography** and spacing
7. ✅ **Interactive hover effects** on all cards
8. ✅ **Staggered animations** for visual appeal
9. ✅ **Mobile-responsive design**
10. ✅ **SEO-optimized** with proper meta tags

## 📝 Content Updates

To update content:

### Update Profile Information
Edit `index.html` - Hero section (lines 40-75)

### Add New Blog Posts
Create new file in `_posts/` with format:
`YYYY-MM-DD-title-of-post.md`

### Update Projects
Edit `index.html` - Projects section (lines 175-240)

### Update Skills
Edit `index.html` - Tech & Expertise sections

### Update Resume
Replace `assets/Sathiyaraj_Resume.pdf` with updated version

## 🎨 Customization

### Colors
Edit CSS variables in `index.html` or `assets/css/neo-brutalism.css`:
```css
:root {
    --orange: #FF6B35;
    --yellow: #FFED4E;
    --blue: #0066FF;
    /* etc. */
}
```

### Animations
Adjust animation timing in the CSS:
```css
@keyframes fadeInUp {
    /* Customize animation */
}
```

## 📊 Performance

- **Lightweight**: Minimal dependencies
- **Fast loading**: Optimized CSS and images
- **Smooth animations**: GPU-accelerated transforms
- **Mobile-optimized**: Responsive images and layouts

## 🔗 Links

- **Live Site**: https://jaisathiyamca.github.io
- **GitHub Repo**: https://github.com/jaisathiyamca/jaisathiyamca.github.io

## 📄 License

© 2026 Sathiyaraj V. All rights reserved.

---

**Built with ❤️ using Jekyll, HTML, CSS, and modern web animations**