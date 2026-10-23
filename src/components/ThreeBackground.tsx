import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = mountRef.current;
    if (!canvas) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 400;

    // Particle count: 1200 for smooth 60fps across mobile and laptop GPUs
    const count = prefersReducedMotion ? 400 : 1200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const palette = [
      new THREE.Color('#d2f34c'), // Electric Lime
      new THREE.Color('#6366f1'), // Indigo
      new THREE.Color('#06b6d4'), // Cyan
      new THREE.Color('#8b5cf6'), // Violet
      new THREE.Color('#bbf226'), // Soft Lime
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1200;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      sizes[i] = Math.random() * 2.2 + 0.6;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Constellation connection lines
    const linePositions: number[] = [];
    const lineColors: number[] = [];
    const threshold = 110;
    const maxLines = prefersReducedMotion ? 100 : 450;
    let lineCount = 0;

    for (let i = 0; i < count && lineCount < maxLines; i++) {
      for (let j = i + 1; j < count && lineCount < maxLines; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < threshold) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
          const alpha = (1 - dist / threshold) * 0.16;
          lineColors.push(0.38 * alpha, 0.40 * alpha, 0.95 * alpha, 0.54 * alpha, 0.36 * alpha, 0.98 * alpha);
          lineCount++;
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(lineColors), 3));
    const lineMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.16 });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // Particle sprite
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 32;
    spriteCanvas.height = 32;
    const ctx = spriteCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.3, 'rgba(255,255,255,0.7)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const spriteTex = new THREE.CanvasTexture(spriteCanvas);

    const mat = new THREE.PointsMaterial({
      size: 2.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
      map: spriteTex,
      alphaTest: 0.01,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // Subtle mouse parallax
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 1.5;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 1.5;
    };

    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
    }

    // Responsive resize handler
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    // Animation loop with visibility pausing
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      if (document.visibilityState === 'visible') {
        const t = clock.getElapsedTime();
        if (!prefersReducedMotion) {
          points.rotation.x = t * 0.012 + mouseY * 0.03;
          points.rotation.y = t * 0.018 + mouseX * 0.03;
          lines.rotation.x = points.rotation.x;
          lines.rotation.y = points.rotation.y;

          camera.position.x += (mouseX * 20 - camera.position.x) * 0.02;
          camera.position.y += (mouseY * 15 - camera.position.y) * 0.02;
          camera.lookAt(scene.position);
        }
        renderer.render(scene, camera);
      }
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      geo.dispose();
      mat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      spriteTex.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={mountRef} id="three-canvas" aria-hidden="true" />;
};
