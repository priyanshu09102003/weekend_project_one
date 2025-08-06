import React, { useState } from 'react';

const Page3 = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const createMoonViewer = () => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Moon 3D Viewer</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #000;
            overflow: hidden;
            font-family: Arial, sans-serif;
        }
        #container {
            width: 100vw;
            height: 100vh;
            position: relative;
        }
        #loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 18px;
            z-index: 100;
        }
        #controls {
            position: absolute;
            bottom: 20px;
            left: 20px;
            color: white;
            font-size: 14px;
            opacity: 0.7;
            z-index: 100;
        }
    </style>
</head>
<body>
    <div id="container">
        <div id="loading">Loading Moon...</div>
    </div>

    <script>
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 1);
        document.getElementById('container').appendChild(renderer.domElement);

        // Lighting setup for better moon appearance
        const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
        directionalLight.position.set(5, 3, 5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        // Create moon sphere with higher detail
        const geometry = new THREE.SphereGeometry(2, 128, 128);
        let moonMesh;

        // Create a realistic procedural moon texture
        const createMoonTexture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 1024;
            canvas.height = 1024;
            const ctx = canvas.getContext('2d');
            
            // Base moon color - more realistic grayish
            const gradient = ctx.createRadialGradient(512, 512, 0, 512, 512, 512);
            gradient.addColorStop(0, '#f0f0f0');
            gradient.addColorStop(1, '#a0a0a0');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 1024, 1024);
            
            // Add multiple layers of craters for realism
            const craterLayers = [
                { count: 20, minRadius: 30, maxRadius: 80, opacity: 0.6 },
                { count: 50, minRadius: 15, maxRadius: 40, opacity: 0.4 },
                { count: 100, minRadius: 5, maxRadius: 20, opacity: 0.3 },
                { count: 200, minRadius: 2, maxRadius: 8, opacity: 0.2 }
            ];

            craterLayers.forEach(layer => {
                for (let i = 0; i < layer.count; i++) {
                    const x = Math.random() * 1024;
                    const y = Math.random() * 1024;
                    const radius = Math.random() * (layer.maxRadius - layer.minRadius) + layer.minRadius;
                    
                    // Create crater with rim highlight
                    const craterGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
                    craterGradient.addColorStop(0, \`rgba(60, 60, 60, \${layer.opacity})\`);
                    craterGradient.addColorStop(0.7, \`rgba(100, 100, 100, \${layer.opacity * 0.5})\`);
                    craterGradient.addColorStop(0.9, \`rgba(200, 200, 200, \${layer.opacity * 0.3})\`);
                    craterGradient.addColorStop(1, 'rgba(220, 220, 220, 0.1)');
                    
                    ctx.beginPath();
                    ctx.arc(x, y, radius, 0, 2 * Math.PI);
                    ctx.fillStyle = craterGradient;
                    ctx.fill();
                }
            });
            
            // Add some maria (dark plains)
            for (let i = 0; i < 8; i++) {
                const x = Math.random() * 1024;
                const y = Math.random() * 1024;
                const radius = Math.random() * 100 + 50;
                
                const mariaGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
                mariaGradient.addColorStop(0, 'rgba(80, 80, 80, 0.4)');
                mariaGradient.addColorStop(1, 'rgba(120, 120, 120, 0.1)');
                
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, 2 * Math.PI);
                ctx.fillStyle = mariaGradient;
                ctx.fill();
            }
            
            return new THREE.CanvasTexture(canvas);
        };

        // Create bump map for surface detail
        const createBumpTexture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');
            
            // Base noise
            ctx.fillStyle = '#808080';
            ctx.fillRect(0, 0, 512, 512);
            
            // Add noise pattern
            for (let i = 0; i < 10000; i++) {
                const x = Math.random() * 512;
                const y = Math.random() * 512;
                const intensity = Math.random() * 100 + 100;
                
                ctx.fillStyle = \`rgb(\${intensity}, \${intensity}, \${intensity})\`;
                ctx.fillRect(x, y, 1, 1);
            }
            
            return new THREE.CanvasTexture(canvas);
        };

        // Initialize moon with procedural textures
        console.log('Creating procedural moon texture...');
        const moonTexture = createMoonTexture();
        const bumpTexture = createBumpTexture();
        
        const material = new THREE.MeshPhongMaterial({ 
            map: moonTexture,
            bumpMap: bumpTexture,
            bumpScale: 0.1,
            shininess: 1,
            specular: 0x222222
        });
        
        moonMesh = new THREE.Mesh(geometry, material);
        scene.add(moonMesh);
        document.getElementById('loading').style.display = 'none';

        // Position camera
        camera.position.z = 5;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            
            if (moonMesh) {
                moonMesh.rotation.y += 0.003; // Slower rotation for more realistic effect
            }
            
            renderer.render(scene, camera);
        };
        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Enhanced mouse controls
        let mouseDown = false;
        let mouseX = 0;
        let mouseY = 0;
        let rotationSpeed = 0.01;

        renderer.domElement.addEventListener('mousedown', (event) => {
            mouseDown = true;
            mouseX = event.clientX;
            mouseY = event.clientY;
            renderer.domElement.style.cursor = 'grabbing';
        });

        window.addEventListener('mouseup', () => {
            mouseDown = false;
            renderer.domElement.style.cursor = 'grab';
        });

        renderer.domElement.addEventListener('mousemove', (event) => {
            if (!mouseDown || !moonMesh) return;

            const deltaX = event.clientX - mouseX;
            const deltaY = event.clientY - mouseY;

            moonMesh.rotation.y += deltaX * rotationSpeed;
            moonMesh.rotation.x += deltaY * rotationSpeed;

            // Limit vertical rotation
            moonMesh.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, moonMesh.rotation.x));

            mouseX = event.clientX;
            mouseY = event.clientY;
        });

        // Enhanced zoom with limits
        renderer.domElement.addEventListener('wheel', (event) => {
            event.preventDefault();
            camera.position.z += event.deltaY * 0.005;
            camera.position.z = Math.max(2.5, Math.min(10, camera.position.z));
        });

        renderer.domElement.style.cursor = 'grab';
        
        console.log('Moon 3D viewer initialized successfully');
    </script>
</body>
</html>`;
  };

  return (
    <div className='h-screen p-9 bg-white'>
      <div className='h-full w-full bg-black rounded-[100px] relative overflow-hidden flex items-center justify-between px-16 space-y-5 '>
        <div className='text-white'>
          <h1 className='text-[5vw] font-compressed leading-3 mt-14'>EXPERIENCE 3D</h1>
          <h1 className='text-[8vw] font-compressed mb-4'>WEBDESIGN</h1>
          <h4 className='text-3xl font-stage mb-4 ml-20 text-gray-400'>REFINED | SOPHISTICATED | IMPACTFUL</h4>
          
        </div>
        
        <div className='w-[1000px] h-[1000px]'>
          <iframe
            srcDoc={createMoonViewer()}
            className='w-full h-full border-0 rounded-full'
            title="3D Moon Viewer"
            onLoad={() => setIframeLoaded(true)}
          />
        </div>
        
        {!iframeLoaded && (
          <div className='absolute inset-0 flex items-center justify-center text-white'>
           
          </div>
        )}
      </div>
    </div>
  );
};

export default Page3;