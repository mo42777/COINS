# 3D Coin Collection Viewer

An interactive web application to view and explore your 3D coin collection!

## Features

- 🌐 **3D Model Viewer** - Interactive 3D coin models with rotation and zoom
- 📝 **Detailed Information** - View coin descriptions, history, and statistics
- 🎨 **Beautiful UI** - Modern responsive design
- 📊 **Coin Stats** - Display diameter, material, weight, condition, and era
- 🖼️ **Gallery View** - Easy navigation between coins

## Setup Instructions

### 1. Prepare Your 3D Models

Place your coin 3D models (GLB format) in the `models/` directory:
```
models/
├── coin1.glb
├── coin2.glb
├── coin3.glb
└── coin4.glb
```

### 2. Update Coin Data

Edit `coins.json` with your coin information:

```json
{
  "coins": [
    {
      "id": 1,
      "name": "Your Coin Name",
      "model": "models/coin1.glb",
      "description": "Detailed description of your coin",
      "location": "Where you found it",
      "date_found": "2026-04-17",
      "story": "The story of how you found it and what happened",
      "stats": {
        "diameter_mm": 25,
        "material": "Bronze",
        "weight_g": 5.5,
        "condition": "Good",
        "era": "Roman Period"
      }
    }
  ]
}
```

### 3. Enable GitHub Pages

1. Go to repository **Settings**
2. Navigate to **Pages**
3. Under "Source", select **Deploy from a branch**
4. Select **main** branch and **/ (root)** folder
5. Click **Save**

Your site will be available at: `https://mo42777.github.io/COINS/`

## Project Structure

```
COINS/
├── index.html      # Main HTML file
├── app.js          # 3D viewer logic
├── coins.json      # Coin data
├── models/         # 3D models directory
│   ├── coin1.glb
│   ├── coin2.glb
│   ├── coin3.glb
│   └── coin4.glb
└── README.md       # This file
```

## Technologies Used

- **Three.js** - 3D graphics library
- **GLTFLoader** - For loading 3D models in GLB format
- **HTML5/CSS3** - Frontend markup and styling
- **JavaScript** - Interactivity and logic

## Adding More Coins

1. Add the 3D model to the `models/` folder
2. Add a new entry to `coins.json`
3. The gallery will automatically update!

## Customization

### Colors
Edit the gradient in `index.html`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Coin Thumbnail Size
Adjust in `index.html`:
```css
.coin-thumbnail {
    width: 100px;  /* Change this */
    height: 100px; /* And this */
}
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

Free to use and modify!