// Interactive 3D Cyber Globe (Side-Locked Fix)
(function () {
  const pins = [
    { label: "Development of Media and Globalization", lat: 51.5, lon: -0.1, target: "media" },
    { label: "Technological Globalization", lat: 35.7, lon: 139.7, target: "tech" },
    { label: "Social Media and Global Connectivity", lat: 37.8, lon: -122.4, target: "social" },
    { label: "Misinformation, Fake News, and Media Literacy", lat: -1.3, lon: 36.8, target: "misinfo" },
    { label: "The Digital Divide and Challenges of Growing Inequality", lat: 14.6, lon: 121.0, target: "divide" }
  ];

  const globeColors = {
    ocean: 0x06172d,
    oceanGlow: 0x05213d,
    pin: 0x00e5ff
  };

  const globeStage = document.getElementById("globeContainer");
  const globeTooltip = document.getElementById("globe-tooltip");

  if (!globeStage || typeof THREE === "undefined") return;

  // Clear existing canvas elements to prevent duplicate renderers
  globeStage.querySelectorAll("canvas").forEach(c => c.remove());

  const globeRadius = 1.95;
  const globeGroup = new THREE.Group();

  const bounds = globeStage.getBoundingClientRect();
  const width = bounds.width || 400;
  const height = bounds.height || 400;

  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 40);
  camera.position.set(0, 0, 6.8);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  globeStage.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.add(globeGroup);

  // Lighting
  scene.add(new THREE.AmbientLight(0x79cff1, 1.6));
  const keyLight = new THREE.PointLight(0x45caff, 22, 18);
  keyLight.position.set(-4, 3, 6);
  scene.add(keyLight);

  // Wireframe Ocean Globe Core
  const ocean = new THREE.Mesh(
    new THREE.SphereGeometry(globeRadius, 48, 48),
    new THREE.MeshPhongMaterial({
      color: globeColors.ocean,
      emissive: globeColors.oceanGlow,
      wireframe: true,
      transparent: true,
      opacity: 0.85
    })
  );
  globeGroup.add(ocean);

  function latLonToVector(lat, lon, radius) {
    const latitude = THREE.MathUtils.degToRad(lat);
    const longitude = THREE.MathUtils.degToRad(lon);
    return new THREE.Vector3(
      radius * Math.cos(latitude) * Math.sin(longitude),
      radius * Math.sin(latitude),
      radius * Math.cos(latitude) * Math.cos(longitude)
    );
  }

  // 5 Pins Placement
  const pinMeshes = [];
  const pinRecords = [];
  const pinGeo = new THREE.SphereGeometry(0.05, 16, 16);
  const pinMat = new THREE.MeshBasicMaterial({ color: globeColors.pin });

  pins.forEach((pin, index) => {
    const normal = latLonToVector(pin.lat, pin.lon, 1).normalize();
    const pinGroup = new THREE.Group();
    pinGroup.position.copy(normal.clone().multiplyScalar(globeRadius + 0.03));
    pinGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);

    const core = new THREE.Mesh(pinGeo, pinMat);
    core.position.z = 0.05;

    const hitArea = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 12, 10),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
    );
    hitArea.position.z = 0.05;

    pinGroup.add(core, hitArea);
    globeGroup.add(pinGroup);

    pinMeshes.push(hitArea);
    pinRecords.push({ pin, pinGroup, phase: index * 1.5, visible: false });
  });

  globeGroup.rotation.y = -THREE.MathUtils.degToRad(125);

  // Interaction handlers
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const projectedPosition = new THREE.Vector3();
  let hoveredPin = null;
  let pointerDown = null;
  let dragging = false;
  let resumeRotationAt = 0;

  function resizeGlobe() {
    const rect = globeStage.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
    renderer.setSize(rect.width, rect.height, false);
  }

  globeStage.addEventListener("pointerdown", event => {
    if (event.button !== 0) return;
    pointerDown = { id: event.pointerId, x: event.clientX, y: event.clientY, rotX: globeGroup.rotation.x, rotY: globeGroup.rotation.y };
    dragging = false;
  });

  globeStage.addEventListener("pointermove", event => {
    if (pointerDown) {
      const dx = event.clientX - pointerDown.x;
      const dy = event.clientY - pointerDown.y;
      if (Math.abs(dx) + Math.abs(dy) > 4) dragging = true;

      if (dragging) {
        globeGroup.rotation.y = pointerDown.rotY + dx * 0.006;
        globeGroup.rotation.x = THREE.MathUtils.clamp(pointerDown.rotX + dy * 0.006, -1.2, 1.2);
        resumeRotationAt = performance.now() + 2500;
        if (globeTooltip) globeTooltip.style.opacity = "0";
        return;
      }
    }

    const rect = globeStage.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(pinMeshes, false)[0];

    if (hit) {
      const record = pinRecords.find(r => r.pinGroup === hit.object.parent);
      if (record && record.visible && globeTooltip) {
        hoveredPin = record;
        globeTooltip.textContent = record.pin.label;
        globeTooltip.style.opacity = "1";
        globeStage.style.cursor = "pointer";
      }
    } else {
      hoveredPin = null;
      if (globeTooltip) globeTooltip.style.opacity = "0";
      globeStage.style.cursor = "grab";
    }
  });

  globeStage.addEventListener("pointerup", () => {
    if (!dragging && hoveredPin) {
      const el = document.getElementById(hoveredPin.pin.target);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    pointerDown = null;
    dragging = false;
  });

  window.addEventListener("resize", resizeGlobe);

  function animate(now) {
    requestAnimationFrame(animate);

    if (!dragging && now > resumeRotationAt) {
      globeGroup.rotation.y += 0.0025;
    }

    pinRecords.forEach(record => {
      record.pinGroup.getWorldPosition(projectedPosition);
      const facing = projectedPosition.clone().normalize().dot(new THREE.Vector3(0, 0, 1));
      record.visible = facing > 0.05;
      record.pinGroup.visible = record.visible;
    });

    if (hoveredPin && hoveredPin.visible && globeTooltip) {
      const rect = globeStage.getBoundingClientRect();
      hoveredPin.pinGroup.getWorldPosition(projectedPosition);
      projectedPosition.project(camera);
      globeTooltip.style.left = `${((projectedPosition.x + 1) / 2) * rect.width}px`;
      globeTooltip.style.top = `${((1 - projectedPosition.y) / 2) * rect.height - 20}px`;
    }

    renderer.render(scene, camera);
  }

  animate(0);
})();

// Interactive globe configuration: update this list to add or edit locations.
const pins = [
  { label: "Development of Media and Globalization", lat: 51.5, lon: -0.1,   target: "media" },
  { label: "Technological Globalization",            lat: 35.7, lon: 139.7, target: "tech" },
  { label: "Social Media and Global Connectivity",   lat: 37.8, lon: -122.4, target: "social" },
  { label: "Misinformation, Fake News, and Media Literacy", lat: -1.3, lon: 36.8, target: "misinfo" },
  { label: "The Digital Divide and Challenges of Growing Inequality", lat: 14.6, lon: 121.0, target: "divide" }
];

// Globe colors: change these values to retheme the sphere and network.
const globeColors = {
  ocean: 0x06172d,
  oceanGlow: 0x05213d,
  land: 0x36d8ff,
  landHighlight: 0x92f4ff,
  network: 0x35ccff,
  pin: 0x7bf5ff
};

// Rotation speed: radians per second. Dragging pauses this for a few seconds.
const globeRotationSpeed = 0.055;

const globeStage = document.getElementById("globe-stage");
const globePanel = document.getElementById("globe-panel");
const globeStatus = document.getElementById("globe-status");
const globeTooltip = document.getElementById("globe-tooltip");
const locationLinks = document.getElementById("globe-location-links");

pins.forEach(pin => {
  const link = document.createElement("a");
  link.href = "#" + pin.target;
  link.setAttribute("aria-label", `Go to ${pin.label}`);
  link.textContent = pin.label;
  locationLinks.append(link);
});

if (!window.THREE) {
  globeStatus.textContent = "The 3D globe could not load. Showing the GLOBE.jpg reference image.";
  console.error("Three.js did not load from cdnjs.cloudflare.com.");
} else {
  const THREE = window.THREE;
  const globeRadius = 2;
  const globeGroup = new THREE.Group();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 40);
  camera.position.set(0, 0, 7.2);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
  } catch (error) {
    globeStatus.textContent = "Your browser could not start WebGL. Showing the GLOBE.jpg reference image.";
    console.error("Unable to initialize the interactive globe renderer.", error);
  }

  if (renderer) {
    const scene = new THREE.Scene();
    scene.add(globeGroup);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-hidden", "true");
    globeStage.append(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x79cfff, 1.6));
    const keyLight = new THREE.PointLight(0x45caff, 24, 18);
    keyLight.position.set(-4, 3, 6);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x168bff, 17, 16);
    rimLight.position.set(4, -1, -4);
    scene.add(rimLight);

    const ocean = new THREE.Mesh(
      new THREE.SphereGeometry(globeRadius, 72, 56),
      new THREE.MeshPhongMaterial({
        color: globeColors.ocean,
        emissive: globeColors.oceanGlow,
        specular: 0x16476c,
        shininess: 30
      })
    );
    globeGroup.add(ocean);

    function latLonToVector(lat, lon, radius) {
      const latitude = THREE.MathUtils.degToRad(lat);
      const longitude = THREE.MathUtils.degToRad(lon);
      return new THREE.Vector3(
        radius * Math.cos(latitude) * Math.sin(longitude),
        radius * Math.sin(latitude),
        radius * Math.cos(latitude) * Math.cos(longitude)
      );
    }

    // Approximate continent outlines in [longitude, latitude] pairs for procedural dot placement.
    const continents = [
      [[-168,72],[-145,72],[-130,60],[-123,50],[-128,42],[-117,32],[-108,30],[-100,20],[-90,15],[-82,9],[-78,22],[-80,28],[-74,36],[-66,44],[-53,50],[-60,59],[-76,63],[-90,70],[-112,74],[-140,73]],
      [[-82,12],[-70,12],[-60,7],[-50,0],[-48,-10],[-54,-22],[-58,-35],[-66,-55],[-74,-50],[-77,-34],[-80,-10]],
      [[-52,82],[-28,82],[-20,72],[-38,58],[-52,60],[-62,70]],
      [[-11,36],[-10,48],[-5,58],[8,60],[20,70],[37,68],[50,60],[70,68],[100,73],[130,62],[151,56],[161,50],[145,42],[130,34],[122,24],[110,18],[100,8],[88,8],[80,14],[74,22],[62,25],[51,35],[42,40],[31,35],[25,40],[15,37],[10,43],[0,40]],
      [[-18,35],[0,37],[15,33],[30,31],[35,20],[43,12],[50,3],[42,-12],[35,-25],[24,-35],[16,-34],[10,-18],[3,-5],[-5,5],[-12,17],[-17,25]],
      [[112,-11],[130,-10],[145,-16],[154,-25],[147,-39],[132,-44],[115,-34]],
      [[129,33],[136,35],[142,43],[146,43],[144,35],[138,31]],
      [[95,5],[108,8],[120,2],[128,-4],[120,-9],[108,-7],[100,-2]],
      [[47,-13],[50,-17],[49,-25],[45,-25],[43,-18]]
    ];

    function isLand(longitude, latitude) {
      return continents.some(polygon => {
        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
          const [xi, yi] = polygon[i];
          const [xj, yj] = polygon[j];
          const crosses = (yi > latitude) !== (yj > latitude)
            && longitude < ((xj - xi) * (latitude - yi)) / (yj - yi) + xi;
          if (crosses) inside = !inside;
        }
        return inside;
      });
    }

    let seed = 41723;
    function random() {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    }

    const landPositions = [];
    const landColors = [];
    for (let latitude = -58; latitude <= 78; latitude += 2.8) {
      for (let longitude = -178; longitude <= 180; longitude += 2.8) {
        const lon = longitude + (random() - 0.5) * 1.3;
        const lat = latitude + (random() - 0.5) * 1.3;
        if (!isLand(lon, lat)) continue;
        const position = latLonToVector(lat, lon, globeRadius + 0.025);
        landPositions.push(position.x, position.y, position.z);
        const color = new THREE.Color(globeColors.land).lerp(
          new THREE.Color(globeColors.landHighlight),
          Math.max(0, (lat + 55) / 155) * 0.38
        );
        landColors.push(color.r, color.g, color.b);
      }
    }

    const landGeometry = new THREE.BufferGeometry();
    landGeometry.setAttribute("position", new THREE.Float32BufferAttribute(landPositions, 3));
    landGeometry.setAttribute("color", new THREE.Float32BufferAttribute(landColors, 3));
    const landGlow = new THREE.Points(
      landGeometry,
      new THREE.PointsMaterial({
        size: 0.09,
        vertexColors: true,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    const landDots = new THREE.Points(
      landGeometry,
      new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.94,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    globeGroup.add(landGlow, landDots);

    const networkNodes = [];
    for (let i = 0; i < 58; i++) {
      const y = random() * 2 - 1;
      const longitude = random() * Math.PI * 2;
      const radiusOnSphere = Math.sqrt(1 - y * y);
      networkNodes.push(new THREE.Vector3(
        radiusOnSphere * Math.sin(longitude),
        y,
        radiusOnSphere * Math.cos(longitude)
      ));
    }
    const linePositions = [];
    const connectedPairs = new Set();
    networkNodes.forEach((node, nodeIndex) => {
      const nearest = networkNodes
        .map((other, otherIndex) => ({ otherIndex, distance: node.distanceToSquared(other) }))
        .filter(item => item.otherIndex !== nodeIndex)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 2);

      nearest.forEach(({ otherIndex }) => {
        const pairKey = [nodeIndex, otherIndex].sort((a, b) => a - b).join("-");
        if (connectedPairs.has(pairKey)) return;
        connectedPairs.add(pairKey);
        const end = networkNodes[otherIndex];
        const angle = node.angleTo(end);
        for (let step = 0; step <= 16; step++) {
          const t = step / 16;
          const point = node.clone().multiplyScalar(Math.sin((1 - t) * angle))
            .add(end.clone().multiplyScalar(Math.sin(t * angle)))
            .multiplyScalar((globeRadius + 0.035) / Math.sin(angle));
          if (step > 0) {
            const previousT = (step - 1) / 16;
            const previous = node.clone().multiplyScalar(Math.sin((1 - previousT) * angle))
              .add(end.clone().multiplyScalar(Math.sin(previousT * angle)))
              .multiplyScalar((globeRadius + 0.035) / Math.sin(angle));
            linePositions.push(previous.x, previous.y, previous.z, point.x, point.y, point.z);
          }
        }
      });
    });

    const networkLineGeometry = new THREE.BufferGeometry();
    networkLineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    const networkLines = new THREE.LineSegments(
      networkLineGeometry,
      new THREE.LineBasicMaterial({
        color: globeColors.network,
        transparent: true,
        opacity: 0.34,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    globeGroup.add(networkLines);

    const networkPositions = [];
    networkNodes.forEach(node => {
      const point = node.clone().multiplyScalar(globeRadius + 0.045);
      networkPositions.push(point.x, point.y, point.z);
    });
    const networkPointGeometry = new THREE.BufferGeometry();
    networkPointGeometry.setAttribute("position", new THREE.Float32BufferAttribute(networkPositions, 3));
    const networkPoints = new THREE.Points(
      networkPointGeometry,
      new THREE.PointsMaterial({
        color: globeColors.network,
        size: 0.065,
        transparent: true,
        opacity: 0.92,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    globeGroup.add(networkPoints);

    const shellPositions = [];
    const shellCount = 1050;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < shellCount; i++) {
      const y = 1 - (i / (shellCount - 1)) * 2;
      const radiusOnSphere = Math.sqrt(1 - y * y);
      const angle = goldenAngle * i;
      const point = new THREE.Vector3(
        Math.cos(angle) * radiusOnSphere,
        y,
        Math.sin(angle) * radiusOnSphere
      ).multiplyScalar(globeRadius + 0.09);
      shellPositions.push(point.x, point.y, point.z);
    }
    const shellGeometry = new THREE.BufferGeometry();
    shellGeometry.setAttribute("position", new THREE.Float32BufferAttribute(shellPositions, 3));
    shellGeometry.setAttribute("normal", new THREE.Float32BufferAttribute(
      shellPositions.map(value => value / (globeRadius + 0.09)),
      3
    ));
    const shellDots = new THREE.Points(
      shellGeometry,
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: `
          varying float vEdge;
          void main() {
            vec3 viewNormal = normalize(normalMatrix * normal);
            vEdge = 1.0 - smoothstep(0.04, 0.34, abs(viewNormal.z));
            gl_PointSize = 1.8;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying float vEdge;
          void main() {
            float point = 1.0 - smoothstep(0.15, 0.5, length(gl_PointCoord - vec2(0.5)));
            gl_FragColor = vec4(0.08, 0.64, 1.0, point * vEdge * 0.42);
          }
        `
      })
    );
    globeGroup.add(shellDots);

    const pinMeshes = [];
    const pinRecords = [];
    const pinGeometry = new THREE.SphereGeometry(0.045, 14, 12);
    const pinMaterial = new THREE.MeshBasicMaterial({ color: globeColors.pin });
    const haloGeometry = new THREE.SphereGeometry(0.105, 14, 12);
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: globeColors.pin,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const ringGeometry = new THREE.TorusGeometry(0.075, 0.008, 6, 28);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: globeColors.pin,
      transparent: true,
      opacity: 0.75,
      depthWrite: false
    });

    pins.forEach((pin, index) => {
      const normal = latLonToVector(pin.lat, pin.lon, 1).normalize();
      const pinGroup = new THREE.Group();
      pinGroup.position.copy(normal.clone().multiplyScalar(globeRadius + 0.035));
      pinGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);

      const halo = new THREE.Mesh(haloGeometry, haloMaterial);
      halo.position.z = 0.045;
      const core = new THREE.Mesh(pinGeometry, pinMaterial);
      core.position.z = 0.07;
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.z = 0.035;
      const hitArea = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 12, 10),
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
      );
      hitArea.position.z = 0.07;
      pinGroup.add(halo, ring, core, hitArea);
      globeGroup.add(pinGroup);
      pinMeshes.push(hitArea);
      pinRecords.push({ pin, pinGroup, halo, core, ring, phase: index * 1.7, visible: false });
    });

    // Start with the Philippines facing the viewer so its location pins are immediately discoverable.
    globeGroup.rotation.y = -THREE.MathUtils.degToRad(125);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const projectedPosition = new THREE.Vector3();
    let hoveredPin = null;
    let pointerDown = null;
    let dragging = false;
    let resumeRotationAt = 0;
    let previousFrameTime = 0;

    function resizeGlobe() {
      const bounds = globeStage.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      camera.aspect = bounds.width / bounds.height;
      camera.updateProjectionMatrix();
      renderer.setSize(bounds.width, bounds.height, false);
    }

    function pinAtPointer(event) {
      const bounds = globeStage.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(pinMeshes, false)[0];
      return hit ? pinRecords.find(record => record.pinGroup === hit.object.parent) : null;
    }

    function updateTooltip(pinRecord) {
      hoveredPin = pinRecord;
      if (!pinRecord) {
        globeTooltip.classList.remove("is-visible");
        globeTooltip.textContent = "";
        globeStage.style.cursor = dragging ? "grabbing" : "grab";
        return;
      }
      globeTooltip.textContent = pinRecord.pin.label;
      globeTooltip.classList.add("is-visible");
      globeStage.style.cursor = "pointer";
    }

    globeStage.addEventListener("pointerdown", event => {
      if (event.button !== 0) return;
      pointerDown = { id: event.pointerId, x: event.clientX, y: event.clientY, rotationX: globeGroup.rotation.x, rotationY: globeGroup.rotation.y };
      dragging = false;
      globeStage.setPointerCapture(event.pointerId);
    });

    globeStage.addEventListener("pointermove", event => {
      if (pointerDown && pointerDown.id === event.pointerId) {
        const deltaX = event.clientX - pointerDown.x;
        const deltaY = event.clientY - pointerDown.y;
        if (Math.abs(deltaX) + Math.abs(deltaY) > 5) dragging = true;
        if (dragging) {
          globeGroup.rotation.y = pointerDown.rotationY + deltaX * 0.006;
          globeGroup.rotation.x = THREE.MathUtils.clamp(pointerDown.rotationX + deltaY * 0.006, -1.25, 1.25);
          resumeRotationAt = performance.now() + 2500;
          updateTooltip(null);
          return;
        }
      }
      const pinRecord = pinAtPointer(event);
      updateTooltip(pinRecord && pinRecord.visible ? pinRecord : null);
      if (hoveredPin) {
        const bounds = globeStage.getBoundingClientRect();
        hoveredPin.pinGroup.getWorldPosition(projectedPosition);
        projectedPosition.project(camera);
        globeTooltip.style.left = `${((projectedPosition.x + 1) / 2) * bounds.width}px`;
        globeTooltip.style.top = `${((1 - projectedPosition.y) / 2) * bounds.height}px`;
      }
    });

    globeStage.addEventListener("pointerup", event => {
      if (!pointerDown || pointerDown.id !== event.pointerId) return;
      if (!dragging) {
        const pinRecord = pinAtPointer(event);
        if (pinRecord && pinRecord.visible) {
  document.getElementById(pinRecord.pin.target).scrollIntoView({ behavior: "smooth", block: "start" });
}
      }
      if (dragging) resumeRotationAt = performance.now() + 2500;
      pointerDown = null;
      dragging = false;
    });
    globeStage.addEventListener("pointercancel", () => {
      pointerDown = null;
      dragging = false;
      resumeRotationAt = performance.now() + 2500;
    });
    globeStage.addEventListener("pointerleave", () => {
      if (!pointerDown) updateTooltip(null);
    });

    const resizeObserver = new ResizeObserver(resizeGlobe);
    resizeObserver.observe(globeStage);
    resizeGlobe();
    globePanel.classList.add("is-ready");
    globeStatus.textContent = "Drag to rotate · Hover a pin for its name · Click a pin to jump to that topic";

    function animateGlobe(now) {
      requestAnimationFrame(animateGlobe);
      const elapsed = previousFrameTime ? Math.min((now - previousFrameTime) / 1000, 0.05) : 0;
      previousFrameTime = now;
      if (!dragging && now > resumeRotationAt) globeGroup.rotation.y += globeRotationSpeed * elapsed;

      pinRecords.forEach(record => {
        record.pinGroup.getWorldPosition(projectedPosition);
        const facing = projectedPosition.clone().normalize().dot(new THREE.Vector3(0, 0, 1));
        record.visible = facing > 0.08;
        record.pinGroup.visible = record.visible;
        const pulse = 1 + Math.sin(now * 0.003 + record.phase) * 0.09;
        const hoverScale = record === hoveredPin ? 1.24 : 1;
        record.halo.scale.setScalar(pulse * hoverScale);
        record.core.scale.setScalar((1 + Math.sin(now * 0.003 + record.phase) * 0.08) * hoverScale);
        record.ring.scale.setScalar(pulse * hoverScale);
      });

      if (hoveredPin && hoveredPin.visible) {
        const bounds = globeStage.getBoundingClientRect();
        hoveredPin.pinGroup.getWorldPosition(projectedPosition);
        projectedPosition.project(camera);
        globeTooltip.style.left = `${((projectedPosition.x + 1) / 2) * bounds.width}px`;
        globeTooltip.style.top = `${((1 - projectedPosition.y) / 2) * bounds.height}px`;
      } else if (hoveredPin) {
        updateTooltip(null);
      }

      if (!document.hidden) renderer.render(scene, camera);
    }

    requestAnimationFrame(animateGlobe);
  }
}

const conceptData = [
    {
      title: "GLOBAL VILLAGE",
      author: "McLuhan",
      idea: "Electronic media connect people so closely the world acts like one village.",
      example: "TV and internet show faraway crises in real time.",
      critique: "Shared info is not shared understanding; access is unequal."
    },
    {
      title: "CULTURAL IMPERIALISM",
      author: "Schiller",
      idea: "Powerful Western (mainly U.S.) media spread their values and make weaker countries dependent.",
      example: "Hollywood, American TV, global advertising campaigns.",
      critique: "Audiences are active and often prefer local content (Tomlinson; Straubhaar)."
    },
    {
      title: "GLOCALIZATION",
      author: "Robertson",
      idea: "Global products are adjusted to local tastes, so global and local work together.",
      example: "Pinoy Big Brother, regional MTV broadcasts.",
      critique: "May be mostly for commercial sales, not real cultural exchange."
    },
    {
      title: "HYBRIDIZATION",
      author: "Pieterse",
      idea: "Globalization mixes different cultures together into completely new cultural forms.",
      example: "K-pop, P-pop (SB19).",
      critique: "Global power imbalances still shape the final cultural mix."
    },
    {
      title: "TIME-SPACE COMPRESSION",
      author: "Harvey",
      idea: "Technology and capitalism speed up life and shrink physical distance.",
      example: "Video calls, live streaming, real-time global financial markets.",
      critique: "Can be disorienting; information arrives faster than humans can process."
    }
  ];

  let currentCardIndex = 0;

  function renderCard(index) {
    const item = conceptData[index];
    const card = document.getElementById('floatingConceptCard');
    
    if (!card) return;

    card.style.opacity = '0.3';

    setTimeout(() => {
      document.getElementById('conceptTitle').innerText = item.title;
      document.getElementById('conceptAuthor').innerText = item.author;
      document.getElementById('conceptIdea').innerText = item.idea;
      document.getElementById('conceptExample').innerText = item.example;
      document.getElementById('conceptCritique').innerText = item.critique;
      
      card.style.opacity = '1';
      lucide.createIcons();
    }, 100);

    updateDots();
  }

  function changeCard(direction) {
    currentCardIndex += direction;
    if (currentCardIndex < 0) currentCardIndex = conceptData.length - 1;
    if (currentCardIndex >= conceptData.length) currentCardIndex = 0;
    renderCard(currentCardIndex);
  }

  function updateDots() {
    const dotsContainer = document.getElementById('dotIndicators');
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';
    conceptData.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.style.width = idx === currentCardIndex ? '24px' : '10px';
      dot.style.height = '10px';
      dot.style.borderRadius = '999px';
      dot.style.background = idx === currentCardIndex ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.2)';
      dot.style.cursor = 'pointer';
      dot.style.transition = 'all 0.3s ease';
      dot.onclick = () => {
        currentCardIndex = idx;
        renderCard(currentCardIndex);
      };
      dotsContainer.appendChild(dot);
    });
  }

  // Load first card when DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    renderCard(0);
  });

  window.addEventListener('resize', () => {
    const container = document.getElementById('globeContainer');
    if (!container) return;
    
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});