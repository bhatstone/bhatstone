
import * as THREE from 'https://unpkg.com/three@0.128.0/build/three.module.js';

const container = document.getElementById('canvas-container');

if (container) {
    const scene = new THREE.Scene();
    

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;


    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);


    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 150;
    
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    for(let i = 0; i < particlesCount * 3; i++) {

        posArray[i] = (Math.random() - 0.5) * 15; 
    }

    for(let i=0; i < particlesCount; i++) {
        scaleArray[i] = Math.random();
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));


    const material = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xffffff, // White dust
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
    });


    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);


    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });


    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });


    const animate = () => {
        requestAnimationFrame(animate);


        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;


        particlesMesh.rotation.y += mouseX * 0.01;
        particlesMesh.rotation.x += mouseY * 0.01;

        renderer.render(scene, camera);
    };

    animate();
}
