# UNHAS Interactive Campus Map

A comprehensive interactive web-based Geographic Information System (GIS) for mapping and visualizing all campuses and facilities of Universitas Hasanuddin.

## Group Members (Kelompok 8)

- REYNALDY ARUNGLA'BI' H071231057
- ANDI MUHAMMAD MUFLIH HANIFATUSSURUR H071231062
- REZKY ROBBYYANTO AKBARI H071231060
- Muhammad Ikhsan Saputra H071231083

## Project Overview

This project provides an interactive map interface for exploring all campuses of Universitas Hasanuddin, including:

- Main Tamalanrea Campus
- Faculty of Engineering Campus
- Barayya Campus
- Vocational Program locations (Sidrap, Barru, Soppeng, Selayar)
- Jakarta Campus

## Features

- Interactive map with multiple base layers (OpenStreetMap, Satellite, Topographic)
- Campus and building information visualization
- Filtering by building types (Academic, Administrative, Facilities, etc.)
- Building search functionality
- Mobile-responsive design
- Location tracking
- Map printing capability
- Campus statistics
- Custom markers for different facility types
- Toggle for building labels

## Technologies Used

- HTML5 / CSS3 / JavaScript
- [Leaflet.js](https://leafletjs.com/) - Core mapping library
- [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) - Clustering markers
- [Leaflet.fullscreen](https://github.com/Leaflet/Leaflet.fullscreen) - Fullscreen control
- [Leaflet.locatecontrol](https://github.com/domoritz/leaflet-locatecontrol) - Location tracking
- [Leaflet-easybutton](https://github.com/CliffCloud/Leaflet.EasyButton) - Quick action buttons
- [Font Awesome](https://fontawesome.com/) - Icons
- [GeoJSON](https://geojson.org/) - Spatial data format

## File Structure

```
├── peta_unhas-improved1.html      # Main HTML file
├── kampus_unhas.geojson           # GeoJSON data of campus locations
├── Kelompok-8.txt                 # Group information
├── Assets/
│   ├── css/
│   │   └── style.css              # Custom CSS styles
│   ├── image/
│   │   └── Logo-Resmi-Unhas-1.png # UNHAS logo
│   └── js/
│       └── map.js                 # Map functionality
```

## How to Use

1. Open [`peta_unhas-improved1.html`](peta_unhas-improved1.html) in a web browser
2. Use the left sidebar to:
   - Search for specific buildings
   - Select different campuses to navigate
   - Toggle visibility of different building types
   - View building details when clicked
3. Use map controls to:
   - Zoom in/out
   - View your current location
   - Enter fullscreen mode
   - Print the map
   - Toggle between different map base layers

## Campuses Featured

- Tamalanrea (Main Campus)
- Barayya Campus
- Faculty of Engineering
- Vocational Program Sidrap
- Vocational Program Barru
- Vocational Program Soppeng
- Vocational Program Selayar
- Jakarta Campus

## Additional Information

This project was created as part of the Geographic Information Systems course assignment for the 4th semester of Information Systems program at Universitas Hasanuddin.

## License

© 2023 Universitas Hasanuddin - For educational purposes only
