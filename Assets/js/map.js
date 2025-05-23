// Initialize the map
const map = L.map('map', {
  fullscreenControl: true,
  fullscreenControlOptions: {
    position: 'topleft'
  }
}).setView([-5.133056, 119.486389], 7);

// Base tile layers
const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://unhas.ac.id/">Universitas Hasanuddin</a>'
}).addTo(map);

const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: '&copy; <a href="https://www.esri.com/">Esri</a> | <a href="https://unhas.ac.id/">Universitas Hasanuddin</a>'
});

// Add new topographic layer
const topoLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> | <a href="https://unhas.ac.id/">Universitas Hasanuddin</a>',
  maxZoom: 17
});

// Layer groups for different types of features
const campusPolygons = L.featureGroup().addTo(map);
const academicBuildingsLayer = L.markerClusterGroup({
  disableClusteringAtZoom: 17,
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false
}).addTo(map);
const administrativeBuildingsLayer = L.markerClusterGroup({
  disableClusteringAtZoom: 17,
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false
}).addTo(map);
const facilitiesLayer = L.markerClusterGroup({
  disableClusteringAtZoom: 17,
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false
}).addTo(map);
const laboratoriesLayer = L.markerClusterGroup({
  disableClusteringAtZoom: 17,
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false
}).addTo(map);
const hallsLayer = L.markerClusterGroup({
  disableClusteringAtZoom: 17,
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false
}).addTo(map);
const librariesLayer = L.markerClusterGroup({
  disableClusteringAtZoom: 17,
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false
}).addTo(map);

// Layer for labels - will be controlled separately
const labelsLayer = L.layerGroup();

// Global variables
let labelsVisible = false;
const allMarkers = [];
const allLabels = [];

// Create custom icons based on facility type
function createCustomIcon(color, icon) {
  return L.divIcon({
    className: 'custom-marker-icon',
    html: `<i class="fas ${icon}" style="color: white; font-size: 14px;"></i>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
    style: `background-color: ${color};`
  });
}

// Icons for different types of buildings
const academicIcon = createCustomIcon('#e74c3c', 'fa-university');
const administrativeIcon = createCustomIcon('#3498db', 'fa-building');
const facilityIcon = createCustomIcon('#2ecc71', 'fa-wrench');
const laboratoryIcon = createCustomIcon('#9b59b6', 'fa-flask');
const hallIcon = createCustomIcon('#f39c12', 'fa-users');
const libraryIcon = createCustomIcon('#16a085', 'fa-book');

// Campus locations for quick navigation
const campusLocations = {
  tamalanrea: {
    center: [-5.133056, 119.486389],
    zoom: 15
  },
  barayya: {
    center: [-5.129, 119.424],
    zoom: 17
  },
  teknik: {
    center: [-5.232, 119.502],
    zoom: 16
  },
  sidrap: {
    center: [-3.924, 119.795],
    zoom: 17
  },
  barru: {
    center: [-4.409, 119.619],
    zoom: 17
  },
  soppeng: {
    center: [-4.333, 119.885],
    zoom: 17
  },
  selayar: {
    center: [-6.118, 120.459],
    zoom: 17
  },
  jakarta: {
    center: [-6.164, 106.813],
    zoom: 17
  },
  all: {
    center: [-5.133056, 119.486389],
    zoom: 7
  }
};

// Handle campus selection change
document.getElementById('campusSelect').addEventListener('change', function() {
  const campusId = this.value;
  const location = campusLocations[campusId];
  map.setView(location.center, location.zoom);
});

// Toggle all labels visibility
document.getElementById('toggleLabels').addEventListener('change', function() {
  labelsVisible = this.checked;
  
  if (labelsVisible) {
    map.addLayer(labelsLayer);
    // Show labels conditionally based on zoom level
    updateLabelsVisibility();
  } else {
    map.removeLayer(labelsLayer);
  }
});

// Function to update labels visibility based on current zoom level
function updateLabelsVisibility() {
  const currentZoom = map.getZoom();
  
  // Only show labels when zoomed in enough
  if (currentZoom >= 16 && labelsVisible) {
    map.addLayer(labelsLayer);
  } else {
    map.removeLayer(labelsLayer);
  }
}

// Listen for zoom events to update labels visibility
map.on('zoomend', updateLabelsVisibility);

// Toggle layer visibility based on checkboxes
document.getElementById('academicBuildings').addEventListener('change', function() {
  if (this.checked) {
    map.addLayer(academicBuildingsLayer);
  } else {
    map.removeLayer(academicBuildingsLayer);
  }
});

document.getElementById('administrativeBuildings').addEventListener('change', function() {
  if (this.checked) {
    map.addLayer(administrativeBuildingsLayer);
  } else {
    map.removeLayer(administrativeBuildingsLayer);
  }
});

document.getElementById('facilities').addEventListener('change', function() {
  if (this.checked) {
    map.addLayer(facilitiesLayer);
  } else {
    map.removeLayer(facilitiesLayer);
  }
});

document.getElementById('laboratories').addEventListener('change', function() {
  if (this.checked) {
    map.addLayer(laboratoriesLayer);
  } else {
    map.removeLayer(laboratoriesLayer);
  }
});

document.getElementById('halls').addEventListener('change', function() {
  if (this.checked) {
    map.addLayer(hallsLayer);
  } else {
    map.removeLayer(hallsLayer);
  }
});

document.getElementById('libraries').addEventListener('change', function() {
  if (this.checked) {
    map.addLayer(librariesLayer);
  } else {
    map.removeLayer(librariesLayer);
  }
});

// Toggle sidebar on mobile
document.querySelector('.toggle-sidebar').addEventListener('click', function() {
  document.querySelector('.sidebar').classList.toggle('active');
});

// Add clickable North Arrow
const compass = L.control({position: 'topleft'});
compass.onAdd = function(map) {
  const div = L.DomUtil.create('div', 'compass-control');
  div.innerHTML = `
    <div style="background-color: white; padding: 5px; border-radius: 4px; box-shadow: 0 1px 5px rgba(0,0,0,0.4); cursor: pointer;">
      <i class="fas fa-compass" style="font-size: 24px; color: #2C5364;"></i>
      <div style="position: absolute; top: 8px; left: 28px; font-weight: bold; color: #2C5364; font-size: 18px;">N</div>
    </div>
  `;
  
  // Add click handler to reset view
  div.onclick = function() {
    map.setView([-5.133056, 119.486389], 7);
  };
  
  return div;
};
compass.addTo(map);

// Add scale control
L.control.scale({
  metric: true,
  imperial: true,
  position: 'bottomright',
  maxWidth: 200
}).addTo(map);

// Enhanced Layer Control for base layers and overlays
const baseLayers = {
  "OpenStreetMap": osmLayer,
  "Citra Satelit": satelliteLayer,
  "Topografi": topoLayer
};

const overlayLayers = {
  "Kampus": campusPolygons,
  "Gedung Akademik": academicBuildingsLayer,
  "Gedung Administrasi": administrativeBuildingsLayer,
  "Fasilitas Umum": facilitiesLayer,
  "Laboratorium": laboratoriesLayer,
  "Aula dan Baruga": hallsLayer,
  "Perpustakaan": librariesLayer,
  "Label": labelsLayer
};

L.control.layers(baseLayers, overlayLayers, {
  position: 'topright',
  collapsed: false
}).addTo(map);

// Process GeoJSON data
fetch('kampus_unhas.geojson')
  .then(response => response.json())
  .then(data => {
    // Process each feature
    data.features.forEach(feature => {
      if (feature.geometry.type === 'Polygon') {
        // Campus polygon
        const polygon = L.polygon(
          feature.geometry.coordinates[0].map(coord => [coord[1], coord[0]]), 
          {
            color: '#2C5364',
            weight: 3,
            opacity: 0.8,
            fillColor: '#2C5364',
            fillOpacity: 0.2
          }
        ).bindPopup(`<div class="building-popup">
                      <h3>${feature.properties.nama}</h3>
                      <p>${feature.properties.keterangan}</p>
                    </div>`);
        
        // Add campus label directly to map (always visible)
        const campusLabel = createCampusLabel(feature);
        campusLabel.addTo(map);
        
        campusPolygons.addLayer(polygon);
      } else if (feature.geometry.type === 'Point') {
        // Determine type based on name or keterangan
        const name = feature.properties.nama.toLowerCase();
        const desc = feature.properties.keterangan ? feature.properties.keterangan.toLowerCase() : '';
        
        // Determine icon and layer based on building type
        let icon, layer, iconType;
        
        if (name.includes('perpustakaan') || name.includes('library')) {
          icon = libraryIcon;
          layer = librariesLayer;
          iconType = 'fa-book';
          iconColor = '#16a085';
        } else if (name.includes('lab') || desc.includes('lab') || desc.includes('prakt')) {
          icon = laboratoryIcon;
          layer = laboratoriesLayer;
          iconType = 'fa-flask';
          iconColor = '#9b59b6';
        } else if (name.includes('aula') || name.includes('baruga') || name.includes('auditorium') || name.includes('pertemuan')) {
          icon = hallIcon;
          layer = hallsLayer;
          iconType = 'fa-users';
          iconColor = '#f39c12';
        } else if (name.includes('fakultas') || (name.includes('gedung') && (name.includes('belajar') || desc.includes('belajar')))) {
          icon = academicIcon;
          layer = academicBuildingsLayer;
          iconType = 'fa-university';
          iconColor = '#e74c3c';
        } else if (name.includes('rektorat') || name.includes('administrasi') || name.includes('layanan') || name.includes('registrasi')) {
          icon = administrativeIcon;
          layer = administrativeBuildingsLayer;
          iconType = 'fa-building';
          iconColor = '#3498db';
        } else {
          icon = facilityIcon;
          layer = facilitiesLayer;
          iconType = 'fa-wrench';
          iconColor = '#2ecc71';
        }
        
        // Create custom marker
        const markerHtml = `<div style="background-color: ${iconColor}; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);">
                            <i class="fas ${iconType}" style="color: white; font-size: 14px;"></i>
                          </div>`;
        
        const customIcon = L.divIcon({
          className: 'custom-marker-icon',
          html: markerHtml,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
          popupAnchor: [0, -15]
        });
        
// To this enhanced version:
const marker = L.marker(
  [feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 
  { icon: customIcon }
).bindPopup(`
  <div class="building-popup">
    <h3>${feature.properties.nama}</h3>
    ${feature.properties.photo ? 
      `<div class="popup-img"><img src="${feature.properties.photo}" alt="${feature.properties.nama}" style="max-width:100%;height:auto;margin:10px 0;">` : 
      ''}
    <p><strong>Fungsi:</strong> ${feature.properties.keterangan || 'Tidak ada keterangan'}</p>
    <div class="popup-footer" style="margin-top:10px;text-align:right;">
      <button onclick="map.setView([${feature.geometry.coordinates[1]}, ${feature.geometry.coordinates[0]}], 18)" 
              style="background:#006837;color:white;border:none;border-radius:4px;padding:5px 10px;cursor:pointer;">
        <i class="fas fa-search-plus"></i> Zoom
      </button>
    </div>
  </div>
`);
        
        // Add tooltip (shows on hover)
        marker.bindTooltip(feature.properties.nama, {
          direction: 'top',
          permanent: false,
          className: 'building-tooltip'
        });
        
        // Create label (for permanent display if enabled)
        const label = L.marker(
          [feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 
          {
            icon: L.divIcon({
              className: 'building-label',
              html: `<div>${feature.properties.nama}</div>`,
              iconSize: [150, 20],
              iconAnchor: [75, 10]
            }),
            interactive: false
          }
        );
        
        // Store the label in the labels layer
        labelsLayer.addLayer(label);
        
        // Add to search index
        marker.feature = {
          properties: {
            name: feature.properties.nama,
            searchName: feature.properties.nama
          }
        };
        
        // Track all markers and labels
        allMarkers.push(marker);
        allLabels.push(label);
        
        // Add to appropriate layer
        layer.addLayer(marker);
        
        // Add click event to show details in sidebar
        marker.on('click', function() {
          displayBuildingDetails(feature);
        });
      }
    });
    
    const searchControl = new L.Control.Search({
    layer: L.layerGroup([
        academicBuildingsLayer, 
        administrativeBuildingsLayer, 
        facilitiesLayer, 
        laboratoriesLayer, 
        hallsLayer, 
        librariesLayer
    ]),
    propertyName: 'name',  // Make sure this matches how you set feature properties
    marker: false,
    moveToLocation: function(latlng, title, map) {
        map.setView(latlng, 18);
    },
    initial: false,
    zoom: 18,
    textPlaceholder: 'Cari gedung atau fasilitas...'
    });
    
    searchControl.on('search:locationfound', function(e) {
      e.layer.openPopup();
    });
    
    map.addControl(searchControl);
    document.getElementById('searchBox').appendChild(searchControl.getContainer());
    
    // Fit map to bounds after loading
    // Fit map to bounds after loading - WITH SAFETY CHECK
    if (campusPolygons.getLayers().length > 0) {
    map.fitBounds(campusPolygons.getBounds());
    } else {
    // Default view if no polygons
    map.setView([-5.133056, 119.486389], 7);
    }
    
    // Add campus statistics
    updateCampusStatistics(data);
    
    // Add Mini Map after data is loaded
    addMiniMap();
  })
  .catch(error => console.error('Error loading GEOJSON:', error));

// Create a campus label
function createCampusLabel(feature) {
  const latlng = L.latLng(
    feature.geometry.coordinates[0].reduce((sum, coord) => sum + coord[1], 0) / feature.geometry.coordinates[0].length,
    feature.geometry.coordinates[0].reduce((sum, coord) => sum + coord[0], 0) / feature.geometry.coordinates[0].length
  );
  
  const label = L.marker(latlng, {
    icon: L.divIcon({
      className: 'campus-label',
      html: `<div style="background-color: rgba(44, 83, 100, 0.8); color: white; padding: 5px 10px; border-radius: 4px; font-weight: bold; font-size: 14px;">${feature.properties.nama}</div>`,
      iconSize: [200, 40],
      iconAnchor: [100, 20]
    })
  });
  
  return label;
}

// Add user location control
L.control.locate({
  position: 'topright',
  strings: {
    title: "Tampilkan lokasi saya"
  },
  locateOptions: {
    maxZoom: 18,
    enableHighAccuracy: true
  }
}).addTo(map);

// Add print control
L.control.browserPrint({
  position: 'topright',
  title: 'Print peta',
  printModes: [
    L.control.browserPrint.mode.landscape("Landscape"),
    L.control.browserPrint.mode.portrait("Portrait"),
    L.control.browserPrint.mode.custom("Pilih area")
  ]
}).addTo(map);

// Function to display building details in sidebar
function displayBuildingDetails(feature) {
  const detailsContainer = document.getElementById('buildingDetails');
  
  if (feature) {
    detailsContainer.innerHTML = `
      <h3>${feature.properties.nama}</h3>
      <p><strong>Keterangan:</strong> ${feature.properties.keterangan}</p>
    `;
    
    if (feature.properties.photo) {
      detailsContainer.innerHTML += `
        <div class="building-photo">
          <img src="${feature.properties.photo}" alt="${feature.properties.nama}">
        </div>
      `;
    }
    
    detailsContainer.style.display = 'block';
  } else {
    detailsContainer.style.display = 'none';
  }
}

// Update campus statistics
function updateCampusStatistics(data) {
  // Count buildings by campus
  const campusCounts = {
    tamalanrea: 0,
    barayya: 0,
    teknik: 0,
    sidrap: 0,
    barru: 0,
    soppeng: 0,
    selayar: 0,
    jakarta: 0
  };
  
  // Count by type
  const typeCounts = {
    academic: 0,
    administrative: 0,
    facility: 0,
    laboratory: 0,
    hall: 0,
    library: 0
  };
  
  // Process each feature to categorize
  data.features.forEach(feature => {
    if (feature.geometry.type === 'Point') {
      // Determine campus based on coordinates
      const lat = feature.geometry.coordinates[1];
      const lng = feature.geometry.coordinates[0];
      
      // Tamalanrea campus (main)
      if (lat > -5.15 && lat < -5.12 && lng > 119.47 && lng < 119.5) {
        campusCounts.tamalanrea++;
      } 
      // Barayya campus
      else if (lat > -5.13 && lat < -5.125 && lng > 119.42 && lng < 119.425) {
        campusCounts.barayya++;
      }
      // Teknik campus
      else if (lat > -5.24 && lat < -5.22 && lng > 119.49 && lng < 119.51) {
        campusCounts.teknik++;
      }
      // Sidrap campus
      else if (lat > -3.93 && lat < -3.92 && lng > 119.79 && lng < 119.8) {
        campusCounts.sidrap++;
      }
      // Barru campus
      else if (lat > -4.41 && lat < -4.4 && lng > 119.61 && lng < 119.62) {
        campusCounts.barru++;
      }
      // Soppeng campus
      else if (lat > -4.34 && lat < -4.33 && lng > 119.88 && lng < 119.89) {
        campusCounts.soppeng++;
      }
      // Selayar campus
      else if (lat > -6.12 && lat < -6.11 && lng > 120.45 && lng < 120.46) {
        campusCounts.selayar++;
      }
      // Jakarta campus
      else if (lat > -6.17 && lat < -6.16 && lng > 106.81 && lng < 106.82) {
        campusCounts.jakarta++;
      }
      
      // Determine type based on name or keterangan
      const name = feature.properties.nama.toLowerCase();
      const desc = feature.properties.keterangan ? feature.properties.keterangan.toLowerCase() : '';
      
      if (name.includes('perpustakaan') || name.includes('library')) {
        typeCounts.library++;
      } else if (name.includes('lab') || desc.includes('lab') || desc.includes('prakt')) {
        typeCounts.laboratory++;
      } else if (name.includes('aula') || name.includes('baruga') || name.includes('auditorium') || name.includes('pertemuan')) {
        typeCounts.hall++;
      } else if (name.includes('fakultas') || name.includes('gedung') && (name.includes('belajar') || desc.includes('belajar'))) {
        typeCounts.academic++;
      } else if (name.includes('rektorat') || name.includes('administrasi') || name.includes('layanan') || name.includes('registrasi')) {
        typeCounts.administrative++;
      } else {
        typeCounts.facility++;
      }
    }
  });
  
  // Update the statistics in the DOM if needed
  // This could update a statistics panel that shows the number of buildings
  const totalBuildings = Object.values(typeCounts).reduce((sum, count) => sum + count, 0);
  
  // Create statistics HTML
  const statsHTML = `
    <div class="stats-panel">
      <h3>Statistik Gedung</h3>
      <p>Total gedung: <strong>${totalBuildings}</strong></p>
      <hr>
      <h4>Berdasarkan Lokasi:</h4>
      <p>Kampus Tamalanrea: <strong>${campusCounts.tamalanrea}</strong> gedung</p>
      <p>Fakultas Teknik: <strong>${campusCounts.teknik}</strong> gedung</p>
      <p>Kampus Barayya: <strong>${campusCounts.barayya}</strong> gedung</p>
      <p>Vokasi Sidrap: <strong>${campusCounts.sidrap}</strong> gedung</p>
      <p>Vokasi Barru: <strong>${campusCounts.barru}</strong> gedung</p>
      <p>Vokasi Soppeng: <strong>${campusCounts.soppeng}</strong> gedung</p>
      <p>Vokasi Selayar: <strong>${campusCounts.selayar}</strong> gedung</p>
      <p>PSDKU Jakarta: <strong>${campusCounts.jakarta}</strong> gedung</p>
      <hr>
      <h4>Berdasarkan Jenis:</h4>
      <p>Gedung Akademik: <strong>${typeCounts.academic}</strong></p>
      <p>Gedung Administrasi: <strong>${typeCounts.administrative}</strong></p>
      <p>Fasilitas Umum: <strong>${typeCounts.facility}</strong></p>
      <p>Laboratorium: <strong>${typeCounts.laboratory}</strong></p>
      <p>Aula dan Baruga: <strong>${typeCounts.hall}</strong></p>
      <p>Perpustakaan: <strong>${typeCounts.library}</strong></p>
    </div>
  `;
  
  // Create statistics control
  const statsControl = L.control({ position: 'bottomleft' });
  
  statsControl.onAdd = function() {
    const div = L.DomUtil.create('div', 'stats-control');
    div.innerHTML = `
      <button class="stats-button">
        <i class="fas fa-chart-pie"></i>
      </button>
      <div class="stats-content">
        ${statsHTML}
      </div>
    `;
    
    // Prevent map clicks from propagating through the control
    L.DomEvent.disableClickPropagation(div);
    
    // Add toggle functionality
    const button = div.querySelector('.stats-button');
    const content = div.querySelector('.stats-content');
    content.style.display = 'none';
    
    button.addEventListener('click', function() {
      if (content.style.display === 'none') {
        content.style.display = 'block';
      } else {
        content.style.display = 'none';
      }
    });
    
    return div;
  };
  
  statsControl.addTo(map);
}

// Add Mini Map
function addMiniMap() {
  // Make sure the MiniMap plugin is loaded
  if (typeof L.Control.MiniMap === 'undefined') {
    console.error('MiniMap plugin not loaded!');
    return;
  }
  
  const miniMapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '',
    minZoom: 0,
    maxZoom: 13
  });

  const miniMap = new L.Control.MiniMap(miniMapLayer, {
    toggleDisplay: true,
    minimized: false,
  position: 'bottomleft',  // Change to bottomleft
    width: 150,
    height: 150,
    zoomLevelOffset: -5,
    aimingRectOptions: {color: '#ff7800', weight: 1},
    shadowRectOptions: {color: '#000000', weight: 1, opacity: 0, fillOpacity: 0}
  }).addTo(map);
  
  console.log('MiniMap added');
}

// Add a reset view button
L.easyButton('fa-home', function(btn, map){
  map.setView([-5.133056, 119.486389], 7);
}, 'Kembali ke tampilan awal').addTo(map);

// Add a button to toggle the satellite view
let satelliteActive = false;
L.easyButton('fa-globe', function(btn, map){
  if (satelliteActive) {
    map.removeLayer(satelliteLayer);
    map.addLayer(osmLayer);
    satelliteActive = false;
  } else {
    map.removeLayer(osmLayer);
    map.addLayer(satelliteLayer);
    satelliteActive = true;
  }
}, 'Ganti Jenis Peta').addTo(map);

// Add a button to toggle labels
L.easyButton('fa-tags', function(btn, map){
  const checkbox = document.getElementById('toggleLabels');
  checkbox.checked = !checkbox.checked;
  
  // Trigger the change event
  const event = new Event('change');
  checkbox.dispatchEvent(event);
}, 'Tampilkan/Sembunyikan Label').addTo(map);

// Improve marker appearance with a custom renderer
const customRenderer = L.canvas({ padding: 0.5 });

// Function to improve the appearance of campus polygons
function styleCampusPolygon(feature) {
  const campusName = feature.properties.nama.toLowerCase();
  let color = '#2C5364'; // Default color
  
  // Assign different colors to different campuses
  if (campusName.includes('teknik')) {
    color = '#e74c3c';
  } else if (campusName.includes('barayya')) {
    color = '#3498db';
  } else if (campusName.includes('sidrap')) {
    color = '#2ecc71';
  } else if (campusName.includes('barru')) {
    color = '#9b59b6';
  } else if (campusName.includes('soppeng')) {
    color = '#f39c12';
  } else if (campusName.includes('selayar')) {
    color = '#16a085';
  }
  
  return {
    color: color,
    weight: 3,
    opacity: 0.8,
    fillColor: color,
    fillOpacity: 0.2,
    dashArray: '5, 5',
    smoothFactor: 1
  };
}



// Add responsive behavior
window.addEventListener('resize', function() {
  const width = window.innerWidth;
  if (width <= 768) {
    document.querySelector('.sidebar').classList.remove('active');
  }
});

// Enhanced Legend with improved visual design
function addEnhancedLegendControl() {
  const legendControl = L.control({ position: 'bottomright' });
  
  legendControl.onAdd = function(map) {
    const div = L.DomUtil.create('div', 'custom-legend');
    div.innerHTML = `
      <h4 style="margin: 0 0 10px 0; border-bottom: 2px solid #2C5364; padding-bottom: 5px; color: #2C5364; font-size: 14px;">
        <i class="fas fa-map-marker-alt"></i> LEGENDA KAMPUS UNHAS
      </h4>
      <div style="margin-bottom: 8px; display: flex; align-items: center;">
        <span style="display: inline-block; width: 15px; height: 15px; background-color: #2C5364; margin-right: 8px; border-radius: 3px;"></span>
        <span style="font-weight: bold;">Kampus Tamalanrea</span>
      </div>
      <div style="margin-bottom: 8px; display: flex; align-items: center;">
        <span style="display: inline-block; width: 15px; height: 15px; background-color: #e74c3c; margin-right: 8px; border-radius: 3px;"></span>
        <span style="font-weight: bold;">Fakultas Teknik</span>
      </div>
      <div style="margin-bottom: 8px; display: flex; align-items: center;">
        <span style="display: inline-block; width: 15px; height: 15px; background-color: #3498db; margin-right: 8px; border-radius: 3px;"></span>
        <span style="font-weight: bold;">Kampus Barayya</span>
      </div>
      <div style="margin-bottom: 8px; display: flex; align-items: center;">
        <span style="display: inline-block; width: 15px; height: 15px; background-color: #2ecc71; margin-right: 8px; border-radius: 3px;"></span>
        <span style="font-weight: bold;">Vokasi Sidrap</span>
      </div>
      <div style="margin-bottom: 8px; display: flex; align-items: center;">
        <span style="display: inline-block; width: 15px; height: 15px; background-color: #9b59b6; margin-right: 8px; border-radius: 3px;"></span>
        <span style="font-weight: bold;">Vokasi Barru</span>
      </div>
      <div style="margin-bottom: 8px; display: flex; align-items: center;">
        <span style="display: inline-block; width: 15px; height: 15px; background-color: #f39c12; margin-right: 8px; border-radius: 3px;"></span>
        <span style="font-weight: bold;">Vokasi Soppeng</span>
      </div>
      <div style="margin-bottom: 8px; display: flex; align-items: center;">
        <span style="display: inline-block; width: 15px; height: 15px; background-color: #16a085; margin-right: 8px; border-radius: 3px;"></span>
        <span style="font-weight: bold;">Vokasi Selayar</span>
      </div>
    `;
    
    return div;
  };
  
  legendControl.addTo(map);
}

// Call the enhanced legend function
addEnhancedLegendControl();



// Show welcome modal on first visit
function showWelcomeModal() {
  const modal = document.createElement('div');
  modal.className = 'welcome-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <h2>Selamat Datang di Peta Interaktif UNHAS</h2>
      <p>Jelajahi seluruh kampus dan fasilitas Universitas Hasanuddin dengan mudah.</p>
      <div class="tips">
        <div class="tip"><i class="fas fa-mouse-pointer"></i> Klik pada gedung untuk melihat informasi</div>
        <div class="tip"><i class="fas fa-layer-group"></i> Gunakan panel kiri untuk memfilter tampilan</div>
        <div class="tip"><i class="fas fa-compass"></i> Klik kompas untuk kembali ke tampilan awal</div>
      </div>
      <button id="start-tour">Mulai Jelajah</button>
    </div>
  `;
  document.body.appendChild(modal);
  
  document.getElementById('start-tour').addEventListener('click', function() {
    modal.remove();
    localStorage.setItem('welcomeShown', 'true');
  });
}

// Check if first visit
if (!localStorage.getItem('welcomeShown')) {
  document.addEventListener('DOMContentLoaded', showWelcomeModal);
}


  // Enhanced mobile sidebar functionality
  document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar
    document.querySelector('.toggle-sidebar').addEventListener('click', function() {
      document.querySelector('.sidebar').classList.add('active');
    });
    
    // Close sidebar when overlay is clicked
    document.querySelector('.mobile-overlay').addEventListener('click', function() {
      document.querySelector('.sidebar').classList.remove('active');
    });
    
    // Add close button functionality if it exists
    const closeBtn = document.querySelector('.sidebar-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        document.querySelector('.sidebar').classList.remove('active');
      });
    }
    
    // Close sidebar when a selection is made
    const selectElem = document.getElementById('campusSelect');
    if (selectElem) {
      selectElem.addEventListener('change', function() {
        if (window.innerWidth <= 768) {
          document.querySelector('.sidebar').classList.remove('active');
        }
      });
    }
  });


  // Fix for missing icons after map is loaded
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      // Force controls to be visible
      const controls = document.querySelectorAll('.leaflet-control-fullscreen, .leaflet-control-browser-print');
      controls.forEach(function(control) {
        control.style.display = 'block';
      });
      
      // Add class to ensure icons are visible if missing
      const printButton = document.querySelector('.leaflet-browser-print');
      if (printButton) {
        printButton.innerHTML = '<i class="fas fa-print"></i>';
      }
      
      const fullscreenButton = document.querySelector('.fullscreen-icon');
      if (fullscreenButton) {
        fullscreenButton.innerHTML = '<i class="fas fa-expand"></i>';
      }
    }, 1000);
  });


// event listeners for sidebar toggle and close functionality

    document.addEventListener('DOMContentLoaded', function() {
      const toggleButton = document.querySelector('.toggle-sidebar');
      const sidebar = document.querySelector('.sidebar');
      const closeButton = document.querySelector('.sidebar-close');
      const overlay = document.querySelector('.mobile-overlay');
      
      // Toggle sidebar on hamburger menu click
      toggleButton.addEventListener('click', function() {
        sidebar.classList.add('active');
      });
      
      // Close sidebar when X button is clicked
      closeButton.addEventListener('click', function() {
        sidebar.classList.remove('active');
      });
      
      // Close sidebar when clicking overlay
      overlay.addEventListener('click', function() {
        sidebar.classList.remove('active');
      });
      
      // Close sidebar when selection is made on mobile
      document.getElementById('campusSelect').addEventListener('change', function() {
        if(window.innerWidth <= 768) {
          sidebar.classList.remove('active');
        }
      });
      
      // Fix for Leaflet controls visibility
      setTimeout(function() {
        map.invalidateSize();
      }, 1000);
    });

    
