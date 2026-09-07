/**
 * Master Exhibition Portal - 3D Virtual Gallery Engine
 * Built with Three.js (Zero-Budget Museum-Grade WebGL Architecture)
 * Adaptive 4-Tier Procedural Gallery Architecture (Supporting 1 to 200+ Artworks)
 */

(function () {
  'use strict';

  // ==========================================
  // 0. Gallery Tiers Configuration
  // ==========================================
  const GALLERY_TIERS = {
    boutique: {
      id: 'boutique',
      name: 'Boutique Salon',
      nameTh: 'ห้องจัดแสดงบูทีคซาลอน',
      subtitle: 'นิทรรศการขนาดกะทัดรัด (1–15 ผลงาน) สัมผัสผลงานอย่างใกล้ชิดและเป็นกันเอง',
      badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      icon: '<svg class="w-3.5 h-3.5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>',
      width: 18,
      depth: 22,
      height: 5.5,
      spawnZ: 8.0,
      cameraFar: 90
    },
    classic: {
      id: 'classic',
      name: 'Classic Gallery',
      nameTh: 'หอศิลป์คลาสสิก',
      subtitle: 'นิทรรศการขนาดมาตรฐาน (16–40 ผลงาน) สัดส่วนสง่างามพร้อมปีกนิทรรศการซ้าย-ขวา',
      badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      icon: '<svg class="w-3.5 h-3.5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 21h18M4 18h16M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 3L3 8h18l-9-5z"/></svg>',
      width: 28,
      depth: 36,
      height: 6.5,
      spawnZ: 14.0,
      cameraFar: 110
    },
    grand: {
      id: 'grand',
      name: 'Grand Pavilion',
      nameTh: 'แกรนด์พาวิลเลียน',
      subtitle: 'มหานิทรรศการระดับพรีเมียม (41–80 ผลงาน) โถงใหญ่พร้อมคูหาและผนังไฮไลต์ใจกลางห้อง',
      badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      icon: '<svg class="w-3.5 h-3.5 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>',
      width: 38,
      depth: 48,
      height: 7.0,
      spawnZ: 18.0,
      cameraFar: 130
    },
    mega: {
      id: 'mega',
      name: 'Mega Biennial Expo',
      nameTh: 'มหกรรมศิลปะนานาชาติ เมกะเอ็กซ์โป',
      subtitle: 'มหานิทรรศการระดับนานาชาติ (81–200+ ผลงาน) โถงกลางเชื่อมต่อ 5 ปีกอาคารและทางเดินมัลติโซน',
      badgeClass: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30',
      icon: '<svg class="w-3.5 h-3.5 text-fuchsia-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke-width="1.8"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 12h18M12 3a15.3 15.3 0 014 9 15.3 15.3 0 01-4 9 15.3 15.3 0 01-4-9 15.3 15.3 0 014-9z"/></svg>',
      width: 64,
      depth: 82,
      height: 8.5,
      spawnZ: 34.0,
      cameraFar: 180
    }
  };

  function getTierForCount(count) {
    if (count <= 15) return GALLERY_TIERS.boutique;
    if (count <= 40) return GALLERY_TIERS.classic;
    if (count <= 80) return GALLERY_TIERS.grand;
    return GALLERY_TIERS.mega;
  }

  // State
  let scene, camera, renderer, container;
  let roomArchitectureGroup = null;
  let currentTier = GALLERY_TIERS.grand;
  let artworks = [];
  let allArtworksForDrawer = [];
  let artworkMeshes = [];
  let wallMeshes = [];
  let activeArtwork = null;
  let activeArtworkIndex = 0;
  let isPointerLocked = false;
  let isMouseDown = false;
  let isMouseDragging = false;
  let mouseStartPos = { x: 0, y: 0 };
  let lastMousePos = { x: 0, y: 0 };
  let isInspecting = false;
  let isGuidedTour = false;
  let guidedTourTimer = null;
  let guidedTourIndex = 0;
  let audioContext = null;
  let audioNode = null;
  let isAudioPlaying = false;
  let activeDirectoryZone = 'all';
  let registeredEventsList = [];

  function applyCameraRotation() {
    const maxPitch = Math.PI / 2.2;
    player.rotation.pitch = Math.max(-maxPitch, Math.min(maxPitch, player.rotation.pitch));
    if (camera) {
      camera.rotation.y = player.rotation.yaw;
      camera.rotation.x = player.rotation.pitch;
    }
  }

  // Player & Movement Physics
  const player = {
    height: 1.7,
    radius: 0.5,
    speed: 5.8,
    position: new THREE.Vector3(0, 1.7, 18),
    velocity: new THREE.Vector3(),
    rotation: { yaw: 0, pitch: 0 }
  };

  const keys = { forward: false, backward: false, left: false, right: false };

  const touch = {
    joystickActive: false,
    joystickTouchId: null,
    joystickStart: { x: 0, y: 0 },
    joystickVector: { x: 0, y: 0 },
    lookTouchId: null,
    lookLast: { x: 0, y: 0 }
  };

  const raycaster = new THREE.Raycaster();
  const mouseCenter = new THREE.Vector2(0, 0);
  let hoveredArtwork = null;

  // Reusable vectors for physics to prevent garbage collection spikes (60fps smooth)
  const _vForward = new THREE.Vector3();
  const _vRight = new THREE.Vector3();
  const _vMoveDir = new THREE.Vector3();
  const _vTargetPos = new THREE.Vector3();
  const _vTargetPosX = new THREE.Vector3();
  const _vTargetPosZ = new THREE.Vector3();
  const _vUp = new THREE.Vector3(0, 1, 0);

  // Performance & Graphics Quality Settings
  let currentQuality = localStorage.getItem('pc_gallery3d_quality') || 'balanced';

  // Mini-map
  let minimapCanvas, minimapCtx;

  // Texture Loader singleton
  const textureLoader = new THREE.TextureLoader();
  textureLoader.setCrossOrigin('anonymous');

  // ==========================================
  // 1. Initialization
  // ==========================================
  async function init() {
    container = document.getElementById('canvas-container');
    minimapCanvas = document.getElementById('minimap-canvas');
    if (minimapCanvas) minimapCtx = minimapCanvas.getContext('2d');

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0c10);
    scene.fog = new THREE.FogExp2(0x0a0c10, 0.012);

    roomArchitectureGroup = new THREE.Group();
    scene.add(roomArchitectureGroup);

    // Camera
    camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 150);
    camera.position.copy(player.position);
    camera.rotation.order = 'YXZ';

    // High-performance WebGL Renderer with adaptive quality
    renderer = new THREE.WebGLRenderer({
      antialias: currentQuality !== 'perf',
      powerPreference: 'high-performance',
      precision: 'mediump'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // Apply Graphics Quality Mode
    applyGraphicsQuality(currentQuality, false);

    container.appendChild(renderer.domElement);

    // Event Listeners & Touch Controls
    setupEventListeners();
    setupTouchControls();

    // Initialize bilingual language switcher
    if (window.i18n) {
      window.i18n.renderSwitcher('lang-switcher');
    }

    window.addEventListener('languageChanged', () => {
      if (activeArtwork && isInspecting) {
        inspectArtwork(activeArtwork, activeArtworkIndex);
      }
      filterDirectoryList();
      const select = document.getElementById('room-event-filter');
      loadEventsFilterDropdown(select ? select.value : '');
    });

    // Check for event_id in URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const initialEventId = urlParams.get('event_id') || '';

    // Load Events Filter dropdown
    await loadEventsFilterDropdown(initialEventId);

    // Fetch and display artworks for the chosen event (automatically determines Tier & builds room)
    await loadArtworksInRoom(initialEventId);

    // Animation Loop
    let lastTime = performance.now();
    let lodCheckTimer = 0;
    let minimapTimer = 0;

    function animate(currentTime) {
      requestAnimationFrame(animate);
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      update(delta, currentTime);

      // Periodically check texture LOD streaming every 400ms
      lodCheckTimer += delta;
      if (lodCheckTimer > 0.4) {
        checkTextureLOD();
        lodCheckTimer = 0;
      }

      // Throttle minimap redraw to ~20 FPS (every 50ms) to save 2D canvas draw calls
      minimapTimer += delta;
      if (minimapTimer > 0.05) {
        renderMinimap();
        minimapTimer = 0;
      }

      renderer.render(scene, camera);
    }
    animate(performance.now());
  }

  // ==========================================
  // 2. Procedural Texture Generators
  // ==========================================
  function createFloorTexture(repeatX, repeatY) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Base dark polished granite tone
    ctx.fillStyle = '#12151c';
    ctx.fillRect(0, 0, 1024, 1024);

    // Parquet / Marble Tile grid pattern
    const tileSize = 128;
    ctx.strokeStyle = '#1a1e27';
    ctx.lineWidth = 3;

    for (let x = 0; x < 1024; x += tileSize) {
      for (let y = 0; y < 1024; y += tileSize) {
        const shade = Math.floor(Math.random() * 8) - 4;
        ctx.fillStyle = `rgb(${18 + shade}, ${21 + shade}, ${28 + shade})`;
        ctx.fillRect(x, y, tileSize, tileSize);
        ctx.strokeRect(x, y, tileSize, tileSize);
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeatX, repeatY);
    return tex;
  }

  function createWallTexture(repeatX, repeatY) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Warm museum off-white plaster tone
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(0, 0, 512, 512);

    // Micro-texture plaster noise
    for (let i = 0; i < 12000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const opacity = Math.random() * 0.04;
      ctx.fillStyle = Math.random() > 0.5 ? `rgba(0,0,0,${opacity})` : `rgba(255,255,255,${opacity})`;
      ctx.fillRect(x, y, 2, 2);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeatX || 4, repeatY || 2);
    return tex;
  }

  function createCeilingTexture(repeatX, repeatY) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#161920';
    ctx.fillRect(0, 0, 512, 512);

    // Architectural recessed coffer panels
    ctx.strokeStyle = '#0d0f14';
    ctx.lineWidth = 12;
    ctx.strokeRect(10, 10, 492, 492);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeatX, repeatY);
    return tex;
  }

  // ==========================================
  // 2.1 Artwork Dimensions & Real-Scale Parser
  // ==========================================
  function parseArtworkDimensions(dimStr) {
    if (!dimStr || typeof dimStr !== 'string') return null;
    const s = dimStr.trim();
    if (!s || s === '-' || s.toLowerCase() === 'null') return null;

    // Pattern 1: Thai labeled format (e.g., "กว้าง 37 ซม. สูง 71 ซม. ลึก 46 ซม." or "กว้าง 17 สูง 55 ซม.")
    const thaiW = s.match(/กว้าง\s*([\d.]+)/);
    const thaiH = s.match(/สูง\s*([\d.]+)/);
    if (thaiW && thaiH) {
      const w = parseFloat(thaiW[1]);
      const h = parseFloat(thaiH[1]);
      if (w > 0 && h > 0) return { widthCm: w, heightCm: h, raw: s };
    }

    // Pattern 2: Circular / Diameter (e.g., "เส้นผ่าศูนย์กลาง 70 ซม." or "diameter 70 cm")
    const diaMatch = s.match(/(?:เส้นผ่าศูนย์กลาง|diameter|dia)\s*([\d.]+)/i);
    if (diaMatch) {
      const d = parseFloat(diaMatch[1]);
      if (d > 0) return { widthCm: d, heightCm: d, raw: s };
    }

    // Pattern 3: Standard W x H format (e.g., "80 x 60 ซม.", "60 x 80 cm", "100 × 80 ซม.", "69.8 x 44.5 ซม.")
    const numMatch = s.match(/([\d.]+)\s*[xX×*]\s*([\d.]+)/);
    if (numMatch) {
      const w = parseFloat(numMatch[1]);
      const h = parseFloat(numMatch[2]);
      if (w > 0 && h > 0) return { widthCm: w, heightCm: h, raw: s };
    }

    return null;
  }

  function calculateArtwork3DDimensions(dimStr) {
    const parsed = parseArtworkDimensions(dimStr);
    const METER_SCALE = 0.022; // 1 cm real = 0.022 Three.js units (e.g. 100 cm = 2.2m)
    const MIN_W = 0.85;
    const MAX_W = 3.2;
    const MIN_H = 0.7;
    const MAX_H = 2.5;

    if (parsed) {
      let w = parsed.widthCm * METER_SCALE;
      let h = parsed.heightCm * METER_SCALE;

      // Maintain exact aspect ratio while fitting museum gallery bounds
      if (w > MAX_W || h > MAX_H) {
        const scaleDown = Math.min(MAX_W / w, MAX_H / h);
        w *= scaleDown;
        h *= scaleDown;
      }
      if (w < MIN_W && h < MIN_H) {
        const scaleUp = Math.min(MIN_W / w, MIN_H / h);
        w *= scaleUp;
        h *= scaleUp;
      }
      return { w, h, fromReal: true, widthCm: parsed.widthCm, heightCm: parsed.heightCm, dimText: parsed.raw };
    }

    // Default fallback if dimension text is absent or '-'
    return { w: 2.2, h: 1.65, fromReal: false, dimText: '' };
  }

  function createPlacardTexture(title, artist, eventTitle, dimText) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 180;
    const ctx = canvas.getContext('2d');

    // Brushed metal plaque
    const grad = ctx.createLinearGradient(0, 0, 512, 180);
    grad.addColorStop(0, '#1a1d24');
    grad.addColorStop(1, '#0e1015');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 180);

    // Gold border
    ctx.strokeStyle = '#c5a059';
    ctx.lineWidth = 3;
    ctx.strokeRect(8, 8, 496, 164);

    // Event title badge
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText((eventTitle || 'VIRTUAL EXHIBITION').toUpperCase().slice(0, 36), 24, 38);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px "Sarabun", sans-serif';
    ctx.fillText((title || 'Untitled').slice(0, 30), 24, 80);

    // Artist
    ctx.fillStyle = '#c5a059';
    ctx.font = '20px "Sarabun", sans-serif';
    ctx.fillText(`ศิลปิน: ${artist || 'ไม่ระบุศิลปิน'}`.slice(0, 34), 24, 120);

    // Dimensions (if available)
    if (dimText && dimText !== '-') {
      ctx.fillStyle = '#94a3b8';
      ctx.font = '16px "Sarabun", sans-serif';
      ctx.fillText(`ขนาดจริง: ${dimText}`.slice(0, 38), 24, 154);
    }

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }

  // ==========================================
  // 3. Adaptive Museum Architecture Builder
  // ==========================================
  function buildMuseumGallery(tier) {
    currentTier = tier;

    // Clear previous architecture
    while (roomArchitectureGroup.children.length > 0) {
      const obj = roomArchitectureGroup.children[0];
      roomArchitectureGroup.remove(obj);
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
        else obj.material.dispose();
      }
    }
    wallMeshes = [];

    // Camera clipping planes based on room size
    camera.far = tier.cameraFar || 120;
    camera.updateProjectionMatrix();

    // 1. Floor
    const floorRepeatX = Math.max(4, Math.round(tier.width / 3.6));
    const floorRepeatY = Math.max(4, Math.round(tier.depth / 3.6));
    const floorGeo = new THREE.PlaneGeometry(tier.width, tier.depth);
    const floorMat = new THREE.MeshStandardMaterial({
      map: createFloorTexture(floorRepeatX, floorRepeatY),
      roughness: 0.25,
      metalness: 0.15
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    roomArchitectureGroup.add(floor);

    // 2. Ceiling
    const ceilRepeatX = Math.max(3, Math.round(tier.width / 6));
    const ceilRepeatY = Math.max(3, Math.round(tier.depth / 6));
    const ceilingGeo = new THREE.PlaneGeometry(tier.width, tier.depth);
    const ceilingMat = new THREE.MeshStandardMaterial({
      map: createCeilingTexture(ceilRepeatX, ceilRepeatY),
      roughness: 0.85
    });
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = tier.height;
    roomArchitectureGroup.add(ceiling);

    // Wall Material
    const wallMat = new THREE.MeshStandardMaterial({
      map: createWallTexture(Math.round(tier.width / 8), 2),
      roughness: 0.9,
      color: 0xf4f4f4
    });

    // 3. Perimeter Walls
    createWall(tier.width, tier.height, 0.5, 0, tier.height / 2, -tier.depth / 2, 0, wallMat); // North
    createWall(tier.width, tier.height, 0.5, 0, tier.height / 2, tier.depth / 2, 0, wallMat);  // South
    createWall(0.5, tier.height, tier.depth, -tier.width / 2, tier.height / 2, 0, 0, wallMat); // West
    createWall(0.5, tier.height, tier.depth, tier.width / 2, tier.height / 2, 0, 0, wallMat);  // East

    // 4. Interior Architecture Based on Tier
    if (tier.id === 'boutique') {
      buildBench(0, 0.45, 0);
    } else if (tier.id === 'classic') {
      createWall(9, tier.height * 0.75, 0.4, -6.5, (tier.height * 0.75) / 2, 0, 0, wallMat);
      createWall(9, tier.height * 0.75, 0.4, 6.5, (tier.height * 0.75) / 2, 0, 0, wallMat);
      buildBench(0, 0.45, 0);
    } else if (tier.id === 'grand') {
      createWall(14, tier.height * 0.75, 0.4, -9, (tier.height * 0.75) / 2, -6, 0, wallMat);
      createWall(14, tier.height * 0.75, 0.4, -9, (tier.height * 0.75) / 2, 6, 0, wallMat);
      createWall(14, tier.height * 0.75, 0.4, 9, (tier.height * 0.75) / 2, -6, 0, wallMat);
      createWall(14, tier.height * 0.75, 0.4, 9, (tier.height * 0.75) / 2, 6, 0, wallMat);
      createWall(12, tier.height * 0.7, 0.6, 0, (tier.height * 0.7) / 2, 0, 0, wallMat);
      buildBench(0, 0.45, -14);
      buildBench(0, 0.45, 14);
    } else if (tier.id === 'mega') {
      createWall(26, tier.height * 0.75, 0.5, 0, (tier.height * 0.75) / 2, -22, 0, wallMat);
      createWall(26, tier.height * 0.75, 0.5, 0, (tier.height * 0.75) / 2, 22, 0, wallMat);
      createWall(0.5, tier.height * 0.75, 24, -18, (tier.height * 0.75) / 2, -12, 0, wallMat);
      createWall(0.5, tier.height * 0.75, 24, -18, (tier.height * 0.75) / 2, 12, 0, wallMat);
      createWall(0.5, tier.height * 0.75, 24, 18, (tier.height * 0.75) / 2, -12, 0, wallMat);
      createWall(0.5, tier.height * 0.75, 24, 18, (tier.height * 0.75) / 2, 12, 0, wallMat);
      createWall(14, tier.height * 0.7, 0.6, 0, (tier.height * 0.7) / 2, -4, 0, wallMat);
      createWall(14, tier.height * 0.7, 0.6, 0, (tier.height * 0.7) / 2, 4, 0, wallMat);
      buildBench(-10, 0.45, -28);
      buildBench(10, 0.45, -28);
      buildBench(-10, 0.45, 28);
      buildBench(10, 0.45, 28);
    }

    setupTierLighting(tier);
  }

  function createWall(w, h, d, x, y, z, rotY, mat) {
    const geo = new THREE.BoxGeometry(w, h, d);
    const wall = new THREE.Mesh(geo, mat);
    wall.position.set(x, y, z);
    wall.rotation.y = rotY || 0;
    wall.receiveShadow = true;
    wall.castShadow = true;
    roomArchitectureGroup.add(wall);

    const box = new THREE.Box3().setFromObject(wall);
    wallMeshes.push({ mesh: wall, box });
    return wall;
  }

  function buildBench(x, y, z) {
    const benchGeo = new THREE.BoxGeometry(4, 0.5, 1.2);
    const benchMat = new THREE.MeshStandardMaterial({ color: 0x222630, roughness: 0.4, metalness: 0.2 });
    const bench = new THREE.Mesh(benchGeo, benchMat);
    bench.position.set(x, y, z);
    bench.castShadow = true;
    bench.receiveShadow = true;
    roomArchitectureGroup.add(bench);

    const box = new THREE.Box3().setFromObject(bench);
    wallMeshes.push({ mesh: bench, box });
  }

  function setupTierLighting(tier) {
    // 1. Natural Museum Ceiling-and-Floor Ambient Illumination (Practically zero GPU cost)
    const hemiLight = new THREE.HemisphereLight(0xfff8ee, 0x18241e, 0.85);
    roomArchitectureGroup.add(hemiLight);

    // 2. Soft museum fill light
    const ambient = new THREE.AmbientLight(0xfff5e8, 0.35);
    roomArchitectureGroup.add(ambient);

    // 3. Strategic Architectural Ceiling Track Lights (Fixed, low light count)
    if (tier.id === 'boutique') {
      const centerLight = new THREE.PointLight(0xffecd1, 0.95, 26);
      centerLight.position.set(0, tier.height - 0.8, 0);
      roomArchitectureGroup.add(centerLight);
    } else if (tier.id === 'classic') {
      const pLight1 = new THREE.PointLight(0xffecd1, 0.85, 28);
      pLight1.position.set(0, tier.height - 0.8, -8);
      roomArchitectureGroup.add(pLight1);
      const pLight2 = new THREE.PointLight(0xffecd1, 0.85, 28);
      pLight2.position.set(0, tier.height - 0.8, 8);
      roomArchitectureGroup.add(pLight2);
    } else if (tier.id === 'grand') {
      const p1 = new THREE.PointLight(0xffecd1, 0.8, 30);
      p1.position.set(-8, tier.height - 0.8, -8);
      roomArchitectureGroup.add(p1);
      const p2 = new THREE.PointLight(0xffecd1, 0.8, 30);
      p2.position.set(8, tier.height - 0.8, -8);
      roomArchitectureGroup.add(p2);
      const p3 = new THREE.PointLight(0xffecd1, 0.8, 30);
      p3.position.set(-8, tier.height - 0.8, 8);
      roomArchitectureGroup.add(p3);
      const p4 = new THREE.PointLight(0xffecd1, 0.8, 30);
      p4.position.set(8, tier.height - 0.8, 8);
      roomArchitectureGroup.add(p4);
    } else if (tier.id === 'mega') {
      const lightCoords = [[-16, -20], [16, -20], [-16, 20], [16, 20], [0, 0], [0, -22], [0, 22]];
      lightCoords.forEach(([lx, lz]) => {
        const pt = new THREE.PointLight(0xffecd1, 0.75, 32);
        pt.position.set(lx, tier.height - 1.2, lz);
        roomArchitectureGroup.add(pt);
      });
    }
  }

  // ==========================================
  // 4. Procedural Wall Slot Generator
  // ==========================================
  function generateWallSlots(tier) {
    const slots = [];
    const eyeY = 2.0;

    if (tier.id === 'boutique') {
      for (let x = -6.5; x <= 6.5; x += 3.8) {
        slots.push({ x, y: eyeY, z: -tier.depth / 2 + 0.25, rotY: 0, zone: 'Salon North' });
      }
      for (let x = -6.5; x <= 6.5; x += 3.8) {
        slots.push({ x, y: eyeY, z: tier.depth / 2 - 0.25, rotY: Math.PI, zone: 'Salon South' });
      }
      for (let z = -7; z <= 7; z += 3.8) {
        slots.push({ x: -tier.width / 2 + 0.25, y: eyeY, z, rotY: Math.PI / 2, zone: 'Salon West' });
      }
      for (let z = -7; z <= 7; z += 3.8) {
        slots.push({ x: tier.width / 2 - 0.25, y: eyeY, z, rotY: -Math.PI / 2, zone: 'Salon East' });
      }
    } else if (tier.id === 'classic') {
      for (let x = -10.5; x <= 10.5; x += 3.8) {
        slots.push({ x, y: eyeY, z: -tier.depth / 2 + 0.25, rotY: 0, zone: 'North Gallery' });
      }
      for (let x = -10.5; x <= 10.5; x += 3.8) {
        slots.push({ x, y: eyeY, z: tier.depth / 2 - 0.25, rotY: Math.PI, zone: 'South Gallery' });
      }
      for (let z = -14; z <= 14; z += 4.0) {
        slots.push({ x: -tier.width / 2 + 0.25, y: eyeY, z, rotY: Math.PI / 2, zone: 'West Wing' });
      }
      for (let z = -14; z <= 14; z += 4.0) {
        slots.push({ x: tier.width / 2 - 0.25, y: eyeY, z, rotY: -Math.PI / 2, zone: 'East Wing' });
      }
      slots.push({ x: -6.5, y: eyeY, z: -0.3, rotY: 0, zone: 'West Alcove' });
      slots.push({ x: -6.5, y: eyeY, z: 0.3, rotY: Math.PI, zone: 'West Alcove' });
      slots.push({ x: 6.5, y: eyeY, z: -0.3, rotY: 0, zone: 'East Alcove' });
      slots.push({ x: 6.5, y: eyeY, z: 0.3, rotY: Math.PI, zone: 'East Alcove' });
    } else if (tier.id === 'grand') {
      for (let x = -14.5; x <= 14.5; x += 3.8) {
        slots.push({ x, y: eyeY, z: -tier.depth / 2 + 0.25, rotY: 0, zone: 'North Atrium' });
      }
      for (let x = -14.5; x <= 14.5; x += 3.8) {
        slots.push({ x, y: eyeY, z: tier.depth / 2 - 0.25, rotY: Math.PI, zone: 'South Atrium' });
      }
      for (let z = -18.5; z <= 18.5; z += 4.2) {
        slots.push({ x: -tier.width / 2 + 0.25, y: eyeY, z, rotY: Math.PI / 2, zone: 'West Pavilion' });
      }
      for (let z = -18.5; z <= 18.5; z += 4.2) {
        slots.push({ x: tier.width / 2 - 0.25, y: eyeY, z, rotY: -Math.PI / 2, zone: 'East Pavilion' });
      }
      for (let x of [-11, -7]) {
        slots.push({ x, y: eyeY, z: -5.7, rotY: 0, zone: 'Left Wing Court' });
        slots.push({ x, y: eyeY, z: -6.3, rotY: Math.PI, zone: 'Left Wing Court' });
        slots.push({ x, y: eyeY, z: 5.7, rotY: 0, zone: 'Left Wing Court' });
        slots.push({ x, y: eyeY, z: 6.3, rotY: Math.PI, zone: 'Left Wing Court' });
      }
      for (let x of [7, 11]) {
        slots.push({ x, y: eyeY, z: -5.7, rotY: 0, zone: 'Right Wing Court' });
        slots.push({ x, y: eyeY, z: -6.3, rotY: Math.PI, zone: 'Right Wing Court' });
        slots.push({ x, y: eyeY, z: 5.7, rotY: 0, zone: 'Right Wing Court' });
        slots.push({ x, y: eyeY, z: 6.3, rotY: Math.PI, zone: 'Right Wing Court' });
      }
      for (let x of [-3.5, 0, 3.5]) {
        slots.push({ x, y: eyeY, z: 0.45, rotY: 0, zone: 'Center Masterpiece' });
        slots.push({ x, y: eyeY, z: -0.45, rotY: Math.PI, zone: 'Center Masterpiece' });
      }
    } else if (tier.id === 'mega') {
      for (let x = -28; x <= 28; x += 3.8) {
        slots.push({ x, y: eyeY, z: -tier.depth / 2 + 0.3, rotY: 0, zone: 'Zone A: North Grand Hall' });
      }
      for (let x = -28; x <= 28; x += 3.8) {
        slots.push({ x, y: eyeY, z: tier.depth / 2 - 0.3, rotY: Math.PI, zone: 'Zone E: South Media Atrium' });
      }
      for (let z = -36; z <= 36; z += 3.8) {
        slots.push({ x: -tier.width / 2 + 0.3, y: eyeY, z, rotY: Math.PI / 2, zone: 'Zone B: West Gallery Corridor' });
      }
      for (let z = -36; z <= 36; z += 3.8) {
        slots.push({ x: tier.width / 2 - 0.3, y: eyeY, z, rotY: -Math.PI / 2, zone: 'Zone D: East Gallery Corridor' });
      }
      for (let x = -11; x <= 11; x += 3.8) {
        slots.push({ x, y: eyeY, z: -21.7, rotY: 0, zone: 'Zone A: North Inner Court' });
        slots.push({ x, y: eyeY, z: -22.3, rotY: Math.PI, zone: 'Zone A: North Inner Court' });
      }
      for (let x = -11; x <= 11; x += 3.8) {
        slots.push({ x, y: eyeY, z: 21.7, rotY: 0, zone: 'Zone E: South Inner Court' });
        slots.push({ x, y: eyeY, z: 22.3, rotY: Math.PI, zone: 'Zone E: South Inner Court' });
      }
      for (let z of [-20, -14, -8, 8, 14, 20]) {
        slots.push({ x: -17.7, y: eyeY, z, rotY: Math.PI / 2, zone: 'Zone B: West Aisle Gallery' });
        slots.push({ x: -18.3, y: eyeY, z, rotY: -Math.PI / 2, zone: 'Zone B: West Aisle Gallery' });
      }
      for (let z of [-20, -14, -8, 8, 14, 20]) {
        slots.push({ x: 18.3, y: eyeY, z, rotY: -Math.PI / 2, zone: 'Zone D: East Aisle Gallery' });
        slots.push({ x: 17.7, y: eyeY, z, rotY: Math.PI / 2, zone: 'Zone D: East Aisle Gallery' });
      }
      for (let x of [-5, 0, 5]) {
        slots.push({ x, y: eyeY, z: -3.7, rotY: 0, zone: 'Zone C: Central Rotunda' });
        slots.push({ x, y: eyeY, z: -4.3, rotY: Math.PI, zone: 'Zone C: Central Rotunda' });
        slots.push({ x, y: eyeY, z: 4.3, rotY: 0, zone: 'Zone C: Central Rotunda' });
        slots.push({ x, y: eyeY, z: 3.7, rotY: Math.PI, zone: 'Zone C: Central Rotunda' });
      }
    }
    return slots;
  }

  // ==========================================
  // 5. Artwork Generation, Placement & LOD
  // ==========================================
  async function loadArtworksInRoom(filterEventId = '') {
    artworkMeshes.forEach(item => {
      scene.remove(item.group);
      if (item.canvasMat) {
        if (item.canvasMat.map) item.canvasMat.map.dispose();
        item.canvasMat.dispose();
      }
    });
    artworkMeshes = [];

    try {
      const res = await MasterPortalAPI.getArtworks(filterEventId ? { event_id: filterEventId } : {});
      artworks = res.artworks || [];
      allArtworksForDrawer = [...artworks];

      const tier = getTierForCount(artworks.length);
      currentTier = tier;

      buildMuseumGallery(tier);

      player.position.set(0, player.height, tier.spawnZ);
      player.rotation.yaw = 0;
      player.rotation.pitch = 0;
      camera.position.copy(player.position);
      camera.rotation.y = 0;
      camera.rotation.x = 0;

      const countBadge = document.getElementById('artwork-count-badge');
      if (countBadge) countBadge.textContent = `${artworks.length} Artworks`;

      const tierBadge = document.getElementById('room-tier-badge');
      if (tierBadge) {
        tierBadge.className = `px-2.5 py-0.5 rounded-full text-[10px] font-mono border flex items-center gap-1 ${tier.badgeClass}`;
        tierBadge.innerHTML = `<span>${tier.icon}</span><span>${tier.name}</span>`;
      }

      const dirBtnBadge = document.getElementById('directory-btn-badge');
      if (dirBtnBadge) dirBtnBadge.textContent = String(artworks.length);

      const headerTitle = document.getElementById('room-header-title');
      const startTitle = document.getElementById('start-overlay-title');
      const startSubtitle = document.getElementById('start-overlay-subtitle');

      if (filterEventId && artworks.length > 0) {
        const evTitle = artworks[0].event_title || filterEventId;
        if (headerTitle) headerTitle.textContent = `${evTitle} (3D)`;
        if (startTitle) startTitle.textContent = evTitle;
        if (startSubtitle) startSubtitle.textContent = `${tier.subtitle} | จัดแสดงทั้งหมด ${artworks.length} ผลงาน`;
      } else {
        if (headerTitle) headerTitle.textContent = `3D ${tier.name}`;
        if (startTitle) startTitle.textContent = 'ห้องจัดแสดงนิทรรศการเสมือนจริง';
        if (startSubtitle) startSubtitle.textContent = `${tier.subtitle} | รวบรวมผลงานศิลปะทุกนิทรรศการ ${artworks.length} ชิ้น`;
      }

      populateDirectoryDrawer(artworks);
      updateCatalogDrawerForCurrentEvent();

      if (artworks.length === 0) return;

      const slots = generateWallSlots(tier);

      artworks.forEach((art, index) => {
        if (index >= slots.length) return;
        const slot = slots[index];

        const artworkGroup = new THREE.Group();
        artworkGroup.position.set(slot.x, slot.y, slot.z);
        artworkGroup.rotation.y = slot.rotY;

        // Calculate size adhering to real artwork physical dimensions
        const dimSpec = calculateArtwork3DDimensions(art.dimensions);
        let w = dimSpec.w;
        let h = dimSpec.h;

        const frameGeo = new THREE.BoxGeometry(w + 0.12, h + 0.12, 0.06);
        // Poh-Chang Heritage Antique Gold/Bronze Frame (No heavy pitch-black frame)
        const frameMat = new THREE.MeshStandardMaterial({ color: 0xC5A059, roughness: 0.28, metalness: 0.65 });
        const frameMesh = new THREE.Mesh(frameGeo, frameMat);
        frameMesh.castShadow = false;
        artworkGroup.add(frameMesh);

        const canvasGeo = new THREE.PlaneGeometry(w, h);
        // Warm ivory curatorial mat surface
        const canvasMat = new THREE.MeshBasicMaterial({ color: 0xF4EFE6 });

        const initialImgUrl = art.thumbnail_url || art.image_url;
        textureLoader.load(initialImgUrl, (tex) => {
          tex.generateMipmaps = true;
          tex.minFilter = THREE.LinearMipmapLinearFilter;
          canvasMat.map = tex;
          canvasMat.color.setHex(0xffffff);
          canvasMat.needsUpdate = true;

          // If no explicit dimensions were registered, adjust canvas & frame ratio to the actual image aspect ratio
          if (!dimSpec.fromReal && tex.image && tex.image.width && tex.image.height) {
            const aspect = tex.image.width / tex.image.height;
            let autoW = 2.2;
            let autoH = autoW / aspect;
            if (autoH > 2.4) {
              autoH = 2.4;
              autoW = autoH * aspect;
            }
            if (autoW > 3.0) {
              autoW = 3.0;
              autoH = autoW / aspect;
            }
            canvasMesh.scale.set(autoW / w, autoH / h, 1);
            frameMesh.scale.set((autoW + 0.12) / (w + 0.12), (autoH + 0.12) / (h + 0.12), 1);
            placardMesh.position.set(0, -autoH / 2 - 0.28, 0.05);
            hitMesh.scale.set((autoW + 0.4) / (w + 0.4), (autoH + 0.8) / (h + 0.8), 1);
          }
        }, undefined, () => {
          canvasMat.color.setHex(0xE8E0D2);
        });

        const canvasMesh = new THREE.Mesh(canvasGeo, canvasMat);
        canvasMesh.position.z = 0.04;
        artworkGroup.add(canvasMesh);

        const placardGeo = new THREE.PlaneGeometry(0.95, 0.34);
        const placardTex = createPlacardTexture(art.title, art.artist_name, art.event_title, dimSpec.dimText);
        const placardMat = new THREE.MeshBasicMaterial({ map: placardTex });
        const placardMesh = new THREE.Mesh(placardGeo, placardMat);
        placardMesh.position.set(0, -h / 2 - 0.28, 0.05);
        artworkGroup.add(placardMesh);

        // Individual spotlights removed for optimal 60fps performance across 100+ artworks

        const hitGeo = new THREE.BoxGeometry(w + 0.4, h + 0.8, 0.5);
        const hitMat = new THREE.MeshBasicMaterial({ visible: false });
        const hitMesh = new THREE.Mesh(hitGeo, hitMat);
        hitMesh.userData = { artwork: art, index, slot };
        artworkGroup.add(hitMesh);

        scene.add(artworkGroup);

        artworkMeshes.push({
          artwork: art,
          group: artworkGroup,
          canvasMat,
          canvasMesh,
          frameMesh,
          placardMesh,
          hitMesh,
          dimSpec,
          slot,
          index,
          highResLoaded: false
        });
      });
    } catch (err) {
      console.error('Failed to load artworks in 3D room:', err);
    }
  }

  function checkTextureLOD() {
    if (!player || artworkMeshes.length === 0) return;
    for (let i = 0; i < artworkMeshes.length; i++) {
      const item = artworkMeshes[i];
      if (item.highResLoaded) continue;
      const dist = player.position.distanceTo(item.group.position);
      if (dist < 14.0 && item.artwork.image_url) {
        item.highResLoaded = true;
        textureLoader.load(item.artwork.image_url, (hiTex) => {
          hiTex.generateMipmaps = true;
          hiTex.minFilter = THREE.LinearMipmapLinearFilter;
          const oldMap = item.canvasMat.map;
          item.canvasMat.map = hiTex;
          item.canvasMat.needsUpdate = true;
          if (oldMap && oldMap !== hiTex) {
            oldMap.dispose(); // Free GPU VRAM
          }

          // In case thumbnail was missing or had different aspect, adjust aspect ratio if no real dimension was given
          if (item.dimSpec && !item.dimSpec.fromReal && hiTex.image && hiTex.image.width && hiTex.image.height && item.canvasMesh) {
            const aspect = hiTex.image.width / hiTex.image.height;
            let autoW = 2.2;
            let autoH = autoW / aspect;
            if (autoH > 2.4) {
              autoH = 2.4;
              autoW = autoH * aspect;
            }
            if (autoW > 3.0) {
              autoW = 3.0;
              autoH = autoW / aspect;
            }
            const origW = item.dimSpec.w;
            const origH = item.dimSpec.h;
            item.canvasMesh.scale.set(autoW / origW, autoH / origH, 1);
            if (item.frameMesh) item.frameMesh.scale.set((autoW + 0.12) / (origW + 0.12), (autoH + 0.12) / (origH + 0.12), 1);
            if (item.placardMesh) item.placardMesh.position.set(0, -autoH / 2 - 0.28, 0.05);
            if (item.hitMesh) item.hitMesh.scale.set((autoW + 0.4) / (origW + 0.4), (autoH + 0.8) / (origH + 0.8), 1);
          }
        });
      }
    }
  }

  // ==========================================
  // 6. Player Physics, Collision & Movement
  // ==========================================
  function setupEventListeners() {
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('keydown', (e) => {
      if (isInspecting && e.code === 'Escape') { closeArtworkModal(); return; }
      if (e.code === 'Escape') {
        toggleDirectoryDrawer(false);
        toggleCatalogDrawer(false);
        return;
      }
      if (e.code === 'KeyC' && !isInspecting) {
        // Only toggle if not actively typing in an input
        if (!document.activeElement || (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA')) {
          toggleCatalogDrawer();
          return;
        }
      }
      if ((e.code === 'KeyE' || e.key === 'e' || e.key === 'E') && !isInspecting) {
        // Prevent trigger if typing in an input
        if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
          return;
        }
        if (hoveredArtwork) {
          inspectArtwork(hoveredArtwork.artwork, hoveredArtwork.index);
          return;
        }
        // Fallback: If not exact crosshair raycast, find nearest artwork within 4.5 meters in front of player
        if (artworkMeshes.length > 0) {
          let closest = null;
          let minDist = 4.5;
          const pPos = player.position;
          for (let i = 0; i < artworkMeshes.length; i++) {
            const item = artworkMeshes[i];
            const dist = item.group.position.distanceTo(pPos);
            if (dist < minDist) {
              minDist = dist;
              closest = item;
            }
          }
          if (closest) {
            inspectArtwork(closest.artwork, closest.index);
            return;
          }
        }
      }
      if (e.code === 'KeyW' || e.code === 'ArrowUp') keys.forward = true;
      if (e.code === 'KeyS' || e.code === 'ArrowDown') keys.backward = true;
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') keys.left = true;
      if (e.code === 'KeyD' || e.code === 'ArrowRight') keys.right = true;
    });
    window.addEventListener('keyup', (e) => {
      if (e.code === 'KeyW' || e.code === 'ArrowUp') keys.forward = false;
      if (e.code === 'KeyS' || e.code === 'ArrowDown') keys.backward = false;
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') keys.left = false;
      if (e.code === 'KeyD' || e.code === 'ArrowRight') keys.right = false;
    });
    // Mouse Look & Drag-to-Look Controls
    container.addEventListener('mousedown', (e) => {
      if (isInspecting || isGuidedTour) return;
      if (e.button !== 0 && e.button !== 2) return;
      isMouseDown = true;
      isMouseDragging = false;
      mouseStartPos.x = e.clientX;
      mouseStartPos.y = e.clientY;
      lastMousePos.x = e.clientX;
      lastMousePos.y = e.clientY;
    });

    // Prevent context menu when dragging with right-click
    container.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (isInspecting || isGuidedTour) return;

      if (isPointerLocked) {
        // Mode A: FPS Pointer Lock
        const sensitivity = 0.0022;
        player.rotation.yaw -= e.movementX * sensitivity;
        player.rotation.pitch -= e.movementY * sensitivity;
        applyCameraRotation();
      } else if (isMouseDown) {
        // Mode B: Drag-to-Look (Fallback & Trackpad friendly)
        const dx = e.clientX - lastMousePos.x;
        const dy = e.clientY - lastMousePos.y;
        lastMousePos.x = e.clientX;
        lastMousePos.y = e.clientY;

        const totalDist = Math.hypot(e.clientX - mouseStartPos.x, e.clientY - mouseStartPos.y);
        if (totalDist > 4) {
          isMouseDragging = true;
        }

        const dragSensitivity = 0.0035;
        player.rotation.yaw -= dx * dragSensitivity;
        player.rotation.pitch -= dy * dragSensitivity;
        applyCameraRotation();
      }
    });

    window.addEventListener('mouseup', () => {
      isMouseDown = false;
      // Delay resetting isMouseDragging briefly so upcoming click handler knows dragging occurred
      setTimeout(() => { isMouseDragging = false; }, 60);
    });

    document.addEventListener('pointerlockchange', () => {
      isPointerLocked = (
        document.pointerLockElement === container ||
        (renderer && document.pointerLockElement === renderer.domElement)
      );
      // NOTE: Do not re-show start-overlay on pointer lock release!
      // This allows users to smoothly continue exploring using drag-to-look or click.
    });

    container.addEventListener('click', () => {
      if (isInspecting || isGuidedTour) return;
      if (isMouseDragging) {
        // User was dragging to rotate view, do not trigger inspect
        return;
      }

      // If user clicked canvas and pointer is not locked, attempt to lock pointer
      const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      if (!isMobile && !isPointerLocked) {
        try {
          const target = (renderer && renderer.domElement) ? renderer.domElement : container;
          if (target && target.requestPointerLock) {
            const p = target.requestPointerLock();
            if (p && p.catch) p.catch(() => {});
          }
        } catch (err) {}
      }

      if (hoveredArtwork) {
        inspectArtwork(hoveredArtwork.artwork, hoveredArtwork.index);
        return;
      }
      // If clicked while near an artwork in view, inspect it
      if (artworkMeshes.length > 0) {
        let closest = null;
        let minDist = 5.0;
        const pPos = player.position;
        for (let i = 0; i < artworkMeshes.length; i++) {
          const item = artworkMeshes[i];
          const dist = item.group.position.distanceTo(pPos);
          if (dist < minDist) {
            minDist = dist;
            closest = item;
          }
        }
        if (closest) {
          inspectArtwork(closest.artwork, closest.index);
        }
      }
    });
  }

  function setupTouchControls() {
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const joystickElem = document.getElementById('touch-joystick');
    const joystickThumb = document.getElementById('joystick-thumb');
    if (isMobile && joystickElem) {
      joystickElem.classList.remove('hidden');
      joystickElem.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const t = e.changedTouches[0];
        touch.joystickActive = true;
        touch.joystickTouchId = t.identifier;
      }, { passive: false });
      window.addEventListener('touchmove', (e) => {
        for (let i = 0; i < e.changedTouches.length; i++) {
          const t = e.changedTouches[i];
          if (touch.joystickActive && t.identifier === touch.joystickTouchId) {
            const dx = t.clientX - touch.joystickStart.x;
            const dy = t.clientY - touch.joystickStart.y;
            const dist = Math.hypot(dx, dy);
            const maxRadius = 38;
            const angle = Math.atan2(dy, dx);
            const clampedDist = Math.min(dist, maxRadius);
            const tx = Math.cos(angle) * clampedDist;
            const ty = Math.sin(angle) * clampedDist;
            joystickThumb.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`;
            touch.joystickVector = { x: tx / maxRadius, y: ty / maxRadius };
          } else if (t.identifier === touch.lookTouchId) {
            const dx = t.clientX - touch.lookLast.x;
            const dy = t.clientY - touch.lookLast.y;
            touch.lookLast = { x: t.clientX, y: t.clientY };
            const sensitivity = 0.005;
            player.rotation.yaw -= dx * sensitivity;
            player.rotation.pitch -= dy * sensitivity;
            applyCameraRotation();
          }
        }
      }, { passive: false });
      window.addEventListener('touchend', (e) => {
        for (let i = 0; i < e.changedTouches.length; i++) {
          const t = e.changedTouches[i];
          if (t.identifier === touch.joystickTouchId) {
            touch.joystickActive = false;
            touch.joystickTouchId = null;
            joystickThumb.style.transform = 'translate(-50%, -50%)';
          }
          if (t.identifier === touch.lookTouchId) touch.lookTouchId = null;
        }
      });
      container.addEventListener('touchstart', (e) => {
        for (let i = 0; i < e.changedTouches.length; i++) {
          const t = e.changedTouches[i];
          if (t.clientX > window.innerWidth * 0.4 && touch.lookTouchId === null) {
            touch.lookTouchId = t.identifier;
            touch.lookLast = { x: t.clientX, y: t.clientY };
          }
        }
      });
    }
  }

  let lastRaycastTime = 0;

  function update(delta, currentTime) {
    if (isInspecting) return;
    if (isGuidedTour) { updateGuidedTour(delta); return; }

    _vForward.set(0, 0, -1).applyAxisAngle(_vUp, player.rotation.yaw);
    _vRight.set(1, 0, 0).applyAxisAngle(_vUp, player.rotation.yaw);
    _vMoveDir.set(0, 0, 0);

    if (keys.forward) _vMoveDir.add(_vForward);
    if (keys.backward) _vMoveDir.sub(_vForward);
    if (keys.right) _vMoveDir.add(_vRight);
    if (keys.left) _vMoveDir.sub(_vRight);
    if (touch.joystickActive) {
      _vMoveDir.addScaledVector(_vRight, touch.joystickVector.x);
      _vMoveDir.addScaledVector(_vForward, -touch.joystickVector.y);
    }

    if (_vMoveDir.lengthSq() > 0) {
      _vMoveDir.normalize();
      const moveDistance = player.speed * delta;
      _vTargetPos.copy(player.position).addScaledVector(_vMoveDir, moveDistance);

      if (!checkCollision(_vTargetPos)) {
        player.position.copy(_vTargetPos);
      } else {
        _vTargetPosX.copy(player.position);
        _vTargetPosX.x = _vTargetPos.x;
        if (!checkCollision(_vTargetPosX)) player.position.x = _vTargetPos.x;

        _vTargetPosZ.copy(player.position);
        _vTargetPosZ.z = _vTargetPos.z;
        if (!checkCollision(_vTargetPosZ)) player.position.z = _vTargetPos.z;
      }
    }
    camera.position.copy(player.position);
    camera.rotation.y = player.rotation.yaw;
    camera.rotation.x = player.rotation.pitch;
    checkRaycastArtwork(currentTime);
  }

  function checkCollision(pos) {
    const boundX = currentTier.width / 2 - player.radius - 0.3;
    const boundZ = currentTier.depth / 2 - player.radius - 0.3;
    if (Math.abs(pos.x) > boundX || Math.abs(pos.z) > boundZ) return true;
    const playerBox = new THREE.Box3(
      new THREE.Vector3(pos.x - player.radius, 0, pos.z - player.radius),
      new THREE.Vector3(pos.x + player.radius, player.height, pos.z + player.radius)
    );
    for (let i = 0; i < wallMeshes.length; i++) {
      if (playerBox.intersectsBox(wallMeshes[i].box)) return true;
    }
    return false;
  }

  function checkRaycastArtwork(currentTime) {
    const now = currentTime || performance.now();
    // Throttle to 20 FPS (every 50ms)
    if (now - lastRaycastTime < 50) return;
    lastRaycastTime = now;

    const reticle = document.getElementById('reticle');
    const prompt = document.getElementById('interaction-prompt');

    // Fast distance culling: examine artworks within 10 meters of player
    const playerPos = player.position;
    const nearbyHitTargets = [];
    let closestInView = null;
    let closestDist = 7.5;

    // Get camera forward direction in horizontal plane
    camera.getWorldDirection(_vForward);

    for (let i = 0; i < artworkMeshes.length; i++) {
      const item = artworkMeshes[i];
      const dist = item.group.position.distanceTo(playerPos);
      if (dist < 10.0) {
        nearbyHitTargets.push(item.hitMesh);

        // Check angle between camera view and vector to artwork
        _vTargetPos.subVectors(item.group.position, playerPos).normalize();
        const dot = _vForward.dot(_vTargetPos);
        // If artwork is within ~45 degrees of camera center and close enough
        if (dot > 0.72 && dist < closestDist) {
          closestDist = dist;
          closestInView = item.hitMesh.userData;
        }
      }
    }

    if (nearbyHitTargets.length === 0) {
      hoveredArtwork = null;
      if (reticle) reticle.classList.remove('active');
      if (prompt) { prompt.classList.remove('opacity-100', 'translate-y-0'); prompt.classList.add('opacity-0', 'translate-y-2'); }
      return;
    }

    raycaster.setFromCamera(mouseCenter, camera);
    const intersects = raycaster.intersectObjects(nearbyHitTargets);
    if (intersects.length > 0 && intersects[0].distance < 7.5) {
      hoveredArtwork = intersects[0].object.userData;
      if (reticle) reticle.classList.add('active');
      if (prompt) { prompt.classList.remove('opacity-0', 'translate-y-2'); prompt.classList.add('opacity-100', 'translate-y-0'); }
    } else if (closestInView && closestDist < 5.5) {
      // Soft-lock to closest artwork in view even if crosshair is slightly off
      hoveredArtwork = closestInView;
      if (reticle) reticle.classList.add('active');
      if (prompt) { prompt.classList.remove('opacity-0', 'translate-y-2'); prompt.classList.add('opacity-100', 'translate-y-0'); }
    } else {
      hoveredArtwork = null;
      if (reticle) reticle.classList.remove('active');
      if (prompt) { prompt.classList.remove('opacity-100', 'translate-y-0'); prompt.classList.add('opacity-0', 'translate-y-2'); }
    }
  }

  // ==========================================
  // 7. Teleportation & Artwork Directory Drawer
  // ==========================================
  function toggleDirectoryDrawer(forceState) {
    const drawer = document.getElementById('directory-drawer');
    if (!drawer) return;
    const isOpen = typeof forceState === 'boolean' ? forceState : drawer.classList.contains('translate-x-full');
    if (isOpen) {
      drawer.classList.remove('translate-x-full');
      toggleCatalogDrawer(false); // Close catalog drawer if opening directory
      if (document.exitPointerLock) document.exitPointerLock();
    } else drawer.classList.add('translate-x-full');
  }

  function toggleCatalogDrawer(forceState) {
    const drawer = document.getElementById('catalog-drawer');
    if (!drawer) return;
    const isOpen = typeof forceState === 'boolean' ? forceState : drawer.classList.contains('translate-x-full');
    if (isOpen) {
      updateCatalogDrawerForCurrentEvent();
      drawer.classList.remove('translate-x-full');
      toggleDirectoryDrawer(false); // Close directory drawer if opening catalog
      if (document.exitPointerLock) document.exitPointerLock();
    } else {
      drawer.classList.add('translate-x-full');
    }
  }

  function updateCatalogDrawerForCurrentEvent() {
    const filterSelect = document.getElementById('room-event-filter');
    const currentEvId = filterSelect ? filterSelect.value : '';
    const frame = document.getElementById('3d-catalog-frame');
    const titleEl = document.getElementById('3d-catalog-title');
    const popoutBtn = document.getElementById('btn-3d-catalog-popout');
    if (!frame) return;

    let ev = registeredEventsList.find(e => e.event_id === currentEvId);
    if (!ev && registeredEventsList.length > 0) {
      ev = registeredEventsList[0];
    }

    if (ev) {
      const baseCatalogUrl = ev.catalog_url || (ev.portal_url ? `${ev.portal_url.replace(/\/+$/, '')}/catalog.html` : '#');
      const readerUrl = baseCatalogUrl !== '#' ? `${baseCatalogUrl}${baseCatalogUrl.includes('?') ? '&' : '?'}mode=reader` : '#';
      if (titleEl) titleEl.textContent = `รูปเล่มสูจิบัตร: ${ev.event_title}`;
      if (popoutBtn) popoutBtn.href = readerUrl;
      if (frame.getAttribute('data-loaded-url') !== readerUrl) {
        frame.src = readerUrl;
        frame.setAttribute('data-loaded-url', readerUrl);
      }
    } else {
      if (titleEl) titleEl.textContent = 'รูปเล่มสูจิบัตรประจำนิทรรศการ';
      if (popoutBtn) popoutBtn.href = '#';
    }
  }

  function populateDirectoryDrawer(list) {
    const listContainer = document.getElementById('drawer-artworks-list');
    const zoneFilters = document.getElementById('drawer-zone-filters');
    const totalCount = document.getElementById('drawer-total-count');
    if (!listContainer) return;
    if (totalCount) totalCount.textContent = `${list.length} Works`;
    const zones = Array.from(new Set(list.map(a => a.zone || 'Main Gallery'))).filter(Boolean);
    if (zoneFilters) {
      const activeClass = 'bg-[#C5A059] text-[#141E19] font-bold shadow-sm';
      const inactiveClass = 'bg-[#243830] text-[#C8DBD2] hover:text-[#E8C87A] border border-[#355246]';
      zoneFilters.innerHTML = `
        <button onclick="filterDirectoryZone('all')" class="px-2.5 py-1 rounded-lg transition shrink-0 ${activeDirectoryZone === 'all' ? activeClass : inactiveClass}">
          ทั้งหมด (${list.length})
        </button>
      `;
      zones.forEach(z => {
        const count = list.filter(a => (a.zone || 'Main Gallery') === z).length;
        zoneFilters.innerHTML += `
          <button onclick="filterDirectoryZone('${z}')" class="px-2.5 py-1 rounded-lg transition shrink-0 ${activeDirectoryZone === z ? activeClass : inactiveClass}">
            ${z} (${count})
          </button>
        `;
      });
    }
    renderDirectoryItems(list);
  }

  function renderDirectoryItems(items) {
    const listContainer = document.getElementById('drawer-artworks-list');
    if (!listContainer) return;
    if (items.length === 0) {
      listContainer.innerHTML = `<div class="py-12 text-center text-xs text-[#A3B8AF] font-mono">${window.t('empty_artworks_title') || 'ไม่พบผลงานที่ตรงกับคำค้นหา'}</div>`;
      return;
    }
    listContainer.innerHTML = items.map((art, idx) => {
      const realIndex = artworks.findIndex(a => a.global_id === art.global_id);
      const title = window.getField(art, 'title', 'Untitled');
      const artist = window.getArtistFullName(art, 'ศิลปิน');
      const teleportText = window.t('gallery3d_teleport') || 'วาร์ป';
      return `
        <div class="p-2.5 rounded-2xl bg-[#1A2822]/90 border border-[#355246] hover:border-[#C5A059]/60 transition flex items-center justify-between gap-3 group">
          <div class="flex items-center gap-3 min-w-0">
            <img src="${art.thumbnail_url || art.image_url}" alt="${title}" class="w-12 h-12 rounded-xl object-cover border border-[#355246] shrink-0">
            <div class="min-w-0">
              <h4 class="text-xs font-semibold text-white truncate group-hover:text-[#E8C87A] transition">${title}</h4>
              <p class="text-[11px] text-[#C5A059] truncate">${artist}</p>
              <span class="inline-block mt-0.5 px-2 py-0.2 rounded-md bg-[#243830] text-[#A3B8AF] border border-[#355246] text-[9px] font-mono truncate max-w-[140px]">
                ${art.zone || 'Main Gallery'}
              </span>
            </div>
          </div>
          <button onclick="teleportToArtwork(${realIndex})" class="px-3 py-1.5 rounded-xl bg-[#C5A059]/15 hover:bg-[#C5A059] text-[#E8C87A] hover:text-[#141E19] font-semibold text-xs transition border border-[#C5A059]/40 shrink-0 flex items-center gap-1 cursor-pointer">
            <span>${teleportText}</span>
          </button>
        </div>
      `;
    }).join('');
  }

  function filterDirectoryZone(zone) {
    activeDirectoryZone = zone;
    filterDirectoryList();
  }

  function filterDirectoryList() {
    const input = document.getElementById('drawer-search-input');
    const query = input ? input.value.trim().toLowerCase() : '';
    let filtered = allArtworksForDrawer;
    if (activeDirectoryZone !== 'all') filtered = filtered.filter(a => (a.zone || 'Main Gallery') === activeDirectoryZone);
    if (query) {
      filtered = filtered.filter(a => 
        (a.title && a.title.toLowerCase().includes(query)) ||
        (a.artist_name && a.artist_name.toLowerCase().includes(query)) ||
        (a.technique && a.technique.toLowerCase().includes(query)) ||
        (a.zone && a.zone.toLowerCase().includes(query))
      );
    }
    const zoneFilters = document.getElementById('drawer-zone-filters');
    if (zoneFilters) {
      const btns = zoneFilters.querySelectorAll('button');
      btns.forEach(btn => {
        const text = btn.textContent;
        const matches = (activeDirectoryZone === 'all' && text.includes('ทั้งหมด')) || text.includes(activeDirectoryZone);
        btn.className = `px-2.5 py-1 rounded-lg transition shrink-0 ${matches ? 'bg-[#C5A059] text-[#141E19] font-bold shadow-sm' : 'bg-[#243830] text-[#C8DBD2] hover:text-[#E8C87A] border border-[#355246]'}`;
      });
    }
    renderDirectoryItems(filtered);
  }

  function teleportToArtwork(index) {
    if (index < 0 || index >= artworkMeshes.length) return;
    const item = artworkMeshes[index];
    const slot = item.slot;
    const offsetDist = 2.8;
    const nx = -Math.sin(slot.rotY);
    const nz = -Math.cos(slot.rotY);
    const targetX = slot.x - nx * offsetDist;
    const targetZ = slot.z - nz * offsetDist;
    player.position.set(targetX, player.height, targetZ);
    player.rotation.yaw = slot.rotY;
    player.rotation.pitch = 0;
    camera.position.copy(player.position);
    camera.rotation.y = player.rotation.yaw;
    camera.rotation.x = 0;
    toggleDirectoryDrawer(false);
    const reticle = document.getElementById('reticle');
    if (reticle) {
      reticle.classList.add('active');
      setTimeout(() => reticle.classList.remove('active'), 1200);
    }
  }

  // ==========================================
  // 8. Artwork Inspection Modal (Focus Mode)
  // ==========================================
  function inspectArtwork(art, index) {
    activeArtwork = art;
    activeArtworkIndex = index;
    isInspecting = true;
    if (document.exitPointerLock) document.exitPointerLock();
    const modal = document.getElementById('artwork-modal');
    
    const imgEl = document.getElementById('modal-art-image');
    if (imgEl) imgEl.src = art.image_url || art.thumbnail_url;
    
    const titleEl = document.getElementById('modal-art-title');
    if (titleEl) titleEl.textContent = window.getField(art, 'title', 'Untitled');

    const artistEl = document.getElementById('modal-art-artist');
    const artistName = window.getArtistFullName(art, 'ศิลปิน');
    const isEn = window.i18n && window.i18n.getLang() === 'en';
    if (artistEl) artistEl.textContent = isEn ? `By ${artistName}` : `โดย ${artistName}`;

    const cleanField = (val) => (!val || val === '-' || val === 'null' || val === 'undefined') ? '' : val;

    const techEl = document.getElementById('modal-art-technique');
    if (techEl) techEl.textContent = cleanField(window.getField(art, 'technique', '')) || 'ไม่ระบุเทคนิค';

    const dimEl = document.getElementById('modal-art-dimensions');
    if (dimEl) dimEl.textContent = cleanField(window.getField(art, 'dimensions', '')) || 'ตามสัดส่วนภาพจริง';

    const yearEl = document.getElementById('modal-art-year');
    if (yearEl) yearEl.textContent = cleanField(art.year_created) || 'ไม่ระบุ';

    const zoneEl = document.getElementById('modal-art-zone');
    if (zoneEl) zoneEl.textContent = cleanField(art.zone) || 'Main Hall';

    const descEl = document.getElementById('modal-art-desc');
    if (descEl) descEl.textContent = cleanField(window.getField(art, 'description', '')) || 'ไม่มีข้อมูลรายละเอียดเพิ่มเติม';

    const eventBadge = document.getElementById('modal-event-badge');
    if (eventBadge) eventBadge.textContent = window.getField(art, 'event_title', art.event_id || 'Exhibition');

    const eventLink = document.getElementById('modal-art-event-link');
    if (eventLink) {
      if (art.event_id) {
        eventLink.href = `/?event_id=${encodeURIComponent(art.event_id)}&artwork_id=${encodeURIComponent(art.global_id || '')}`;
        eventLink.removeAttribute('target');
      } else {
        eventLink.href = '/';
        eventLink.removeAttribute('target');
      }
    }

    modal.classList.remove('hidden');
    setTimeout(() => { modal.classList.remove('opacity-0'); modal.classList.add('opacity-100'); }, 10);
  }

  function closeArtworkModal() {
    const modal = document.getElementById('artwork-modal');
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0');
    setTimeout(() => { modal.classList.add('hidden'); isInspecting = false; }, 250);
  }

  function inspectRelativeArtwork(direction) {
    if (artworkMeshes.length === 0) return;
    let nextIndex = activeArtworkIndex + direction;
    if (nextIndex < 0) nextIndex = artworkMeshes.length - 1;
    if (nextIndex >= artworkMeshes.length) nextIndex = 0;
    const item = artworkMeshes[nextIndex];
    inspectArtwork(item.artwork, nextIndex);
  }

  // ==========================================
  // 9. Cinematic Guided Tour
  // ==========================================
  function toggleGuidedTour() {
    isGuidedTour = !isGuidedTour;
    const tourLabel = document.getElementById('tour-label');
    const tourBtn = document.getElementById('btn-guided-tour');
    if (isGuidedTour) {
      if (tourLabel) tourLabel.textContent = 'หยุดนำชม';
      tourBtn.classList.add('text-amber-300', 'border-amber-400/40');
      guidedTourIndex = 0;
      moveToNextTourArtwork();
    } else {
      if (tourLabel) tourLabel.textContent = 'นำชมอัตโนมัติ';
      tourBtn.classList.remove('text-amber-300', 'border-amber-400/40');
      clearTimeout(guidedTourTimer);
    }
  }

  function moveToNextTourArtwork() {
    if (!isGuidedTour || artworkMeshes.length === 0) return;
    teleportToArtwork(guidedTourIndex);
    guidedTourIndex = (guidedTourIndex + 1) % artworkMeshes.length;
    guidedTourTimer = setTimeout(moveToNextTourArtwork, 7500);
  }

  function updateGuidedTour(delta) {
    const t = performance.now() * 0.0008;
    camera.position.y = player.height + Math.sin(t * 1.5) * 0.04;
  }

  // ==========================================
  // 10. Dynamic Radar Mini-Map
  // ==========================================
  function renderMinimap() {
    if (!minimapCtx || !minimapCanvas) return;
    const w = minimapCanvas.width;
    const h = minimapCanvas.height;
    minimapCtx.clearRect(0, 0, w, h);
    minimapCtx.fillStyle = '#090b10';
    minimapCtx.fillRect(0, 0, w, h);
    function toMap(x, z) {
      const mx = ((x + currentTier.width / 2) / currentTier.width) * (w - 16) + 8;
      const my = ((z + currentTier.depth / 2) / currentTier.depth) * (h - 16) + 8;
      return { mx, my };
    }
    minimapCtx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    minimapCtx.lineWidth = 1.5;
    minimapCtx.strokeRect(8, 8, w - 16, h - 16);
    minimapCtx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    wallMeshes.forEach(item => {
      const b = item.box;
      const p1 = toMap(b.min.x, b.min.z);
      const p2 = toMap(b.max.x, b.max.z);
      minimapCtx.strokeRect(p1.mx, p1.my, Math.max(p2.mx - p1.mx, 2), Math.max(p2.my - p1.my, 2));
    });
    artworkMeshes.forEach(item => {
      const p = toMap(item.slot.x, item.slot.z);
      minimapCtx.fillStyle = '#38bdf8';
      minimapCtx.beginPath();
      minimapCtx.arc(p.mx, p.my, 2.5, 0, Math.PI * 2);
      minimapCtx.fill();
    });
    const pl = toMap(player.position.x, player.position.z);
    minimapCtx.fillStyle = 'rgba(56, 189, 248, 0.28)';
    minimapCtx.beginPath();
    minimapCtx.moveTo(pl.mx, pl.my);
    const fov = 0.55;
    const coneLen = 18;
    const leftAngle = -player.rotation.yaw - Math.PI / 2 - fov;
    const rightAngle = -player.rotation.yaw - Math.PI / 2 + fov;
    minimapCtx.lineTo(pl.mx + Math.cos(leftAngle) * coneLen, pl.my + Math.sin(leftAngle) * coneLen);
    minimapCtx.lineTo(pl.mx + Math.cos(rightAngle) * coneLen, pl.my + Math.sin(rightAngle) * coneLen);
    minimapCtx.closePath();
    minimapCtx.fill();
    minimapCtx.fillStyle = '#f59e0b';
    minimapCtx.beginPath();
    minimapCtx.arc(pl.mx, pl.my, 4, 0, Math.PI * 2);
    minimapCtx.fill();
  }

  function onMinimapClick(e) {
    const rect = minimapCanvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const w = minimapCanvas.width;
    const h = minimapCanvas.height;
    const worldX = ((clickX - 8) / (w - 16)) * currentTier.width - currentTier.width / 2;
    const worldZ = ((clickY - 8) / (h - 16)) * currentTier.depth - currentTier.depth / 2;
    const targetPos = new THREE.Vector3(worldX, 1.7, worldZ);
    if (!checkCollision(targetPos)) {
      player.position.copy(targetPos);
      camera.position.copy(player.position);
    }
  }

  // ==========================================
  // 11. Ambient Audio
  // ==========================================
  function toggleAudio() {
    isAudioPlaying = !isAudioPlaying;
    if (isAudioPlaying) startGalleryAmbience(); else stopGalleryAmbience();
  }

  function startGalleryAmbience() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioContext) audioContext = new AudioCtx();
      if (audioContext.state === 'suspended') audioContext.resume();
      const bufferSize = audioContext.sampleRate * 2;
      const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99 * b0 + white * 0.05;
        b1 = 0.95 * b1 + white * 0.05;
        b2 = 0.85 * b2 + white * 0.05;
        output[i] = (b0 + b1 + b2) * 0.04;
      }
      const whiteNoise = audioContext.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;
      const filter = audioContext.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 320;
      const gain = audioContext.createGain();
      gain.gain.value = 0.15;
      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(audioContext.destination);
      whiteNoise.start();
      audioNode = whiteNoise;
    } catch (e) { console.warn('Web Audio note:', e.message); }
  }

  function stopGalleryAmbience() {
    if (audioNode) { try { audioNode.stop(); } catch (e) {} audioNode = null; }
  }

  // ==========================================
  // 12. UI Helpers & Modals
  // ==========================================
  function enterGallery() {
    const overlay = document.getElementById('start-overlay');
    if (overlay) overlay.classList.add('hidden');
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isMobile) {
      try {
        const el = (renderer && renderer.domElement) ? renderer.domElement : container;
        if (el && el.requestPointerLock) {
          const res = el.requestPointerLock();
          if (res && res.catch) res.catch(() => {});
        }
      } catch (err) {
        // Pointer lock not permitted or rejected, user can use drag-to-look seamlessly
      }
    }
  }
  function toggleFullscreen() { if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {}); else if (document.exitFullscreen) document.exitFullscreen(); }
  function toggleHelpModal() { document.getElementById('help-modal').classList.toggle('hidden'); }

  async function loadEventsFilterDropdown(selectedEventId = '') {
    try {
      const res = await MasterPortalAPI.getEvents();
      registeredEventsList = res.events || [];
      const select = document.getElementById('room-event-filter');
      if (!select) return;
      select.innerHTML = `<option value="" class="bg-slate-900 text-white">${window.t('filter_all')} (All Events)</option>`;
      registeredEventsList.forEach(ev => {
        const opt = document.createElement('option');
        opt.value = ev.event_id;
        const title = window.getField(ev, 'event_title', ev.event_id);
        const worksSuffix = window.t('event_artworks_count_suffix') || 'works';
        opt.textContent = `${title} (${ev.artwork_count || 0} ${worksSuffix})`;
        opt.className = 'bg-slate-900 text-white';
        select.appendChild(opt);
      });
      if (selectedEventId) select.value = selectedEventId;

      select.onchange = async () => {
        const evId = select.value;
        const newUrl = evId ? `?event_id=${encodeURIComponent(evId)}` : window.location.pathname;
        window.history.pushState(null, '', newUrl);
        await loadArtworksInRoom(evId);
        updateCatalogDrawerForCurrentEvent();
      };
    } catch (err) { console.error('Failed to load events filter:', err); }
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function applyGraphicsQuality(mode, updateUI = true) {
    currentQuality = mode;
    localStorage.setItem('pc_gallery3d_quality', mode);

    if (renderer) {
      if (mode === 'perf') {
        renderer.setPixelRatio(1.0);
        renderer.shadowMap.enabled = false;
      } else if (mode === 'high') {
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
      } else {
        // Balanced (Default) - 60 FPS sweet spot
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
        renderer.shadowMap.enabled = false;
      }
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    if (updateUI) {
      const label = document.getElementById('quality-mode-label');
      if (label) {
        if (mode === 'perf') label.textContent = '60 FPS ⚡';
        else if (mode === 'high') label.textContent = 'High ✨';
        else label.textContent = 'Auto ⚖️';
      }
      document.querySelectorAll('.quality-opt-btn').forEach(btn => {
        const btnMode = btn.getAttribute('data-mode');
        if (btnMode === mode) {
          btn.classList.add('bg-[#C5A059]/25', 'text-[#FAF3E3]', 'font-bold');
        } else {
          btn.classList.remove('bg-[#C5A059]/25', 'text-[#FAF3E3]', 'font-bold');
        }
      });
    }
  }

  function setGraphicsQuality(mode) {
    applyGraphicsQuality(mode, true);
    toggleQualityMenu(false);
  }

  function toggleQualityMenu(forceState) {
    const dropdown = document.getElementById('quality-dropdown');
    if (!dropdown) return;
    const isHidden = typeof forceState === 'boolean' ? !forceState : dropdown.classList.contains('hidden');
    if (isHidden) {
      dropdown.classList.remove('hidden');
    } else {
      dropdown.classList.add('hidden');
    }
  }

  // Close quality dropdown when clicking outside
  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('quality-dropdown');
    const toggleBtn = document.getElementById('btn-quality-toggle');
    if (dropdown && !dropdown.classList.contains('hidden')) {
      if (toggleBtn && !toggleBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add('hidden');
      }
    }
  });

  window.enterGallery = enterGallery;
  window.toggleGuidedTour = toggleGuidedTour;
  window.toggleAudio = toggleAudio;
  window.toggleFullscreen = toggleFullscreen;
  window.toggleHelpModal = toggleHelpModal;
  window.closeArtworkModal = closeArtworkModal;
  window.inspectRelativeArtwork = inspectRelativeArtwork;
  window.toggleDirectoryDrawer = toggleDirectoryDrawer;
  window.toggleCatalogDrawer = toggleCatalogDrawer;
  window.updateCatalogDrawerForCurrentEvent = updateCatalogDrawerForCurrentEvent;
  window.filterDirectoryZone = filterDirectoryZone;
  window.filterDirectoryList = filterDirectoryList;
  window.teleportToArtwork = teleportToArtwork;
  window.setGraphicsQuality = setGraphicsQuality;
  window.toggleQualityMenu = toggleQualityMenu;

  document.addEventListener('DOMContentLoaded', init);
})();
