class FoodBridge {
  constructor() {
    this.initStorage();
    this.initMap();
    this.addServiceWorker();
    this.initStats();
    this.addEventListeners();
  }

  initStorage() {
    this.donations = JSON.parse(localStorage.getItem('donations')) || [];
    this.requests = JSON.parse(localStorage.getItem('requests')) || [];
    
    // Load or initialize stats with preloaded data
    const savedStats = JSON.parse(localStorage.getItem('stats'));
    if (savedStats) {
      this.stats = {
        meals: savedStats.meals,
        donors: new Set(savedStats.donors),
        ngos: new Set(savedStats.ngos)
      };
    } else {
      this.stats = {
        meals: 5240,
        donors: new Set(['Restaurant A', 'Restaurant B', 'Catering C', 'Hotel X', 'Bakery Y']),
        ngos: new Set(['Hope Foundation', 'Food for All', 'Community Care', 'Shelter Home'])
      };
    }

    // Add dummy donors to reach 1200 if needed
    if (this.stats.donors.size < 1200) {
      const currentDonorCount = this.stats.donors.size;
      for (let i = currentDonorCount; i < 1200; i++) {
        this.stats.donors.add(`Donor ${i + 1}`);
      }
    }

    // Ensure minimum meal count
    if (this.stats.meals < 5240) {
      this.stats.meals = 5240;
    }

    this.saveStats();
  }

  saveStats() {
    localStorage.setItem('stats', JSON.stringify({
      meals: this.stats.meals,
      donors: [...this.stats.donors],
      ngos: [...this.stats.ngos]
    }));
  }

  initMap() {
    this.map = L.map('map').setView([20.5937, 78.9629], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    this.updateMapMarkers();
  }

  updateMapMarkers() {
    this.map.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    this.donations.forEach(donation => {
      L.marker([donation.lat, donation.lon])
        .bindPopup(`<b>${donation.food}</b><br>${donation.quantity} servings`)
        .addTo(this.map);
    });
  }

  async getLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) return reject('Geolocation not supported');
      navigator.geolocation.getCurrentPosition(
        position => resolve(position.coords),
        error => reject(error)
      );
    });
  }

  async submitDonation() {
    const donor = document.getElementById('donor').value;
    const food = document.getElementById('food').value;
    const quantity = document.getElementById('amount').value;

    if (!donor || !food || !quantity) {
      this.showNotification('Please fill all fields', 'error');
      return;
    }

    try {
      const coords = await this.getLocation();
      const donation = {
        id: Date.now(),
        donor,
        food,
        quantity: parseInt(quantity),
        timestamp: new Date(),
        lat: coords.latitude,
        lon: coords.longitude
      };

      this.donations.push(donation);
      this.stats.meals += parseInt(quantity);
      this.stats.donors.add(donor);
      this.saveData();
      this.updateMapMarkers();
      this.showNotification('Donation submitted successfully!', 'success');
      hideForm('donateForm');
    } catch (error) {
      this.showNotification('Please enable location to submit donation', 'error');
    }
  }

  submitRequest() {
    const orgName = document.getElementById('orgName').value;
    const location = document.getElementById('location').value;

    if (!orgName || !location) {
      this.showNotification('Please fill all fields', 'error');
      return;
    }

    const request = {
      id: Date.now(),
      orgName,
      location,
      timestamp: new Date()
    };

    this.requests.push(request);
    this.stats.ngos.add(orgName);
    this.saveData();
    this.showNotification('Request submitted successfully!', 'success');
    hideForm('requestForm');
  }

  initStats() {
    this.updateStatsDisplay();
    animateValue('meals', this.stats.meals);
  }

  updateStatsDisplay() {
    document.getElementById('donors').textContent = this.stats.donors.size;
    document.getElementById('ngos').textContent = this.stats.ngos.size;
  }

  addServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registered'))
        .catch(err => console.error('SW registration failed:', err));
    }
  }

  showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  saveData() {
    localStorage.setItem('donations', JSON.stringify(this.donations));
    localStorage.setItem('requests', JSON.stringify(this.requests));
    this.saveStats();
  }

  addEventListeners() {
    window.addEventListener('online', () => {
      this.showNotification('Back online', 'success');
    });

    window.addEventListener('offline', () => {
      this.showNotification('No internet connection', 'error');
    });
  }
}

// Initialize app
const foodBridge = new FoodBridge();

// Helper functions
function animateValue(id, target) {
  const obj = document.getElementById(id);
  let current = parseInt(obj.textContent) || 0;
  const increment = target > current ? 1 : -1;

  const update = () => {
    current += increment;
    obj.textContent = current;
    if (current !== target) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
}

function showForm(formId) {
  document.getElementById(formId).classList.remove('hidden');
}

function hideForm(formId) {
  document.getElementById(formId).classList.add('hidden');
}
