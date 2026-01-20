# Photography Portfolio Website

A clean, minimalist photography portfolio website with easy photo management system.

## Features

- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **4 Main Pages**:
  - Home: Hero section with featured work
  - About: Photographer bio and services
  - My Work: Filterable photo gallery
  - Contact: Contact form and information
- **Interactive Gallery**: Lightbox viewer with keyboard navigation
- **Easy Photo Management**: JSON-based system for adding/editing photos
- **Category Filtering**: Filter photos by category (Portraits, Landscapes, Events, Commercial)

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
  "title": "Your Photo Title",
  "description": "Brief description of the photo",
  "category": "portraits",
  "image": "images/your-photo.jpg",
  "featured": false
}
```

### Photo Properties Explained

- **id**: Unique number for each photo (increment from the last photo)
- **title**: The name of your photo (displayed in gallery)
- **description**: Short description (displayed in overlay and lightbox)
- **category**: Must be one of: `portraits`, `landscapes`, `events`, `commercial`
- **image**: Path to your image file (must start with `images/`)
- **featured**: Set to `true` to show on homepage, `false` otherwise

### Example: Adding a New Photo

1. Copy `my-new-photo.jpg` to the `images/` folder

2. Edit `data/photos.json` and add this entry:

```json
{
  "id": 13,
  "title": "Sunset Beach",
  "description": "Beautiful sunset at the coast",
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

## Customization

### Changing Site Content

**Site Name/Logo:**
- Edit the `<a href="index.html" class="logo">` text in all HTML files

**About Page:**
- Edit `about.html` to change your bio, services, and achievements

**Contact Information:**
- Edit `contact.html` to update email, phone, location, and social media links

**Footer:**
- Edit the footer section in each HTML file to update copyright and social links

### Styling

All styles are in `css/style.css`. Key customization areas:

**Colors:**
```css
:root {
    --primary-color: #1a1a1a;      /* Main dark color */
    --secondary-color: #f5f5f5;    /* Light background */
    --accent-color: #333;          /* Accent color */
    --text-color: #333;            /* Main text */
    --light-text: #666;            /* Secondary text */
}
```

**Fonts:**
Change the `font-family` in the `body` selector

**Layout:**
Adjust spacing, padding, and margins throughout the CSS file

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
│   └── photos.json     # Photo database (EDIT THIS TO ADD PHOTOS)
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
