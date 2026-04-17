// Initialize 3D Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const canvas = document.getElementById('coin-viewer');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setClearColor(0xf8f8f8);
camera.position.z = 3;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Load coins data
let coinsData = [];
let currentCoin = null;
let currentModel = null;

fetch('coins.json')
    .then(response => response.json())
    .then(data => {
        coinsData = data.coins;
        initializeGallery();
    })
    .catch(error => console.error('Error loading coins data:', error));

// Initialize gallery
function initializeGallery() {
    const gallery = document.getElementById('gallery');
    coinsData.forEach(coin => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'coin-thumbnail';
        thumbnail.textContent = coin.name;
        thumbnail.onclick = () => selectCoin(coin.id, thumbnail);
        gallery.appendChild(thumbnail);
    });
}

// Select coin
function selectCoin(coinId, thumbnail) {
    document.querySelectorAll('.coin-thumbnail').forEach(el => {
        el.classList.remove('active');
    });
    
    thumbnail.classList.add('active');
    
    currentCoin = coinsData.find(c => c.id === coinId);
    
    if (currentCoin) {
        loadCoinModel(currentCoin.model);
        displayCoinDetails(currentCoin);
    }
}

// Load 3D model
const loader = new THREE.GLTFLoader();

function loadCoinModel(modelPath) {
    if (currentModel) {
        scene.remove(currentModel);
    }
    
    loader.load(modelPath, (gltf) => {
        currentModel = gltf.scene;
        scene.add(currentModel);
        
        const box = new THREE.Box3().setFromObject(currentModel);
        const center = box.getCenter(new THREE.Vector3());
        currentModel.position.sub(center);
        
        animate();
    }, undefined, (error) => {
        console.error('Error loading model:', error);
        displayPlaceholder();
    });
}

// Display placeholder if model fails to load
function displayPlaceholder() {
    if (currentModel) scene.remove(currentModel);
    
    const geometry = new THREE.CylinderGeometry(1, 1, 0.1, 32);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0xffd700,
        metalness: 0.8,
        roughness: 0.2
    });
    currentModel = new THREE.Mesh(geometry, material);
    scene.add(currentModel);
    animate();
}

// Display coin details
function displayCoinDetails(coin) {
    const detailsPanel = document.getElementById('details-panel');
    detailsPanel.innerHTML = `
        <h2>${coin.name}</h2>
        
        <div class="detail-section">
            <div class="detail-label">Description</div>
            <div class="detail-value">${coin.description}</div>
        </div>
        
        <div class="detail-section">
            <div class="detail-label">Location Found</div>
            <div class="detail-value">${coin.location}</div>
        </div>
        
        <div class="detail-section">
            <div class="detail-label">Date Found</div>
            <div class="detail-value">${coin.date_found}</div>
        </div>
        
        <div class="detail-section">
            <div class="detail-label">Story</div>
            <div class="detail-value">${coin.story}</div>
        </div>
        
        <div class="detail-section">
            <div class="detail-label">Statistics</div>
            <div class="stats">
                <div class="stat-item">
                    <div class="stat-label">Diameter</div>
                    <div class="stat-value">${coin.stats.diameter_mm} mm</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Material</div>
                    <div class="stat-value">${coin.stats.material}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Weight</div>
                    <div class="stat-value">${coin.stats.weight_g} g</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Condition</div>
                    <div class="stat-value">${coin.stats.condition}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Era</div>
                    <div class="stat-value">${coin.stats.era}</div>
                </div>
            </div>
        </div>
    `;
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    if (currentModel) {
        currentModel.rotation.x += 0.005;
        currentModel.rotation.y += 0.01;
    }
    
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});

// Start animation
animate();
