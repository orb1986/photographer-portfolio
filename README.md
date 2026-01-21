# Photography Portfolio Website

A clean, minimalist photography portfolio website with easy photo management system.

## Features

- **Elegant Typography**: Professional Google Fonts (Playfair Display & Poppins) for a refined look
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **Mobile Navigation**: Hamburger menu with smooth slide-in animation for mobile devices
- **Dark Mode Support**: Automatic theme switching based on system preference, with manual toggle
- **Multi-Language Support**: Full Croatian (HR) and English (EN) translations with language switcher
- **4 Main Pages**:
  - Home: Hero section with featured work
  - About: Photographer bio and services
  - My Work: Filterable photo gallery
  - Contact: Contact form and information
- **Interactive Gallery**: Lightbox viewer with keyboard navigation
- **Easy Photo Management**: JSON-based system for adding/editing photos
- **Category Filtering**: Filter photos by category (Portraits, Landscapes, Events, Commercial)
- **Social Integration**: Linked to Instagram, Facebook, and LinkedIn profiles
- **Performance Optimizations**:
  - Image lazy loading for faster page loads
  - Smooth scroll animations
  - Back to top button for easy navigation
- **SEO Optimized**: Comprehensive meta tags for better search engine visibility and social media sharing

## Getting Started

### Installation

1. Download or clone this repository
2. Open `index.html` in your web browser
3. No build process or dependencies required!

### Running the Website

Simply open `index.html` in any modern web browser. For the best experience during development, use a local server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
npx http-server
```

**Using VS Code:**
- Install the "Live Server" extension
- Right-click on `index.html` and select "Open with Live Server"

Then visit `http://localhost:8000` (or the port shown) in your browser.

## How to Manage Photos

### Adding New Photos

1. **Add your photo files** to the `images/` folder
   - Recommended format: JPG or PNG
   - Recommended size: 1200-2000px on the longest side
   - Keep file sizes optimized (under 500KB when possible)

2. **Update the photos.json file** located at `data/photos.json`
   - Add a new entry to the "photos" array
   - Follow this format:

```json
{
  "id": 13,
  "title": {
    "en": "Your Photo Title",
    "hr": "Naslov Vaše Fotografije"
  },
  "description": {
    "en": "Brief description of the photo",
    "hr": "Kratak opis fotografije"
  },
  "category": "portraits",
  "image": "images/your-photo.jpg",
  "featured": false
}
```

### Photo Properties Explained

- **id**: Unique number for each photo (increment from the last photo)
- **title**: The name of your photo with English and Croatian translations
  - `"en"`: English title
  - `"hr"`: Croatian (Hrvatski) title
- **description**: Short description with English and Croatian translations
  - `"en"`: English description
  - `"hr"`: Croatian description
- **category**: Must be one of: `portraits`, `landscapes`, `events`, `commercial`
- **image**: Path to your image file (must start with `images/`)
- **featured**: Set to `true` to show on homepage, `false` otherwise

**Note:** The gallery automatically displays titles and descriptions in the current language (EN/HR). When users switch languages, photo information updates automatically.

### Example: Adding a New Photo

1. Copy `my-new-photo.jpg` to the `images/` folder

2. Edit `data/photos.json` and add this entry:

```json
{
  "id": 13,
  "title": {
    "en": "Sunset Beach",
    "hr": "Zalazak Sunca na Plaži"
  },
  "description": {
    "en": "Beautiful sunset at the coast",
    "hr": "Prekrasan zalazak sunca na obali"
  },
  "category": "landscapes",
  "image": "images/my-new-photo.jpg",
  "featured": true
}
```

3. Save the file and refresh your browser!

### Removing Photos

1. Open `data/photos.json`
2. Find the photo entry you want to remove
3. Delete the entire object (including the curly braces)
4. Make sure the JSON is still valid (no trailing commas)
5. Optionally, delete the image file from the `images/` folder

### Editing Photo Details

Simply edit the values in `data/photos.json`:
- Change the `title` or `description`
- Update the `category`
- Toggle `featured` status (true/false)
- Change the `image` path if you renamed the file

## Dark Mode / Theme Switching

The website includes an intelligent theme system that respects your system preferences:

### How It Works

1. **Default Behavior**: Automatically detects and follows your system's dark/light mode preference
2. **Manual Override**: Click the theme toggle button to switch to the opposite theme
   - If system is light → Click moon icon 🌙 to switch to dark
   - If system is dark → Click sun icon ☀️ to switch to light
   - Your manual choice is saved and persists across visits
3. **Dynamic Updates**: Automatically updates if you change your system theme (when not manually overridden)

### Theme Icons

- **Moon (🌙)**: Currently in light mode - click to switch to dark mode
- **Sun (☀️)**: Currently in dark mode - click to switch to light mode

The icon always shows the opposite theme (what you'll get when you click it).

The theme button is located in the top navigation bar on all pages.

## Language Switching

The website supports full bilingual functionality with Croatian and English:

### How It Works

1. **Default Language**: Croatian (HR) - the site loads in Croatian by default
2. **Language Toggle**: Click the "HR" or "EN" button in the navigation to switch languages
3. **Persistent**: Your language preference is saved in browser storage
4. **All Pages Translated**: Every page (Home, About, Work, Contact) has full translations

### Adding/Editing Translations

Translations are stored in `data/translations.json`:

```json
{
  "en": {
    "nav": {
      "home": "Home",
      "about": "About",
      ...
    },
    ...
  },
  "hr": {
    "nav": {
      "home": "Početna",
      "about": "O Meni",
      ...
    },
    ...
  }
}
```

To modify or add translations:
1. Open `data/translations.json`
2. Find the section you want to change (e.g., `nav`, `home`, `about`)
3. Update the text for both `en` and `hr` languages
4. Save the file - changes will appear immediately on page reload

The language toggle button is located next to the theme toggle in the top navigation bar.

## Customization

### Changing Site Content

**Site Name/Logo:**
- Edit the `<a href="index.html" class="logo">` text in all HTML files

**About Page:**
- Edit `about.html` to change your bio, services, and achievements
- Replace `images/myself.jpg` with your own photo
  - Recommended: Portrait orientation photo
  - The image will be automatically cropped to 3:4 aspect ratio
  - Positioned from the top-center for best results with portraits

**Contact Information:**
- Edit `contact.html` to update email, phone, location, and social media links

**Footer:**
- Edit the footer section in each HTML file to update copyright and social links

### Styling

All styles are in `css/style.css`. Key customization areas:

**Colors:**

Both light and dark themes use CSS variables. Customize in `css/style.css`:

```css
:root {
    /* Light theme colors */
    --primary-color: #1a1a1a;
    --secondary-color: #f5f5f5;
    --accent-color: #333;
    --text-color: #333;
    --light-text: #666;
    --bg-color: #ffffff;
    --card-bg: #ffffff;
}

[data-theme="dark"] {
    /* Dark theme colors */
    --primary-color: #ffffff;
    --secondary-color: #2a2a2a;
    --accent-color: #e0e0e0;
    --text-color: #e0e0e0;
    --light-text: #a0a0a0;
    --bg-color: #1a1a1a;
    --card-bg: #2a2a2a;
}
```

**Fonts:**
The site uses elegant Google Fonts for a professional look:
- **Playfair Display** - For headings (serif, elegant)
- **Poppins** - For body text (sans-serif, clean)

To change fonts, update the `@import` statement at the top of `css/style.css` and modify the font-family properties.

**Hero Background Image:**
To set a custom background image for the homepage hero section:
1. Open `css/style.css`
2. Find line 17: `--hero-bg-image: url('https://picsum.photos/seed/hero/1920/1080');`
3. Replace with your image: `--hero-bg-image: url('images/your-image.jpg');`
4. The image will be automatically semi-transparent (15% opacity in light mode, 8% in dark mode) to blend with the theme
5. To remove the background image, set it to `none`: `--hero-bg-image: none;`

**Layout:**
Adjust spacing, padding, and margins throughout the CSS file

**Social Media Links:**
Update your social media URLs in all HTML files (footer sections):
- Instagram: Currently linked to @stipeboscic
- Facebook: Currently linked to stype85
- LinkedIn: Currently linked to stipe-boscic

## Performance Features

### Mobile Navigation
- **Hamburger Menu**: Automatically appears on screens smaller than 768px
- **Slide-in Animation**: Smooth transition from the right side
- **Overlay**: Dark overlay behind menu for better focus
- **Auto-close**: Menu closes when clicking links, overlay, or pressing Escape

### Image Lazy Loading
- **Automatic**: Images load only when they're about to enter the viewport
- **Performance**: Reduces initial page load time significantly
- **Fade-in Effect**: Smooth opacity transition when images load
- **Fallback**: Works even in older browsers without IntersectionObserver

### Back to Top Button
- **Auto-show**: Appears after scrolling 300px down the page
- **Smooth Scroll**: Animated scroll back to top
- **Responsive**: Adjusts size and position on mobile devices
- **Always Accessible**: Fixed position in bottom-right corner

### Scroll Animations
- **Fade-in Effects**: Elements animate into view as you scroll
- **Smooth Transitions**: Subtle animations enhance user experience without distraction
- **Performance**: Uses IntersectionObserver for efficient animation triggering

### SEO Optimization
- **Meta Tags**: Title, description, and keywords on all pages
- **Open Graph**: Optimized for Facebook sharing
- **Twitter Cards**: Enhanced previews when shared on Twitter
- **Semantic HTML**: Proper heading hierarchy and structure

## File Structure

```
photographer-portfolio/
│
├── index.html          # Homepage
├── about.html          # About page
├── work.html           # Portfolio gallery page
├── contact.html        # Contact page
├── README.md           # This file
│
├── css/
│   └── style.css       # All styling
│
├── js/
│   └── main.js         # Gallery and interactions
│
├── data/
│   ├── photos.json     # Photo database (EDIT THIS TO ADD PHOTOS)
│   └── translations.json  # Language translations
│
└── images/             # Place your photos here
    └── README.txt
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Tips for Best Results

1. **Image Optimization**: Compress images before uploading to improve load times
2. **Consistent Naming**: Use lowercase and hyphens for file names (e.g., `sunset-beach.jpg`)
3. **Regular Backups**: Keep backups of your `photos.json` file
4. **Test After Changes**: Always check the website after editing `photos.json`
5. **Use Descriptive Names**: Give photos meaningful titles and descriptions

## Troubleshooting

**Photos not showing?**
- Check that the image path in `photos.json` matches the actual file location
- Verify the image file exists in the `images/` folder
- Check browser console for errors (F12 > Console tab)

**JSON errors?**
- Validate your JSON at [jsonlint.com](https://jsonlint.com)
- Check for missing commas, quotes, or brackets
- Make sure there's no comma after the last item in the array

**Gallery not filtering?**
- Verify the category name is spelled correctly (case-sensitive)
- Check that JavaScript is enabled in your browser

## Deployment to GitHub Pages

This website is hosted on GitHub Pages and is accessible at:
**https://orb1986.github.io/photographer-portfolio/**

**Note:** After pushing changes, GitHub Pages may take 1-3 minutes to rebuild and deploy. Clear your browser cache if you don't see updates immediately.

### Initial Setup

1. **Navigate to Repository Settings:**
   - Go to https://github.com/orb1986/photographer-portfolio
   - Click on "Settings" tab

2. **Configure GitHub Pages:**
   - In the left sidebar, click on "Pages"
   - Under "Build and deployment":
     - **Source**: Select "Deploy from a branch"
     - **Branch**: Select "main"
     - **Folder**: Select "/ (root)"
   - Click "Save"

3. **Wait for Deployment:**
   - GitHub will automatically build and deploy your site (1-3 minutes)
   - Your site will be live at https://orb1986.github.io/photographer-portfolio/

### Updating the Live Site

Every time you push changes to the main branch, GitHub Pages automatically redeploys:

```bash
git add .
git commit -m "Your update description"
git push
```

The live site will update within 1-3 minutes. No additional steps needed!

### Checking Deployment Status

- Go to your repository on GitHub
- Click the "Actions" tab to see deployment progress
- Once complete, you'll see a green checkmark

## Future Enhancements

Consider adding:
- Backend form submission (currently client-side only)
- Admin panel for easier photo management
- Photo upload functionality
- Image lazy loading for better performance
- Social media integration
- Blog section
- Client galleries with password protection

## Support

For issues or questions, check:
1. Browser console for error messages
2. JSON validation for syntax errors
3. File paths and names for typos

## License

Free to use and modify for personal or commercial projects.

---

Built with HTML, CSS, and vanilla JavaScript. No frameworks required!
