# 🌍 My GIS Learning Journey (HASANUDDIN UNIVERSITY - REYNALDY AL)

![Last Updated](https://img.shields.io/badge/Last%20Updated-May%202025-brightgreen)
![Author](https://img.shields.io/badge/Author-reynaldyAl-blue)
![Domain](https://img.shields.io/badge/Domain-GIS-orange)
![Status](https://img.shields.io/badge/Status-Ongoing-success)

> **A documentation of my Geographic Information System (GIS) learning experience throughout university**

## 📋 Table of Contents

- [Overview](#overview)
- [Core Skills Acquired](#core-skills-acquired)
- [Technical Stack](#technical-stack)
- [Key Projects](#key-projects)
- [Code Examples](#code-examples)
- [Learning Resources](#learning-resources)
- [Challenges & Solutions](#challenges--solutions)
- [Future Directions](#future-directions)

## Overview

This repository documents my GIS learning journey from a beginner to an advanced user during my university education. Through coursework, independent projects, and industry collaborations, I've developed expertise in spatial data analysis, cartography, and geospatial programming.

## Core Skills Acquired

- **Spatial Analysis**: Vector and raster analysis, network analysis, terrain analysis
- **Cartography**: Creating professional maps with proper symbology and design principles
- **Remote Sensing**: Satellite imagery processing and interpretation
- **Spatial Database Management**: PostGIS, SpatiaLite
- **Programming for GIS**: Python (GeoPandas, Rasterio, Shapely), JavaScript (Leaflet, OpenLayers)
- **WebGIS Development**: Creating interactive web maps and geospatial applications

## Technical Stack

### Software & Tools
- **Desktop GIS**: QGIS, ArcGIS Pro
- **Remote Sensing**: ERDAS Imagine, ENVI
- **Databases**: PostgreSQL/PostGIS
- **Visualization**: Tableau, PowerBI with spatial capabilities

### Programming Languages & Libraries
- **Python**: GeoPandas, Shapely, Rasterio, PySAL
- **R**: sf, raster, tmap
- **JavaScript**: Leaflet.js, Mapbox GL JS, Turf.js
- **SQL**: Spatial queries in PostGIS

## Key Projects

### 1. 🏙️ Urban Growth Analysis (2023)
Analysis of urban expansion in Jakarta using multi-temporal satellite imagery.

**Skills demonstrated**:
- Remote sensing image classification
- Change detection analysis
- Spatial statistics

### 2. 🚑 Emergency Response Routing System (2024)
Developed an optimized routing system for emergency vehicles.

**Skills demonstrated**:
- Network analysis
- Geocoding
- Real-time spatial data processing

### 3. 🌱 Agricultural Yield Prediction Model (2024-2025)
Machine learning model to predict crop yields based on geospatial variables.

**Skills demonstrated**:
- Integration of satellite imagery with ground data
- Spatial machine learning
- Time-series analysis of environmental factors

## Code Examples

### Python: Basic Spatial Analysis with GeoPandas

```python
import geopandas as gpd
import matplotlib.pyplot as plt

# Load data
districts = gpd.read_file('data/jakarta_districts.shp')
population = gpd.read_file('data/population_points.shp')

# Spatial join to count points in polygons
districts_pop = districts.sjoin(population, how="left", predicate='contains')
population_count = districts_pop.groupby('district_name').size().reset_index(name='population_count')

# Merge the counts back to the original districts
districts = districts.merge(population_count, on='district_name', how='left')
districts['population_count'] = districts['population_count'].fillna(0)

# Create a choropleth map
fig, ax = plt.subplots(1, 1, figsize=(12, 8))
districts.plot(column='population_count', cmap='YlOrRd', legend=True, 
               legend_kwds={'label': "Population Count"}, ax=ax)
ax.set_title('Population Distribution by District', fontsize=15)
plt.savefig('jakarta_population.png', dpi=300, bbox_inches='tight')
plt.show()
```

### SQL: PostGIS Spatial Query

```sql
-- Find all points of interest within 500m of rivers
SELECT 
    poi.name, 
    poi.type,
    ST_Distance(
        poi.geom, 
        rivers.geom
    ) AS distance_to_river
FROM 
    points_of_interest poi,
    rivers
WHERE 
    ST_DWithin(
        poi.geom,
        rivers.geom,
        500
    )
ORDER BY 
    distance_to_river ASC;
```

### JavaScript: Interactive Web Map with Leaflet

```javascript
// Initialize map
const map = L.map('map').setView([-6.2088, 106.8456], 11);

// Add base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Load GeoJSON data
fetch('data/jakarta_districts.geojson')
    .then(response => response.json())
    .then(data => {
        // Create a choropleth layer
        L.geoJSON(data, {
            style: function(feature) {
                // Get density value
                const density = feature.properties.population_density;
                
                // Return style based on density value
                return {
                    fillColor: getColor(density),
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7
                };
            },
            onEachFeature: function(feature, layer) {
                // Bind popup with information
                layer.bindPopup(`
                    <strong>${feature.properties.district_name}</strong><br>
                    Population: ${feature.properties.population.toLocaleString()}<br>
                    Density: ${feature.properties.population_density.toFixed(2)} people/km²
                `);
            }
        }).addTo(map);
    });

// Function to determine color based on density value
function getColor(d) {
    return d > 20000 ? '#800026' :
           d > 15000 ? '#BD0026' :
           d > 10000 ? '#E31A1C' :
           d > 7500  ? '#FC4E2A' :
           d > 5000  ? '#FD8D3C' :
           d > 2500  ? '#FEB24C' :
           d > 1000  ? '#FED976' :
                       '#FFEDA0';
}
```

## Learning Resources

### 📚 Courses
- **GIS Fundamentals** (University Core Course)
- **Advanced Spatial Analysis** (University Elective)
- **Remote Sensing & Digital Image Processing**
- **Spatial Database Management**
- **Web Mapping & Geospatial Services**

### 🌐 Online Learning
- **Coursera**: "GIS, Mapping, and Spatial Analysis Specialization" by University of Toronto
- **Udemy**: "Python for GIS and Geospatial Analysis"
- **QGIS Documentation** and tutorials
- **ESRI MOOC**: "Going Places with Spatial Analysis"

### 📖 Books
- *Geographic Information Science and Systems* by Paul A. Longley et al.
- *Python For ArcGIS Pro* by Silas Toms
- *PostGIS in Action* by Regina Obe & Leo Hsu

## Challenges & Solutions

| Challenge | Solution | Skills Developed |
|-----------|----------|------------------|
| Processing large satellite imagery datasets | Implemented tiling and parallel processing techniques | Performance optimization, memory management |
| Integrating data from different coordinate systems | Created standardized transformation workflow | Coordinate system management, data integration |
| Building interactive web maps with complex data | Learned and applied vector tiling and data simplification | Web optimization, UX design |
| Automating repetitive GIS workflows | Developed Python scripts and QGIS processing models | Automation, scripting |
| Working with incomplete spatial data | Applied various interpolation techniques | Spatial statistics, data quality assessment |

## Future Directions

- [ ] Deepen expertise in machine learning applications for geospatial data
- [ ] Contribute to open-source GIS projects
- [ ] Explore 3D GIS and temporal analysis
- [ ] Develop skills in cloud-based GIS processing
- [ ] Pursue certification in specialized GIS domains

---

<p align="center">
  <img src="https://img.shields.io/badge/Made%20with-Passion-red" alt="Made with Passion">
  <img src="https://img.shields.io/badge/Powered%20by-Coffee-brown" alt="Powered by Coffee">
  <img src="https://img.shields.io/badge/Updated-May%202025-blue" alt="Updated May 2025">
</p>

<div align="center">
  <sub>© 2025 reynaldyAl - Feel free to connect!</sub>
</div>
