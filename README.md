0104.b.vercel.app

# 💖 Happy Birthday Pihu! 💖

A beautiful, interactive birthday website created for Pihu with love and care.

## Features

### 🎨 Professional UI/UX Design
- Modern gradient background with smooth animations
- Responsive design that works on all devices
- Beautiful typography using Pacifico and Poppins fonts
- Smooth transitions and hover effects

### 🎈 Interactive Elements
- **Floating Balloons**: Animated balloons floating in the hero section
- **Confetti Celebration**: Confetti animation on page load and interactions
- **Music Player**: Built-in birthday melody player
- **Wish Cards**: Interactive cards to make birthday wishes with sparkle effects

### 📸 Photo Gallery
- **18 Beautiful Memories**: Photo gallery with images from GitHub
- **Lightbox Modal**: Click any image to view in full-screen modal
- **Navigation**: Navigate between images with arrows or keyboard
- **Responsive Grid**: Adapts to different screen sizes

### 💝 Special Features
- Hero section with animated "Pihu" name
- Floating hearts animation
- Personalized birthday message
- Smooth scroll navigation
- Scroll-triggered animations

## How to Use

### Option 1: Direct File Opening
Simply open `index.html` in your web browser.

### Option 2: Local Server (Recommended)
For the best experience, use a local server:

#### Using Python
```bash
python -m http.server 8000
```

#### Using Node.js (if available)
```bash
npx serve
```

#### Using PHP
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Images

The website automatically loads 18 images (1.jpg through 18.jpg) from:
```
https://github.com/gautamkr0104/B-day/tree/main/assets
```

If any images fail to load, placeholder images will be displayed.

## Customization

### Change Images
Edit the `GITHUB_BASE_URL` and `TOTAL_IMAGES` constants in `script.js`:
```javascript
const GITHUB_BASE_URL = 'your-image-url/';
const TOTAL_IMAGES = 18;
```

### Change Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #ff6b9d;
    --secondary-color: #c44569;
    --accent-color: #ffd93d;
    --bg-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
}
```

### Change Message
Edit the message in `index.html`:
```html
<p class="message-text">
    Your custom message here...
</p>
```

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations
- **JavaScript (Vanilla)**: Interactive features
- **Web Audio API**: Birthday melody
- **Google Fonts**: Pacifico and Poppins

## File Structure

```
pihu-birthday/
├── index.html      # Main HTML file
├── styles.css      # Styling and animations
├── script.js       # Interactive functionality
└── README.md       # This file
```

## Tips for Best Experience

1. **Enable Sound**: Click the music button to hear the birthday melody
2. **Make Wishes**: Click on the wish cards to make birthday wishes
3. **View Gallery**: Click "Explore Your Special Day" to see the photo gallery
4. **Fullscreen**: Press F11 for immersive experience
5. **Keyboard Navigation**: Use arrow keys in the gallery modal

## Credits

Made with 💖 for Pihu's Birthday by her best friend.

---

**Happy Birthday Pihu! May all your wishes come true! 🎂✨**
